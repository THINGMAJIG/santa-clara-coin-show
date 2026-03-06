// ============================================================
// Google Sheets integration
// Spreadsheet setup — create one spreadsheet with three tabs:
//
//   Tab "Dealers"  — columns: name | specialties | table | website | notes
//   Tab "Config"   — columns: key | value  (see CONFIG_KEYS below)
//   Tab "Schedule" — columns: day | date | hours
//
// Row 1 in each tab is a header row (not read as data).
// ============================================================
import { google } from "googleapis";

// All keys stored in the Config tab
export const CONFIG_KEYS = [
  "showName",
  "tagline",
  "nextShowName",
  "startDate",
  "endDate",
  "venueName",
  "venueAddress",
  "venueCity",
  "venueFullAddress",
  "googleMapsEmbedUrl",
  "googleMapsDirectionsUrl",
  "admissionEarlyBird",
  "admissionEarlyBirdNote",
  "admissionAdult",
  "admissionAdultNote",
  "admissionYouth",
  "admissionYouthNote",
  "admissionMilitary",
  "admissionMilitaryNote",
  "parkingNote",
  "dealerCount",
  "attendeesPerShow",
  "contactEmail",
  "contactPhone",
  "raffleTicketPrice",
  "raffleDrawingTimes",
  "raffleMustBePresent",
  "yearEstablished",
] as const;

export type ConfigKey = (typeof CONFIG_KEYS)[number];
export type ConfigMap = Record<ConfigKey, string>;

export interface SheetDealer {
  name: string;
  specialties: string[];
  table: string;
  website: string;
  notes: string;
}

export interface ScheduleDay {
  day: string;
  date: string;
  hours: string;
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );
  if (!email || !key) {
    throw new Error(
      "Google Sheets env vars not configured (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)"
    );
  }
  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_ID;
  if (!id) throw new Error("GOOGLE_SHEETS_ID env var not set");
  return id;
}

// ── Dealers ─────────────────────────────────────────────────

export async function getDealers(): Promise<SheetDealer[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: "Dealers!A2:E",
  });
  return (res.data.values ?? [])
    .filter((row) => row[0]?.trim())
    .map((row) => ({
      name: row[0] ?? "",
      specialties: row[1] ? row[1].split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      table: row[2] ?? "",
      website: row[3] ?? "",
      notes: row[4] ?? "",
    }));
}

export async function saveDealers(dealers: SheetDealer[]): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const id = getSpreadsheetId();

  await sheets.spreadsheets.values.clear({
    spreadsheetId: id,
    range: "Dealers!A2:E",
  });

  if (dealers.length === 0) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId: id,
    range: `Dealers!A2:E${dealers.length + 1}`,
    valueInputOption: "RAW",
    requestBody: {
      values: dealers.map((d) => [
        d.name,
        d.specialties.join(", "),
        d.table,
        d.website,
        d.notes,
      ]),
    },
  });
}

// ── Config ───────────────────────────────────────────────────

export async function getConfig(): Promise<Partial<ConfigMap>> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: "Config!A2:B",
  });
  const config: Partial<ConfigMap> = {};
  for (const [key, value] of res.data.values ?? []) {
    if (key) config[key as ConfigKey] = value ?? "";
  }
  return config;
}

export async function saveConfig(updates: Partial<ConfigMap>): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const id = getSpreadsheetId();

  // Read current rows to find row positions by key
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: "Config!A:B",
  });
  const rows = res.data.values ?? [];

  const batchData: Array<{ range: string; values: string[][] }> = [];
  for (const [key, value] of Object.entries(updates)) {
    const rowIdx = rows.findIndex((r) => r[0] === key);
    if (rowIdx !== -1) {
      batchData.push({ range: `Config!B${rowIdx + 1}`, values: [[value]] });
    }
  }

  if (batchData.length === 0) return;
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: id,
    requestBody: { valueInputOption: "RAW", data: batchData },
  });
}

// ── Schedule ─────────────────────────────────────────────────

export async function getSchedule(): Promise<ScheduleDay[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: "Schedule!A2:C",
  });
  return (res.data.values ?? []).map((row) => ({
    day: row[0] ?? "",
    date: row[1] ?? "",
    hours: row[2] ?? "",
  }));
}

export async function saveSchedule(schedule: ScheduleDay[]): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const id = getSpreadsheetId();

  await sheets.spreadsheets.values.clear({
    spreadsheetId: id,
    range: "Schedule!A2:C",
  });

  if (schedule.length === 0) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId: id,
    range: `Schedule!A2:C${schedule.length + 1}`,
    valueInputOption: "RAW",
    requestBody: {
      values: schedule.map((s) => [s.day, s.date, s.hours]),
    },
  });
}
