"use client";
import { useEffect, useState, FormEvent } from "react";

interface Dealer {
  name: string;
  specialties: string[];
  table: string;
  website: string;
  notes: string;
}

const EMPTY_DEALER: Dealer = {
  name: "",
  specialties: [],
  table: "",
  website: "",
  notes: "",
};

const SPECIALTY_OPTIONS = [
  "US Coins",
  "World Coins",
  "Ancient Coins",
  "Currency / Paper Money",
  "Gold & Silver Bullion",
  "Tokens & Medals",
  "Supplies & Accessories",
  "Stamps",
  "Jewelry",
  "Estate / General",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.45rem 0.6rem",
  border: "1px solid #d1d5db",
  borderRadius: 4,
  fontSize: "0.875rem",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const btnStyle = (
  variant: "primary" | "danger" | "ghost"
): React.CSSProperties => ({
  padding: "0.35rem 0.75rem",
  borderRadius: 4,
  fontSize: "0.8rem",
  fontWeight: 600,
  cursor: "pointer",
  border: "none",
  backgroundColor:
    variant === "primary"
      ? "#0D1B2A"
      : variant === "danger"
      ? "#dc2626"
      : "transparent",
  color:
    variant === "primary"
      ? "#C9A84C"
      : variant === "danger"
      ? "white"
      : "#555",
  textDecoration: variant === "ghost" ? "underline" : "none",
});

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // -1 = new
  const [formData, setFormData] = useState<Dealer>(EMPTY_DEALER);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/dealers")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDealers(data);
        else setMessage({ text: "Error loading dealers: " + (data.error ?? "unknown"), ok: false });
      })
      .catch(() => setMessage({ text: "Network error loading dealers.", ok: false }))
      .finally(() => setLoading(false));
  }, []);

  async function saveAll(updated: Dealer[]) {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/dealers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const json = await res.json();
      if (res.ok) {
        setDealers(updated);
        setMessage({ text: "Saved successfully.", ok: true });
      } else {
        setMessage({ text: "Save failed: " + (json.error ?? "unknown"), ok: false });
      }
    } catch {
      setMessage({ text: "Network error while saving.", ok: false });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(index: number) {
    setEditingIndex(index);
    setFormData(index === -1 ? EMPTY_DEALER : { ...dealers[index] });
    setMessage(null);
  }

  function cancelEdit() {
    setEditingIndex(null);
    setFormData(EMPTY_DEALER);
  }

  function toggleSpecialty(s: string) {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(s)
        ? prev.specialties.filter((x) => x !== s)
        : [...prev.specialties, s],
    }));
  }

  async function handleSaveRow(e: FormEvent) {
    e.preventDefault();
    if (!formData.name.trim()) {
      setMessage({ text: "Dealer name is required.", ok: false });
      return;
    }
    let updated: Dealer[];
    if (editingIndex === -1) {
      updated = [...dealers, formData];
    } else {
      updated = dealers.map((d, i) => (i === editingIndex ? formData : d));
    }
    await saveAll(updated);
    setEditingIndex(null);
    setFormData(EMPTY_DEALER);
  }

  async function handleDelete(index: number) {
    if (!confirm(`Delete "${dealers[index].name}"?`)) return;
    const updated = dealers.filter((_, i) => i !== index);
    await saveAll(updated);
  }

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: 8,
    padding: "1.5rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#0D1B2A" }}>
            Dealer Management
          </h1>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>
            {dealers.length} dealer{dealers.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        {editingIndex === null && (
          <button
            onClick={() => startEdit(-1)}
            style={{
              ...btnStyle("primary"),
              padding: "0.5rem 1.1rem",
              fontSize: "0.875rem",
            }}
          >
            + Add Dealer
          </button>
        )}
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
            marginBottom: "1rem",
          }}
        >
          {message.ok ? "✓ " : "⚠ "}
          {message.text}
        </div>
      )}

      {/* Edit / Add form */}
      {editingIndex !== null && (
        <div
          style={{
            ...cardStyle,
            marginBottom: "1.5rem",
            borderColor: "#C9A84C",
            borderWidth: 2,
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#0D1B2A",
              marginBottom: "1rem",
            }}
          >
            {editingIndex === -1 ? "Add New Dealer" : `Editing: ${dealers[editingIndex]?.name}`}
          </h2>
          <form onSubmit={handleSaveRow}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#555", marginBottom: 3 }}>
                  Name *
                </label>
                <input
                  style={inputStyle}
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  required
                  placeholder="Dealer or business name"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#555", marginBottom: 3 }}>
                  Table #
                </label>
                <input
                  style={inputStyle}
                  value={formData.table}
                  onChange={(e) => setFormData((p) => ({ ...p, table: e.target.value }))}
                  placeholder="e.g. 12"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#555", marginBottom: 3 }}>
                  Website
                </label>
                <input
                  style={inputStyle}
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#555", marginBottom: 3 }}>
                  Notes
                </label>
                <input
                  style={inputStyle}
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Optional note shown to visitors"
                />
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.75rem", color: "#555", marginBottom: 6 }}>
                Specialties
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {SPECIALTY_OPTIONS.map((s) => {
                  const checked = formData.specialties.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSpecialty(s)}
                      style={{
                        padding: "0.25rem 0.6rem",
                        borderRadius: 20,
                        fontSize: "0.75rem",
                        border: "1px solid",
                        cursor: "pointer",
                        backgroundColor: checked ? "#0D1B2A" : "white",
                        borderColor: checked ? "#0D1B2A" : "#d1d5db",
                        color: checked ? "#C9A84C" : "#555",
                        fontWeight: checked ? 600 : 400,
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                type="submit"
                disabled={saving}
                style={{ ...btnStyle("primary"), opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving…" : "Save Dealer"}
              </button>
              <button type="button" onClick={cancelEdit} style={btnStyle("ghost")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dealer table */}
      <div style={cardStyle}>
        {loading ? (
          <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
            Loading dealers…
          </p>
        ) : dealers.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center", padding: "2rem" }}>
            No dealers yet. Click &ldquo;Add Dealer&rdquo; to get started.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#0D1B2A",
                    color: "#C9A84C",
                    textAlign: "left",
                  }}
                >
                  {["Table", "Name", "Specialties", "Website", "Notes", ""].map((h) => (
                    <th
                      key={h}
                      style={{ padding: "0.6rem 0.75rem", fontWeight: 600, whiteSpace: "nowrap" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dealers.map((dealer, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i % 2 === 0 ? "white" : "#f9fafb",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <td style={{ padding: "0.6rem 0.75rem", color: "#C9A84C", fontWeight: 600 }}>
                      {dealer.table || "—"}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 500, color: "#111" }}>
                      {dealer.name}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem", color: "#555" }}>
                      {dealer.specialties.length > 0
                        ? dealer.specialties.join(", ")
                        : <span style={{ color: "#bbb" }}>—</span>}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>
                      {dealer.website ? (
                        <a
                          href={dealer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#1b3a5c", fontSize: "0.8rem" }}
                        >
                          {dealer.website.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        <span style={{ color: "#bbb" }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem", color: "#666", fontSize: "0.8rem" }}>
                      {dealer.notes || <span style={{ color: "#bbb" }}>—</span>}
                    </td>
                    <td style={{ padding: "0.6rem 0.75rem", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <button
                          onClick={() => startEdit(i)}
                          disabled={editingIndex !== null}
                          style={{ ...btnStyle("ghost"), fontSize: "0.78rem" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          disabled={saving || editingIndex !== null}
                          style={{ ...btnStyle("danger"), fontSize: "0.78rem" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
