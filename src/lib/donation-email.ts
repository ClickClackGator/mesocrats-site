// src/lib/donation-email.ts
// SendGrid donation receipt email
// Per MP_Donation_System_Architecture_v1.docx Section 3 (step 8)

import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface DonationReceiptData {
  to: string;
  firstName: string;
  amount: string; // Formatted, e.g. "$50.00"
  date: string; // Formatted, e.g. "February 25, 2026"
  frequency: 'one-time' | 'monthly';
  stripeChargeId: string;
}

export async function sendDonationReceipt(data: DonationReceiptData): Promise<void> {
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'info@mesocrats.org';

  const frequencyText =
    data.frequency === 'monthly'
      ? `${data.amount}/month recurring donation`
      : `${data.amount} one-time donation`;

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
                Thank you for your contribution
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding:40px;background-color:#2A2A2A;">
              <p style="margin:0 0 20px;font-size:16px;color:#ffffff;line-height:1.6;">
                ${data.firstName},
              </p>
              <p style="margin:0 0 24px;font-size:16px;color:#dddddd;line-height:1.6;">
                Thank you for your ${frequencyText} to the Mesocratic National Committee. Your support is building the political center this country needs.
              </p>
              
              <!-- Receipt Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1A1A;border:1px solid #444;border-radius:8px;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 4px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">
                      Donation Receipt
                    </p>
                    <p style="margin:0 0 16px;font-size:32px;color:#ffffff;font-weight:bold;">
                      ${data.amount}
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#888;">Date</td>
                        <td style="padding:4px 0;font-size:14px;color:#ffffff;text-align:right;">${data.date}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#888;">Type</td>
                        <td style="padding:4px 0;font-size:14px;color:#ffffff;text-align:right;">${data.frequency === 'monthly' ? 'Monthly recurring' : 'One-time'}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#888;">Reference</td>
                        <td style="padding:4px 0;font-size:14px;color:#ffffff;text-align:right;">${data.stripeChargeId.slice(-8)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="margin:0 0 24px;font-size:14px;color:#999;line-height:1.6;">
                This receipt confirms your contribution has been processed. Please retain this email for your personal records.
              </p>
              
              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#4374BA;border-radius:6px;">
                    <a href="https://mesocrats.org/platform" style="display:inline-block;padding:14px 28px;font-size:14px;color:#ffffff;text-decoration:none;font-weight:bold;">
                      Explore Our Platform
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
                Contributions to the Mesocratic National Committee are not tax-deductible as charitable contributions for federal income tax purposes. Federal law requires political committees to report the name, mailing address, occupation, and employer for each individual whose contributions aggregate in excess of $200 in a calendar year.
              </p>
              <p style="margin:0;font-size:11px;color:#666;line-height:1.5;">
                Mesocratic National Committee &bull; P.O. Box 15523, Richmond, VA 23227 &bull; mesocrats.org
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const textContent = `
${data.firstName},

Thank you for your ${frequencyText} to the Mesocratic National Committee.

DONATION RECEIPT
Amount: ${data.amount}
Date: ${data.date}
Type: ${data.frequency === 'monthly' ? 'Monthly recurring' : 'One-time'}
Reference: ${data.stripeChargeId.slice(-8)}

Please retain this email for your personal records.

---
Paid for by the Mesocratic National Committee (mesocrats.org). Not authorized by any candidate or candidate's committee.

Contributions to the Mesocratic National Committee are not tax-deductible as charitable contributions for federal income tax purposes.

Mesocratic National Committee | P.O. Box 15523, Richmond, VA 23227 | mesocrats.org
`;

  try {
    await sgMail.send({
      to: data.to,
      from: { email: fromEmail, name: 'Mesocratic National Committee' },
      subject: `Thank you for your ${data.amount} contribution — Mesocratic National Committee`,
      text: textContent,
      html: htmlContent,
    });
    console.log(`[SendGrid] Donation receipt sent to ${data.to}`);
  } catch (error) {
    // Non-blocking: log but don't fail the donation
    console.error(`[SendGrid] Failed to send receipt to ${data.to}:`, error);
  }
}
