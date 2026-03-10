# Santa Clara Coin Show — Website

Production: **https://santaclaracoinshow.com**
Repo: https://github.com/THINGMAJIG/santa-clara-coin-show
Deployed on: Vercel (auto-deploys on push to `main`)

---

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **Google Sheets** — live data source for config, dealers, schedule, and dealer applications
- **nodemailer + Gmail** — form submission email notifications
- **Vercel** — hosting + serverless API routes

---

## Environment Variables

Set these in Vercel (Settings → Environment Variables) and locally in `.env.local`:

| Variable | Description |
|---|---|
| `ADMIN_PASSWORD` | Password for `/admin` login |
| `ADMIN_SESSION_SECRET` | Long random string for signing session cookies |
| `GOOGLE_SHEETS_ID` | Spreadsheet ID from the Google Sheets URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email (from Google Cloud) |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Private key — paste with literal `\n` characters |
| `GMAIL_USER` | `santaclaracoinshow@gmail.com` |
| `GMAIL_APP_PASSWORD` | 16-char Gmail App Password (no spaces) — requires 2FA enabled |
| `NOTIFY_EMAIL` | Optional override for notification recipient (defaults to `santaclaracoinshow@gmail.com`) |

---

## Google Sheets Setup

One spreadsheet with **four tabs**:

### Config tab
Columns: `key | value`
Row 1 is a header. Keys map to `CONFIG_KEYS` in `lib/sheets.ts` (showName, startDate, contactEmail, etc.).

### Dealers tab
Columns: `name | specialties | table | website | notes`
Row 1 is a header. Specialties are comma-separated.

### Schedule tab
Columns: `day | date | hours`
Row 1 is a header. Example: `Friday | April 24, 2026 | 10:00 AM – 6:00 PM`

### Applications tab
Columns: `Timestamp | Business | Contact | Email | Phone | Website | CA Seller's Permit | Address | Specialties | Table | Show Date | Returning | Notes`
Row 1 is a header. Filled automatically when dealer applications are submitted.

---

## Key Files

| File | Purpose |
|---|---|
| `data/config.ts` | Static fallback config (used if Sheets not configured or fails) |
| `data/dealers.ts` | Static fallback dealer list |
| `lib/sheets.ts` | Google Sheets CRUD — getDealers, saveDealers, getConfig, saveConfig, getSchedule, saveSchedule, saveApplication |
| `lib/getPublicConfig.ts` | Merges live Sheets data with static fallback — used by all public pages |
| `lib/adminAuth.ts` | Password check + HMAC session token generation |
| `lib/mailer.ts` | nodemailer/Gmail email helper |
| `middleware.ts` | Edge middleware — protects `/admin/*` routes via signed session cookie |
| `components/PublicWrapper.tsx` | Conditionally renders NavBar/Footer (hidden on `/admin` routes) |
| `components/CountdownTimer.tsx` | Live countdown to next show |
| `components/NavBar.tsx` | Sticky nav with dropdowns, mobile hamburger |

---

## Admin Section

- **URL:** `/admin` (not linked from public nav — share carefully)
- **Login:** `/admin/login` — password from `ADMIN_PASSWORD` env var, 7-day session cookie
- **Pages:** Dashboard, Dealers (CRUD), Show Config (all fields)
- **API routes:** `/api/admin/auth`, `/api/admin/dealers`, `/api/admin/config`

---

## Form Submissions

### Contact form (`/contact`)
- POSTs to `/api/contact`
- Sends email to `santaclaracoinshow@gmail.com` via Gmail

### Dealer application (`/dealers/apply`)
- POSTs to `/api/apply`
- Saves row to **Applications** tab in Google Sheets
- Sends email notification to `santaclaracoinshow@gmail.com`
- Fields: Business name, contact, email, phone, website, CA Seller's Permit #, address, specialties, table preference, show date, returning dealer, notes

---

## Data Flow

```
Public pages
  └── lib/getPublicConfig.ts
        ├── Google Sheets (Config + Schedule + Dealers tabs) ← primary
        └── data/config.ts + data/dealers.ts ← fallback

Dealer directory (/dealers/directory)
  └── lib/sheets.ts getDealers() — ISR revalidate 30s

Admin panel
  └── /api/admin/* — reads/writes directly to Sheets
```

---

## Local Development

```bash
cd santa-clara-coin-show
npm install
cp .env.local.example .env.local   # fill in env vars
npm run dev                         # http://localhost:3000
```

Without Sheets env vars configured, the site falls back to static data in `data/config.ts` and `data/dealers.ts`.

---

## Deployment

Push to `main` → Vercel auto-deploys. No manual steps needed.

To update show config without a redeploy: use the admin panel at `/admin` or edit the Google Sheets Config tab directly. Changes appear within 30 seconds (ISR revalidate interval).

---

## Design System

- **Colors:** Navy `#0D1B2A`, Gold `#C9A84C`, Slate `#1B3A5C`, Cream `#F5F0E8`
- **Fonts:** Playfair Display (headers, `.font-display`), Inter (body)
- **CSS classes:** `.btn-gold`, `.btn-outline`, `.card-gold-top`, `.card-hover`, `.gold-divider`, `.faq-answer`

---

## Show Details (current as of March 2026)

- **Next show:** April 24–25, 2026
- **Venue:** American Legion Post 419, 958 Homestead Rd, Santa Clara, CA 95050
- **Admission:** Adults $6 · Youth under 16 FREE · Military FREE · Free parking
- **Contact:** santaclaracoinshow@gmail.com · 415-601-8661
