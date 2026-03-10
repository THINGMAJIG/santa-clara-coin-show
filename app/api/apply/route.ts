import { NextRequest, NextResponse } from "next/server";
import { saveApplication } from "@/lib/sheets";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      businessName = "", contactName = "", email = "", phone = "",
      website = "", sellerPermit = "", address = "", specialties = "", tablePreference = "",
      showDate = "", returning = "", notes = "",
    } = body;

    // Save to Google Sheets
    if (process.env.GOOGLE_SHEETS_ID) {
      await saveApplication({
        businessName, contactName, email, phone, website, address,
        specialties, tablePreference, showDate, returning, notes,
      });
    }

    // Send email notification
    const notifyTo = process.env.NOTIFY_EMAIL ?? "santaclaracoinshow@gmail.com";
    await sendMail({
      to: notifyTo,
      subject: `Dealer Application: ${businessName}`,
      text: `New dealer application received:

Business: ${businessName}
Contact:  ${contactName}
Email:    ${email}
Phone:    ${phone}
Website:       ${website}
Seller Permit: ${sellerPermit}
Address:       ${address}

Specialties:      ${specialties}
Table Preference: ${tablePreference}
Show Date:        ${showDate}
Returning dealer: ${returning}

Notes:
${notes}
`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("apply route error:", err);
    return NextResponse.json({ ok: false, error: "Failed to submit application" }, { status: 500 });
  }
}
