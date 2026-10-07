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
cp .env.example .env   # then fill in your own values
```

Create the database tables, then start the development server:

```bash
npx drizzle-kit push --dialect=postgresql --schema=./src/db/schema.ts --url="$DATABASE_URL"
npm run dev
```

Replace `$DATABASE_URL` with your connection string if it isn't exported in your shell. Running `npx drizzle-kit push` without flags uses the local connection string in `drizzle.config.json`.

Open <http://localhost:3000>. The leads dashboard is at <http://localhost:3000/admin> — sign in with your `ADMIN_PASSWORD`.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_PASSWORD` | Yes, for `/admin` | Leads dashboard password (at least 8 characters) |
| `ADMIN_SESSION_SECRET` | Recommended | Long random string used to sign admin sessions |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL — `https://0daysecurity.tech` in production (sitemap and social previews) |
| `RESEND_API_KEY` | Optional | Turns on email alerts for new quote requests |
| `QUOTE_NOTIFY_EMAIL` | Optional | Where alerts are sent (comma-separated for several addresses) |
| `QUOTE_FROM_EMAIL` | Optional | Sender address — must use a domain verified in Resend |

Your `.env` file is listed in `.gitignore`, so your secrets stay out of the repository.

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

## Deploying

The site runs on any Node.js host, such as Vercel, Railway or Render, with a managed PostgreSQL database such as Neon or Supabase.

1. Import this repository into your hosting provider.
2. Add the environment variables above, and set `NEXT_PUBLIC_SITE_URL` to `https://0daysecurity.tech`.
3. Create the tables once by running the `drizzle-kit push` command above with your production `DATABASE_URL`.
4. Deploy using `npm run build` as the build command and `npm run start` as the start command.
5. Connect your `0daysecurity.tech` domain in your hosting provider's settings.

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
