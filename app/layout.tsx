import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SHOW_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: {
    default: `${SHOW_CONFIG.showName} | Santa Clara Convention Center`,
    template: `%s | ${SHOW_CONFIG.showName}`,
  },
  description:
    "The Santa Clara Coin Show features 65+ dealers of coins, currency, bullion & collectibles at the Santa Clara Convention Center. $6 admission, free parking. Est. 1978.",
  keywords: [
    "Santa Clara coin show",
    "Bay Area coin show",
    "coin show Silicon Valley",
    "numismatics Santa Clara",
    "coin dealers Bay Area",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
