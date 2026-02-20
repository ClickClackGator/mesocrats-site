import sgMail from "@sendgrid/mail";

export async function sendEmail({
  to,
  from = "info@mesocrats.org",
  subject,
  html,
}: {
  to: string;
  from?: string;
  subject: string;
  html: string;
}) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  await sgMail.send({ to, from, subject, html });
}
