"use client";
import { useEffect, useState, FormEvent } from "react";

interface ScheduleDay {
  day: string;
  date: string;
  hours: string;
}

interface ConfigState {
  showName: string;
  tagline: string;
  nextShowName: string;
  startDate: string;
  endDate: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  venueFullAddress: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  admissionAdult: string;
  admissionAdultNote: string;
  admissionYouth: string;
  admissionYouthNote: string;
  admissionMilitary: string;
  admissionMilitaryNote: string;
  parkingNote: string;
  dealerCount: string;
  attendeesPerShow: string;
  contactEmail: string;
  contactPhone: string;
  raffleTicketPrice: string;
  raffleDrawingTimes: string;
  raffleMustBePresent: string;
  yearEstablished: string;
}

const DEFAULT_CONFIG: ConfigState = {
  showName: "",
  tagline: "",
  nextShowName: "",
  startDate: "",
  endDate: "",
  venueName: "",
  venueAddress: "",
  venueCity: "",
  venueFullAddress: "",
  googleMapsEmbedUrl: "",
  googleMapsDirectionsUrl: "",
  admissionAdult: "",
  admissionAdultNote: "",
  admissionYouth: "",
  admissionYouthNote: "",
  admissionMilitary: "",
  admissionMilitaryNote: "",
  parkingNote: "",
  dealerCount: "",
  attendeesPerShow: "",
  contactEmail: "",
  contactPhone: "",
  raffleTicketPrice: "",
  raffleDrawingTimes: "",
  raffleMustBePresent: "true",
  yearEstablished: "",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.75rem",
  color: "#555",
  marginBottom: 3,
  fontWeight: 500,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.45rem 0.6rem",
  border: "1px solid #d1d5db",
  borderRadius: 4,
  fontSize: "0.875rem",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: 8,
  padding: "1.5rem",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
  marginBottom: "1.25rem",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "0.75rem",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: "0.95rem",
        fontWeight: 700,
        color: "#0D1B2A",
        marginBottom: "1rem",
        paddingBottom: "0.5rem",
        borderBottom: "2px solid #C9A84C",
      }}
    >
      {title}
    </h2>
  );
}

