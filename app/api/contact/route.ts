import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { name = "", email = "", subject = "", message = "" } = await req.json();

    const notifyTo = process.env.NOTIFY_EMAIL ?? "santaclaracoinshow@gmail.com";
    await sendMail({
      to: notifyTo,
      subject: `Contact: ${subject || "General Inquiry"} — from ${name}`,
      text: `New contact form submission:

Name:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}
`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 500 });
  }
}
