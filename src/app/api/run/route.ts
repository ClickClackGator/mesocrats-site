import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, state, office, message } =
      await req.json();

    if (!firstName || !lastName || !email || !state || !office) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const { error: dbError } = await getSupabase().from("contacts").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      state,
      source: "run",
      message: message || null,
      metadata: { office },
    });

    if (dbError) throw dbError;

    await Promise.all([
      sendEmail({
        to: "info@mesocrats.org",
        subject: "New Candidate Interest",
        html: `
          <h2>New Candidate Interest</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Office Level:</strong> ${office}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        `,
      }),
      sendEmail({
        to: email,
        subject: "Thanks for Your Interest in Running",
        html: `
          <h2>Thanks for Your Interest in Running</h2>
          <p>Thank you for considering a run for office as a Mesocrat, ${firstName}. It takes courage to step up, and we're glad you're thinking about it.</p>
          <p>A member of our team will reach out to discuss how we can support you.</p>
          <p>— The Mesocratic Party</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Run API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
