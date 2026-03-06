import type { Metadata } from "next";
import { SHOW_CONFIG as STATIC_CONFIG } from "@/data/config";
import { getPublicConfig } from "@/lib/getPublicConfig";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Raffle & Prizes",
  description: `Win rare coins and collectibles at the ${STATIC_CONFIG.showName} raffle. Tickets available at the door.`,
};

export default async function RafflePage() {
  const SHOW_CONFIG = await getPublicConfig();
  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <div className="text-5xl mb-4">🎁</div>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Raffle & Prizes
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          Win rare coins and collectibles. Drawings every day of the show.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            How the Raffle Works
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Buy Tickets at the Door", desc: `Raffle tickets are sold at the admission desk. Pricing: ${SHOW_CONFIG.raffleTicketPrice}. The more tickets you buy, the better your chances!` },
              { step: "2", title: "Keep Your Stubs", desc: "Tear your ticket in half. Drop one half in the raffle drum, keep the other. Check your number at each drawing." },
              { step: "3", title: "Watch for Drawings", desc: `Drawings are held ${SHOW_CONFIG.raffleDrawingTimes.length} times each day at ${SHOW_CONFIG.raffleDrawingTimes.join(", ")}. Announcements are made over the PA system.` },
              { step: "4", title: "Claim Your Prize", desc: `${SHOW_CONFIG.raffleMustBePresent ? "You must be present at the time of the drawing to claim your prize." : "If you win, you can claim your prize at the show office."} Prizes are awarded on the spot!` },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 rounded-lg p-5 shadow-sm card-gold-top" style={{ backgroundColor: "var(--cream)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-display text-lg flex-shrink-0"
                  style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
                >
                  {step}
                </div>
                <div>
                  <div className="font-semibold mb-1" style={{ color: "var(--navy)" }}>{title}</div>
                  <div className="text-sm" style={{ color: "#666" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Pricing */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            Ticket Pricing
          </h2>
          <div
            className="rounded-xl p-8 shadow"
            style={{ backgroundColor: "var(--navy)" }}
          >
            <div className="text-5xl mb-3">🎟</div>
            <div className="font-display text-3xl font-bold mb-2" style={{ color: "var(--gold)" }}>
              {SHOW_CONFIG.raffleTicketPrice}
            </div>
            <p className="text-sm" style={{ color: "var(--cream)", opacity: 0.75 }}>
              Tickets available at the admission desk. Cash only.
            </p>
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Prizes
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#555" }}>
            Raffle prizes are donated by dealers and the show organizers. Past prizes have included:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-center">
            {[
              "Silver Rounds",
              "Morgan Dollars",
              "Gold Coins",
              "Proof Sets",
              "Commemoratives",
              "Currency Notes",
              "Ancient Coins",
              "Collector Books",
              "Coin Supplies",
            ].map((prize) => (
              <div
                key={prize}
                className="rounded px-3 py-3 font-medium"
                style={{ backgroundColor: "var(--cream)", color: "var(--navy)", border: "1px solid var(--silver)" }}
              >
                {prize}
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "#aaa" }}>
            Specific prizes for each show are announced on the day of the event.
          </p>
        </div>
      </section>
    </>
  );
}
