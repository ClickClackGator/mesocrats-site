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

    await sendEmail({
      to: "info@mesocrats.org",
      subject: "Donate Notification Signup",
      html: `
        <h2>Donate Notification Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Donate API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
