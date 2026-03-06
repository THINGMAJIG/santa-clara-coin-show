import type { Metadata } from "next";
import Link from "next/link";
import { getPublicConfig } from "@/lib/getPublicConfig";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Events & Schedule",
  description: "Show schedule, daily events, raffle drawings, and on-site services at the Santa Clara Coin Show.",
};

export default async function EventsPage() {
  const SHOW_CONFIG = await getPublicConfig();
  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Events & Schedule
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          {SHOW_CONFIG.nextShowName}
        </p>
      </section>

      {/* Daily Schedule */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            📅 Show Schedule
          </h2>
          <div className="space-y-6">
            {SHOW_CONFIG.schedule.map((day) => (
              <div
                key={day.day}
                className="rounded-lg p-6 card-gold-top shadow"
                style={{ backgroundColor: "var(--cream)" }}
              >
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                  {day.day} — {day.date}
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { time: "Doors Open", label: day.hours.split("–")[0]?.trim() ?? "10:00 AM" },
                    { time: "First Raffle Drawing", label: SHOW_CONFIG.raffleDrawingTimes[0] },
                    { time: "Second Raffle Drawing", label: SHOW_CONFIG.raffleDrawingTimes[1] },
                    { time: "Final Raffle Drawing", label: SHOW_CONFIG.raffleDrawingTimes[2] },
                    { time: "Show Closes", label: day.hours.split("–")[1]?.trim() ?? "6:00 PM" },
                  ].map(({ time, label }) => (
                    <div key={time} className="flex items-center gap-3">
                      <span className="font-bold w-20 text-right flex-shrink-0" style={{ color: "var(--gold-dark)" }}>
                        {label}
                      </span>
                      <span className="w-px h-4 flex-shrink-0" style={{ backgroundColor: "var(--silver)" }} />
                      <span style={{ color: "#555" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Raffle */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            🎁 Daily Raffle
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
            Raffle tickets are available for purchase at the door — {SHOW_CONFIG.raffleTicketPrice}. Drawings are held{" "}
            {SHOW_CONFIG.raffleDrawingTimes.length} times each day at{" "}
            {SHOW_CONFIG.raffleDrawingTimes.join(", ")}.
          </p>
          <div
            className="rounded-lg p-5 text-sm"
            style={{ backgroundColor: "white", border: "1px solid var(--silver)" }}
          >
            <strong style={{ color: "var(--navy)" }}>Raffle Rules:</strong>
            <ul className="mt-2 space-y-1" style={{ color: "#666" }}>
              <li>• Tickets are sold at the admission desk</li>
              <li>• {SHOW_CONFIG.raffleTicketPrice}</li>
              {SHOW_CONFIG.raffleMustBePresent && <li>• Winner must be present to claim prize</li>}
              <li>• Prizes include rare coins, silver rounds, and numismatic collectibles</li>
            </ul>
          </div>
          <div className="mt-4">
            <Link href="/events/raffle" className="btn-gold text-sm">
              Raffle Details & Prizes →
            </Link>
          </div>
        </div>
      </section>

      {/* On-Site Services */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            🔍 On-Site Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { icon: "💰", title: "Free Verbal Appraisals", desc: "Most dealers will provide free verbal appraisals on coins you bring. This is one of the best reasons to attend!" },
              { icon: "🤝", title: "Buying & Selling", desc: "Dealers actively buy collections. Come with coins to sell and get competitive offers on the spot." },
              { icon: "🪙", title: "65+ Dealer Booths", desc: "US, world, ancient, bullion, currency, tokens, medals, stamps, and supplies — all under one roof." },
              { icon: "🎓", title: "Youth YN Table", desc: "Special programming for young collectors launching this season. Educational, fun, and free for youth." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-lg p-5 shadow-sm card-gold-top" style={{ backgroundColor: "var(--cream)" }}>
                <div className="text-2xl mb-2">{icon}</div>
                <h3 className="font-semibold mb-1" style={{ color: "var(--navy)" }}>{title}</h3>
                <p style={{ color: "#666" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
