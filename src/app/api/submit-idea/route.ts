import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, policyArea, title, description } =
      await req.json();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !policyArea ||
      !title ||
      !description
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { error: dbError } = await getSupabase().from("policy_ideas").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      policy_area: policyArea,
      title,
      description,
    });

    if (dbError) throw dbError;

    await sendEmail({
      to: "info@mesocrats.org",
      subject: `New Policy Idea: ${title}`,
      html: `
        <h2>New Policy Idea Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Policy Area:</strong> ${policyArea}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit Idea API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
