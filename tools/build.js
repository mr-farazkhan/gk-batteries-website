/* ===== GK BATTERIES — STATIC HTML GENERATOR =====
 * Reads data.js (single source of truth) and injects crawlable, static HTML
 * into index.html between `<!-- @gen:KEY -->` markers.
 *
 * Why: WhatsApp/Facebook previews, Bing and AI crawlers (ChatGPT, Perplexity,
 * Claude) do not execute JavaScript. This makes the real content visible to
 * them while keeping data.js as the only place to edit copy.
 *
 * Run:  node tools/build.js
 * ====================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://gkbatteries.in';
const INDEX = path.join(ROOT, 'index.html');

/* ---------- load data.js ---------- */
function loadData() {
  const src = fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8');
  const win = {};
  const fn = new Function('window', src + '\nreturn SITE_DATA;');
  return fn(win);
}

/* ---------- helpers ---------- */
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const abs = (p) => SITE_URL + '/' + String(p).replace(/^\//, '');

const ico = (name) => '<svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-' + name + '"></use></svg>';

/* ---------- head meta ---------- */
function buildHead(D) {
  const s = D.profile.seo;
  const url = SITE_URL + '/';
  const img = abs('images/og-cover.jpg');
  return [
    `<title>${esc(s.title)}</title>`,
    `<meta name="description" content="${esc(s.description)}"/>`,
    `<meta name="keywords" content="${esc(s.keywords.join(', '))}"/>`,
    `<meta name="author" content="GK Batteries, Alnavar"/>`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>`,
    `<meta name="google-site-verification" content="" data-placeholder="paste-your-gsc-token"/>`,
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:type" content="website"/>`,
    `<meta property="og:site_name" content="GK Batteries"/>`,
    `<meta property="og:title" content="${esc(s.title)}"/>`,
    `<meta property="og:description" content="${esc(s.description)}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    `<meta property="og:image" content="${img}"/>`,
    `<meta property="og:image:width" content="1200"/>`,
    `<meta property="og:image:height" content="630"/>`,
    `<meta property="og:image:alt" content="GK Batteries — multi-brand car, inverter and tractor battery dealer in Alnavar, Karnataka"/>`,
    `<meta property="og:locale" content="en_IN"/>`,
    `<meta property="og:region" content="IN-KA"/>`,
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${esc(s.title)}"/>`,
    `<meta name="twitter:description" content="${esc(s.description)}"/>`,
    `<meta name="twitter:image" content="${img}"/>`,
    `<meta name="geo.region" content="IN-KA"/>`,
    `<meta name="geo.placename" content="Alnavar, Dharwad District, Karnataka"/>`,
    `<meta name="geo.position" content="15.7563;74.4886"/>`,
    `<meta name="ICBM" content="region = IN-KA, Alnavar"/>`,
    `<link rel="alternate" type="text/markdown" href="gk-batteries.md"/>`,
    `<link rel="describedby" href="llms.txt"/>`,
    `<link rel="apple-touch-icon" href="images/apple-touch-icon.png"/>`
  ].join('\n');
}

/* ---------- JSON-LD @graph ---------- */
function buildSchema(D) {
  const p = D.profile;
  const orgId = SITE_URL + '/#organization';
  const graph = [];

  graph.push({
    '@type': 'Organization',
    '@id': orgId,
    'name': p.name,
    'alternateName': 'GK Battery',
    'url': SITE_URL + '/',
    'logo': abs('images/logo.webp'),
    'image': abs('images/og-cover.jpg'),
    'description': p.description,
    'foundingDate': String(p.sinceYear),
    'email': p.email || undefined,
    'telephone': p.phone,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'NH 67, Goa Cross',
      'addressLocality': 'Alnavar',
      'addressRegion': 'Karnataka',
      'postalCode': '581103',
      'addressCountry': 'IN'
    },
    'founder': { '@id': SITE_URL + '/#gous-khan' },
    'sameAs': Object.values(p.socialLinks || {}).filter(Boolean),
    'contactPoint': [{
      '@type': 'ContactPoint',
      'telephone': p.phone,
      'contactType': 'sales',
      'areaServed': ['IN', 'IN-KA', 'IN-GA', 'IN-MH'],
      'availableLanguage': ['en', 'kn', 'hi']
    }]
  });

  graph.push({
    '@type': 'WebSite',
    '@id': SITE_URL + '/#website',
    'url': SITE_URL + '/',
    'name': p.name,
    'description': p.seo.description,
    'inLanguage': 'en-IN',
    'publisher': { '@id': orgId }
  });

  graph.push({
    '@type': 'Person',
    '@id': SITE_URL + '/#gous-khan',
    'name': D.about.owner.name,
    'jobTitle': D.about.owner.role,
    'description': 'Owner of GK Batteries in Alnavar. More than 50 years of hands-on battery experience: he built hard-rubber (HR) batteries by hand while working in other stores, then opened his own GK Batteries store in Alnavar in 1994 and grew it into an authorized multi-brand dealer with two branches.',
    'worksFor': { '@id': orgId }
  });

  D.locations.forEach((loc, i) => {
    const node = {
      '@type': ['LocalBusiness', 'BatteryStore'],
      '@id': SITE_URL + '/#branch-' + (i + 1),
      'name': p.name + ' — ' + loc.name.replace(/^Branch\s*\d+\s*—\s*/, ''),
      'url': SITE_URL + '/#locations',
      'image': abs('images/og-cover.jpg'),
      'telephone': loc.phoneLink,
      'parentOrganization': { '@id': orgId },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': loc.address.split(',')[0],
        'addressLocality': 'Alnavar',
        'addressRegion': 'Karnataka',
        'postalCode': '581103',
        'addressCountry': 'IN'
      },
      'openingHoursSpecification': [{
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '07:00',
        'closes': '19:00'
      }],
      'priceRange': '₹₹',
      'currenciesAccepted': 'INR',
      'paymentAccepted': 'Cash, UPI, Cards, Bank Transfer',
      'areaServed': (D.serviceArea.items || []).map(a => ({
        '@type': 'City',
        'name': a.name
      })),
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Battery catalog',
        'itemListElement': D.products.map(prod => ({
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Product',
            'name': prod.title,
            'category': prod.category,
            'image': abs(prod.image),
            'brand': { '@type': 'Brand', 'name': prod.brand.toUpperCase() }
          }
        }))
      }
    };
    // geo only where we are confident of the pin
    if (i === 0) node.geo = { '@type': 'GeoCoordinates', latitude: 15.7563, longitude: 74.4886 };
    if (p.rating && p.rating.count > 0) {
      node.aggregateRating = {
        '@type': 'AggregateRating',
        'ratingValue': p.rating.value,
        'reviewCount': p.rating.count,
        'bestRating': 5
      };
    }
    graph.push(node);
  });

  D.services.forEach(svc => {
    graph.push({
      '@type': 'Service',
      'name': svc.title,
      'description': svc.description,
      'serviceType': svc.title,
      'provider': { '@id': orgId },
      'areaServed': { '@type': 'State', 'name': 'Karnataka' },
      'url': SITE_URL + '/#services'
    });
  });

  if (D.faq && D.faq.items && D.faq.items.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': SITE_URL + '/#faq',
      'mainEntity': D.faq.items.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.a }
      }))
    });
  }

  graph.push({
    '@type': 'BreadcrumbList',
    'itemListElement': [{ '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': SITE_URL + '/' }]
  });

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

