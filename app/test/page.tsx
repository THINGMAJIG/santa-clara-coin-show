import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import { getPublicConfig } from "@/lib/getPublicConfig";
import { getDealers } from "@/lib/sheets";
import { DEALERS } from "@/data/dealers";

export const revalidate = 30;

const LOGO_EXISTS = true;

export default async function TestHomePage() {
  const SHOW_CONFIG = await getPublicConfig();
  const yearsRunning = new Date().getFullYear() - SHOW_CONFIG.yearEstablished;

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

          {/* RIGHT — Logo (hidden on mobile to keep hero compact) */}
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

      {/* ── QUICK FACTS BAR (stats are now links) ───────────────── */}
      <section style={{ backgroundColor: "var(--slate)" }} className="py-7">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "📅", stat: `Since ${SHOW_CONFIG.yearEstablished}`, label: `${yearsRunning > 0 ? yearsRunning + "+ Years" : "Inaugural Show"}`, href: "/events" },
            { icon: "👥", stat: SHOW_CONFIG.attendeesPerShow, label: "Attendees Per Show", href: "/visitors" },
            { icon: "🪙", stat: SHOW_CONFIG.dealerCount, label: "Dealers", href: "/dealers/directory" },
            { icon: "🎟", stat: SHOW_CONFIG.admissionAdult, label: "Admission · Free Parking", href: "/visitors" },
          ].map(({ icon, stat, label, href }) => (
            <Link key={label} href={href} className="block hover:opacity-80 transition-opacity">
              <div className="text-xl mb-0.5">{icon}</div>
              <div className="text-xl font-bold font-display" style={{ color: "var(--gold)" }}>{stat}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--cream)", opacity: 0.8 }}>{label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INFORMATION GRID (6 cards) ──────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-display text-2xl font-bold text-center mb-2"
            style={{ color: "var(--navy)" }}
          >
            Everything You Need to Know
          </h2>
          <div className="gold-divider mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Card 1: Dates & Hours */}
            <div className="card-hover card-gold-top rounded-lg shadow p-6 bg-white flex flex-col">
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                📅 Dates &amp; Hours
              </h3>
              <div className="text-base space-y-2 mb-5 flex-1" style={{ color: "#444" }}>
                {SHOW_CONFIG.schedule.map((s) => (
                  <div key={s.day}>
                    <strong style={{ color: "var(--navy)" }}>{s.day}, {s.date}</strong>
                    <br />
                    <span className="text-sm">{s.hours}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/events"
                className="text-base font-semibold underline underline-offset-2"
                style={{ color: "var(--gold-dark)" }}
              >
                Full Schedule &amp; Events →
              </Link>
            </div>

            {/* Card 2: Admission & Parking */}
            <div className="card-hover card-gold-top rounded-lg shadow p-6 bg-white flex flex-col">
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                🎟 Admission &amp; Parking
              </h3>
              <div className="text-base space-y-2 mb-5 flex-1" style={{ color: "#444" }}>
                <div>
                  Adults:{" "}
                  <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.admissionAdult}</strong>
                  <span className="text-sm ml-1" style={{ color: "#777" }}>valid all days</span>
                </div>
                <div>
                  Youth under 16:{" "}
                  <strong style={{ color: "#2a7a2a" }}>FREE</strong>
                </div>
                <div>
                  Active Military:{" "}
                  <strong style={{ color: "#2a7a2a" }}>FREE</strong>
                  <span className="text-sm ml-1" style={{ color: "#777" }}>with valid ID</span>
                </div>
                <div>
                  Parking:{" "}
                  <strong style={{ color: "#2a7a2a" }}>Free on-site</strong>
                </div>
                {SHOW_CONFIG.admissionEarlyBird && (
                  <div>
                    Early Bird:{" "}
                    <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.admissionEarlyBird}</strong>
                    {SHOW_CONFIG.admissionEarlyBirdNote && (
                      <span className="text-sm ml-1" style={{ color: "#777" }}>{SHOW_CONFIG.admissionEarlyBirdNote}</span>
                    )}
                  </div>
                )}
              </div>
              <Link
                href="/visitors"
                className="text-base font-semibold underline underline-offset-2"
                style={{ color: "var(--gold-dark)" }}
              >
                Visitor Information →
              </Link>
            </div>

            {/* Card 3: Location */}
            <div className="card-hover card-gold-top rounded-lg shadow p-6 bg-white flex flex-col">
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                📍 Location
              </h3>
              <div className="text-base mb-5 flex-1" style={{ color: "#444" }}>
                <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.venueName}</strong>
                <br />
                {SHOW_CONFIG.venueAddress}
                <br />
                {SHOW_CONFIG.venueCity}
                <br />
                <a
                  href={SHOW_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 font-semibold underline underline-offset-2"
                  style={{ color: "var(--gold-dark)" }}
                >
                  Get Directions →
                </a>
              </div>
              <Link
                href="/visitors"
                className="text-base font-semibold underline underline-offset-2"
                style={{ color: "var(--gold-dark)" }}
              >
                Plan Your Visit →
              </Link>
            </div>

            {/* Card 4: Daily Raffle */}
            <div className="card-hover card-gold-top rounded-lg shadow p-6 bg-white flex flex-col">
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                🎁 Daily Raffle
              </h3>
              <div className="text-base space-y-2 mb-5 flex-1" style={{ color: "#444" }}>
                <div>
                  Tickets:{" "}
                  <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.raffleTicketPrice}</strong>
                  <span className="text-sm ml-1" style={{ color: "#777" }}>at the door</span>
                </div>
                <div>
                  Drawings at:{" "}
                  <strong style={{ color: "var(--navy)" }}>{SHOW_CONFIG.raffleDrawingTimes.join(", ")}</strong>
                </div>
                <div className="text-sm" style={{ color: "#777" }}>
                  Prizes include silver rounds, Morgan dollars &amp; more.
                  Must be present to win.
                </div>
              </div>
              <Link
                href="/events/raffle"
                className="text-base font-semibold underline underline-offset-2"
                style={{ color: "var(--gold-dark)" }}
              >
                Raffle Details &amp; Prizes →
              </Link>
            </div>

            {/* Card 5: Youth & YN Program */}
            <div className="card-hover card-gold-top rounded-lg shadow p-6 bg-white flex flex-col">
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                🎓 Youth &amp; YN Program
              </h3>
              <div className="text-base space-y-2 mb-5 flex-1" style={{ color: "#444" }}>
                <div>
                  Youth under 16:{" "}
                  <strong style={{ color: "#2a7a2a" }}>FREE admission</strong>
                </div>
                <div>Welcome bags, coin giveaways, and dealer mentorship</div>
                <div>Young Numismatist program — now launching</div>
              </div>
              <Link
                href="/visitors/youth"
                className="text-base font-semibold underline underline-offset-2"
                style={{ color: "var(--gold-dark)" }}
              >
                Youth &amp; YN Program →
              </Link>
            </div>

            {/* Card 6: Contact */}
            <div className="card-hover card-gold-top rounded-lg shadow p-6 bg-white flex flex-col">
              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "var(--navy)" }}>
                📞 Contact Us
              </h3>
              <div className="text-base space-y-2 mb-5 flex-1" style={{ color: "#444" }}>
                <div>
                  <span style={{ color: "#777" }}>Phone: </span>
                  <a
                    href={`tel:${SHOW_CONFIG.contactPhone.replace(/[^+\d]/g, "")}`}
                    className="font-semibold"
                    style={{ color: "var(--navy)" }}
                  >
                    {SHOW_CONFIG.contactPhone}
                  </a>
                </div>
                <div>
                  <span style={{ color: "#777" }}>Email: </span>
                  <a
                    href={`mailto:${SHOW_CONFIG.contactEmail}`}
                    className="underline underline-offset-2"
                    style={{ color: "var(--gold-dark)" }}
                  >
                    {SHOW_CONFIG.contactEmail}
                  </a>
                </div>
                <div className="text-sm" style={{ color: "#777" }}>
                  Questions about booths, the YN program, or anything else — we reply quickly.
                </div>
              </div>
              <Link
                href="/contact"
                className="text-base font-semibold underline underline-offset-2"
                style={{ color: "var(--gold-dark)" }}
              >
                Send Us a Message →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── DEALER PREVIEW STRIP ───────────────────────────────── */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display text-2xl font-bold" style={{ color: "var(--navy)" }}>
              🏪 Confirmed Dealers
            </h2>
            <Link
              href="/dealers/directory"
              className="text-base font-semibold underline underline-offset-2"
              style={{ color: "var(--gold-dark)" }}
            >
              View All {SHOW_CONFIG.dealerCount} →
            </Link>
          </div>

          {/* Dealer pill tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {previewDealers.map((d) => (
              <span
                key={d.name}
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: "var(--navy)", color: "var(--cream)" }}
              >
                {d.name}
              </span>
            ))}
            {hasMoreDealers && (
              <span
                className="px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: "rgba(201,168,76,0.2)", color: "var(--navy)" }}
              >
                + more confirmed
              </span>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link href="/dealers/directory" className="btn-gold text-sm">
              Full Dealer Directory →
            </Link>
            <Link href="/dealers/apply" className="btn-outline text-sm"
                  style={{ color: "var(--navy)", borderColor: "var(--navy)" }}>
              Apply for a Booth
            </Link>
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
