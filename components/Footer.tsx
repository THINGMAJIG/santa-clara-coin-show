import Link from "next/link";
import { SHOW_CONFIG } from "@/data/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: "var(--navy-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 — Brand */}
          <div>
            <span
              className="font-display font-bold text-xl"
              style={{ color: "var(--gold)" }}
            >
              ⚜ {SHOW_CONFIG.showName}
            </span>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--cream)", opacity: 0.8 }}>
              Northern California&rsquo;s premier numismatic event.
              Running since {SHOW_CONFIG.yearEstablished}.
            </p>
            <p className="mt-3 text-sm" style={{ color: "var(--cream)", opacity: 0.7 }}>
              <a
                href={`mailto:${SHOW_CONFIG.contactEmail}`}
                style={{ color: "var(--gold)" }}
              >
                {SHOW_CONFIG.contactEmail}
              </a>
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--cream)", opacity: 0.7 }}>
              {SHOW_CONFIG.contactPhone}
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h3
              className="font-display font-bold text-lg mb-4"
              style={{ color: "var(--gold)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--cream)", opacity: 0.85 }}>
              {[
                { label: "Plan Your Visit", href: "/visitors" },
                { label: "Youth & YN Program", href: "/visitors/youth" },
                { label: "Dealer Information", href: "/dealers" },
                { label: "Apply for a Booth", href: "/dealers/apply" },
                { label: "Events & Schedule", href: "/events" },
                { label: "Raffle & Prizes", href: "/events/raffle" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:opacity-100"
                    style={{ color: "var(--cream)", opacity: 0.8 }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Venue */}
          <div>
            <h3
              className="font-display font-bold text-lg mb-4"
              style={{ color: "var(--gold)" }}
            >
              Venue
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--cream)", opacity: 0.85 }}>
              {SHOW_CONFIG.venueName}
              <br />
              {SHOW_CONFIG.venueAddress}
              <br />
              {SHOW_CONFIG.venueCity}
            </p>
            <p className="mt-3 text-sm" style={{ color: "var(--cream)", opacity: 0.7 }}>
              <strong style={{ color: "var(--gold)" }}>Next Show:</strong>{" "}
              {SHOW_CONFIG.schedule[0]?.date}
            </p>
            <p className="text-sm" style={{ color: "var(--cream)", opacity: 0.7 }}>
              <strong style={{ color: "var(--gold)" }}>Admission:</strong>{" "}
              {SHOW_CONFIG.admissionAdult} · Free Parking
            </p>
            <a
              href={SHOW_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-medium"
              style={{ color: "var(--gold)" }}
            >
              Get Directions →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t text-center py-4 text-xs"
        style={{
          borderColor: "rgba(201,168,76,0.2)",
          color: "var(--cream)",
          opacity: 0.5,
        }}
      >
        © {year} {SHOW_CONFIG.showName}. Serving the numismatic community since{" "}
        {SHOW_CONFIG.yearEstablished}.
      </div>
    </footer>
  );
}
