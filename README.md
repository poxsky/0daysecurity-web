# 0DAY Security — Website

The website for **0DAY Security**, offensive security and compliance specialists. It's built with **Next.js 16 (App Router)**, **PostgreSQL** and **Drizzle ORM**, and includes an interactive WebGL hero, a quote form that saves leads to the database, and a password-protected leads dashboard.

## Services on the site

1. Vulnerability Assessment & Penetration Testing (VAPT)
2. Red Teaming & Attack Simulation
3. Application & Cloud Security
4. Governance, Risk & Compliance (GRC)
5. Government & Regulatory Security Audits
6. Security Awareness & Training
7. Virtual CISO (vCISO) & Advisory

## Features

- Full-screen interactive fluid animation in the hero (WebGL), with a typing headline subtitle
- Seven service categories in a tabbed layout, with keyboard navigation and direct links (for example `/#grc`)
- "Trusted by" strip with smoothly scrolling client logos (pauses on hover, with a pause button) — add logo files to `public/clients/` and they appear automatically
- Smooth, eased scrolling on desktop (Lenis) and native scrolling on phones; sections fade in as you scroll
- Responsive navigation with a full-screen menu on phones and tablets, plus a privacy notice and a custom 404 page
- Phone-friendly hero animation: lighter quality on phones, and it stops rendering when nothing is moving
- "Who we are", "How we work", "Why 0DAY Security", FAQ and call-to-action sections
- Quote request form with validation, a spam honeypot and rate limiting — saved to PostgreSQL
- Leads dashboard at `/admin` — status tracking, private notes, search, filters and CSV export
- System check at `/admin/status` — tests the database connection, tables, Row Level Security, settings and domain, and explains how to fix each problem in plain language
- Optional email alerts for new leads via [Resend](https://resend.com)
- Hidden terminal easter egg — press <kbd>&#96;</kbd> on the homepage
- Security headers (CSP, HSTS and more), `/.well-known/security.txt`, sitemap, robots.txt and a social share image

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · PostgreSQL · Drizzle ORM

## Getting started

**Requirements:** Node.js 20 or later and a PostgreSQL database.

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
cp .env.example .env.local   # then fill in your own values
```

Create the database tables, then start the development server:

```bash
npx drizzle-kit push
npm run dev
```

`drizzle.config.ts` reads `DIRECT_URL` or `DATABASE_URL` from your shell, `.env.local` or `.env`, and falls back to a local database at `127.0.0.1`. It only manages this site's own tables, so other tables in a shared database are never touched, and it turns on Row Level Security for them. (`drizzle.config.json` is only used by the builder's sandbox.)

Open <http://localhost:3000>. The leads dashboard is at <http://localhost:3000/admin> — sign in with your `ADMIN_PASSWORD`.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. On Vercel with Supabase, use the **Transaction pooler** string (port 6543) |
| `DATABASE_CA_CERT` | Recommended | Your database's CA certificate (PEM) for full SSL verification. Supabase: Database Settings → SSL Configuration → Download certificate |
| `DATABASE_SSL` | Optional | Set to `disable` only for a remote database without SSL support. Remote databases use SSL automatically |
| `DIRECT_URL` | Optional | Connection string for `drizzle-kit push` instead of `DATABASE_URL` (for example Supabase's session pooler) |
| `DATABASE_POOL_MAX` | Optional | Maximum database connections per server instance (default 5) |
| `ADMIN_PASSWORD` | Yes, for `/admin` | Leads dashboard password (at least 8 characters; 14+ recommended) |
| `ADMIN_SESSION_SECRET` | Recommended | Long random string used to sign admin sessions (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL — `https://0daysecurity.tech` in production (sitemap and social previews) |
| `RESEND_API_KEY` | Optional | Turns on email alerts for new quote requests |
| `QUOTE_NOTIFY_EMAIL` | Optional | Where alerts are sent (comma-separated for several addresses) |
| `QUOTE_FROM_EMAIL` | Optional | Sender address — must use a domain verified in Resend |

Your `.env` and `.env.local` files are listed in `.gitignore`, so your secrets stay out of the repository.

## Customising

| What | Where |
| --- | --- |
| Brand name, phone, email, hero headline, typing phrases and footer tagline | `src/lib/site-config.ts` |
| Service categories, items and descriptions | `src/lib/services.ts` |
| "Who we are", "How we work", "Why us", final call-to-action and FAQ copy | `src/lib/content.ts` |
| "Trusted by" clients — names, heading and logo settings | `src/lib/clients.ts` (logo files go in `public/clients/`) |
| Privacy notice | `src/app/privacy/page.tsx` |
| Icons | `src/components/icons.tsx` |
| Favicon | `src/app/icon.svg` |
| Styles | `src/app/globals.css` |

## Adding client logos

The "Trusted by" strip below the hero scrolls client logos in a slow, seamless loop. Each client shows its logo once a file is available, and a clean text wordmark of their name until then. The Serviz4u logo is already included (taken from serviz4u.co.in).

1. Save each logo in `public/clients/`, named after the client's `slug` in `src/lib/clients.ts` — `eros-group`, `serviz4u`, `acme` and `swartzchild-home` — with a `.svg`, `.png` or `.webp` extension. For example: `public/clients/eros-group.svg`.
2. Use a version with a transparent background (SVG works best). Horizontal logos look best in the strip.
3. Rebuild or redeploy. Logo files are detected automatically during the build.

Logos are shown in white so every client looks consistent on the dark design. To keep a client's original colours, set `originalColors: true` for that client in `src/lib/clients.ts`.

Only display logos you have permission to use. A standalone HTML + Tailwind version of this section is available in `snippets/clients-section.html`.

## Deploying (Vercel + Supabase)

The site runs on any Node.js host with PostgreSQL. These steps use Vercel and Supabase.

1. **Database URL.** In Supabase, open **Connect → Transaction pooler** and copy the connection string (port 6543). Replace `[YOUR-PASSWORD]` with your database password. Don't use the direct connection (`db.<project>.supabase.co`) — it only works over IPv6, which Vercel doesn't support.
2. **Create the tables.** Put that string in `.env.local` as `DATABASE_URL` and run `npx drizzle-kit push`. This also turns on Row Level Security, so Supabase's public Data API can't read customer enquiries. If push hangs, add the **Session pooler** string (port 5432) as `DIRECT_URL` and run it again.
3. **Environment variables.** In Vercel → Settings → Environment Variables, add `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` and `NEXT_PUBLIC_SITE_URL` (plus `DATABASE_CA_CERT` and the email settings if you use them). This site doesn't need any Supabase API keys.
4. **Deploy** with `vercel --prod`, or push to the Git branch connected to Vercel. Redeploying an old deployment from the dashboard rebuilds old code.
5. **Check it.** Sign in at `/admin` and open **System check** (`/admin/status`). It lists anything that's wrong and how to fix it.
6. **Domain.** Add `0daysecurity.tech` and `www.0daysecurity.tech` in Vercel → Settings → Domains, then create the DNS records Vercel shows at your domain provider.

### Troubleshooting

| What you see | What to do |
| --- | --- |
| Build fails with "DATABASE_URL is required" | Not expected any more — the database connects lazily. Make sure you deployed the latest code |
| `getaddrinfo ENOTFOUND db.<project>.supabase.co` | You're using Supabase's direct connection. Switch to the Transaction pooler string |
| `self-signed certificate in certificate chain` | Remove `sslmode=require` from `DATABASE_URL` (SSL is configured automatically), or set `DATABASE_CA_CERT` to the correct certificate |
| `password authentication failed` / `Tenant or user not found` | Copy the pooler string again; the username looks like `postgres.<project-ref>` |
| Connection timed out | Free Supabase projects pause after a week without activity — restore the project in the Supabase dashboard |
| `relation "quote_requests" does not exist` | Run `npx drizzle-kit push` against the production database (step 2) |
| 401 on a `*.vercel.app` preview URL | Vercel Deployment Protection is on (Settings → Deployment Protection) |

Run `npm audit --omit=dev` to check the packages that ship with the site. The remaining warnings in a full `npm audit` come from development tools (`drizzle-kit`, `eslint-config-next`). They don't run on the live site, and the "fixes" npm suggests are downgrades, so don't apply them.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the code |
| `npm run typecheck` | Check TypeScript types |

## Credits and licences

- Design inspired by [dayzerosecurity.com](https://dayzerosecurity.com).
- The fluid animation is adapted from [WebGL Fluid Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) by Pavel Dobryakov (MIT licence). The original licence notice is kept in `public/effects/purple-fluid.js`.
- Fonts: Poppins, Anonymous Pro, Roboto Mono and Roboto from [Google Fonts](https://fonts.google.com), available under open-source licences (SIL Open Font License 1.1 / Apache License 2.0).
- The icons are original SVGs created for this project.
