import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { error: dbError } = await getSupabase().from("contacts").insert({
      email,
      source: "donate",
    });

    if (dbError) throw dbError;

    await Promise.all([
      sendEmail({
        to: "info@mesocrats.org",
        subject: "Donate Notification Signup",
        html: `
          <h2>Donate Notification Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
        `,
      }),
      sendEmail({
        to: email,
        subject: "You're on the Donate List!",
        html: `
          <h2>You're on the Donate List!</h2>
          <p>Thank you for your interest in supporting the Mesocratic Party. We're building the donation platform now, and you'll be the first to know when it's ready.</p>
          <p>Every dollar will go directly to building this party and getting Mesocrats on ballots.</p>
          <p>— The Mesocratic Party</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Donate API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
