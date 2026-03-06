import type { Metadata } from "next";
import Link from "next/link";
import MapEmbed from "@/components/MapEmbed";
import { getPublicConfig } from "@/lib/getPublicConfig";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Everything you need for a great day at the Santa Clara Coin Show. Hours, admission, directions, parking, and what to expect from 65+ dealers.",
};

export default async function VisitorsPage() {
  const SHOW_CONFIG = await getPublicConfig();
  return (
    <>
      {/* Page Hero */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "var(--navy)" }}
      >
        <h1
          className="font-display text-4xl sm:text-5xl font-bold mb-3"
          style={{ color: "var(--cream)" }}
        >
          Plan Your Visit
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--cream)", opacity: 0.8 }}>
          Everything you need for a great day at the Santa Clara Coin Show.
        </p>
      </section>

      {/* At-a-Glance Card */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-xl p-8 shadow-lg card-gold-top"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <h2
              className="font-display text-2xl font-bold mb-5"
              style={{ color: "var(--navy)" }}
            >
              Quick Reference
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "📅 Dates", value: SHOW_CONFIG.schedule.map((s) => `${s.day} ${s.date}`).join(" · ") },
                { label: "🕐 Hours", value: SHOW_CONFIG.schedule.map((s) => `${s.day}: ${s.hours}`).join(" · ") },
                { label: "📍 Venue", value: `${SHOW_CONFIG.venueName}, ${SHOW_CONFIG.venueFullAddress}` },
                { label: "🎟 Admission", value: `Adults ${SHOW_CONFIG.admissionAdult} · Youth FREE · Military FREE` },
                { label: "🚗 Parking", value: SHOW_CONFIG.parkingNote },
                { label: "📞 Info Line", value: SHOW_CONFIG.contactPhone },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="font-semibold" style={{ color: "var(--navy)" }}>{label}</span>
                  <p className="mt-0.5" style={{ color: "#555" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-display text-2xl font-bold mb-6"
            style={{ color: "var(--navy)" }}
          >
            🗺 Getting There
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--navy)" }}>By Car</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>
                From <strong>San Jose (101 North):</strong> Take US-101 N toward San Francisco, exit at Great America Pkwy, turn right and continue to {SHOW_CONFIG.venueAddress}.
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#555" }}>
                From <strong>San Francisco (101 South):</strong> Take US-101 S toward San Jose, exit at Great America Pkwy, turn left and head to the venue.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                <strong>Parking is free</strong> in the on-site lots.
              </p>
              <a
                href={SHOW_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 btn-gold text-sm"
              >
                Get Directions →
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--navy)" }}>Nearby Hotels</h3>
              <ul className="text-sm space-y-1" style={{ color: "#555" }}>
                <li>• Hyatt Regency Santa Clara (~0.5 mi)</li>
                <li>• Marriott Santa Clara (~0.7 mi)</li>
                <li>• Hilton Santa Clara (~0.8 mi)</li>
                <li>• Residence Inn Santa Clara (~1.0 mi)</li>
              </ul>
              <p className="text-xs mt-3" style={{ color: "#888" }}>
                Reserve early — Santa Clara hotels fill quickly on show weekends.
              </p>
            </div>
          </div>
          <MapEmbed height={380} />
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-display text-2xl font-bold mb-6"
            style={{ color: "var(--navy)" }}
          >
            🪙 What to Expect
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#444" }}>
            The Santa Clara Coin Show features{" "}
            <strong>{SHOW_CONFIG.dealerCount} dealers</strong> offering a wide
            variety of numismatic items including:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            {[
              "US Coins",
              "World Coins",
              "Ancient Coins",
              "Currency / Paper Money",
              "Gold & Silver Bullion",
              "Tokens & Medals",
              "Supplies & Accessories",
              "Stamps",
              "Estate & General Collectibles",
            ].map((item) => (
              <div
                key={item}
                className="rounded px-3 py-2 text-sm text-center font-medium"
                style={{
                  backgroundColor: "var(--cream)",
                  color: "var(--navy)",
                  border: "1px solid var(--silver)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            className="rounded-lg p-6 text-sm leading-relaxed"
            style={{ backgroundColor: "#fffbf0", border: "1px solid var(--gold)", color: "#444" }}
          >
            <strong style={{ color: "var(--gold-dark)" }}>💡 Pro Tips for First-Time Visitors</strong>
            <ul className="mt-3 space-y-1">
              <li>• <strong>Bring cash</strong> — most dealers prefer cash, though some accept cards</li>
              <li>• Bring your want list — dealers love helping you find specific coins</li>
              <li>• You can bring coins to sell or have verbally appraised</li>
              <li>• Wear comfortable shoes — the bourse floor can be large</li>
              <li>• Admission is valid for all days of the show</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Admission Table */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-display text-2xl font-bold mb-6"
            style={{ color: "var(--navy)" }}
          >
            🎟 Admission Pricing
          </h2>
          <table className="w-full text-sm rounded-lg overflow-hidden shadow">
            <thead>
              <tr style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>
                <th className="text-left px-4 py-3">Visitor Type</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Adults", price: SHOW_CONFIG.admissionAdult, note: SHOW_CONFIG.admissionAdultNote },
                { type: "Youth (under 16)", price: SHOW_CONFIG.admissionYouth, note: SHOW_CONFIG.admissionYouthNote, green: true },
                { type: "Active Military", price: SHOW_CONFIG.admissionMilitary, note: SHOW_CONFIG.admissionMilitaryNote, green: true },
                { type: "Parking", price: "Free", note: "On-site parking", green: true },
              ].map((row, i) => (
                <tr
                  key={row.type}
                  style={{ backgroundColor: i % 2 === 0 ? "white" : "var(--cream)" }}
                >
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--navy)" }}>{row.type}</td>
                  <td
                    className="px-4 py-3 font-bold"
                    style={{ color: row.green ? "green" : "var(--navy)" }}
                  >
                    {row.price}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#666" }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Link */}
      <section className="py-10 px-4 bg-white text-center">
        <p className="text-base mb-4" style={{ color: "#555" }}>
          Have more questions?
        </p>
        <Link href="/visitors/faq" className="btn-gold">
          Read the Visitor FAQ →
        </Link>
      </section>
    </>
  );
}