/* ---------- sections ---------- */
function buildAbout(D) {
  const a = D.about;
  const milestones = a.milestones.map(m => `
          <li class="tl-item">
            <span class="tl-dot">${ico(esc(m.icon))}</span>
            <div class="tl-body">
              <div class="tl-meta"><span class="tl-era">${esc(m.era)}</span><span class="tl-years">${esc(m.years)}</span></div>
              <h4>${esc(m.title)}</h4>
              <p>${esc(m.text)}</p>
            </div>
          </li>`).join('');

  const legacy = a.legacy.map(l =>
    `<div class="legacy-card"><span class="legacy-num">${esc(l.value)}</span><span class="legacy-label">${esc(l.label)}</span></div>`
  ).join('\n          ');

  const values = a.values.map(v => `
        <div class="value-card fade-in">
          <div class="value-icon">${ico(esc(v.icon))}</div>
          <h4>${esc(v.title)}</h4>
          <p>${esc(v.text)}</p>
        </div>`).join('');

  return `
    <section class="section" id="about" aria-label="About GK Batteries — the journey of owner Gous Khan">
      <div class="container">
        <div class="sec-header fade-in">
          <div class="sec-tag">${ico('history')} ${esc(a.eyebrow)}</div>
          <h2>50+ Years of Batteries, <span class="hl">One Family Name</span></h2>
          <p>Owner Gous Khan built hard-rubber batteries by hand, learned the trade in other stores, and opened his own GK Batteries shop in Alnavar in 1994. This is the journey since.</p>
        </div>
        <div class="about-grid">
          <div class="about-story fade-in">
            <div class="about-owner">
              <div class="about-owner-icon">${ico(esc(a.owner.icon))}</div>
              <div class="about-owner-meta">
                <h3>${esc(a.owner.name)}</h3>
                <span>${esc(a.owner.role)}</span>
              </div>
            </div>
            <p class="about-lead">${esc(a.lead)}</p>
            <div class="about-prose">
              ${a.story.map(t => `<p>${esc(t)}</p>`).join('\n              ')}
            </div>
            <div class="about-legacy">
          ${legacy}
            </div>
          </div>
          <div class="about-timeline-card fade-in">
            <h3 class="about-tl-title">${ico('milestone')} The Journey</h3>
            <ol class="about-tl">
          ${milestones}
            </ol>
          </div>
        </div>
        <div class="about-media fade-in">
          <figure class="about-photo">
            <img src="images/brands-lineup.webp" alt="Real battery stock lined up on the GK Batteries counter" width="760" height="760" loading="lazy" decoding="async"/>
            <figcaption>Fifty years on, the counter still looks like this — real stock, real brands, real advice.</figcaption>
          </figure>
          <div class="about-media-text">
            <h3>From making batteries to standing behind them</h3>
            <p>What changed in the workshop was the material. What never changed was the standard: a battery that starts the vehicle the first time, an old battery valued honestly, and a phone that a customer can ring and actually get answered.</p>
            <ul class="about-checks">
              <li>${ico('check')} Hand-built HR batteries — plates, cells and casings assembled by hand</li>
              <li>${ico('check')} Re-tooled for poly-cased, tubular and maintenance-free VRLA chemistry</li>
              <li>${ico('check')} Own shop in Alnavar since 1994, now two branches</li>
              <li>${ico('check')} Authorized Exide, Amaron, SF, Yokohama &amp; Dynex stock</li>
            </ul>
          </div>
        </div>
        <div class="about-values">
          ${values}
        </div>
      </div>
    </section>`;
}

