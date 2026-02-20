import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, state, metadata } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { error: dbError } = await getSupabase().from("contacts").insert({
      email,
      first_name: firstName || null,
      last_name: lastName || null,
      state: state || null,
      source: "join",
      metadata: metadata || null,
    });

    if (dbError) throw dbError;

    await Promise.all([
      sendEmail({
        to: "info@mesocrats.org",
        subject: "New Member Signup",
        html: `
          <h2>New Member Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          ${firstName ? `<p><strong>First Name:</strong> ${firstName}</p>` : ""}
          ${lastName ? `<p><strong>Last Name:</strong> ${lastName}</p>` : ""}
          ${state ? `<p><strong>State:</strong> ${state}</p>` : ""}
        `,
      }),
      sendEmail({
        to: email,
        subject: "Welcome to the Mesocratic Party!",
        html: `
          <h2>Welcome to the Mesocratic Party!</h2>
          <p>Thank you for joining. You're now part of a movement to protect the middle class and hold the middle ground that keeps this country together.</p>
          <p>We'll keep you updated on what's happening — from Convention X to local races to new policy positions.</p>
          <p>In the meantime, explore the party at <a href="https://mesocrats.org">mesocrats.org</a>.</p>
          <p>— The Mesocratic Party</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Join API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
