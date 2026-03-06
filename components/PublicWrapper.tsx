"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import Footer from "./Footer";
import type { PublicConfig } from "@/lib/getPublicConfig";

export default function PublicWrapper({
  children,
  config,
}: {
  children: React.ReactNode;
  config: PublicConfig;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer config={config} />
    </>
  );
}
