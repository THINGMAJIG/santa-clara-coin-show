import nodemailer from "nodemailer";

function getTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD env vars not set");
  return nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const transport = getTransport();
  const from = process.env.GMAIL_USER!;
  await transport.sendMail({ from, ...opts });
}
