// ============================================================
// Admin authentication utilities
// Uses Web Crypto API (available in Node.js 18+ and Edge runtime)
// ============================================================

function hexEncode(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return hexEncode(sig);
}

/** Generate the expected session token from the session secret */
export async function generateSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET env var not set");
  return hmacHex(secret, "admin:authenticated");
}

/** Check submitted password against the stored admin password */
export function checkPassword(submitted: string): boolean {
  const stored = process.env.ADMIN_PASSWORD;
  if (!stored) return false;
  // Constant-time comparison to avoid timing attacks
  if (submitted.length !== stored.length) return false;
  let mismatch = 0;
  for (let i = 0; i < submitted.length; i++) {
    mismatch |= submitted.charCodeAt(i) ^ stored.charCodeAt(i);
  }
  return mismatch === 0;
}
