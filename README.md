# GK Batteries — Alnavar

Static website for **GK Batteries**, the multi-brand battery & inverter dealer in Alnavar,
Dharwad District, Karnataka. Owner: **Gous Khan** (50+ years in batteries — from handcrafted
hard-rubber (HR) batteries to an authorized multi-brand dealer).

Live site: <https://gkbatteries.in> · Deployed on **Vercel** (no framework, no framework build step).

---

## How to edit the site

**Everything you normally change lives in `data.js`** — business details, services, products,
the owner story, the service area, the FAQ and the testimonials.

```bash
npm run build     # regenerates the static HTML in index.html from data.js
npm run serve     # preview at http://localhost:8123
```

> `data.js` is the single source of truth. `index.html` contains **generated blocks** between
> `<!-- @gen:key -->` markers — never edit inside those markers by hand, or your change will be
> overwritten by the next `npm run build`.

| Generated block | Where it goes |
|---|---|
| `head` | title, description, keywords, canonical, Open Graph / Twitter, geo tags |
| `jsonld` | schema.org `@graph` (Organization, WebSite, Person, 2× LocalBusiness, 8× Service, FAQPage, BreadcrumbList) |
| `heroTitle` / `heroDesc` | the H1 and intro paragraph in the hero |
| `aboutSection` | the owner story + journey timeline |
| `serviceAreaSection` | towns we deliver to |
| `faqSection` | the FAQ accordion |

`npm run build` is also the Vercel **build command**, so it re-runs on every deploy.

---

## Analytics

GA4 + Vercel Web Analytics, both consent-aware. See **[ANALYTICS.md](./ANALYTICS.md)** for the
step-by-step guide on reading traffic **by region** (country / state / city) and the
call-conversion tracking.

To switch GA4 on, paste your Measurement ID in `data.js`:

```js
analytics: { gaId: "G-XXXXXXXXXX" }
```

---

## File map

| File | Purpose |
|---|---|
| `index.html` | the single page (structure + generated blocks) |
| `data.js` | **all editable content** |
| `styles.css` | theme, sections, responsive rules |
| `script.js` | renders dynamic parts (ticker, services, products, branches, footer) |
| `analytics.js` | consent banner, GA4 + Vercel loader, event tracking |
| `tools/build.js` | static HTML generator (`npm run build`) |
| `tools/make-sprite.js` | rebuilds `images/icons.svg` from the lucide package |
| `tools/optimize-images.py` | PNG → WebP conversion for the catalogue |
| `tools/make-images.py` | regenerates the OG share image and touch icon |
| `robots.txt`, `sitemap.xml`, `llms.txt`, `gk-batteries.md` | crawler + AI-agent entry points |
| `404.html`, `privacy.html` | error page and privacy policy |
| `vercel.json` | headers, CSP, cache rules, build command |

---

## Editing checklist

1. Change the content in `data.js`.
2. `npm run build`.
3. `npm run serve` and check the page.
4. Commit both `data.js` and `index.html` (the generated file is part of the deploy).
5. Push — Vercel deploys automatically.

### Things to verify before you publish

- [ ] The **real founding year** — the site currently says "50+ years" *and* "since 1994"
      (see the `FACT CHECK` comment at the top of the `about` block in `data.js`).
- [ ] The **timeline years** (1970s / 1980s / 1990s) in `data.js` → `about.milestones`.
- [ ] Owner name spelling: **Gous Khan** (or Gaus Khan?).
- [ ] The **customer reviews** in `data.js` → `reviews` are written as examples — replace them with
      real Google reviews.
- [ ] `profile.rating.count` — set your real Google review count to switch on star ratings in
      search results (left at 0, so the markup is currently omitted).
- [ ] The **catalogue images**: the Exide / Yokohama / Dynex photos are the same stock battery
      photo, and the Amaron ones are simple silhouettes. Replace with real product photos.
- [ ] Service-area distances are approximate.
