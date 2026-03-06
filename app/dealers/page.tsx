import type { Metadata } from "next";
import Link from "next/link";
import { getPublicConfig } from "@/lib/getPublicConfig";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Dealer Information",
  description: "Exhibit at the Santa Clara Coin Show. Booth rates, setup info, amenities, and how to apply. Serving 5,000–8,000 collectors per show since 1978.",
};

export default async function DealersPage() {
  const SHOW_CONFIG = await getPublicConfig();
  const yearsRunning = new Date().getFullYear() - SHOW_CONFIG.yearEstablished;

  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Exhibit at the Show
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          Join {SHOW_CONFIG.dealerCount} dealers reaching {SHOW_CONFIG.attendeesPerShow} collectors per show.
        </p>
      </section>

      {/* Stats Bar */}
      <section style={{ backgroundColor: "var(--slate)" }} className="py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: `${yearsRunning}+`, label: "Years Running" },
            { stat: SHOW_CONFIG.dealerCount, label: "Dealers Per Show" },
            { stat: SHOW_CONFIG.attendeesPerShow, label: "Attendees" },
            { stat: "Free", label: "Parking for All" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold font-display" style={{ color: "var(--gold)" }}>{stat}</div>
              <div className="text-sm mt-1" style={{ color: "var(--cream)", opacity: 0.8 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Booth Info */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            Booth Information
          </h2>
          <div
            className="rounded-lg overflow-hidden shadow text-sm"
            style={{ border: "1px solid var(--silver)" }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>
                  <th className="text-left px-4 py-3">Table Type</th>
                  <th className="text-left px-4 py-3">Size</th>
                  <th className="text-left px-4 py-3">Price</th>
                  <th className="text-left px-4 py-3">Includes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Standard Table", size: "8 ft table", price: "Contact for pricing", includes: "2 chairs, name badge, listing in show program" },
                  { type: "Double / Corner", size: "16 ft / corner", price: "Contact for pricing", includes: "4 chairs, name badges, premium listing" },
                ].map((row, i) => (
                  <tr key={row.type} style={{ backgroundColor: i % 2 === 0 ? "white" : "var(--cream)" }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--navy)" }}>{row.type}</td>
                    <td className="px-4 py-3" style={{ color: "#555" }}>{row.size}</td>
                    <td className="px-4 py-3 font-bold" style={{ color: "var(--gold-dark)" }}>{row.price}</td>
                    <td className="px-4 py-3" style={{ color: "#555" }}>{row.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: "#888" }}>
            Table availability is first-come, first-served. Contact us for current pricing and availability.
          </p>
        </div>
      </section>

      {/* Setup Schedule */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            Setup & Schedule
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            {[
              { icon: "🔧", label: "Dealer Setup", value: "Morning before show opens — contact us for exact time window" },
              { icon: "🕐", label: "Show Hours", value: SHOW_CONFIG.schedule.map((s) => `${s.day}: ${s.hours}`).join(" | ") },
              { icon: "📦", label: "Load-In", value: "Vehicle access available during setup window — details provided upon confirmation" },
              { icon: "🔒", label: "Security", value: "Show floor monitored during all open hours" },
              { icon: "🚗", label: "Parking", value: "Free on-site parking available for dealers and visitors" },
              { icon: "📛", label: "Badges", value: "Dealer badges provided — included with table booking" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex gap-3 bg-white rounded-lg p-4 shadow-sm">
                <span className="text-xl">{icon}</span>
                <div>
                  <div className="font-semibold" style={{ color: "var(--navy)" }}>{label}</div>
                  <div className="mt-0.5" style={{ color: "#666" }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="py-12 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>
            Ready to Exhibit?
          </h2>
          <p className="text-sm mb-6" style={{ color: "#555" }}>
            Submit an application below. We&rsquo;ll confirm availability and contact you within 5 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dealers/apply" className="btn-gold">
              Apply for a Booth
            </Link>
            <Link href="/dealers/directory" className="btn-outline" style={{ color: "var(--navy)", borderColor: "var(--navy)" }}>
              View Dealer Directory
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
