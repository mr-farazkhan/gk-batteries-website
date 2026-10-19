# GK Batteries — Analytics & Region Tracking Guide

Two providers are wired up in `analytics.js`. Both are consent-aware.

| Provider | What it gives you | Setup |
|---|---|---|
| **Google Analytics 4 (GA4)** | Country / **state / city / district** of every visitor, traffic sources, and every custom event (calls, directions, reviews, scroll depth) | Paste your ID in `data.js` → `analytics.gaId` |
| **Vercel Web Analytics** | Cookie-free page views, top pages, referrers, country, device, browser | Dashboard → Analytics → **Enable**, then redeploy |

---

## 1. Turn on GA4 (5 minutes)

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin** → **Create property** → *Web*.
2. Name it `GK Batteries Alnavar`, set the URL to `https://gkbatteries.in` (or your live domain).
3. **Data streams → Web → URL** → copy the **Measurement ID** (`G-XXXXXXXXXX`).
4. Open `data.js` and paste it:

```js
analytics: {
  gaId: "G-XXXXXXXXXX",   // ← paste here
  ...
}
```

5. Deploy. The GA4 script only loads **after** the visitor clicks *Accept* on the consent banner — so nothing is collected before consent (GDPR/DPDP-safe).

## 2. Turn on Vercel Web Analytics

1. Vercel dashboard → your project → **Analytics** tab → **Enable**.
2. Redeploy. `/_vercel/insights/script.js` is served automatically and starts recording.
3. It is cookie-free and loads immediately (configurable: `analytics.vercelAlwaysOn`).

---

## 3. Find out which region the traffic comes from

### GA4 (most detailed — city & district level)

| Report | Path | What you see |
|---|---|---|
| **Geo → Country** | Reports → Audience → Geo | Which country visitors come from |
| **Geo → City** | Reports → Audience → Geo | **Which city** — e.g. Belgaum, Dharwad, Hubli, Panaji |
| **Geo → Region** | Reports → Audience → Geo | **Which state** — Karnataka, Goa, Maharashtra |
| **Sessions by City** | Explore → Free Form | Cross-cut sessions, calls and revenue by city |

**Custom report for "who actually calls"** (the number that matters):

1. **Explore → Blank canvas** → import dimensions `City`, `Region`, `Country`.
2. Import metrics `Sessions`, `Event count` (filter event name = `call_click`).
3. Save as *Calls by City*. Now you see which regions produce real phone calls, not just page views.

**Realtime** (Reports → Realtime) shows live visitors with their city while traffic is coming in — handy on a busy market day.

### Vercel Web Analytics

Dashboard → Analytics → **Visitors** → panels: `Countries`, `Devices`, `Browsers`, `Top Pages`, `Referrers`, `Events`.

> Vercel custom events need a Pro/Enterprise plan. On the free plan GA4 is your event source.

---

## 4. Events being tracked

| Event | Fires when | Key parameters |
|---|---|---|
| `call_click` | Any `tel:` link is clicked | `placement` (nav, hero, emergency, product_card, branch_card, footer, sticky_bar), `product` (for product cards) |
| `direction_click` | "Get Directions" is clicked | `placement` |
| `review_click` | "Write a Google Review" is clicked | `placement` |
| `consent_update` | Visitor accepts or declines | `consent` (granted / denied) |
| `about_view` | About section scrolls into view | `section` |
| `services_view`, `products_view`, `locations_view`, `faq_view` | Section scrolls into view | `section` |
| `scroll_depth` | Visitor scrolls 25 / 50 / 75 / 100 % | `percent` |

To find them in GA4: **Reports → Events → View in Explore**, or set a custom dimension on `event_name`.

---

## 5. Useful conversions to add later

- Mark `call_click` as a **Key Event** (GA4 → Admin → Events → Mark as key event). It is your primary conversion.
- Import calls as **Google Ads offline conversions** (with customer consent) to see which regions are worth advertising in.
- Send a **click-to-call** from a Google Business Profile so mobile taps land on a tracked number.

---

## 6. Testing checklist

- [ ] `analytics.gaId` filled in and deployed
- [ ] Banner appears on first visit → click *Accept*
- [ ] GA4 **Realtime** shows your visit
- [ ] `call_click` appears in GA4 Events within a few minutes
- [ ] Vercel Analytics shows a visitor within ~30 s of a visit
- [ ] `https://gkbatteries.in/robots.txt` and `/sitemap.xml` return 200
