/* ===== GK BATTERIES — SURGE INTERACTIONS ===== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // --- MOBILE MENU ---
  const mobileBtn = document.getElementById('mobileBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileBtn.classList.toggle('active');
    });
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileBtn.classList.remove('active');
      });
    });
  }

  // --- PRODUCT FILTER TABS ---
  const filterTabs = document.querySelectorAll('.f-tab');
  const productCards = document.querySelectorAll('.p-card');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      productCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp .4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- SCROLL ANIMATIONS ---
  const animEls = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  animEls.forEach(el => observer.observe(el));

  // --- STAT COUNTER ANIMATION ---
  const statNums = document.querySelectorAll('.stat-num');
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
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current + suffix;
          }, 30);
        }
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  // --- NAVBAR SCROLL EFFECT ---
  const topbar = document.getElementById('topbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (topbar) {
      topbar.style.background = curr > 50
        ? 'rgba(10,14,26,.95)'
        : 'rgba(10,14,26,.85)';
    }
    lastScroll = curr;
  }, { passive: true });

  // --- ACTIVE NAV LINK ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.tb-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? '#f59e0b'
        : '';
    });
  }, { passive: true });
});

// Fade-up keyframe (injected for product filter animation)
const style = document.createElement('style');
style.textContent = '@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);