function buildServiceArea(D) {
  const sa = D.serviceArea;
  const tagLabel = { hub: 'Home base', free: 'Free delivery', order: 'On order' };
  const items = sa.items.map(a => `
          <li class="sa-item">
            <span class="sa-tag ${esc(a.tag)}">${esc(tagLabel[a.tag] || a.tag)}</span>
            <span class="sa-name">${esc(a.name)}</span>
            <span class="sa-dist">${esc(a.distance)}</span>
            <span class="sa-note">${esc(a.note)}</span>
          </li>`).join('');

  return `
    <section class="section" id="service-area" aria-label="Service area — towns we deliver batteries to">
      <div class="container">
        <div class="sec-header fade-in">
          <div class="sec-tag"><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-map-pin"></use></svg> Service Area</div>
          <h2>${esc(sa.title)}</h2>
          <p>${esc(sa.intro)}</p>
        </div>
        <ul class="sa-list fade-in">
          ${items}
        </ul>
        <div class="sa-cta fade-in">
          <p><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-truck"></use></svg> Need a battery delivered outside this list? We still cover most of the Dharwad district and the NH-67 corridor.</p>
          <a href="tel:${esc(D.profile.phone)}" class="btn btn-amber" rel="noopener" data-track="service_area_call"><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-phone-call"></use></svg> Call ${esc(D.profile.phoneDisplay)}</a>
        </div>
      </div>
    </section>`;
}

function buildFaq(D) {
  const f = D.faq;
  const items = f.items.map((q, i) => `
          <details class="faq-item"${i === 0 ? ' open' : ''}>
            <summary class="faq-q"><span>${esc(q.q)}</span><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-chevron-down"></use></svg></summary>
            <div class="faq-a"><p>${esc(q.a)}</p></div>
          </details>`).join('');

  return `
    <section class="section" id="faq" aria-label="Frequently asked questions about batteries">
      <div class="container">
        <div class="sec-header fade-in">
          <div class="sec-tag"><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-messages-square"></use></svg> FAQ</div>
          <h2>${esc(f.title)}</h2>
          <p>${esc(f.intro)}</p>
        </div>
        <div class="faq-list fade-in" id="faqList">
          ${items}
        </div>
        <div class="faq-cta fade-in">
          <p>Still unsure which battery fits? Call us — we will check your vehicle or load and recommend the right one, free of charge.</p>
          <a href="tel:${esc(D.profile.phone)}" class="btn btn-amber" rel="noopener" data-track="faq_call"><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-phone-call"></use></svg> Call ${esc(D.profile.phoneDisplay)}</a>
        </div>
      </div>
    </section>`;
}

function buildHeroTitle(D) {
  return esc(D.profile.tagline).replace(/(Power Partner)/, '<span class="hl">$1</span>');
}

function buildHeroDesc(D) {
  return esc(D.profile.description);
}

