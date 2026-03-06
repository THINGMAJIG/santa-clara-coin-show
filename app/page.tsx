import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import { getPublicConfig } from "@/lib/getPublicConfig";

export const revalidate = 30;

const LOGO_EXISTS = true;

export default async function Home() {
  const SHOW_CONFIG = await getPublicConfig();
  const yearsRunning = new Date().getFullYear() - SHOW_CONFIG.yearEstablished;

  return (
    <>
      {/* ── COUNTDOWN STRIP ────────────────────────────────────── */}
      {/* Slim gold bar just below the sticky navbar */}
      <div
        className="w-full text-center py-2 px-4 text-sm font-medium"
        style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
      >
        📅 Next Show: {SHOW_CONFIG.schedule[0]?.date}&nbsp;&nbsp;|&nbsp;&nbsp;
        <CountdownTimer variant="compact" /> until showtime
      </div>

      {/* ── HERO ───────────────────────────────────────────────── */}
      {/* Compact: ~70vh, two-column on desktop */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "70vh",
          background: "linear-gradient(135deg, #0d1b2a 0%, #1b3a5c 60%, #0d1b2a 100%)",
        }}
      >

        {/* Hero content — two-column on md+ */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* LEFT — Show info & CTAs */}
          <div className="text-center md:text-left">
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
              style={{ color: "var(--cream)" }}
            >
              {SHOW_CONFIG.showName}
            </h1>
            <div className="gold-divider mb-5 md:mx-0" />
            <p
              className="text-base sm:text-lg mb-6 font-medium"
              style={{ color: "var(--cream)", opacity: 0.85 }}
            >
              {SHOW_CONFIG.tagline}
            </p>

            {/* Key details */}
            <div className="space-y-2 mb-7 text-sm sm:text-base">
              {SHOW_CONFIG.schedule.map((s) => (
                <div key={s.day} className="flex items-center gap-2 justify-center md:justify-start" style={{ color: "var(--cream)" }}>
                  <span style={{ color: "var(--gold)" }}>📅</span>
                  <strong style={{ color: "var(--gold)" }}>{s.day}</strong>
                  <span style={{ opacity: 0.9 }}>{s.date} · {s.hours}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 justify-center md:justify-start" style={{ color: "var(--cream)" }}>
                <span style={{ color: "var(--gold)" }}>📍</span>
                <a
                  href={SHOW_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                  style={{ color: "var(--cream)", opacity: 0.85 }}
                >
                  {SHOW_CONFIG.venueName}, {SHOW_CONFIG.venueCity}
                </a>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start" style={{ color: "var(--cream)" }}>
                <span style={{ color: "var(--gold)" }}>🎟</span>
                <span style={{ opacity: 0.9 }}>
                  {SHOW_CONFIG.admissionAdult} Admission ·{" "}
                  <span style={{ color: "#6ee16e" }}>Youth FREE</span> ·{" "}
                  {SHOW_CONFIG.parkingNote}
                </span>
              </div>
              {SHOW_CONFIG.admissionEarlyBird && (
                <div className="flex items-center gap-2 justify-center md:justify-start" style={{ color: "var(--cream)" }}>
                  <span style={{ color: "var(--gold)" }}>⭐</span>
                  <span style={{ opacity: 0.9 }}>
                    <strong style={{ color: "var(--gold)" }}>Early Bird</strong>{" "}
                    {SHOW_CONFIG.admissionEarlyBird}
                    {SHOW_CONFIG.admissionEarlyBirdNote && ` · ${SHOW_CONFIG.admissionEarlyBirdNote}`}
                  </span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/visitors" className="btn-gold text-base">
                Plan Your Visit
              </Link>
              <Link href="/dealers/directory" className="btn-outline text-base">
                Dealer Directory
              </Link>
            </div>
          </div>

          {/* RIGHT — Eagle logo image */}
          <div className="flex items-center justify-center">
            {LOGO_EXISTS ? (
              <Image
                src="/logo.jpg"
                alt="Santa Clara Coin Show eagle logo"
                width={340}
                height={340}
                className="object-contain drop-shadow-2xl"
                style={{ maxWidth: "min(340px, 90vw)" }}
              />
            ) : (
              /* Placeholder until logo.png is saved */
              <div
                className="rounded-2xl flex items-center justify-center text-8xl"
                style={{
                  width: 280,
                  height: 280,
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

      {/* ── QUICK FACTS BAR ────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--slate)" }} className="py-7">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: "📅", stat: `Since ${SHOW_CONFIG.yearEstablished}`, label: `${yearsRunning}+ Years` },
            { icon: "👥", stat: SHOW_CONFIG.attendeesPerShow, label: "Attendees Per Show" },
            { icon: "🪙", stat: SHOW_CONFIG.dealerCount, label: "Dealers" },
            { icon: "🎟", stat: SHOW_CONFIG.admissionAdult, label: "Admission · Free Parking" },
          ].map(({ icon, stat, label }) => (
            <div key={label}>
              <div className="text-xl mb-0.5">{icon}</div>
              <div className="text-xl font-bold font-display" style={{ color: "var(--gold)" }}>{stat}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--cream)", opacity: 0.8 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DUAL PATHWAY CARDS ─────────────────────────────────── */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-display text-3xl font-bold text-center mb-3"
            style={{ color: "var(--navy)" }}
          >
            What Brings You to the Show?
          </h2>
          <div className="gold-divider mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "I'm a Visitor",
                desc: "Admission info, parking, what to bring, and how to make the most of your day browsing 65+ dealers.",
                cta: "Plan My Visit",
                href: "/visitors",
                icon: "🪙",
              },
              {
                title: "Dealer Directory",
                desc: "Browse registered dealers by specialty — coins, currency, bullion, tokens, stamps, and more.",
                cta: "View Dealer Directory",
                href: "/dealers/directory",
                icon: "🏪",
              },
            ].map((card) => (
              <div
                key={card.href}
                className="card-hover card-gold-top rounded-lg shadow p-7 flex flex-col"
                style={{ backgroundColor: "var(--navy)" }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--gold)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--cream)", opacity: 0.85 }}>
                  {card.desc}
                </p>
                <Link href={card.href} className="btn-gold self-start text-sm">
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOW HIGHLIGHTS ────────────────────────────────────── */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-3" style={{ color: "var(--navy)" }}>
            Show Highlights
          </h2>
          <div className="gold-divider mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🎁",
                title: "Daily Raffle",
                desc: `Win rare coins & collectibles. Tickets at the door — ${SHOW_CONFIG.raffleTicketPrice}.`,
                cta: "Raffle Details",
                href: "/events/raffle",
              },
              {
                icon: "🎓",
                title: "Youth & YN Program",
                desc: "FREE admission under 16. Launching a Young Numismatist program — activities, giveaways & mentorship.",
                cta: "YN Program",
                href: "/visitors/youth",
              },
              {
                icon: "🏪",
                title: `${SHOW_CONFIG.dealerCount} Dealers`,
                desc: "US coins, world coins, bullion, currency, tokens, medals, stamps & supplies all under one roof.",
                cta: "Dealer Directory",
                href: "/dealers/directory",
              },
            ].map((card) => (
              <div
                key={card.href}
                className="card-hover bg-white rounded-lg shadow p-5 flex flex-col card-gold-top"
              >
                <div className="text-2xl mb-2">{card.icon}</div>
                <h3 className="font-display text-lg font-bold mb-1" style={{ color: "var(--navy)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed mb-3 flex-1" style={{ color: "#555" }}>
                  {card.desc}
                </p>
                <Link href={card.href} className="text-sm font-semibold" style={{ color: "var(--gold-dark)" }}>
                  {card.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMBINED YN + DEALER CALLOUT ───────────────────────── */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* YN callout */}
          <div
            className="rounded-xl p-7 flex flex-col items-start"
            style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid var(--gold)" }}
          >
            <div className="text-4xl mb-3">🎓</div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--gold)" }}>
              Young Numismatists Welcome
            </h3>
            <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--cream)", opacity: 0.85 }}>
              Youth under 16 get in <strong style={{ color: "var(--gold)" }}>FREE</strong>. We&rsquo;re launching a dedicated
              YN program with coin giveaways, welcome bags, and mentorship from experienced dealers.
            </p>
            <Link href="/visitors/youth" className="btn-gold text-sm">
              Youth & YN Program →
            </Link>
          </div>

          {/* Dealer callout */}
          <div
            className="rounded-xl p-7 flex flex-col items-start"
            style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid var(--gold)" }}
          >
            <div className="text-4xl mb-3">🏪</div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: "var(--gold)" }}>
              Exhibit at the Show
            </h3>
            <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--cream)", opacity: 0.85 }}>
              Join {SHOW_CONFIG.dealerCount} dealers reaching {SHOW_CONFIG.attendeesPerShow} collectors
              per show. Prime Silicon Valley location, free parking, {yearsRunning}+ years running.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/dealers/apply" className="btn-gold text-sm">
                Apply for a Booth
              </Link>
              <Link href="/dealers" className="btn-outline text-sm">
                Dealer Info
              </Link>
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
              "Northern California's premier coin show featuring 65+ dealers of coins, currency, bullion, tokens, and collectibles.",
          }),
        }}
      />
    </>
  );
}
