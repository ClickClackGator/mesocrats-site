// src/lib/mce/best-efforts.ts
// Mesocratic Compliance Engine — Best-Efforts Follow-Up System
//
// FEC regulations require committees to make "best efforts" to collect
// employer and occupation from contributors whose aggregate exceeds $200.
// This module sends branded follow-up emails via SendGrid and tracks
// attempts in the compliance_follow_ups table.
//
// Rules:
//   - Max 2 follow-up attempts (initial + one retry after 30 days)
//   - Fire-and-forget: never blocks the donation flow
//   - Only triggers when aggregate > $200 AND employer/occupation missing

import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const FEC_ITEMIZATION_THRESHOLD_CENTS = 200_00;
const FOLLOW_UP_RETRY_DAYS = 30;
const MAX_FOLLOW_UP_ATTEMPTS = 2;

/**
 * Check if a donor needs an employer/occupation follow-up and send
 * a polite request email if so. Fire-and-forget — never throws.
 */
export async function checkAndSendFollowUp(
  donorId: string,
  donorEmail: string,
  firstName: string,
  aggregateYtdCents: number,
  employer: string | null,
  occupation: string | null
): Promise<void> {
  try {
    // Only trigger if aggregate > $200 AND info is missing
    if (aggregateYtdCents <= FEC_ITEMIZATION_THRESHOLD_CENTS) return;

    const employerMissing = !employer?.trim();
    const occupationMissing = !occupation?.trim();
    if (!employerMissing && !occupationMissing) return;

    const supabase = getSupabase();

    // Check existing follow-ups for this donor
    const { data: existingFollowUps, error: queryError } = await supabase
      .from('compliance_follow_ups')
      .select('id, sent_at, response_received_at')
      .eq('donor_id', donorId)
      .eq('follow_up_type', 'employer_occupation')
      .order('sent_at', { ascending: false });

    if (queryError) {
      console.error('[MCE Best-Efforts] Query failed:', queryError.message);
      return;
    }

    const attempts = existingFollowUps?.length || 0;

    // Max 2 attempts total
    if (attempts >= MAX_FOLLOW_UP_ATTEMPTS) return;

    // If a follow-up was already sent and response was received, no need for more
    if (existingFollowUps?.some((f) => f.response_received_at)) return;

    // If a follow-up exists, only retry if it was sent > 30 days ago
    if (attempts > 0) {
      const lastSent = new Date(existingFollowUps![0].sent_at);
      const daysSince = (Date.now() - lastSent.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < FOLLOW_UP_RETRY_DAYS) return;
    }

    // Find the most recent donation for this donor (for compliance_follow_ups.donation_id)
    const { data: recentDonation } = await supabase
      .from('donations')
      .select('id')
      .eq('donor_id', donorId)
      .eq('status', 'succeeded')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!recentDonation) return;

    // Send follow-up email
    await sendFollowUpEmail(donorEmail, firstName, employerMissing, occupationMissing);

    // Record the follow-up attempt
    const { error: insertError } = await supabase
      .from('compliance_follow_ups')
      .insert({
        donor_id: donorId,
        donation_id: recentDonation.id,
        follow_up_type: 'employer_occupation',
        sent_at: new Date().toISOString(),
      });

    if (insertError) {
      console.error('[MCE Best-Efforts] Insert failed:', insertError.message);
    }
  } catch (err) {
    console.error(
      '[MCE Best-Efforts] Unexpected error:',
      err instanceof Error ? err.message : err
    );
  }
}

/**
 * Mark a follow-up as having received a response.
 */
export async function markFollowUpReceived(donorId: string): Promise<void> {
  try {
    const supabase = getSupabase();

    const { error } = await supabase
      .from('compliance_follow_ups')
      .update({ response_received_at: new Date().toISOString() })
      .eq('donor_id', donorId)
      .eq('follow_up_type', 'employer_occupation')
      .is('response_received_at', null);

    if (error) {
      console.error('[MCE Best-Efforts] Update failed:', error.message);
    }
  } catch (err) {
    console.error(
      '[MCE Best-Efforts] Unexpected error:',
      err instanceof Error ? err.message : err
    );
  }
}

