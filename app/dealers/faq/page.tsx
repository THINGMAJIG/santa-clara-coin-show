import type { Metadata } from "next";
import { SHOW_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: "Dealer FAQ",
  description: "Frequently asked questions for dealers and exhibitors at the Santa Clara Coin Show.",
};

const faqs = [
  { q: "How do I apply for a booth?", a: "Submit an application on our Dealer Application page. We'll confirm availability and respond within 5 business days." },
  { q: "What are the booth/table fees?", a: `Please contact us at ${SHOW_CONFIG.contactEmail} or ${SHOW_CONFIG.contactPhone} for current table pricing.` },
  { q: "When can I set up?", a: "Setup begins before the show opens on the first day. We'll provide exact times upon confirmation of your table booking." },
  { q: "Is electricity available at tables?", a: "Please contact us to confirm electricity availability, as this varies by show. We recommend having a backup lighting plan." },
  { q: "Is there Wi-Fi in the venue?", a: "Please contact us to confirm Wi-Fi availability at the venue for the upcoming show." },
  { q: "What security measures are in place?", a: "The show floor is monitored during all open hours. Dealers are responsible for securing their own inventory during off-hours." },
  { q: "Can I hire help for my booth?", a: "Yes. Please note that all individuals at your table during show hours must have a dealer badge. Contact us about additional badge purchases." },
  { q: "What is the cancellation/refund policy?", a: "Cancellation policies vary. Please contact us directly to discuss your specific situation." },
  { q: "How do I get on the mailing list for future shows?", a: `Email ${SHOW_CONFIG.contactEmail} and ask to be added to the dealer notification list.` },
  { q: "How is the show marketed and advertised?", a: `The show is listed on major numismatic directories (coinshows-usa.com, greysheet.com, PCGS, ANA calendar) and promoted to the local and regional collector community through email and social media.` },
  { q: "What types of items can be sold at the show?", a: "Coins, currency, bullion, tokens, medals, stamps, collectibles, and numismatic supplies. Please contact us if you're unsure whether your inventory is appropriate for the show." },
  { q: "Are dealers required to be ANA members?", a: "ANA membership is not required but is encouraged. We follow industry-standard dealer conduct expectations." },
];

export default function DealerFaqPage() {
  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Dealer FAQ
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.8 }}>
          Common questions from dealers and exhibitors.
        </p>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {faqs.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <div className="faq-answer">{a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
