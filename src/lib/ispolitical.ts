// src/lib/ispolitical.ts
// ISPolitical REST API integration
// Per MP_Donation_System_Architecture_v1.docx Section 4

interface ISPoliticalDonation {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  employer: string;
  occupation: string;
  amount: string; // Dollar string, e.g. "50"
  date: string; // YYYY-MM-DD
  stripeChargeId: string;
  partialCardNumber?: string; // Last 4 digits
  frequency: 'one-time' | 'monthly';
  source?: string; // UTM or page identifier
}

/**
 * Submit a donation to ISPolitical for FEC compliance tracking.
 * 
 * CRITICAL: This is fire-and-forget with error logging.
 * If ISPolitical is unreachable, the donation still processes
 * (Stripe charged, Supabase recorded). A reconciliation job
 * can backfill ISPolitical later.
 */
export async function syncDonationToISPolitical(
  donation: ISPoliticalDonation
): Promise<{ success: boolean; error?: string }> {
  const apiUrl = process.env.ISPOLITICAL_API_URL;
  const apiKey = process.env.ISPOLITICAL_API_KEY;
  const apiSecret = process.env.ISPOLITICAL_API_SECRET;

  if (!apiUrl || !apiKey || !apiSecret) {
    console.warn('[ISPolitical] API credentials not configured. Skipping sync.');
    return { success: false, error: 'ISPolitical credentials not configured' };
  }

  const payload = {
    FirstName: donation.firstName,
    LastName: donation.lastName,
    Occupation: donation.occupation,
    Employer: donation.employer,
    Line1: donation.addressLine1,
    City: donation.city,
    State: donation.state,
    ZipCode: donation.zipCode,
    Transactions: [
      {
        Amount: donation.amount,
        Date: donation.date,
        TransactionMethod: 'Credit Card',
        UniqueIdentifier: donation.stripeChargeId,
        ...(donation.partialCardNumber && {
          PartialCardNumber: donation.partialCardNumber,
        }),
        RecurringFrequency: donation.frequency === 'monthly' ? 'monthly' : undefined,
        NoteForInternal: `Website donation${donation.source ? ` (${donation.source})` : ''}`,
      },
    ],
    Emails: [{ EmailAddress: donation.email }],
    ...(donation.phone && {
      Phones: [{ PhoneNumber: donation.phone }],
    }),
  };

  try {
    // ISPolitical uses basic access authentication
    const authHeader = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[ISPolitical] API error ${response.status}: ${errorText}`);
      return {
        success: false,
        error: `ISPolitical API returned ${response.status}: ${errorText}`,
      };
    }

    console.log(
      `[ISPolitical] Donation synced: ${donation.stripeChargeId} ($${donation.amount})`
    );
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[ISPolitical] Sync failed for ${donation.stripeChargeId}: ${message}`);
    return { success: false, error: message };
  }
}
