import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { error: dbError } = await getSupabase()
      .from("contact_submissions")
      .insert({ email, name, subject, message });

    if (dbError) throw dbError;

    await Promise.all([
      sendEmail({
        to: "info@mesocrats.org",
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
      sendEmail({
        to: email,
        subject: "We Received Your Message",
        html: `
          <h2>We Received Your Message</h2>
          <p>Thanks for reaching out to the Mesocratic Party. We've received your message and will get back to you as soon as we can.</p>
          <p>— The Mesocratic Party</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
