"use client";
import { useState } from "react";

interface Props {
  showName: string;
  firstShowDate: string;
  contactEmail: string;
  contactPhone: string;
}

export default function DealerApplyForm({ showName, firstShowDate, contactEmail, contactPhone }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    sellerPermit: "",
    address: "",
    specialties: [] as string[],
    tablePreference: "",
    showDate: "",
    returning: "",
    notes: "",
    agree: false,
  });

  const specialtyOptions = [
    "US Coins", "World Coins", "Ancient Coins", "Currency / Paper Money",
    "Gold & Silver Bullion", "Tokens & Medals", "Stamps", "Supplies & Accessories", "Other",
  ];

  function toggleSpecialty(s: string) {
    setForm((f) => ({
      ...f,
      specialties: f.specialties.includes(s)
        ? f.specialties.filter((x) => x !== s)
        : [...f.specialties, s],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, specialties: form.specialties.join(", ") }),
    });
    if (res.ok) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-md text-center p-10 bg-white rounded-xl shadow-lg">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>
            Application Received!
          </h2>
          <p className="text-sm" style={{ color: "#555" }}>
            Thank you for applying to exhibit at the {showName}. We&rsquo;ll review your application and be in touch within 5 business days to confirm your space.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 px-4 text-center" style={{ backgroundColor: "var(--navy)" }}>
        <h1 className="font-display text-4xl font-bold mb-3" style={{ color: "var(--cream)" }}>
          Apply for a Booth
        </h1>
        <div className="gold-divider mb-4" />
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--cream)", opacity: 0.85 }}>
          Applications are reviewed on a first-come, first-served basis.
        </p>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5 text-sm">
            {/* Business Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                ["businessName", "Business / Trade Name *", "text", true],
                ["contactName", "Contact Name *", "text", true],
                ["email", "Email Address *", "email", true],
                ["phone", "Phone Number *", "tel", true],
                ["website", "Website (optional)", "text", false],
                ["sellerPermit", "CA Seller's Permit # (optional)", "text", false],
                ["address", "Business Address *", "text", true],
              ] as [string, string, string, boolean][]).map(([field, label, type, required]) => (
                <div key={field} className={field === "address" || field === "sellerPermit" ? "sm:col-span-2" : ""}>
                  <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>{label}</label>
                  <input
                    type={type}
                    required={required}
                    value={(form as unknown as Record<string, string>)[field] ?? ""}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none"
                    style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                  />
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div>
              <label className="block font-medium mb-2" style={{ color: "var(--navy)" }}>
                What do you specialize in? (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {specialtyOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSpecialty(s)}
                    className="px-3 py-1.5 rounded text-xs font-medium border transition-colors"
                    style={{
                      backgroundColor: form.specialties.includes(s) ? "var(--gold)" : "white",
                      color: form.specialties.includes(s) ? "var(--navy)" : "#555",
                      borderColor: form.specialties.includes(s) ? "var(--gold)" : "var(--silver)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Table & Show */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>Table Preference</label>
                <select
                  value={form.tablePreference}
                  onChange={(e) => setForm({ ...form, tablePreference: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                >
                  <option value="">No preference</option>
                  <option value="standard">Standard (8 ft table)</option>
                  <option value="double">Double / Corner</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>Show Date Interested In</label>
                <input
                  type="text"
                  placeholder={firstShowDate || "Upcoming show"}
                  value={form.showDate}
                  onChange={(e) => setForm({ ...form, showDate: e.target.value })}
                  className="w-full border rounded px-3 py-2 text-sm"
                  style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                />
              </div>
            </div>

            {/* Returning dealer */}
            <div>
              <label className="block font-medium mb-2" style={{ color: "var(--navy)" }}>Have you exhibited here before?</label>
              <div className="flex gap-4">
                {["Yes", "No"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "#555" }}>
                    <input
                      type="radio"
                      name="returning"
                      value={opt}
                      checked={form.returning === opt}
                      onChange={(e) => setForm({ ...form, returning: e.target.value })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-medium mb-1" style={{ color: "var(--navy)" }}>Additional Notes (optional)</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border rounded px-3 py-2 text-sm"
                style={{ borderColor: "var(--silver)", color: "var(--navy)" }}
                placeholder="Special requests, setup needs, questions..."
              />
            </div>

            {/* Agreement */}
            <label className="flex items-start gap-3 cursor-pointer text-sm" style={{ color: "#555" }}>
              <input
                type="checkbox"
                required
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="mt-0.5"
              />
              I agree to abide by the show rules and understand that table assignments are confirmed upon payment.
            </label>

            <button type="submit" className="btn-gold w-full text-center">
              Submit Application
            </button>
          </form>

          <p className="text-xs mt-4 text-center" style={{ color: "#999" }}>
            Questions? Email{" "}
            <a href={`mailto:${contactEmail}`} style={{ color: "var(--gold-dark)" }}>
              {contactEmail}
            </a>{" "}
            or call {contactPhone}.
          </p>
        </div>
      </section>
    </>
  );
}
