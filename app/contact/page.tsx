"use client";
import { useState } from "react";
import Link from "next/link";
import { SHOW_CONFIG } from "@/data/config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("https://formspree.io/f/FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...form, _subject: `Contact: ${form.subject}` }),
    });
    if (res.ok) setSubmitted(true);
  }

  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Contact Us
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          Questions, dealer inquiries, or YN program interest — we&rsquo;d love to hear from you.
        </p>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: "var(--navy)" }}>
              Get in Touch
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-semibold mb-1" style={{ color: "var(--navy)" }}>📧 Email</div>
                <a href={`mailto:${SHOW_CONFIG.contactEmail}`} style={{ color: "var(--gold-dark)" }}>
                  {SHOW_CONFIG.contactEmail}
                </a>
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: "var(--navy)" }}>📞 Phone</div>
                <a href={`tel:${SHOW_CONFIG.contactPhone.replace(/[^+\d]/g, "")}`} style={{ color: "var(--gold-dark)" }}>
                  {SHOW_CONFIG.contactPhone}
                </a>
              </div>
              <div>
                <div className="font-semibold mb-1" style={{ color: "var(--navy)" }}>📍 Show Venue</div>
                <p style={{ color: "#555" }}>
                  {SHOW_CONFIG.venueName}<br />
                  {SHOW_CONFIG.venueFullAddress}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-sm">
              <h3 className="font-display font-bold text-base" style={{ color: "var(--navy)" }}>Quick Links</h3>
              {[
                { label: "Dealer Application", href: "/dealers/apply" },
                { label: "Youth & YN Program", href: "/visitors/youth" },
                { label: "Visitor FAQ", href: "/visitors/faq" },
                { label: "Dealer FAQ", href: "/dealers/faq" },
              ].map(({ label, href }) => (
                <div key={href}>
                  <Link href={href} style={{ color: "var(--gold-dark)" }}>
                    {label} →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-xl font-bold mb-6" style={{ color: "var(--navy)" }}>
              Send a Message
            </h2>
            {submitted ? (
              <div
                className="rounded-lg p-6 text-center"
                style={{ backgroundColor: "var(--cream)", border: "2px solid var(--gold)" }}
              >
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold mb-2" style={{ color: "var(--navy)" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: "#666" }}>Thank you — we&rsquo;ll reply as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {([
                  ["name", "Your Name *", "text", true],
                  ["email", "Email Address *", "email", true],
                ] as [string, string, string, boolean][]).map(([field, label, type, required]) => (
                  <div key={field}>
                    <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>{label}</label>
                    <input
                      type={type}
                      required={required}
                      value={(form as Record<string, string>)[field] ?? ""}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full border rounded px-3 py-2"
                      style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                  >
                    <option value="">Select a topic...</option>
                    <option>General Inquiry</option>
                    <option>Dealer / Booth Question</option>
                    <option>Youth & YN Program</option>
                    <option>Raffle & Prizes</option>
                    <option>Media Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                  />
                </div>
                <button type="submit" className="btn-gold w-full text-center">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
