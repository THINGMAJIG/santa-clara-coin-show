"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SHOW_CONFIG } from "@/data/config";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Visit",
    href: "/visitors",
    children: [
      { label: "Plan Your Visit", href: "/visitors" },
      { label: "Youth & YN Program", href: "/visitors/youth" },
      { label: "Visitor FAQ", href: "/visitors/faq" },
    ],
  },
  {
    label: "Dealers",
    href: "/dealers",
    children: [
      { label: "Dealer Information", href: "/dealers" },
      { label: "Apply for a Booth", href: "/dealers/apply" },
      { label: "Dealer Directory", href: "/dealers/directory" },
      { label: "Dealer FAQ", href: "/dealers/faq" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Schedule & Events", href: "/events" },
      { label: "Raffle & Prizes", href: "/events/raffle" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.jpg"
              alt="Santa Clara Coin Show eagle logo"
              width={40}
              height={40}
              className="object-contain rounded"
              style={{ background: "white" }}
            />
            <span
              className="font-display font-bold text-lg leading-tight"
              style={{ color: "var(--cream)" }}
            >
              {SHOW_CONFIG.showName}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium transition-colors duration-150"
                  style={{ color: "var(--cream)" }}
                >
                  {link.label}
                  {link.children && (
                    <span className="ml-1 text-xs" style={{ color: "var(--gold)" }}>▾</span>
                  )}
                </Link>
                {link.children && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-0 w-52 rounded-b shadow-xl border-t-2 py-1"
                    style={{
                      backgroundColor: "var(--navy-dark)",
                      borderColor: "var(--gold)",
                    }}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm transition-colors"
                        style={{ color: "var(--cream)" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--gold)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--cream)")
                        }
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            style={{ color: "var(--cream)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-6 pt-2"
          style={{ backgroundColor: "var(--navy-dark)" }}
        >
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="block py-3 text-lg font-medium border-b"
                style={{
                  color: "var(--cream)",
                  borderColor: "rgba(201,168,76,0.2)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 text-sm"
                      style={{ color: "var(--gold)" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
