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

    await sendEmail({
      to: "info@mesocrats.org",
      subject: "New Member Signup",
      html: `
        <h2>New Member Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${firstName ? `<p><strong>First Name:</strong> ${firstName}</p>` : ""}
        ${lastName ? `<p><strong>Last Name:</strong> ${lastName}</p>` : ""}
        ${state ? `<p><strong>State:</strong> ${state}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Join API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
