import type { Metadata } from "next";
import Link from "next/link";
import { SHOW_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: "Youth & Young Numismatist Program",
  description:
    "Free admission for youth under 16. The Santa Clara Coin Show is launching a Young Numismatist (YN) program — activities, coin giveaways, mentorship, and more.",
};

export default function YouthPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <div className="text-5xl mb-4">🎓</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Young Numismatists Welcome!
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          The next generation of coin collecting starts here. Free admission. Real coins. Lasting passion.
        </p>
      </section>

      {/* FREE Admission Callout */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-xl mx-auto">
          <div
            className="rounded-xl p-8 text-center shadow-lg"
            style={{ backgroundColor: "var(--cream)", border: "3px solid var(--gold)" }}
          >
            <div className="text-5xl mb-3">🪙</div>
            <div className="font-display text-6xl font-bold mb-2" style={{ color: "var(--gold-dark)" }}>
              FREE
            </div>
            <div className="text-xl font-bold mb-2" style={{ color: "var(--navy)" }}>
              Youth Admission
            </div>
            <p className="text-sm" style={{ color: "#666" }}>
              {SHOW_CONFIG.admissionYouthNote}
            </p>
          </div>
        </div>
      </section>

      {/* Why Bring Kids */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            Why Bring Young Collectors?
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
            Coin collecting is one of the most educational hobbies a young person can develop. Through numismatics, children discover:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "📚", label: "History", desc: "Every coin is a window into a moment in history" },
              { icon: "🌍", label: "Geography", desc: "World coins introduce countries, cultures, and languages" },
              { icon: "🔢", label: "Math & Finance", desc: "Values, grades, and prices build real financial literacy" },
              { icon: "🔍", label: "Research Skills", desc: "Learning to authenticate and identify coins builds critical thinking" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex gap-3 bg-white rounded-lg p-4 shadow-sm">
                <span className="text-2xl">{icon}</span>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--navy)" }}>{label}</div>
                  <div className="text-xs mt-1" style={{ color: "#666" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YN Program — Coming Soon */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-xl p-8"
            style={{ backgroundColor: "var(--navy)", border: "2px solid var(--gold)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
              >
                🚀 Launching Now
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold mb-4" style={{ color: "var(--gold)" }}>
              Young Numismatist (YN) Program
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--cream)", opacity: 0.9 }}>
              We&rsquo;re building something special for young collectors at the Santa Clara Coin Show. Our YN program is launching now — here&rsquo;s what we&rsquo;re planning:
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Free coin drawings for youth attendees",
                "Educational activities where young collectors earn real coins",
                "Welcome bags with coin folders, books, sample coins, and tokens",
                "YN auction runner opportunities to earn &ldquo;YN dollars&rdquo;",
                "Dedicated YN sales table for young collectors to showcase",
                "Mentorship from experienced dealers on the bourse floor",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--cream)" }}>
                  <span style={{ color: "var(--gold)" }}>✓</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <div
              className="rounded-lg p-5 text-sm"
              style={{ backgroundColor: "rgba(201,168,76,0.1)", border: "1px solid var(--gold)" }}
            >
              <strong style={{ color: "var(--gold)" }}>Want to help run the YN program?</strong>
              <p className="mt-2" style={{ color: "var(--cream)", opacity: 0.85 }}>
                We&rsquo;re looking for volunteer coordinators, dealers willing to mentor young collectors, and parents who&rsquo;d like to get involved.
              </p>
              <Link href="/contact" className="inline-block mt-3 btn-gold text-sm">
                Get Involved →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            First Time at a Coin Show? Here&rsquo;s What to Do
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Arrive & Get Your Badge", desc: "Pay adult admission ($6) at the door. Youth under 16 are FREE." },
              { step: "2", title: "Pick Up a Show Program", desc: "Get the dealer directory at the entrance — it shows all dealers and their table numbers." },
              { step: "3", title: "Find the YN Table", desc: "Look for the dedicated Youth Numismatist area. Pick up your welcome bag and meet the YN coordinator." },
              { step: "4", title: "Walk the Floor", desc: "Explore at your own pace. Dealers are friendly and love talking about their coins — don&rsquo;t be shy!" },
              { step: "5", title: "Ask Questions", desc: "Dealers are the experts. Ask about history, grading, value — you&rsquo;ll learn something at every table." },
              { step: "6", title: "Enter the Raffle", desc: "Raffle tickets are sold at the door. Drawings happen throughout the day!" },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-white rounded-lg p-4 shadow-sm">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-display text-lg flex-shrink-0"
                  style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
                >
                  {step}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "var(--navy)" }}>{title}</div>
                  <div
                    className="text-sm"
                    style={{ color: "#666" }}
                    dangerouslySetInnerHTML={{ __html: desc }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANA YN Resources */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--navy)" }}>
            ANA Young Numismatist Resources
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#555" }}>
            The American Numismatic Association (ANA) offers an outstanding national Young Numismatist program with free educational resources, scholarships, and events nationwide.
          </p>
          <a
            href="https://www.money.org/young-numismatists"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm"
          >
            Visit ANA Young Numismatists →
          </a>
        </div>
      </section>

      {/* Parent FAQ */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: "var(--navy)" }}>
            Parent FAQ
          </h2>
          <div className="space-y-0 divide-y" style={{ borderColor: "var(--silver)" }}>
            {[
              {
                q: "What age is appropriate for a first coin show?",
                a: "Any age with parental supervision! Younger children enjoy looking at shiny coins and getting their welcome bag. Older kids (8+) really engage with dealers and start asking great questions.",
              },
              {
                q: "My child just started collecting — will they be overwhelmed?",
                a: "Not at all. Dealers at coin shows love introducing new collectors. Start at the YN table and work outward at your own pace. There&rsquo;s no pressure to buy anything.",
              },
              {
                q: "Is the show safe and appropriate for families?",
                a: "Yes. The Santa Clara Coin Show is a well-organized event at a convention venue with a family-friendly atmosphere. There is security on site.",
              },
              {
                q: "Should my child bring money?",
                a: "Optional. Dealers often have inexpensive coins ($1-5) perfect for beginning collections. A small allowance makes the experience more exciting, but it&rsquo;s not required.",
              },
            ].map(({ q, a }) => (
              <details key={q}>
                <summary>{q}</summary>
                <div className="faq-answer" dangerouslySetInnerHTML={{ __html: a }} />
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
