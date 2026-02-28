// src/lib/mce/stripe-fees.ts
// Mesocratic Compliance Engine — Stripe Fee Auto-Capture
//
// Records Stripe processing fees as operating disbursements so they
// appear on FEC Schedule B and IRS Form 8872 expenditure reports.
// Fire-and-forget: never blocks the donation flow.

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const STRIPE_ADDRESS = {
  payee_address_line1: '354 Oyster Point Blvd',
  payee_address_city: 'South San Francisco',
  payee_address_state: 'CA',
  payee_address_zip: '94080',
};

/**
 * Calculate Stripe's standard US card fee: 2.9% + 30¢
 */
export function extractStripeFee(paymentIntent: {
  id: string;
  amount: number;
  created: number;
}): number {
  return Math.round(paymentIntent.amount * 0.029) + 30;
}

/**
 * Record a Stripe processing fee as an operating disbursement.
 * Fire-and-forget — catches all errors internally.
 */
export async function recordStripeFee(
  stripeChargeId: string,
  amountCents: number,
  feeCents: number,
  date: string
): Promise<void> {
  try {
    const supabase = getSupabase();

    const { error } = await supabase.from('disbursements').insert({
      payee_name: 'Stripe, Inc.',
      ...STRIPE_ADDRESS,
      amount_cents: feeCents,
      date,
      purpose: `Payment processing fee for donation ${stripeChargeId}`,
      category: 'operating',
    });

    if (error) {
      console.error('[MCE Stripe Fees] Insert failed:', error.message);
    }
  } catch (err) {
    console.error(
      '[MCE Stripe Fees] Unexpected error:',
      err instanceof Error ? err.message : err
    );
  }
}
