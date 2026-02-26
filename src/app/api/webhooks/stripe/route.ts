// src/app/api/webhooks/stripe/route.ts
// Stripe webhook handler
// Per MP_Donation_System_Architecture_v1.docx Section 5.3

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[Stripe Webhook] Signature verification failed: ${message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // === Successful charge ===
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`);

        // Update donation status if it exists
        await supabase
          .from('donations')
          .update({ status: 'succeeded' })
          .eq('stripe_charge_id', paymentIntent.id);

        break;
      }

      // === Failed charge ===
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);

        await supabase
          .from('donations')
          .update({ status: 'failed' })
          .eq('stripe_charge_id', paymentIntent.id);

        break;
      }

      // === Dispute/chargeback ===
      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute;
        console.log(`[Stripe Webhook] Dispute created: ${dispute.id}`);

        // Mark the related donation as disputed
        if (dispute.payment_intent) {
          await supabase
            .from('donations')
            .update({ status: 'disputed' })
            .eq('stripe_charge_id', dispute.payment_intent);
        }

        break;
      }

      // === Refund ===
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        console.log(`[Stripe Webhook] Charge refunded: ${charge.id}`);

        if (charge.payment_intent) {
          await supabase
            .from('donations')
            .update({ status: 'refunded' })
            .eq('stripe_charge_id', charge.payment_intent);
        }

        break;
      }

      // === Subscription events ===
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Stripe Webhook] Invoice paid: ${invoice.id}`);

        // For recurring donations after the first one, create a new donation record
        if (
          invoice.subscription &&
          invoice.billing_reason === 'subscription_cycle'
        ) {
          // Find donor by subscription
          const { data: existingDonation } = await supabase
            .from('donations')
            .select('donor_id, amount_cents')
            .eq('stripe_subscription_id', invoice.subscription)
            .limit(1)
            .single();

          if (existingDonation) {
            await supabase.from('donations').insert({
              donor_id: existingDonation.donor_id,
              stripe_charge_id: invoice.payment_intent as string,
              stripe_subscription_id: invoice.subscription as string,
              amount_cents: existingDonation.amount_cents,
              frequency: 'monthly',
              status: 'succeeded',
              metadata: { billing_reason: 'subscription_cycle' },
            });

            // Refresh totals
            await supabase.rpc('refresh_donation_totals').catch(() => {});
          }
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(
          `[Stripe Webhook] Invoice payment failed: ${invoice.id} (subscription: ${invoice.subscription})`
        );
        // Stripe handles retry logic for subscriptions automatically
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(
          `[Stripe Webhook] Subscription cancelled: ${subscription.id}`
        );
        // Optionally mark the subscription as cancelled in metadata
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Disable body parsing — Stripe needs raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
