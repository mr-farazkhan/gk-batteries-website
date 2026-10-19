/* ===== GK BATTERIES — SURGE RENDER ENGINE ===== */
/* Reads SITE_DATA from data.js and renders all sections dynamically */

document.addEventListener('DOMContentLoaded', () => {
  const D = SITE_DATA;

  const phone = () => `tel:${D.profile.phone}`;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  // --- SEO ---
  document.title = D.profile.seo.title;
  document.querySelector('meta[name="description"]').content = D.profile.seo.description;

  // --- TICKER (with icon prefix) ---
  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    const tickerIcons = ['zap','battery-charging','phone','repeat','home','sprout'];
    const items = D.ticker.map((t, i) => `<span><i data-lucide="${tickerIcons[i % tickerIcons.length]}"></i> ${esc(t)}</span>`).join('');
    tickerTrack.innerHTML = items + items;
  }

  // --- NAV ---
  const navCall = document.getElementById('navCallBtn');
  if (navCall) { navCall.href = phone(); navCall.innerHTML = `<i data-lucide="phone"></i> Call Now`; }
  const mobileCall = document.getElementById('mobileCallLink');
  if (mobileCall) { mobileCall.href = phone(); mobileCall.innerHTML = `<i data-lucide="phone"></i> Call ${D.profile.phoneDisplay}`; }

  // --- HERO ---
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = `${esc(D.profile.tagline).replace(/(Power Partner)/, '<span class="hl">$1</span>')}`;

  const heroDesc = document.getElementById('heroDesc');
  if (heroDesc) heroDesc.textContent = D.profile.description;

  const heroBadges = document.getElementById('heroBadges');
  if (heroBadges) {
    heroBadges.innerHTML = D.badges.map(b =>
      `<span class="h-badge"><i data-lucide="${b.icon}"></i> ${esc(b.text)}</span>`
    ).join('');
  }

  const heroCtas = document.getElementById('heroCtas');
  if (heroCtas) {
    heroCtas.innerHTML = `
      <a href="${phone()}" class="btn btn-amber"><i data-lucide="phone-call"></i> Call Now — ${esc(D.profile.phoneDisplay)}</a>
      <a href="#products" class="btn btn-blue"><i data-lucide="battery-charging"></i> View Products</a>
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
    if (aboutOwnerIcon) aboutOwnerIcon.innerHTML = `<i data-lucide="${D.about.owner.icon || 'user-round'}"></i>`;
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
          <span class="tl-dot"><i data-lucide="${m.icon}"></i></span>
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
          <div class="value-icon"><i data-lucide="${v.icon}"></i></div>
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
        <div class="svc-icon ${s.iconColor}"><i data-lucide="${s.icon}"></i></div>
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
    emergencyBtn.innerHTML = `<i data-lucide="phone"></i> CALL NOW — ${esc(D.profile.phoneDisplay)}`;
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
      <div class="filter-row" role="tablist" aria-label="Filter by category">
        <span class="filter-label">Category:</span>
        ${cats.map((c, i) => `<button class="f-tab${i === 0 ? ' active' : ''}" data-filter="cat" data-val="${c.key}">${esc(c.label)}</button>`).join('')}
      </div>
      <div class="filter-row" role="tablist" aria-label="Filter by brand">
        <span class="filter-label">Brand:</span>
        <button class="f-tab brand active" data-filter="brand" data-val="all">All Brands</button>
        ${[...brandSet].map(b => `<button class="f-tab brand" data-filter="brand" data-val="${b}">${esc(brandLabels[b] || b)}</button>`).join('')}
      </div>
    `;

    // Build product cards with data-brand
    prodGrid.innerHTML = D.products.map(p => `
      <div class="p-card fade-in" data-cat="${p.category}" data-brand="${p.brand}">
        <div class="p-img">
          <img src="${p.image}" alt="${esc(p.title)}" width="280" height="160" loading="lazy" decoding="async"/>
          ${p.badge ? `<span class="p-badge ${p.badgeType}">${esc(p.badge)}</span>` : ''}
        </div>
        <div class="p-body">
          <h3>${esc(p.title)}</h3>
          <p class="p-brand ${p.brand}">${esc(p.brandLabel)}</p>
          <ul class="p-features">${p.features.map(f => `<li><i data-lucide="check"></i>${esc(f)}</li>`).join('')}</ul>
          <div class="p-exchange"><i data-lucide="repeat"></i> Old Battery Exchange Discount</div>
          <a href="${phone()}" class="p-call" rel="noopener"><i data-lucide="phone"></i> Call to Enquire</a>
        </div>
      </div>
    `).join('');
  }

  // --- WHY CHOOSE US ---
  const whyGrid = document.getElementById('whyGrid');
  if (whyGrid) {
    whyGrid.innerHTML = D.advantages.map(a => `
      <div class="why-card fade-in">
        <div class="why-icon"><i data-lucide="${a.icon}"></i></div>
        <h4>${esc(a.title)}</h4>
        <p>${esc(a.text)}</p>
      </div>
    `).join('');
  }

  // --- LOCATIONS ---
  const locGrid = document.getElementById('locGrid');
  if (locGrid) {
    locGrid.innerHTML = D.locations.map(loc => `
      <div class="loc-card fade-in">
        <div class="loc-card-head">
          <h3>${esc(loc.name)}</h3>
          <span class="loc-tag ${loc.tag}"><i data-lucide="${loc.tagIcon || 'map-pin'}"></i> ${esc(loc.tagLabel)}</span>
        </div>
        <div class="loc-body">
          <div class="loc-row"><i data-lucide="map-pin"></i><span>${esc(loc.address)}</span></div>
          <div class="loc-row"><i data-lucide="clock"></i><span>${esc(loc.hours)}</span></div>
          <div class="loc-row"><i data-lucide="phone"></i><span>${esc(loc.phone)}</span></div>
          <div class="loc-highlight"><i data-lucide="${loc.highlightIcon || 'info'}"></i> ${esc(loc.highlight)}</div>
          <div class="loc-btns">
            <a href="tel:${loc.phoneLink}" class="loc-btn amber" rel="noopener"><i data-lucide="phone"></i> Call Now</a>
            <a href="${loc.mapLink}" target="_blank" class="loc-btn outline" rel="noopener noreferrer"><i data-lucide="navigation"></i> Get Directions</a>
          </div>
        </div>
        <div class="loc-map"><iframe src="${loc.mapEmbed}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${esc(loc.name)}"></iframe></div>
      </div>
    `).join('');
  }

  // --- REVIEW CTA (real Google review link) ---
  const reviewBlock = document.getElementById('reviewBlock');
  if (reviewBlock) {
    reviewBlock.innerHTML = `
      <div class="review-cta-card">
        <div class="review-cta-icon"><i data-lucide="star"></i></div>
        <h3>Loved Our Service? Leave Us a Review!</h3>
        <p>Your 5-star Google review helps local customers find reliable battery service in Alnavar.</p>
        <a href="${D.profile.googleReviewLink}" target="_blank" class="google-btn" id="googleReviewBtn">
          <i data-lucide="star"></i> Write a Google Review
        </a>
        <div class="review-cta-contact">
          <p>Or call us directly:</p>
          <div class="review-cta-btns">
            <a href="${phone()}" class="btn btn-amber"><i data-lucide="phone-call"></i> Call ${esc(D.profile.phoneDisplay)}</a>
          </div>
        </div>
      </div>
    `;
  }

  // --- FOOTER (compact single row) ---
  const footerInner = document.getElementById('footerInner');
  if (footerInner) {
    const socialLinks = [];
    if (D.profile.socialLinks.instagram) socialLinks.push(`<a href="${D.profile.socialLinks.instagram}" target="_blank" rel="noopener noreferrer"><i data-lucide="instagram"></i> Instagram</a>`);
    if (D.profile.socialLinks.facebook) socialLinks.push(`<a href="${D.profile.socialLinks.facebook}" target="_blank" rel="noopener noreferrer"><i data-lucide="facebook"></i> Facebook</a>`);

    footerInner.innerHTML = `
      <div class="footer-brand">
        <img src="images/favicon.png" alt="GK" width="32" height="32"/>
        <span>${esc(D.profile.name)}</span>
      </div>
      <div class="footer-links">
        <a href="#services"><i data-lucide="wrench"></i> Services</a>
        <a href="#products"><i data-lucide="battery-charging"></i> Products</a>
        <a href="#locations"><i data-lucide="map-pin"></i> Branches</a>
        <a href="${phone()}" rel="noopener"><i data-lucide="phone"></i> ${esc(D.profile.phoneDisplay)}</a>
        ${socialLinks.join('')}
        <a href="${D.profile.googleReviewLink}" target="_blank" rel="noopener noreferrer"><i data-lucide="star"></i> Review</a>
        <a href="${D.locations[0].mapLink}" target="_blank" rel="noopener noreferrer"><i data-lucide="navigation"></i> Directions</a>
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

  // --- INIT LUCIDE ICONS ---
  if (window.lucide) lucide.createIcons();

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
  document.querySelectorAll('.f-tab[data-filter="cat"]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.f-tab[data-filter="cat"]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCat = tab.dataset.val;
      filterProducts();
    });
  });
  document.querySelectorAll('.f-tab[data-filter="brand"]').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.f-tab[data-filter="brand"]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeBrand = tab.dataset.val;
      filterProducts();
    });
  });

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
