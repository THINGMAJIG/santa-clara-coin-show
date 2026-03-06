import type { Metadata } from "next";
import { getPublicConfig } from "@/lib/getPublicConfig";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Visitor FAQ",
  description: "Frequently asked questions for visitors to the Santa Clara Coin Show.",
};

export default async function VisitorFaqPage() {
  const SHOW_CONFIG = await getPublicConfig();
  const faqs = [
    { q: "What are the show hours?", a: `The show is open ${SHOW_CONFIG.schedule.map((s) => `${s.day} ${s.date} from ${s.hours}`).join(", and ")}.` },
    { q: "Where is the show located?", a: `${SHOW_CONFIG.venueName}, ${SHOW_CONFIG.venueFullAddress}.` },
    { q: "How much does admission cost?", a: `Adults: ${SHOW_CONFIG.admissionAdult} (${SHOW_CONFIG.admissionAdultNote}). Youth under 16: FREE with paying adult. Active Military: FREE with valid ID.` },
    { q: "Is parking free?", a: "Yes. Free parking is available on site." },
    { q: "How often does the show occur?", a: "The Santa Clara Coin Show is held multiple times per year. Sign up for our email list to be notified of upcoming dates." },
    { q: "Can children attend for free?", a: `Yes! Children under 16 are admitted free of charge when accompanied by a paying adult.` },
    { q: "Can I bring coins to sell or trade?", a: "Absolutely. Many dealers actively buy coins from the public. Bring your collection and walk the floor — you'll find interested buyers." },
    { q: "Do dealers accept credit cards?", a: "Some do, some don't. We strongly recommend bringing cash. There may be an ATM nearby, but it's best to come prepared." },
    { q: "Can I have my coins appraised at the show?", a: "Yes. Most dealers will provide a free verbal appraisal of coins you bring. It's a great opportunity to learn the value of your collection." },
    { q: "What types of coins and collectibles are available?", a: "The show features US coins, world coins, ancient coins, currency and paper money, gold and silver bullion, tokens, medals, stamps, supplies, and general collectibles." },
    { q: "Is the venue accessible for people with disabilities?", a: "Yes. The venue has accessible parking, entrances, and restrooms. Please contact us in advance if you have specific accessibility needs." },
    { q: "Can I take photographs?", a: "You may take photos for personal use. Please ask individual dealers before photographing their inventory, as many prefer to decline for insurance reasons." },
    { q: "How do I find out about future shows?", a: `Email us at ${SHOW_CONFIG.contactEmail} to be added to our announcement list, or check this website for updated show dates.` },
  ];
  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Visitor FAQ
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.8 }}>
          Common questions from first-time and returning visitors.
        </p>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-0">
            {faqs.map(({ q, a }) => (
              <details key={q}>
                <summary>{q}</summary>
                <div className="faq-answer">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
