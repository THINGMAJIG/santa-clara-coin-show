"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  dealerCount: number;
  showName: string;
  nextShowName: string;
  startDate: string;
  endDate: string;
  admissionAdult: string;
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: 8,
  padding: "1.5rem",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  border: "1px solid #e5e7eb",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dealers").then((r) => r.json()),
      fetch("/api/admin/config").then((r) => r.json()),
    ])
      .then(([dealers, { config }]) => {
        setData({
          dealerCount: Array.isArray(dealers) ? dealers.length : 0,
          showName: config.showName ?? "—",
          nextShowName: config.nextShowName ?? "—",
          startDate: config.startDate ?? "—",
          endDate: config.endDate ?? "—",
          admissionAdult: config.admissionAdult ?? "—",
        });
      })
      .catch(() => setError("Could not load data. Check your Google Sheets configuration."));
  }, []);

  return (
    <div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#0D1B2A",
          marginBottom: "0.25rem",
        }}
      >
        Dashboard
      </h1>
      <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
        Manage your show data below. Changes save to Google Sheets instantly.
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: 6,
            padding: "0.75rem 1rem",
            color: "#b91c1c",
            fontSize: "0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          ⚠ {error}
        </div>
      )}

      {/* Quick stats */}
      {data && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Registered Dealers", value: data.dealerCount },
            { label: "Next Show", value: data.nextShowName },
            { label: "Adult Admission", value: data.admissionAdult },
          ].map(({ label, value }) => (
            <div key={label} style={{ ...cardStyle, textAlign: "center" }}>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "#C9A84C",
                }}
              >
                {String(value)}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#888", marginTop: 2 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Management cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        <div style={cardStyle}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏪</div>
          <h2
            style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0D1B2A", marginBottom: "0.4rem" }}
          >
            Dealer Management
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", lineHeight: 1.5 }}>
            Add, edit, or remove dealers from the public directory. Changes appear on the site immediately.
          </p>
          <Link
            href="/admin/dealers"
            style={{
              display: "inline-block",
              backgroundColor: "#0D1B2A",
              color: "#C9A84C",
              padding: "0.5rem 1rem",
              borderRadius: 4,
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Manage Dealers →
          </Link>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📅</div>
          <h2
            style={{ fontSize: "1.05rem", fontWeight: 600, color: "#0D1B2A", marginBottom: "0.4rem" }}
          >
            Show Configuration
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "1rem", lineHeight: 1.5 }}>
            Update show dates, schedule, venue, admission pricing, raffle details, and contact info.
          </p>
          <Link
            href="/admin/config"
            style={{
              display: "inline-block",
              backgroundColor: "#0D1B2A",
              color: "#C9A84C",
              padding: "0.5rem 1rem",
              borderRadius: 4,
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Edit Config →
          </Link>
        </div>
      </div>
    </div>
  );
}
