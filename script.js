/* ===== GK BATTERIES — SURGE RENDER ENGINE ===== */
/* Reads SITE_DATA from data.js and renders all sections dynamically */

document.addEventListener('DOMContentLoaded', () => {
  const D = SITE_DATA;

  const phone = () => `tel:${D.profile.phone}`;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const ico = (name) => `<svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-${name}"></use></svg>`;

  // Analytics bridge — analytics.js exposes GKAnalytics; guard for safety.
  const trackEvent = (name, params) => {
    if (window.GKAnalytics && typeof window.GKAnalytics.track === 'function') {
      window.GKAnalytics.track(name, params);
    }
  };

  // --- SEO ---
  document.title = D.profile.seo.title;
  document.querySelector('meta[name="description"]').content = D.profile.seo.description;

  // --- TICKER (with icon prefix) ---
  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    const tickerIcons = ['zap','battery-charging','phone','repeat','home','sprout'];
    const items = D.ticker.map((t, i) => `<span>${ico(tickerIcons[i % tickerIcons.length])} ${esc(t)}</span>`).join('');
    tickerTrack.innerHTML = items + items;
  }

  // --- NAV ---
  const navCall = document.getElementById('navCallBtn');
  if (navCall) { navCall.href = phone(); navCall.innerHTML = `${ico('phone')} Call Now`; }
  const mobileCall = document.getElementById('mobileCallLink');
  if (mobileCall) { mobileCall.href = phone(); mobileCall.innerHTML = `${ico('phone')} Call ${D.profile.phoneDisplay}`; }

  // --- HERO ---
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = `${esc(D.profile.tagline).replace(/(Power Partner)/, '<span class="hl">$1</span>')}`;

  const heroDesc = document.getElementById('heroDesc');
  if (heroDesc) heroDesc.textContent = D.profile.description;

  const heroBadges = document.getElementById('heroBadges');
  if (heroBadges) {
    heroBadges.innerHTML = D.badges.map(b =>
      `<span class="h-badge">${ico(b.icon)} ${esc(b.text)}</span>`
    ).join('');
  }

  const heroCtas = document.getElementById('heroCtas');
  if (heroCtas) {
    heroCtas.innerHTML = `
      <a href="${phone()}" class="btn btn-amber">${ico('phone-call')} Call Now — ${esc(D.profile.phoneDisplay)}</a>
      <a href="#products" class="btn btn-blue">${ico('battery-charging')} View Products</a>
    `;
  }

  // --- STATS ---
  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid) {
    statsGrid.innerHTML = D.stats.map(s =>
      `<div class="stat-card"><span class="stat-num">${esc(s.value)}</span><span class="stat-label">${esc(s.label)}</span></div>`
    ).join('');
  }

  // --- BRAND MARQUEE ---
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const brandItems = D.brands.map(b =>
      `<span class="marquee-item">${esc(b)}</span><span class="marquee-divider"></span>`
    ).join('');
    marqueeTrack.innerHTML = brandItems + brandItems + brandItems; // triple for wide screens
  }

  // --- ABOUT / OWNER JOURNEY ---
  const aboutOwnerIcon = document.getElementById('aboutOwnerIcon');
  const aboutOwnerName = document.getElementById('aboutOwnerName');
  const aboutOwnerRole = document.getElementById('aboutOwnerRole');
  const aboutLead = document.getElementById('aboutLead');
  const aboutStory = document.getElementById('aboutStory');
  const aboutLegacy = document.getElementById('aboutLegacy');
  const aboutTimeline = document.getElementById('aboutTimeline');
  const aboutValues = document.getElementById('aboutValues');
  if (D.about && aboutStory) {
    if (aboutOwnerIcon) aboutOwnerIcon.innerHTML = `${ico(D.about.owner.icon || 'user-round')}`;
    if (aboutOwnerName) aboutOwnerName.textContent = D.about.owner.name;
    if (aboutOwnerRole) aboutOwnerRole.textContent = D.about.owner.role;
    if (aboutLead) aboutLead.textContent = D.about.lead;
    if (aboutStory) aboutStory.innerHTML = D.about.story.map(p => `<p>${esc(p)}</p>`).join('');
    if (aboutLegacy) {
      aboutLegacy.innerHTML = D.about.legacy.map(l =>
        `<div class="legacy-card"><span class="legacy-num">${esc(l.value)}</span><span class="legacy-label">${esc(l.label)}</span></div>`
      ).join('');
    }
    if (aboutTimeline) {
      aboutTimeline.innerHTML = D.about.milestones.map(m => `
        <li class="tl-item">
          <span class="tl-dot">${ico(m.icon)}</span>
          <div class="tl-body">
            <div class="tl-meta"><span class="tl-era">${esc(m.era)}</span><span class="tl-years">${esc(m.years)}</span></div>
            <h4>${esc(m.title)}</h4>
            <p>${esc(m.text)}</p>
          </div>
        </li>
      `).join('');
    }
    if (aboutValues) {
      aboutValues.innerHTML = D.about.values.map(v => `
        <div class="value-card fade-in">
          <div class="value-icon">${ico(v.icon)}</div>
          <h4>${esc(v.title)}</h4>
          <p>${esc(v.text)}</p>
        </div>
      `).join('');
    }
  }

  // --- SERVICES ---
  const svcGrid = document.getElementById('svcGrid');
  if (svcGrid) {
    svcGrid.innerHTML = D.services.map(s => `
      <div class="svc-card fade-in">
        <div class="svc-icon ${s.iconColor}">${ico(s.icon)}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.description)}</p>
        <span class="svc-branch ${s.branch}">${esc(s.branchLabel)}</span>
      </div>
    `).join('');
  }

  // --- EMERGENCY ---
  const emergencyBtn = document.getElementById('emergencyBtn');
  if (emergencyBtn) {
    emergencyBtn.href = phone();
    emergencyBtn.innerHTML = `${ico('phone')} CALL NOW — ${esc(D.profile.phoneDisplay)}`;
  }

  // --- PRODUCTS ---
  const filterTabs = document.getElementById('filterTabs');
  const prodGrid = document.getElementById('prodGrid');
  if (filterTabs && prodGrid) {
    // Build category tabs
    const cats = [{ key: 'all', label: 'All Products' }];
    const seen = new Set();
    D.products.forEach(p => {
      if (!seen.has(p.category)) {
        seen.add(p.category);
        const label = p.category === 'auto' ? 'Automotive' : p.category === 'tractor' ? 'Tractor / Commercial' : p.category === 'inverter' ? 'Inverters & UPS' : p.category;
        cats.push({ key: p.category, label });
      }
    });

    // Build brand tabs
    const brandSet = new Set();
    D.products.forEach(p => brandSet.add(p.brand));
    const brandLabels = { exide: 'Exide', amaron: 'Amaron', sf: 'SF Sonic', yokohama: 'Yokohama', dynex: 'Dynex' };

    filterTabs.innerHTML = `
      <div class="filter-row" role="group" aria-label="Filter products by category">
        <span class="filter-label">Category:</span>
        ${cats.map((c, i) => `<button type="button" class="f-tab${i === 0 ? ' active' : ''}" data-filter="cat" data-val="${c.key}" aria-pressed="${i === 0}">${esc(c.label)}</button>`).join('')}
      </div>
      <div class="filter-row" role="group" aria-label="Filter products by brand">
        <span class="filter-label">Brand:</span>
        <button type="button" class="f-tab brand active" data-filter="brand" data-val="all" aria-pressed="true">All Brands</button>
        ${[...brandSet].map(b => `<button type="button" class="f-tab brand" data-filter="brand" data-val="${b}" aria-pressed="false">${esc(brandLabels[b] || b)}</button>`).join('')}
      </div>
    `;

    // Build product cards with data-brand
    prodGrid.innerHTML = D.products.map(p => `
      <div class="p-card fade-in" data-cat="${p.category}" data-brand="${p.brand}">
        <div class="p-img ${p.tone || 'light'}">
          <img src="${p.image}" alt="${esc(p.title)}" width="280" height="200" loading="lazy" decoding="async"/>
          ${p.badge ? `<span class="p-badge ${p.badgeType}">${esc(p.badge)}</span>` : ''}
        </div>
        <div class="p-body">
          <h3>${esc(p.title)}</h3>
          <p class="p-brand ${p.brand}">${esc(p.brandLabel)}</p>
          <ul class="p-features">${p.features.map(f => `<li>${ico('check')}${esc(f)}</li>`).join('')}</ul>
          <div class="p-exchange">${ico('repeat')} Old Battery Exchange Discount</div>
          <a href="${phone()}" class="p-call" rel="noopener" data-track="product_enquire" data-product="${esc(p.title)}">${ico('phone')} Call to Enquire</a>
        </div>
      </div>
    `).join('');
  }

  // --- WHY CHOOSE US ---
  const whyGrid = document.getElementById('whyGrid');
  if (whyGrid) {
    whyGrid.innerHTML = D.advantages.map(a => `
      <div class="why-card fade-in">
        <div class="why-icon">${ico(a.icon)}</div>
        <h3>${esc(a.title)}</h3>
        <p>${esc(a.text)}</p>
      </div>
    `).join('');
  }

  // --- TRUST STRIP ---
  const trustGrid = document.getElementById('trustGrid');
  if (trustGrid && D.trust) {
    trustGrid.innerHTML = D.trust.map(t => `
      <div class="trust-item">
        <div class="trust-icon"><svg class="ico" aria-hidden="true" focusable="false"><use href="images/icons.svg#i-${t.icon}"></use></svg></div>
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
      </div>
    `).join('');
  }

  // --- CUSTOMER REVIEWS ---
  const reviewSlider = document.getElementById('reviewSlider');
  if (reviewSlider && D.reviews) {
    reviewSlider.innerHTML = D.reviews.map(r => `
      <article class="review-card">
        <div class="review-stars" aria-label="${r.rating} out of 5 stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <blockquote>${esc(r.text)}</blockquote>
        <cite>${esc(r.name)} — ${esc(r.location)}</cite>
      </article>
    `).join('');
  }

  // --- LOCATIONS ---
  const locGrid = document.getElementById('locGrid');
  if (locGrid) {
    locGrid.innerHTML = D.locations.map(loc => `
      <div class="loc-card fade-in">
        <div class="loc-card-head">
          <h3>${esc(loc.name)}</h3>
          <span class="loc-tag ${loc.tag}">${ico(loc.tagIcon || 'map-pin')} ${esc(loc.tagLabel)}</span>
        </div>
        <div class="loc-body">
          <div class="loc-row">${ico('map-pin')}<span>${esc(loc.address)}</span></div>
          <div class="loc-row">${ico('clock')}<span>${esc(loc.hours)}</span></div>
          <div class="loc-row">${ico('phone')}<span>${esc(loc.phone)}</span></div>
          <div class="loc-highlight">${ico(loc.highlightIcon || 'info')} ${esc(loc.highlight)}</div>
          <div class="loc-btns">
            <a href="tel:${loc.phoneLink}" class="loc-btn amber" rel="noopener">${ico('phone')} Call Now</a>
            <a href="${loc.mapLink}" target="_blank" class="loc-btn outline" rel="noopener noreferrer">${ico('navigation')} Get Directions</a>
          </div>
        </div>
        ${loc.photo ? `<div class="loc-photo"><img src="${loc.photo}" alt="${esc(loc.photoAlt || loc.name + " — GK Batteries")}" width="600" height="400" loading="lazy" decoding="async"/></div>` : ''}
        <div class="loc-map"><iframe src="${loc.mapEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(loc.name)}"></iframe></div>
      </div>
    `).join('');
  }

  // --- REVIEW CTA (real Google review link) ---
  const reviewBlock = document.getElementById('reviewBlock');
  if (reviewBlock) {
    reviewBlock.innerHTML = `
      <div class="review-cta-card">
        <div class="review-cta-icon">${ico('star')}</div>
        <h3>Loved Our Service? Leave Us a Review!</h3>
        <p>Your 5-star Google review helps local customers find reliable battery service in Alnavar.</p>
        <a href="${D.profile.googleReviewLink}" target="_blank" class="google-btn" id="googleReviewBtn" data-track="review_cta_button">
          ${ico('star')} Write a Google Review
        </a>
        <div class="review-cta-contact">
          <p>Or call us directly:</p>
          <div class="review-cta-btns">
            <a href="${phone()}" class="btn btn-amber">${ico('phone-call')} Call ${esc(D.profile.phoneDisplay)}</a>
          </div>
        </div>
      </div>
    `;
  }

  // --- FOOTER (compact single row) ---
  const footerInner = document.getElementById('footerInner');
  if (footerInner) {
    // Lucide dropped brand icons in v1 — Instagram/Facebook use inline SVG marks.
    const igSvg = '<svg class="brand-ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    const fbSvg = '<svg class="brand-ico" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
    const socialLinks = [];
    if (D.profile.socialLinks.instagram) socialLinks.push(`<a href="${D.profile.socialLinks.instagram}" target="_blank" rel="noopener noreferrer" data-track="social_instagram">${igSvg} Instagram</a>`);
    if (D.profile.socialLinks.facebook) socialLinks.push(`<a href="${D.profile.socialLinks.facebook}" target="_blank" rel="noopener noreferrer" data-track="social_facebook">${fbSvg} Facebook</a>`);

    footerInner.innerHTML = `
      <div class="footer-brand">
        <img src="images/favicon.png" alt="GK" width="32" height="32"/>
        <span>${esc(D.profile.name)}</span>
      </div>
      <div class="footer-links">
        <a href="#service-area">${ico('map-pin')} Service Area</a>
        <a href="#faq">${ico('messages-square')} FAQ</a>
        <a href="#proof">${ico('camera')} Our Work</a>
        <a href="${phone()}" rel="noopener">${ico('phone')} ${esc(D.profile.phoneDisplay)}</a>
        ${socialLinks.join('')}
        <a href="${D.locations[0].mapLink}" target="_blank" rel="noopener noreferrer">${ico('navigation')} Directions</a>
        <a href="privacy.html">${ico('shield-check')} Privacy</a>
      </div>
    `;
  }

  const footerCopy = document.getElementById('footerCopy');
  if (footerCopy) {
    footerCopy.textContent = `© ${D.profile.sinceYear}–${new Date().getFullYear()} ${D.profile.name}, Alnavar. Authorized Multi-Brand Battery & Inverter Dealer. All rights reserved.`;
  }

  // --- CALL FLOAT ---
  const callFloat = document.getElementById('callFloat');
  if (callFloat) callFloat.href = phone();

  // --- STICKY MOBILE CTA ---
  const stickyCta = document.getElementById('stickyCta');
  if (stickyCta) {
    stickyCta.innerHTML = `
      <a href="${phone()}" class="sticky-call" rel="noopener" data-track="sticky_call">${ico('phone-call')} <span>Call Now</span></a>
      <a href="${D.locations[0].mapLink}" target="_blank" rel="noopener noreferrer" class="sticky-dir" data-track="sticky_directions">${ico('navigation')} <span>Directions</span></a>
    `;
    // hide the bar once the footer is on screen (the footer already has both actions)
    const footer = document.querySelector('.footer');
    if (footer && 'IntersectionObserver' in window) {
      const fo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          stickyCta.classList.toggle('is-hidden', en.isIntersecting);
        });
      }, { threshold: 0.05 });
      fo.observe(footer);
    }
  }

  // --- MOBILE MENU ---
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileBtn.classList.toggle('active');
      mobileBtn.setAttribute('aria-expanded', isOpen);
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
    });
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // --- PRODUCT FILTER (supports both category and brand) ---
  let activeCat = 'all';
  let activeBrand = 'all';
  function filterProducts() {
    document.querySelectorAll('.p-card').forEach(card => {
      const matchCat = activeCat === 'all' || card.dataset.cat === activeCat;
      const matchBrand = activeBrand === 'all' || card.dataset.brand === activeBrand;
      if (matchCat && matchBrand) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeUp .4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  }
  function bindFilter(kind, key) {
    document.querySelectorAll('.f-tab[data-filter="' + kind + '"]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.f-tab[data-filter="' + kind + '"]').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-pressed', 'true');
        if (kind === 'cat') activeCat = tab.dataset.val; else activeBrand = tab.dataset.val;
        filterProducts();
        trackEvent('product_filter', { filter: kind, value: tab.dataset.val });
      });
    });
  }
  bindFilter('cat', 'cat');
  bindFilter('brand', 'brand');

  // --- SCROLL ANIMATIONS ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in, .slide-left, .slide-right').forEach(el => observer.observe(el));

  // --- STAT COUNTER ---
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (match) {
          const target = parseInt(match[1]);
          const suffix = text.replace(match[1], '');
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current + suffix;
          }, 30);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

  // --- NAVBAR SCROLL ---
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    if (topbar) topbar.style.background = window.scrollY > 50 ? 'rgba(10,14,26,.95)' : 'rgba(10,14,26,.85)';
    // Active link
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.tb-link').forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current ? '#f59e0b' : '';
    });
  }, { passive: true });
});

// Fade-up keyframe
const _s = document.createElement('style');
_s.textContent = '@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(_s);
