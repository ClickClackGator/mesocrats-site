import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, state, track, message } =
      await req.json();

    if (!firstName || !lastName || !email || !state || !track) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    const meta: Record<string, string> = { track };
    if (message) meta.message = message;

    const { error: dbError } = await getSupabase().from("contacts").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      state,
      source: "volunteer",
      metadata: meta,
    });

    if (dbError) throw dbError;

    await Promise.all([
      sendEmail({
        to: "info@mesocrats.org",
        subject: "New Volunteer Signup",
        html: `
          <h2>New Volunteer Signup</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>State:</strong> ${state}</p>
          <p><strong>Track:</strong> ${track}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        `,
      }),
      sendEmail({
        to: email,
        subject: "Thanks for Volunteering!",
        html: `
          <h2>Thanks for Volunteering!</h2>
          <p>We appreciate you stepping up, ${firstName}. You signed up for the <strong>${track}</strong> volunteer track, and we'll be in touch soon with next steps.</p>
          <p>The Mesocratic Party is built by people like you. Thank you for being part of it.</p>
          <p>— The Mesocratic Party</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Volunteer API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
