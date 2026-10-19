/* ===== GK BATTERIES — ANALYTICS ENGINE =====
 * Consent-aware tracking for Google Analytics 4 + Vercel Web Analytics.
 * One public helper — trackEvent(name, params) — fires to BOTH providers.
 * Configure IDs in data.js → SITE_DATA.analytics
 * ============================================ */

(function () {
  'use strict';

  // data.js declares `const SITE_DATA` (a global lexical binding, not a window property),
  // so read it directly and fall back to window.SITE_DATA.
  const SITE = (typeof SITE_DATA !== 'undefined' && SITE_DATA) || window.SITE_DATA || {};
  const CFG = SITE.analytics || {};
  const CONSENT_KEY = 'gk_analytics_consent';
  const GA_ID = (CFG.gaId || '').trim();

  let gaReady = false;   // gtag.js loaded
  let vaReady = false;   // Vercel script loaded
  let consent = readConsent();

  /* ---------- consent helpers ---------- */
  function readConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const ageDays = (Date.now() - (parsed.ts || 0)) / 86400000;
      if (CFG.consentExpiryDays && ageDays > CFG.consentExpiryDays) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return parsed.value; // 'granted' | 'denied'
    } catch (e) {
      return null;
    }
  }

  function saveConsent(value) {
    consent = value;
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ value: value, ts: Date.now() }));
    } catch (e) { /* private mode */ }
  }

  /* ---------- Google Analytics 4 ---------- */
  function initGA() {
    if (gaReady || !GA_ID || GA_ID.indexOf('G-') !== 0) return;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    // Consent Mode v2 — nothing is stored or sent until the visitor accepts.
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    s.onload = function () { gaReady = true; flushQueue(); };
    s.onerror = function () { gaReady = false; };
    document.head.appendChild(s);
  }

  function grantGA() {
    if (!GA_ID) return;
    if (!gaReady && !window.__gkGtag) {
      // bootstrap gtag queue so the consent update is not lost
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.__gkGtag = true;
    }
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    initGA();
  }

  /* ---------- Vercel Web Analytics ---------- */
  function initVercel() {
    if (vaReady) return;
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    const s = document.createElement('script');
    s.defer = true;
    s.src = CFG.vercelPath || '/_vercel/insights/script.js';
    s.onload = function () { vaReady = true; flushQueue(); };
    s.onerror = function () { vaReady = false; };
    document.head.appendChild(s);
    vaReady = true; // queue locally regardless
  }

  /* ---------- unified event queue ---------- */
  const queue = [];

  function trackEvent(name, params) {
    const data = params || {};

    // GA4
    if (GA_ID) {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, data);
      } else {
        queue.push({ p: 'ga', name: name, data: data });
      }
    }

    // Vercel
    if (typeof window.va === 'function') {
      window.va('event', { name: name, data: data });
    } else {
      queue.push({ p: 'va', name: name, data: data });
    }
  }

  function flushQueue() {
    while (queue.length) {
      const q = queue.shift();
      if (q.p === 'ga' && typeof window.gtag === 'function') window.gtag('event', q.name, q.data);
      if (q.p === 'va' && typeof window.va === 'function') window.va('event', { name: q.name, data: q.data });
    }
  }

  /* ---------- placement attribution ---------- */
  const PLACEMENT_RULES = [
    ['#topbar', 'nav'],
    ['.mobile-drawer', 'nav_mobile'],
    ['.hero', 'hero'],
    ['.emergency-strip', 'emergency'],
    ['.p-card', 'product_card'],
    ['.loc-card', 'branch_card'],
    ['.about-values', 'about'],
    ['.review-cta-card', 'review_cta'],
    ['.footer', 'footer'],
    ['#stickyCta', 'sticky_bar'],
    ['#faq', 'faq']
  ];

  function placementOf(el) {
    if (!el) return 'unknown';
    for (let i = 0; i < PLACEMENT_RULES.length; i++) {
      const sel = PLACEMENT_RULES[i][0];
      if (el.closest(sel)) return PLACEMENT_RULES[i][1];
    }
    return (el.dataset && el.dataset.track) || 'other';
  }

  /* ---------- auto event wiring ---------- */
  function wireClicks() {
    document.addEventListener('click', function (e) {
      const el = e.target.closest('a, button');
      if (!el) return;

      const href = el.getAttribute('href') || '';
      const explicit = el.dataset ? el.dataset.track : '';

      if (href.indexOf('tel:') === 0) {
        const params = {
          placement: placementOf(el),
          label: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60)
        };
        if (el.dataset && el.dataset.product) params.product = el.dataset.product;
        trackEvent('call_click', params);
        return;
      }
      if (/maps\.google|goo\.gl\/maps|google\.com\/maps/.test(href)) {
        trackEvent('direction_click', { placement: placementOf(el) });
        return;
      }
      if (/g\.page\/|\/review|google\.com\/maps\/place/.test(href) || /review/i.test(el.textContent || '')) {
        trackEvent('review_click', { placement: placementOf(el) });
        return;
      }
      if (explicit === 'product_enquire') {
        trackEvent('product_enquire', {
          placement: placementOf(el),
          product: el.dataset.product || ''
        });
        return;
      }
      if (explicit) {
        trackEvent(explicit, { placement: placementOf(el) });
      }
    }, true);
  }

  /* ---------- scroll depth ---------- */
  function wireScrollDepth() {
    const sent = {};
    const milestones = [25, 50, 75, 100];
    let ticking = false;

    function check() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round((window.scrollY / scrollable) * 100);
      milestones.forEach(function (m) {
        if (pct >= m && !sent[m]) {
          sent[m] = true;
          trackEvent('scroll_depth', { percent: m });
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(check);
      }
    }, { passive: true });
  }

  /* ---------- section views ---------- */
  function wireSectionViews() {
    if (!('IntersectionObserver' in window)) return;
    const targets = [
      { sel: '#about', event: 'about_view' },
      { sel: '#services', event: 'services_view' },
      { sel: '#products', event: 'products_view' },
      { sel: '#locations', event: 'locations_view' },
      { sel: '#faq', event: 'faq_view' }
    ];
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const t = targets.find(function (x) { return x.sel === '#' + entry.target.id; });
        if (t) trackEvent(t.event, { section: entry.target.id });
        io.unobserve(entry.target);
      });
    }, { threshold: 0.25 });
    targets.forEach(function (t) {
      const el = document.querySelector(t.sel);
      if (el) io.observe(el);
    });
  }

  /* ---------- consent banner ---------- */
  function buildBanner() {
    const wrap = document.createElement('div');
    wrap.className = 'consent-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Cookie and analytics consent');
    wrap.innerHTML =
      '<div class="consent-inner">' +
        '<p class="consent-text"><svg class="ico" aria-hidden="true" focusable="false"><use href="/images/icons.svg#i-shield-check"></use></svg>' +
        '<span>We use cookies and privacy-friendly analytics to understand which regions our visitors come from. No ad tracking, no selling of data.</span></p>' +
        '<div class="consent-btns">' +
          '<button type="button" class="consent-btn accept" id="consentAccept">Accept</button>' +
          '<button type="button" class="consent-btn decline" id="consentDecline">Decline</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);

    const accept = wrap.querySelector('#consentAccept');
    const decline = wrap.querySelector('#consentDecline');

    accept.addEventListener('click', function () {
      saveConsent('granted');
      grantGA();
      wrap.classList.add('hide');
      setTimeout(function () { wrap.remove(); }, 400);
      trackEvent('consent_update', { consent: 'granted' });
    });
    decline.addEventListener('click', function () {
      saveConsent('denied');
      wrap.classList.add('hide');
      setTimeout(function () { wrap.remove(); }, 400);
      trackEvent('consent_update', { consent: 'denied' });
    });
  }

  /* ---------- init ---------- */
  function init() {
    // Vercel Web Analytics: cookie-free, no personal data — safe to load early.
    if (CFG.vercelAlwaysOn !== false) initVercel();

    if (consent === 'granted') {
      grantGA();
    } else if (consent === 'denied') {
      if (GA_ID) {
        // still set Consent Mode default so nothing is collected if GA loads later
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
    } else {
      buildBanner();
    }

    wireClicks();
    wireScrollDepth();
    wireSectionViews();
  }

  // public API
  window.GKAnalytics = {
    track: trackEvent,
    grant: function () { saveConsent('granted'); grantGA(); },
    deny: function () { saveConsent('denied'); },
    getConsent: function () { return consent; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
