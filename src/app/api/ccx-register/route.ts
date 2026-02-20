import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, state, interest } = await req.json();

    if (!firstName || !lastName || !email || !state) {
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
      source: "ccx-register",
      metadata: interest ? { interest } : null,
    });

    if (dbError) throw dbError;

    await Promise.all([
      sendEmail({
        to: "ccx@mesocrats.org",
        from: "ccx@mesocrats.org",
        subject: "New CCX Registration",
        html: `
          <h2>New CCX Registration</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>State:</strong> ${state}</p>
          ${interest ? `<p><strong>Interest:</strong> ${interest}</p>` : ""}
        `,
      }),
      sendEmail({
        to: email,
        from: "ccx@mesocrats.org",
        subject: "You're Registered for Convention X!",
        html: `
          <h2>You're Registered for Convention X!</h2>
          <p>Thank you for registering your interest in Convention X, ${firstName}. We're planning something historic in New Orleans, and we're glad you want to be part of it.</p>
          <p>We'll send you updates as plans develop — including delegate elections, logistics, and how to get involved.</p>
          <p>— The Convention X Team</p>
        `,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CCX Register API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
