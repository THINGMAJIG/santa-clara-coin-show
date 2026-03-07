import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import { getPublicConfig } from "@/lib/getPublicConfig";
import { getDealers } from "@/lib/sheets";
import { DEALERS } from "@/data/dealers";

export const revalidate = 30;

const LOGO_EXISTS = true;

export default async function TestBentoPage() {
  const SHOW_CONFIG = await getPublicConfig();

  // Dealer preview — first 5, with static fallback
  let previewDealers: { name: string }[] = [];
  let hasMoreDealers = false;
  try {
    const allDealers = process.env.GOOGLE_SHEETS_ID
      ? await getDealers()
      : DEALERS;
    previewDealers = allDealers.slice(0, 5);
    hasMoreDealers = allDealers.length > 5;
  } catch {
    previewDealers = DEALERS.slice(0, 5);
    hasMoreDealers = DEALERS.length > 5;
  }

  return (
    <>
      {/* ── COUNTDOWN STRIP ────────────────────────────────────── */}
      <div
        className="w-full text-center py-2 px-4 text-sm font-medium"
        style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
      >
        📅 Next Show: {SHOW_CONFIG.schedule[0]?.date}&nbsp;&nbsp;|&nbsp;&nbsp;
        <CountdownTimer variant="compact" /> until showtime
      </div>

      {/* ── COMPACT HERO (~42vh) ────────────────────────────────── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "42vh",
          background: "linear-gradient(135deg, #0d1b2a 0%, #1b3a5c 60%, #0d1b2a 100%)",
        }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* LEFT — Branding + single-line date/venue + CTAs */}
          <div className="text-center md:text-left">
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
              style={{ color: "var(--cream)" }}
            >
              {SHOW_CONFIG.showName}
            </h1>
            <div className="gold-divider mb-5 md:mx-0" />
            <p
              className="text-base sm:text-lg mb-4 font-medium"
              style={{ color: "var(--cream)", opacity: 0.85 }}
            >
              {SHOW_CONFIG.tagline}
            </p>

            {/* Single-line date + venue summary */}
            <p className="text-sm sm:text-base mb-6" style={{ color: "var(--cream)", opacity: 0.8 }}>
              📅{" "}
              {SHOW_CONFIG.schedule[0]?.date}
              {SHOW_CONFIG.schedule.length > 1 && ` – ${SHOW_CONFIG.schedule[SHOW_CONFIG.schedule.length - 1]?.date}`}
              &nbsp;&nbsp;·&nbsp;&nbsp;📍{" "}
              <a
                href={SHOW_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
                style={{ color: "var(--cream)" }}
              >
                {SHOW_CONFIG.venueName}
              </a>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/visitors" className="btn-gold text-base">
                Plan Your Visit
              </Link>
              <Link href="/events" className="btn-outline text-base">
                Full Schedule
              </Link>
            </div>
          </div>

          {/* RIGHT — Logo (hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center">
            {LOGO_EXISTS ? (
              <Image
                src="/logo.jpg"
                alt="Santa Clara Coin Show eagle logo"
                width={280}
                height={280}
                className="object-contain drop-shadow-2xl"
              />
            ) : (
              <div
                className="rounded-2xl flex items-center justify-center text-8xl"
                style={{
                  width: 260,
                  height: 260,
                  backgroundColor: "rgba(201,168,76,0.1)",
                  border: "2px dashed var(--gold)",
                }}
              >
                🦅
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BENTO GRID ──────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-display text-2xl font-bold text-center mb-2"
            style={{ color: "var(--navy)" }}
          >
            Everything You Need to Know
          </h2>
          <div className="gold-divider mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

            {/* ── ROW 1 ─────────────────────────────────────────── */}

            {/* TILE 1: Dates & Hours — 2 wide, navy bg */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[180px] md:col-span-2"
              style={{ backgroundColor: "var(--navy)", borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--gold)" }}>
                📅 Dates &amp; Hours
              </h3>
              <div className="space-y-2 flex-1" style={{ color: "var(--cream)" }}>
                {SHOW_CONFIG.schedule.map((s) => (
                  <div key={s.day} className="text-base">
                    <strong style={{ color: "var(--gold)" }}>{s.day}, {s.date}</strong>
                    <br />
                    <span style={{ opacity: 0.85 }}>{s.hours}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/events"
                className="mt-4 text-base font-semibold underline underline-offset-2 self-start"
                style={{ color: "var(--gold)" }}
              >
                Full Schedule &amp; Events →
              </Link>
            </div>

            {/* TILE 2: Admission — 1 col, white */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[180px] bg-white"
              style={{ borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                🎟 Admission
              </h3>
              <div className="text-base space-y-1.5 flex-1" style={{ color: "#444" }}>
                <div>
                  Adults:{" "}
                  <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.admissionAdult}</strong>
                </div>
                <div>
                  Youth &lt;16:{" "}
                  <strong style={{ color: "#2a7a2a" }}>FREE</strong>
                </div>
                <div>
                  Military:{" "}
                  <strong style={{ color: "#2a7a2a" }}>FREE</strong>
                </div>
                <div>
                  Parking:{" "}
                  <strong style={{ color: "#2a7a2a" }}>Free</strong>
                </div>
              </div>
              <Link
                href="/visitors"
                className="mt-4 text-base font-semibold underline underline-offset-2 self-start"
                style={{ color: "var(--gold-dark)" }}
              >
                Visitor Info →
              </Link>
            </div>

            {/* TILE 3: Location — 1 col, cream bg */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[180px]"
              style={{ backgroundColor: "var(--cream)", borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                📍 Location
              </h3>
              <div className="text-base flex-1" style={{ color: "#444" }}>
                <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.venueName}</strong>
                <br />
                {SHOW_CONFIG.venueAddress}
                <br />
                {SHOW_CONFIG.venueCity}
              </div>
              <a
                href={SHOW_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-base font-semibold underline underline-offset-2 self-start"
                style={{ color: "var(--gold-dark)" }}
              >
                Get Directions →
              </a>
            </div>

            {/* ── ROW 2 ─────────────────────────────────────────── */}

            {/* TILE 4: Raffle — 1 col, slate bg */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[180px]"
              style={{ backgroundColor: "var(--slate)", borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--gold)" }}>
                🎁 Daily Raffle
              </h3>
              <div className="text-base space-y-1.5 flex-1" style={{ color: "var(--cream)" }}>
                <div style={{ opacity: 0.9 }}>
                  <strong style={{ color: "var(--gold)" }}>{SHOW_CONFIG.raffleTicketPrice}</strong>
                </div>
                <div style={{ opacity: 0.85 }}>
                  {SHOW_CONFIG.raffleDrawingTimes.join(" · ")}
                </div>
                <div className="text-sm" style={{ opacity: 0.7 }}>
                  Must be present to win
                </div>
              </div>
              <Link
                href="/events/raffle"
                className="mt-4 text-base font-semibold underline underline-offset-2 self-start"
                style={{ color: "var(--gold)" }}
              >
                Raffle Details →
              </Link>
            </div>

            {/* TILE 5: Dealers — 2 wide, slate bg */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[180px] md:col-span-2"
              style={{ backgroundColor: "var(--slate)", borderTop: "4px solid var(--gold)" }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-xl font-bold" style={{ color: "var(--gold)" }}>
                  🏪 Confirmed Dealers
                </h3>
                <Link
                  href="/dealers/directory"
                  className="text-sm font-semibold underline underline-offset-2"
                  style={{ color: "var(--gold)" }}
                >
                  View All {SHOW_CONFIG.dealerCount} →
                </Link>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-1">
                {previewDealers.map((d) => (
                  <span
                    key={d.name}
                    className="px-2.5 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "var(--cream)", border: "1px solid rgba(201,168,76,0.3)" }}
                  >
                    {d.name}
                  </span>
                ))}
                {hasMoreDealers && (
                  <span
                    className="px-2.5 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "var(--cream)", opacity: 0.7 }}
                  >
                    + more confirmed
                  </span>
                )}
              </div>
              <Link
                href="/dealers/directory"
                className="mt-4 btn-gold self-start text-sm"
              >
                Full Dealer Directory →
              </Link>
            </div>

            {/* TILE 6: Youth & YN — 1 col, warm gold tint */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[180px]"
              style={{ backgroundColor: "rgba(201,168,76,0.1)", borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                🎓 Youth &amp; YN
              </h3>
              <div className="text-base space-y-1.5 flex-1" style={{ color: "#333" }}>
                <div>
                  Under 16:{" "}
                  <strong style={{ color: "#2a7a2a" }}>FREE</strong>
                </div>
                <div>Welcome bags &amp; coin giveaways</div>
                <div>YN program launching now</div>
              </div>
              <Link
                href="/visitors/youth"
                className="mt-4 text-base font-semibold underline underline-offset-2 self-start"
                style={{ color: "var(--gold-dark)" }}
              >
                YN Program →
              </Link>
            </div>

            {/* ── ROW 3 ─────────────────────────────────────────── */}

            {/* TILE 7: Contact — 2 wide, white */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[160px] md:col-span-2 bg-white"
              style={{ borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                📞 Contact Us
              </h3>
              <div className="text-base space-y-2 flex-1" style={{ color: "#444" }}>
                <div>
                  <a
                    href={`tel:${SHOW_CONFIG.contactPhone.replace(/[^+\d]/g, "")}`}
                    className="font-semibold"
                    style={{ color: "var(--navy)" }}
                  >
                    {SHOW_CONFIG.contactPhone}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${SHOW_CONFIG.contactEmail}`}
                    className="underline underline-offset-2"
                    style={{ color: "var(--gold-dark)" }}
                  >
                    {SHOW_CONFIG.contactEmail}
                  </a>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-4 text-base font-semibold underline underline-offset-2 self-start"
                style={{ color: "var(--gold-dark)" }}
              >
                Send Us a Message →
              </Link>
            </div>

            {/* TILE 8: Apply for a Booth — 2 wide, navy */}
            <div
              className="card-hover rounded-xl p-6 flex flex-col min-h-[160px] md:col-span-2"
              style={{ backgroundColor: "var(--navy)", borderTop: "4px solid var(--gold)" }}
            >
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--gold)" }}>
                🏪 Exhibit at the Show
              </h3>
              <p className="text-base flex-1" style={{ color: "var(--cream)", opacity: 0.85 }}>
                Join {SHOW_CONFIG.dealerCount} dealers reaching {SHOW_CONFIG.attendeesPerShow} collectors.
                Prime Silicon Valley location, free parking.
              </p>
              <div className="mt-4 flex gap-3 flex-wrap">
                <Link href="/dealers/apply" className="btn-gold text-sm">
                  Apply for a Booth →
                </Link>
                <Link
                  href="/dealers"
                  className="btn-outline text-sm"
                  style={{ color: "var(--cream)" }}
                >
                  Dealer Info
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SCHEMA.ORG EVENT STRUCTURED DATA ──────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: SHOW_CONFIG.showName,
            startDate: SHOW_CONFIG.startDate,
            endDate: SHOW_CONFIG.endDate,
            location: {
              "@type": "Place",
              name: SHOW_CONFIG.venueName,
              address: {
                "@type": "PostalAddress",
                streetAddress: SHOW_CONFIG.venueAddress,
                addressLocality: "Santa Clara",
                addressRegion: "CA",
                postalCode: "95054",
                addressCountry: "US",
              },
            },
            offers: {
              "@type": "Offer",
              price: "6.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            organizer: {
              "@type": "Organization",
              name: SHOW_CONFIG.showName,
            },
            description:
              "Northern California's premier coin show featuring dealers of coins, currency, bullion, tokens, and collectibles.",
          }),
        }}
      />
    </>
  );
}
