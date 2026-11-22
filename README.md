# CashIko — commercial website

Marketing and brand site for CashIko, the record-keeping companion for Philippine
microbusinesses. This repository is **only** the public-facing website: landing page,
features, pricing, about, FAQ, contact and the legal pages. The product itself lives in
the separate `CashIko` application.

No accounts, no dashboards, no data collection beyond a contact form that composes an
email in the visitor's own mail client.

---

## Stack

| Piece | Choice | Why |
| :--- | :--- | :--- |
| Framework | Astro 7 (`output: static`) | File-based routes, per-page `<head>`, zero JS shipped by default |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | Theme tokens live in `src/styles/global.css` under `@theme` — there is no `tailwind.config.js` |
| Fonts | Fraunces (display) + Inter (body) | Loaded from Google Fonts with `display=swap` |
| Interactive bits | Native `<details>`, one inline form script | Menu, FAQ accordions and reveals need no framework |

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built site locally |

Deploy by uploading `dist/` to any static host. `trailingSlash: 'always'` and
`build.format: 'directory'` mean every route is a folder with an `index.html`, so
plain file hosting works without rewrite rules.

## Deployed

- **GitHub:** https://github.com/Zurin2/cashiko-website (public, `main` branch)
- **Live:** https://cashiko-website.vercel.app
- **Redeploy:** push to `main`, or run `vercel deploy --prod --yes` from the project root.
  Vercel auto-detects Astro (build `npm run build`, output `dist`).

## Structure

```text
src/
├── components/
│   ├── BaseLayout.astro      # head, SEO, OG/Twitter, JSON-LD, reveal observer
│   ├── Header.astro          # sticky nav + <details> mobile menu
│   ├── Footer.astro
│   ├── Button.astro          # primary | forest | outline | light
│   ├── PageHero.astro        # interior page header
│   ├── CtaBand.astro
│   ├── FaqList.astro         # native <details> accordion
│   ├── PricingTable.astro    # plan pair + comparison table
│   └── ProductPreview.astro  # illustrative dashboard, labelled as such
├── layouts/BaseLayout.astro
├── lib/site.js               # SITE, NAV, FOOTER_NAV, LEGAL_UPDATED — single source
├── pages/
│   ├── index.astro                  /
│   ├── features.astro               /features/
│   ├── pricing.astro                /pricing/
│   ├── for-sari-sari-stores.astro   /for-sari-sari-stores/
│   ├── about.astro                  /about/
│   ├── faq.astro                    /faq/
│   ├── contact.astro                /contact/
│   ├── privacy.astro                /privacy/
│   ├── terms.astro                  /terms/
│   └── 404.astro
└── styles/global.css         # @theme tokens, .shell, .eyebrow, .prose-legal, reveals
```

## Design tokens

Defined once in `src/styles/global.css` and reused as Tailwind utilities
(`bg-forest`, `text-forest-dark`, `bg-cream`, `text-mango-dark`, …). Values match the
product so the site and the app feel like one brand.

| Token | Value | Use |
| :--- | :--- | :--- |
| `--color-forest` | `hsl(145 48% 26%)` / `#0B874B` | Primary brand green |
| `--color-forest-dark` | `hsl(150 18% 14%)` | Headings, dark sections |
| `--color-forest-muted` | `hsl(150 10% 34%)` | Body copy |
| `--color-cream` | `hsl(44 30% 92%)` | Section bands |
| `--color-surface` | `hsl(44 43% 96.5%)` | Page background |
| `--color-warm` | `hsl(44 22% 78%)` | Borders, dividers |
| `--color-mango` | `hsl(26 88% 56%)` | Accent, eyebrows, highlights |

## Motion

The site ships one small script (`src/scripts/motion.js`, no dependencies) plus a
motion vocabulary in `global.css`. The rules that keep it from becoming noise:

- **Gated on `html.js`.** The `js` class is added inline in `<head>`, so without
  JavaScript nothing is hidden and every element renders in its final state.
- **Gated on `prefers-reduced-motion`.** Every keyframe, transition and counter lives
  inside a `no-preference` block. Reduced-motion users get the finished page instantly,
  including counters (they jump to the final value).
- **One vocabulary.** Expo-out for entrances, 70–90ms stagger between siblings, spring
  reserved for exactly one element (the preview toast). No `transition: all`.
- **Choreography, not decoration.** The hero rises in reading order; the chart bars grow
  after the card lands; the toast arrives last. Nothing loops, nothing follows the mouse
  except the spotlight.

| Hook | Effect |
| :--- | :--- |
| `[data-hero]` + `--i` | Children rise in sequence on load |
| `[data-hero-card]`, `[data-hero-toast]` | Preview card rise, toast spring |
| `[data-bar]` + `--i` | Chart bars grow from the baseline, staggered |
| `[data-reveal]` | Section fades up when it enters the viewport |
| `[data-stagger]` | Container reveals; children follow in DOM order |
| `[data-count]` | Number counts up on first view (`prefix`, `decimals`, `duration`) |
| `[data-spotlight]` | Pointer-tracked highlight on dark surfaces |
| `.lift` | Hover lift for clickable cards |
| `.site-header.is-scrolled` | Header gains a shadow once content moves under it |

Cross-page navigation uses the native CSS `@view-transition { navigation: auto }`, with
the header pinned via `view-transition-name` so it holds still while the body crossfades.
It is purely visual — navigation behaves identically in browsers without support.

`<details>` opens with a height transition where `interpolate-size` is supported, and
instantly everywhere else.

## Honesty rules this site follows

Written down so future edits do not quietly break them:

- **No invented proof.** No testimonials, customer logos, user counts, ratings or
  awards. Nothing on the site claims a customer that does not exist.
- **No invented bios.** The three co-founders appear by name and the role
  “Co-founder” only. No fake credentials, photos or career histories.
- **Product screenshots are labelled.** Every mock dashboard is illustrative data, not
  a live account.
- **Pricing matches the product.** Basic ₱99/month (one branch), Premium ₱199/month
  (multiple branches + AI assistant), 14-day trial, no card. GCash/Maya subscription
  billing is described as rolling out, because that is its real state.
- **BIR status is stated plainly.** CashIko is not a BIR-accredited POS and does not
  issue official receipts — said out loud in the FAQ and the terms.

## Before launch

Tracked here because they need a human decision, not a code change:

1. **Confirm the app URL.** `SITE.appUrl` defaults to `https://app.cashiko.ph`. Every
   “Start free trial” button points there.
2. **Confirm the contact address.** `SITE.email` defaults to `hello@cashiko.ph`. It is
   the destination of the contact form's `mailto:` and of the footer link.
3. **Legal review.** The privacy policy and terms are written as solid drafts against
   RA 10173 (Data Privacy Act) and NPC practice, but they have not been reviewed by
   counsel. Do that before the site is public.
4. **Legal entity name.** `SITE.legalName` is a placeholder. Set the registered name if
   one exists.
5. **Regenerate the OG image** if brand copy changes:
   `chrome --headless=new --window-size=1200,630 --screenshot=public/og-image.png public/og-image.svg`
   (or any SVG-to-PNG tool at 1200×630).
6. **Update `public/sitemap.xml`** when a route is added or removed, and bump the
   `lastmod` dates.

## Contact form

`/contact/` posts to a `mailto:` action, so it works without JavaScript. When JS is
available a small inline script builds a tidy subject and body and opens the visitor's
mail client. There is no server, no database and no third-party form service — which
also means no form submissions are stored anywhere.
