import type { Metadata } from "next";
import "./globals.css";
import PublicWrapper from "@/components/PublicWrapper";
import { SHOW_CONFIG } from "@/data/config";

export const metadata: Metadata = {
  title: {
    default: `${SHOW_CONFIG.showName} | American Legion Post 419, Santa Clara`,
    template: `%s | ${SHOW_CONFIG.showName}`,
  },
  description:
    "The Santa Clara Coin Show features 20+ dealers of coins, currency, bullion & collectibles at American Legion Post 419, 867 Laurelwood Rd, Santa Clara. $6 admission, free parking.",
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
        <PublicWrapper>{children}</PublicWrapper>
      </body>
    </html>
  );
}
