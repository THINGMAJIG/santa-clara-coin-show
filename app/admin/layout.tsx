import type { Metadata } from "next";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin — Santa Clara Coin Show",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <AdminNav />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem" }}>
        {children}
      </main>
    </div>
  );
}
