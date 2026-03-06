"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D1B2A",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: "2.5rem",
          width: "100%",
          maxWidth: 360,
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🪙</div>
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#0D1B2A",
              marginBottom: "0.25rem",
            }}
          >
            Coin Show Admin
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#888" }}>
            Sign in to manage show data
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="password"
            style={{ display: "block", fontSize: "0.8rem", color: "#555", marginBottom: 4 }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            style={{
              width: "100%",
              padding: "0.6rem 0.75rem",
              border: "1px solid #ddd",
              borderRadius: 4,
              fontSize: "0.95rem",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "1rem",
            }}
          />
          {error && (
            <p
              style={{
                color: "#c0392b",
                fontSize: "0.82rem",
                marginBottom: "0.75rem",
              }}
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#C9A84C",
              color: "#0D1B2A",
              border: "none",
              borderRadius: 4,
              padding: "0.65rem",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
