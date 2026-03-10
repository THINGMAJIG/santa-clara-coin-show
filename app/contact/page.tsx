import type { Metadata } from "next";
import { getPublicConfig } from "@/lib/getPublicConfig";
import ContactForm from "./ContactForm";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Santa Clara Coin Show. Questions, dealer inquiries, and YN program interest welcome.",
};

export default async function ContactPage() {
  const config = await getPublicConfig();
  return (
    <ContactForm
      contactEmail={config.contactEmail}
      contactPhone={config.contactPhone}
      venueName={config.venueName}
      venueFullAddress={config.venueFullAddress}
    />
  );
}
