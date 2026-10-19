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
npm run check     # syntax-check the JS + rebuild
```

Images are regenerated separately when the source photos change:

```bash
npm run images    # crop the brand photos + strip the white background
npm run sprite    # rebuild images/icons.svg (after adding an icon)
npm run og        # regenerate the social share image
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
| `styles.css` | theme, glass system, sections, responsive rules |
| `script.js` | renders dynamic parts (ticker, services, products, branches, footer) |
| `analytics.js` | consent banner, GA4 + Vercel loader, event tracking |
| `fonts/` | self-hosted Inter / Rajdhani / Orbitron (no third-party font request) |
| `images/icons.svg` | generated SVG sprite (32 icons, replaces the 454 KB icon library) |
| `tools/build.js` | static HTML generator (`npm run build`) |
| `tools/make-sprite.js` | rebuilds `images/icons.svg` from the lucide package |
| `tools/prepare-product-images.py` | crops the brand photos into product images |
| `tools/remove-bg.py` | strips the white studio background from product photos |
| `tools/optimize-images.py` | PNG → WebP conversion for the catalogue |
| `tools/fetch-fonts.py` | downloads and self-hosts the fonts |
| `tools/make-images.py` | regenerates the OG share image and touch icon |
| `robots.txt`, `sitemap.xml`, `llms.txt`, `gk-batteries.md` | crawler + AI-agent entry points |
| `404.html`, `privacy.html` | error page and privacy policy |
| `vercel.json` | headers, CSP, cache rules, build command |

---

## Deploying

### Vercel (recommended — this is where the site points today)

The repo is already connected: **Settings → Git → connect the repo**, and every push to `main`
deploys. `vercel.json` sets the build command (`node tools/build.js`), the security headers,
the Content-Security-Policy and the cache rules.

To deploy from your machine instead:

```bash
npm i -g vercel
vercel link
vercel --prod
```

Remember to flip **Analytics → Enable** in the Vercel dashboard so the Web Analytics script is served.

### GitHub Pages

`.github/workflows/pages.yml` builds and publishes on every push to `main`.
To turn it on:

1. Repo → **Settings → Pages → Source: GitHub Actions**.
2. The site appears at `https://mr-farazkhan.github.io/gk-batteries-website/`.

All internal links are **relative**, so the same build works at a root domain (Vercel) and at a
sub-path (GitHub Pages). If you want `gkbatteries.in` served from GitHub Pages instead, add a
`CNAME` file containing `gkbatteries.in` and point the domain's DNS at GitHub.

### GitHub Actions → Vercel (CI/CD)

`.github/workflows/vercel.yml` deploys to Vercel on every push to `main`. Add these repository
secrets first:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel → Project Settings → Project ID |

---

## Editing checklist

1. Change the content in `data.js`.
2. `npm run build`.
3. `npm run serve` and check the page.
4. Commit both `data.js` and `index.html` (the generated file is part of the deploy).
5. Push — Vercel deploys automatically.

### Things to verify before you publish

- [ ] The **timeline years** in `data.js` → `about.milestones` (they are written as
      *Before 1994 → through the trade → 1994 → today*, which matches what you described:
      own store opened in 1994, prior experience in other stores).
- [ ] Owner name spelling: **Gous Khan** (or Gaus Khan?).
- [ ] The **customer reviews** in `data.js` → `reviews` are written as examples — replace them with
      real Google reviews.
- [ ] `profile.rating.count` — set your real Google review count to switch on star ratings in
      search results (left at 0, so the markup is currently omitted).
- [ ] The **product photos** are the real photos we had on hand: the brand line-up photo is
      cropped per brand (Exide, Amaron, Luminous, Tractor), and the car / bike / tubular /
      heavy-duty shots are the real product photos with their white studio background removed.
      Swap in current product shots for **SF, Yokohama and Dynex** when you have them.
- [ ] The **service-area distances** are approximate.
- [ ] `images/storefront-main.png` is a *different* shop (Manjunatha Battery Works) and is
      deliberately **not** used anywhere on the site.
