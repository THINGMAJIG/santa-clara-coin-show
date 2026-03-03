// ============================================================
// DEALER LIST — update this file for each show
// ============================================================
export type DealerSpecialty =
  | "US Coins"
  | "World Coins"
  | "Ancient Coins"
  | "Currency / Paper Money"
  | "Gold & Silver Bullion"
  | "Tokens & Medals"
  | "Supplies & Accessories"
  | "Stamps"
  | "Jewelry"
  | "Estate / General";

export interface Dealer {
  name: string;
  specialties: DealerSpecialty[];
  table?: string;
  website?: string;
  notes?: string;
}

// Update this array for each show — add/remove dealers as confirmed
export const DEALERS: Dealer[] = [
  {
    name: "Bay Area Coin Exchange",
    specialties: ["US Coins", "Gold & Silver Bullion"],
    table: "1",
  },
  {
    name: "California Numismatics",
    specialties: ["US Coins", "World Coins"],
    table: "2",
  },
  {
    name: "Golden State Collectibles",
    specialties: ["Currency / Paper Money", "Tokens & Medals"],
    table: "3",
  },
  {
    name: "Pacific Rim Coins",
    specialties: ["World Coins", "Ancient Coins"],
    table: "4",
  },
  {
    name: "Silicon Valley Bullion",
    specialties: ["Gold & Silver Bullion"],
    table: "5",
  },
  {
    name: "The Coin Corner",
    specialties: ["US Coins", "Estate / General"],
    table: "6",
  },
];

// Note: This list is a placeholder — replace with confirmed dealer roster before each show