/* ---------- markdown export (llms.txt companion, .md alternate) ---------- */
function buildMarkdown(D) {
  const p = D.profile;
  const L = [];
  L.push('# GK Batteries — ' + p.tagline);
  L.push('');
  L.push('> ' + p.description);
  L.push('');
  L.push('**Phone:** ' + p.phoneDisplay + '  ');
  L.push('**Branches:** 2 (NH-67 Goa Cross — highway service; Azad Road — sales & service)  ');
  L.push('**Hours:** Monday–Sunday, 7:00 AM – 7:00 PM  ');
  L.push('**Address:** NH-67, Goa Cross, Alnavar, Dharwad District, Karnataka 581103, India  ');
  L.push('**Website:** https://gkbatteries.in/');
  L.push('');
  L.push('## Owner');
  L.push('');
  L.push('**' + D.about.owner.name + '** — ' + D.about.owner.role + '. ' + D.about.lead);
  L.push('');
  D.about.story.forEach(t => { L.push(t); L.push(''); });
  L.push('### Journey');
  L.push('');
  D.about.milestones.forEach(m => {
    L.push('**' + m.years + ' — ' + m.era + ':** ' + m.title + '. ' + m.text);
    L.push('');
  });
  L.push('## Services');
  L.push('');
  D.services.forEach(s => L.push('- **' + s.title + '** (' + s.branchLabel + '): ' + s.description));
  L.push('');
  L.push('## Products');
  L.push('');
  D.products.forEach(pr => {
    L.push('- **' + pr.title + '** — ' + pr.brandLabel + '. ' + pr.features.join('; ') + '.');
  });
  L.push('');
  L.push('## Branches');
  L.push('');
  D.locations.forEach(l => {
    L.push('### ' + l.name);
    L.push('');
    L.push('- Address: ' + l.address);
    L.push('- Hours: ' + l.hours);
    L.push('- Phone: ' + l.phone);
    L.push('- Focus: ' + l.highlight);
    L.push('- Map: ' + l.mapLink);
    L.push('');
  });
  L.push('## Service area');
  L.push('');
  L.push('| Town | Distance | Coverage |');
  L.push('| --- | --- | --- |');
  D.serviceArea.items.forEach(a => L.push('| ' + a.name + ' | ' + a.distance + ' | ' + a.note + ' |'));
  L.push('');
  L.push('## FAQ');
  L.push('');
  D.faq.items.forEach(f => {
    L.push('### ' + f.q);
    L.push('');
    L.push(f.a);
    L.push('');
  });
  L.push('## Contact');
  L.push('');
  L.push('- Phone: ' + p.phoneDisplay + ' (' + p.phone + ')');
  Object.values(p.socialLinks || {}).filter(Boolean).forEach(u => L.push('- ' + u));
  L.push('- Instagram: https://www.instagram.com/gk_batteries');
  L.push('');
  return L.join('\n');
}

/* ---------- injection ---------- */
function inject(html, key, content) {
  const open = '<!-- @gen:' + key + ' -->';
  const close = '<!-- /@gen:' + key + ' -->';
  const i = html.indexOf(open);
  if (i === -1) return { html: html, changed: false };
  const j = html.indexOf(close, i);
  if (j === -1) return { html: html, changed: false };
  const before = html.slice(0, i + open.length);
  const after = html.slice(j);
  return { html: before + '\n' + content + '\n' + after, changed: true };
}

/* ---------- main ---------- */
function main() {
  const D = loadData();
  let html = fs.readFileSync(INDEX, 'utf8');

  const blocks = {
    head: buildHead(D),
    jsonld: '<script type="application/ld+json">\n' + buildSchema(D) + '\n</script>',
    heroTitle: buildHeroTitle(D),
    heroDesc: buildHeroDesc(D),
    aboutSection: buildAbout(D),
    serviceAreaSection: buildServiceArea(D),
    faqSection: buildFaq(D)
  };

  const changed = [];
  Object.keys(blocks).forEach(key => {
    const res = inject(html, key, blocks[key]);
    html = res.html;
    if (res.changed) changed.push(key);
  });

  fs.writeFileSync(INDEX, html, 'utf8');
  console.log('[build] index.html updated → ' + (changed.length ? changed.join(', ') : 'no markers matched'));
  console.log('[build] blocks generated: ' + Object.keys(blocks).length);

  const md = path.join(ROOT, 'gk-batteries.md');
  fs.writeFileSync(md, buildMarkdown(D), 'utf8');
  console.log('[build] gk-batteries.md written');

  // keep the copyright year fresh on the static pages (no inline JS -> CSP-safe)
  const year = String(new Date().getFullYear());
  ['privacy.html', '404.html'].forEach(f => {
    const fp = path.join(ROOT, f);
    if (!fs.existsSync(fp)) return;
    const cur = fs.readFileSync(fp, 'utf8');
    const next = cur.replace(/\{\{YEAR\}\}/g, year);
    if (next !== cur) { fs.writeFileSync(fp, next, 'utf8'); console.log('[build] ' + f + ' year updated'); }
  });
}

try {
  main();
} catch (err) {
  // Never fail a deploy: the committed index.html is still valid.
  console.error('[build] ERROR: ' + (err && err.message ? err.message : err));
  console.error('[build] Continuing with the existing index.html');
}