// ── Email ────────────────────────────────────────────────────

async function sendFollowUpEmail(
  to: string,
  firstName: string,
  employerMissing: boolean,
  occupationMissing: boolean
): Promise<void> {
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'info@mesocrats.org';

  let missingFields: string;
  if (employerMissing && occupationMissing) {
    missingFields = 'your employer name and occupation';
  } else if (employerMissing) {
    missingFields = 'your employer name';
  } else {
    missingFields = 'your occupation';
  }

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1A1A;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:30px 40px;background-color:#222;border-bottom:3px solid #6C3393;">
              <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:bold;">
                THE MESOCRATIC PARTY
              </h1>
              <p style="margin:4px 0 0;font-size:13px;color:#aaaaaa;">
                Federal compliance follow-up
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;background-color:#2A2A2A;">
              <p style="margin:0 0 20px;font-size:16px;color:#ffffff;line-height:1.6;">
                ${firstName},
              </p>
              <p style="margin:0 0 20px;font-size:16px;color:#dddddd;line-height:1.6;">
                Thank you for your generous contributions to the Mesocratic National Committee. We truly appreciate your support.
              </p>
              <p style="margin:0 0 20px;font-size:16px;color:#dddddd;line-height:1.6;">
                Federal law requires political committees to collect and report the name, mailing address, employer, and occupation for each contributor whose donations total more than $200 in a calendar year. Your contributions have reached this threshold, and we need ${missingFields} to complete our records.
              </p>
              <p style="margin:0 0 24px;font-size:16px;color:#dddddd;line-height:1.6;">
                Please reply to this email or contact us at the address below with the requested information. This helps us stay in compliance with federal election law.
              </p>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#4374BA;border-radius:6px;">
                    <a href="mailto:info@mesocrats.org?subject=Employer%2FOccupation%20Update" style="display:inline-block;padding:14px 28px;font-size:14px;color:#ffffff;text-decoration:none;font-weight:bold;">
                      Reply with Your Information
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FEC Disclaimer -->
          <tr>
            <td style="padding:24px 40px;background-color:#222;border-top:1px solid #333;">
              <p style="margin:0 0 12px;font-size:11px;color:#888;line-height:1.5;">
                Paid for by the Mesocratic National Committee (mesocrats.org). Not authorized by any candidate or candidate&rsquo;s committee.
              </p>
              <p style="margin:0 0 12px;font-size:11px;color:#888;line-height:1.5;">
                Federal law requires political committees to report the name, mailing address, occupation, and employer for each individual whose contributions aggregate in excess of $200 in a calendar year. This email is part of our best-efforts compliance with 52 U.S.C. &sect; 30104(b)(3)(A).
              </p>
              <p style="margin:0;font-size:11px;color:#666;line-height:1.5;">
                Mesocratic National Committee &bull; P.O. Box 4218, Glen Allen, VA 23058 &bull; mesocrats.org
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textContent = `${firstName},

Thank you for your generous contributions to the Mesocratic National Committee.

Federal law requires political committees to collect and report the name, mailing address, employer, and occupation for each contributor whose donations total more than $200 in a calendar year. Your contributions have reached this threshold, and we need ${missingFields} to complete our records.

Please reply to this email or write to info@mesocrats.org with the requested information.

---
Paid for by the Mesocratic National Committee (mesocrats.org). Not authorized by any candidate or candidate's committee.

This email is part of our best-efforts compliance with 52 U.S.C. § 30104(b)(3)(A).

Mesocratic National Committee | P.O. Box 4218, Glen Allen, VA 23058 | mesocrats.org
`;

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: 'Mesocratic National Committee' },
      subject: 'Action needed: employer/occupation information — Mesocratic National Committee',
      text: textContent,
      html: htmlContent,
    });
    console.log(`[MCE Best-Efforts] Follow-up email sent to ${to}`);
  } catch (error) {
    console.error(`[MCE Best-Efforts] Failed to send follow-up to ${to}:`, error);
  }
}
