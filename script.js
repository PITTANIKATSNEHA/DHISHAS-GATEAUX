/* ================================
   DHISHA'S GATEAUX — Scripts
=================================== */

// Preloader
window.addEventListener('load', () => {
  setTimeout(() => {
    const pre = document.getElementById('preloader');
    if (pre) pre.style.display = 'none';
  }, 600);
});

// Sticky nav toggle (mobile)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
}

// Smooth close on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('show'));
});

// Hero parallax
const heroMedia = document.querySelector('.hero-media');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroMedia) heroMedia.style.transform = `translateY(${y * 0.25}px)`;
});

// Intersection Observer for reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('.count');
let counted = false;
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      counters.forEach(counter => animateCount(counter));
    }
  });
}, { threshold: 0.5 });
if (counters.length) countObserver.observe(counters[0]);

function animateCount(el){
  const target = +el.dataset.target;
  const isYear = target <= 3000 && target >= 1900;
  const duration = 1600;
  const start = 0;
  const startTime = performance.now();
  function frame(now){
    const p = Math.min((now - startTime) / duration, 1);
    const val = Math.floor(start + (target - start) * easeOutCubic(p));
    el.textContent = isYear ? val : val.toLocaleString();
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// GLightbox init
const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
});

// Swiper init (Menu Highlights)
const swiper = new Swiper('.mySwiper', {
  slidesPerView: 1.1,
  spaceBetween: 12,
  loop: true,
  centeredSlides: true,
  breakpoints: {
    680: { slidesPerView: 2, spaceBetween: 14 },
    980: { slidesPerView: 3, spaceBetween: 16 }
  },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

// Demo order form — opens WhatsApp (if on mobile) or mail draft
function submitOrder(e){
  e.preventDefault();
  const f = e.target;
  const name = encodeURIComponent(f.name.value.trim());
  const phone = encodeURIComponent(f.phone.value.trim());
  const email = encodeURIComponent(f.email.value.trim());
  const category = encodeURIComponent(f.category.value);
  const details = encodeURIComponent(f.details.value.trim());

  const msg = `New Enquiry — DHISHA'S GATEAUX%0A%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email}%0ACategory: ${category}%0ADetails: ${details}`;
  // WhatsApp fallback + Email
  const wa = `https://wa.me/910000000000?text=${msg}`;
  const mail = `mailto:orders@dhishasgateaux.com?subject=New%20Order%20Enquiry&body=${msg}`;

  // Prefer WhatsApp on mobile
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    window.open(wa, '_blank');
  } else {
    window.location.href = mail;
  }
  f.reset();
  return false;
}
