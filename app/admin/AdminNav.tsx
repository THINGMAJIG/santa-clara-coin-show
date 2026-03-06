"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/dealers", label: "Dealers" },
  { href: "/admin/config", label: "Show Config" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header
      style={{
        backgroundColor: "#0D1B2A",
        borderBottom: "3px solid #C9A84C",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 52,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <span
            style={{ color: "#C9A84C", fontWeight: 700, fontSize: "0.95rem" }}
          >
            ⚙ Coin Show Admin
          </span>
          <nav style={{ display: "flex", gap: "1.25rem" }}>
            {NAV_LINKS.map(({ href, label }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: active ? "#C9A84C" : "#F5F0E8",
                    fontWeight: active ? 600 : 400,
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    borderBottom: active ? "2px solid #C9A84C" : "2px solid transparent",
                    paddingBottom: 2,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #C9A84C",
            color: "#C9A84C",
            padding: "4px 12px",
            borderRadius: 4,
            fontSize: "0.8rem",
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
