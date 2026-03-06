import type { Metadata } from "next";
import Link from "next/link";
import { DEALERS, type DealerSpecialty } from "@/data/dealers";
import { SHOW_CONFIG } from "@/data/config";
import { getDealers, type SheetDealer } from "@/lib/sheets";

// Refresh every 30 seconds so admin changes appear quickly
export const revalidate = 30;

export const metadata: Metadata = {
  title: "Dealer Directory",
  description: `Browse the ${SHOW_CONFIG.showName} dealer directory. Find dealers by name and specialty.`,
};

const specialtyColors: Record<string, string> = {
  "US Coins": "#1b3a5c",
  "World Coins": "#2d5016",
  "Ancient Coins": "#5c3a1b",
  "Currency / Paper Money": "#1b4a5c",
  "Gold & Silver Bullion": "#7a6020",
  "Tokens & Medals": "#3a1b5c",
  "Supplies & Accessories": "#555",
  "Stamps": "#1b5c3a",
  "Jewelry": "#5c1b3a",
  "Estate / General": "#444",
};

const toSheetDealer = (d: typeof DEALERS[number]): SheetDealer => ({
  name: d.name,
  specialties: d.specialties as string[],
  table: d.table ?? "",
  website: d.website ?? "",
  notes: d.notes ?? "",
});

export default async function DealerDirectoryPage() {
  // Fetch live from Sheets if configured; fall back to static data
  let rawDealers: SheetDealer[];
  try {
    rawDealers = process.env.GOOGLE_SHEETS_ID
      ? await getDealers()
      : DEALERS.map(toSheetDealer);
  } catch {
    rawDealers = DEALERS.map(toSheetDealer);
  }

  // Sort alphabetically
  const sorted = [...rawDealers].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Dealer Directory
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          {sorted.length} confirmed dealer{sorted.length !== 1 ? "s" : ""} for the upcoming show.
        </p>
      </section>

      {sorted.length === 0 ? (
        <section className="py-16 px-4 text-center bg-white">
          <p className="text-lg" style={{ color: "#888" }}>
            The dealer list for the next show will be posted closer to the show date.
          </p>
          <p className="mt-2 text-sm" style={{ color: "#aaa" }}>
            Check back soon, or <Link href="/contact" style={{ color: "var(--gold-dark)" }}>contact us</Link> for more information.
          </p>
        </section>
      ) : (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-lg overflow-hidden shadow text-sm"
              style={{ border: "1px solid var(--silver)" }}
            >
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "var(--navy)", color: "var(--gold)" }}>
                    <th className="text-left px-4 py-3 w-12">Table</th>
                    <th className="text-left px-4 py-3">Dealer</th>
                    <th className="text-left px-4 py-3">Specialties</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((dealer, i) => (
                    <tr key={dealer.name} style={{ backgroundColor: i % 2 === 0 ? "white" : "var(--cream)" }}>
                      <td className="px-4 py-3 font-bold text-center" style={{ color: "var(--gold-dark)" }}>
                        {dealer.table || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {dealer.website ? (
                          <a
                            href={dealer.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline underline-offset-2"
                            style={{ color: "var(--gold-dark)" }}
                          >
                            {dealer.name} ↗
                          </a>
                        ) : (
                          <span className="font-semibold" style={{ color: "var(--navy)" }}>{dealer.name}</span>
                        )}
                        {dealer.notes && (
                          <p className="text-xs mt-0.5" style={{ color: "#888" }}>{dealer.notes}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {dealer.specialties.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: specialtyColors[s] ?? "#555", color: "white" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: "#aaa" }}>
              Dealer list is updated as confirmations are received. Last updated for{" "}
              {SHOW_CONFIG.nextShowName}.
            </p>
          </div>
        </section>
      )}

      <section className="py-8 px-4 text-center" style={{ backgroundColor: "var(--cream)" }}>
        <p className="text-sm mb-3" style={{ color: "#666" }}>
          Are you a dealer interested in exhibiting?
        </p>
        <Link href="/dealers/apply" className="btn-gold text-sm">
          Apply for a Booth →
        </Link>
      </section>
    </>
  );
}