export default function AdminConfigPage() {
  const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then(({ config: c, schedule: s, error }) => {
        if (error) {
          setMessage({ text: "Error loading config: " + error, ok: false });
        } else {
          setConfig((prev) => ({ ...prev, ...c }));
          setSchedule(s ?? []);
        }
      })
      .catch(() => setMessage({ text: "Network error loading config.", ok: false }))
      .finally(() => setLoading(false));
  }, []);

  function set(key: keyof ConfigState, value: string) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function setScheduleDay(index: number, field: keyof ScheduleDay, value: string) {
    setSchedule((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  }

  function addScheduleDay() {
    setSchedule((prev) => [...prev, { day: "", date: "", hours: "" }]);
  }

  function removeScheduleDay(index: number) {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, schedule }),
      });
      const json = await res.json();
      if (res.ok) {
        setMessage({ text: "Configuration saved successfully.", ok: true });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setMessage({ text: "Save failed: " + (json.error ?? "unknown"), ok: false });
      }
    } catch {
      setMessage({ text: "Network error while saving.", ok: false });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p style={{ color: "#888", textAlign: "center", padding: "3rem" }}>
        Loading configuration…
      </p>
    );
  }

  return (
    <form onSubmit={handleSave}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0D1B2A" }}>
            Show Configuration
          </h1>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>
            All fields are saved to Google Sheets.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: "#C9A84C",
            color: "#0D1B2A",
            border: "none",
            borderRadius: 4,
            padding: "0.55rem 1.25rem",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>

      {message && (
        <div
          style={{
            backgroundColor: message.ok ? "#f0fdf4" : "#fef2f2",
            border: `1px solid ${message.ok ? "#86efac" : "#fca5a5"}`,
            borderRadius: 6,
            padding: "0.65rem 1rem",
            color: message.ok ? "#166534" : "#b91c1c",
            fontSize: "0.85rem",
            marginBottom: "1.25rem",
          }}
        >
          {message.ok ? "✓ " : "⚠ "}{message.text}
        </div>
      )}

      {/* Show Info */}
      <div style={sectionStyle}>
        <SectionHeader title="Show Info" />
        <div style={gridStyle}>
          <Field label="Show Name">
            <input style={inputStyle} value={config.showName} onChange={(e) => set("showName", e.target.value)} />
          </Field>
          <Field label="Tagline">
            <input style={inputStyle} value={config.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Next Show Name (e.g. 'Spring 2026 Show')">
            <input style={inputStyle} value={config.nextShowName} onChange={(e) => set("nextShowName", e.target.value)} />
          </Field>
          <Field label="Start Date/Time (ISO: 2026-04-24T10:00:00)">
            <input style={inputStyle} value={config.startDate} onChange={(e) => set("startDate", e.target.value)} placeholder="2026-04-24T10:00:00" />
          </Field>
          <Field label="End Date/Time (ISO: 2026-04-25T18:00:00)">
            <input style={inputStyle} value={config.endDate} onChange={(e) => set("endDate", e.target.value)} placeholder="2026-04-25T18:00:00" />
          </Field>
          <Field label="Year Established">
            <input style={inputStyle} type="number" value={config.yearEstablished} onChange={(e) => set("yearEstablished", e.target.value)} />
          </Field>
          <Field label="Dealer Count (display, e.g. '20+')">
            <input style={inputStyle} value={config.dealerCount} onChange={(e) => set("dealerCount", e.target.value)} />
          </Field>
          <Field label="Attendees Per Show (display, e.g. '350+')">
            <input style={inputStyle} value={config.attendeesPerShow} onChange={(e) => set("attendeesPerShow", e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Schedule */}
      <div style={sectionStyle}>
        <SectionHeader title="Show Schedule" />
        {schedule.map((day, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 2fr auto",
              gap: "0.5rem",
              alignItems: "end",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              {i === 0 && <label style={labelStyle}>Day</label>}
              <input
                style={inputStyle}
                value={day.day}
                onChange={(e) => setScheduleDay(i, "day", e.target.value)}
                placeholder="Friday"
              />
            </div>
            <div>
              {i === 0 && <label style={labelStyle}>Date</label>}
              <input
                style={inputStyle}
                value={day.date}
                onChange={(e) => setScheduleDay(i, "date", e.target.value)}
                placeholder="April 24, 2026"
              />
            </div>
            <div>
              {i === 0 && <label style={labelStyle}>Hours</label>}
              <input
                style={inputStyle}
                value={day.hours}
                onChange={(e) => setScheduleDay(i, "hours", e.target.value)}
                placeholder="10:00 AM – 6:00 PM"
              />
            </div>
            <button
              type="button"
              onClick={() => removeScheduleDay(i)}
              style={{
                background: "none",
                border: "none",
                color: "#dc2626",
                fontSize: "1.1rem",
                cursor: "pointer",
                padding: "0.3rem",
              }}
              title="Remove day"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addScheduleDay}
          style={{
            marginTop: "0.5rem",
            background: "none",
            border: "1px dashed #d1d5db",
            borderRadius: 4,
            padding: "0.4rem 0.75rem",
            fontSize: "0.8rem",
            color: "#555",
            cursor: "pointer",
          }}
        >
          + Add Day
        </button>
      </div>

      {/* Venue */}
      <div style={sectionStyle}>
        <SectionHeader title="Venue" />
        <div style={gridStyle}>
          <Field label="Venue Name">
            <input style={inputStyle} value={config.venueName} onChange={(e) => set("venueName", e.target.value)} />
          </Field>
          <Field label="Street Address">
            <input style={inputStyle} value={config.venueAddress} onChange={(e) => set("venueAddress", e.target.value)} />
          </Field>
          <Field label="City, State ZIP">
            <input style={inputStyle} value={config.venueCity} onChange={(e) => set("venueCity", e.target.value)} />
          </Field>
          <Field label="Full Address (for structured data)">
            <input style={inputStyle} value={config.venueFullAddress} onChange={(e) => set("venueFullAddress", e.target.value)} />
          </Field>
          <Field label="Google Maps Directions URL">
            <input style={inputStyle} type="url" value={config.googleMapsDirectionsUrl} onChange={(e) => set("googleMapsDirectionsUrl", e.target.value)} />
          </Field>
          <Field label="Google Maps Embed URL">
            <input style={inputStyle} type="url" value={config.googleMapsEmbedUrl} onChange={(e) => set("googleMapsEmbedUrl", e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Admission */}
      <div style={sectionStyle}>
        <SectionHeader title="Admission" />
        <div style={gridStyle}>
          <Field label="Adult Price (e.g. '$6.00')">
            <input style={inputStyle} value={config.admissionAdult} onChange={(e) => set("admissionAdult", e.target.value)} />
          </Field>
          <Field label="Adult Note">
            <input style={inputStyle} value={config.admissionAdultNote} onChange={(e) => set("admissionAdultNote", e.target.value)} />
          </Field>
          <Field label="Youth Price (e.g. 'FREE')">
            <input style={inputStyle} value={config.admissionYouth} onChange={(e) => set("admissionYouth", e.target.value)} />
          </Field>
          <Field label="Youth Note">
            <input style={inputStyle} value={config.admissionYouthNote} onChange={(e) => set("admissionYouthNote", e.target.value)} />
          </Field>
          <Field label="Military Price (e.g. 'FREE')">
            <input style={inputStyle} value={config.admissionMilitary} onChange={(e) => set("admissionMilitary", e.target.value)} />
          </Field>
          <Field label="Military Note">
            <input style={inputStyle} value={config.admissionMilitaryNote} onChange={(e) => set("admissionMilitaryNote", e.target.value)} />
          </Field>
          <Field label="Parking Note">
            <input style={inputStyle} value={config.parkingNote} onChange={(e) => set("parkingNote", e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Raffle */}
      <div style={sectionStyle}>
        <SectionHeader title="Raffle" />
        <div style={gridStyle}>
          <Field label="Ticket Price (e.g. '$1 per ticket / 6 for $5')">
            <input style={inputStyle} value={config.raffleTicketPrice} onChange={(e) => set("raffleTicketPrice", e.target.value)} />
          </Field>
          <Field label="Drawing Times (comma-separated, e.g. '11:00 AM, 2:00 PM, 5:00 PM')">
            <input style={inputStyle} value={config.raffleDrawingTimes} onChange={(e) => set("raffleDrawingTimes", e.target.value)} placeholder="11:00 AM, 2:00 PM, 5:00 PM" />
          </Field>
          <Field label="Must Be Present to Win">
            <select
              style={inputStyle}
              value={config.raffleMustBePresent}
              onChange={(e) => set("raffleMustBePresent", e.target.value)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Contact */}
      <div style={sectionStyle}>
        <SectionHeader title="Contact" />
        <div style={gridStyle}>
          <Field label="Email">
            <input style={inputStyle} type="email" value={config.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
          </Field>
          <Field label="Phone">
            <input style={inputStyle} type="tel" value={config.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
          </Field>
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: "#C9A84C",
            color: "#0D1B2A",
            border: "none",
            borderRadius: 4,
            padding: "0.55rem 1.5rem",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>
    </form>
  );
}
