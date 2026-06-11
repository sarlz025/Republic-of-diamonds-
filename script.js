/* ============================
   REPUBLIC OF DIAMONDS — JS
   ============================ */

// ===== DATA =====
const faqs = [
  { q: 'Are your diamonds certified?', a: 'Yes. Every centre stone we sell is independently graded by GIA and IGI, with full certification provided. We never sell uncertified diamonds.' },
  { q: 'How long does a custom ring take?', a: 'Custom pieces typically take 3 to 5 weeks from design approval to delivery. Rush timelines can sometimes be accommodated ask during your consultation.' },
  { q: 'Do you ship across South Africa?', a: 'Yes, we offer fully insured nationwide shipping via secure courier. International shipping is also available on request.' },
  { q: 'What does the consultation process look like?', a: 'We start with a free private consultation (in-person or virtual) to understand your vision, style and budget. We then curate diamond options, create a CAD design preview, and refine until you love it.' },
  { q: "What's your return and resize policy?", a: "We offer resizing within 30 days of delivery at no charge. Custom pieces are made to order, but we stand behind our work if something isn't right, we'll make it right." },
  { q: 'What metals do you work with?', a: 'We work in platinum, white gold (9ct, 14ct, 18ct), yellow gold and rose gold. We can discuss which metal best suits your lifestyle and budget during consultation.' },
];

// ===== FAQ =====
function renderFaq() {
  const wrap = document.getElementById('faqWrap');
  if (!wrap) return;
  wrap.innerHTML = faqs.map((f, i) => `
    <div class="faq-item">
      <div class="faq-question" onclick="toggleFaq(${i}, this)">
        <span>${f.q}</span>
        <i class="fas fa-plus"></i>
      </div>
      <div class="faq-answer" id="faq-ans-${i}">${f.a}</div>
    </div>
  `).join('');
}

function toggleFaq(i, el) {
  const ans = document.getElementById(`faq-ans-${i}`);
  const isOpen = ans.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('open'));
  if (!isOpen) { ans.classList.add('open'); el.classList.add('open'); }
}

// ===== GALLERY =====
const galleryPieces = [
  { src: 'IMG-20260608-WA0021.jpg',   label: 'White Gold Tennis Bracelet', desc: 'Round brilliant tennis bracelet' },
  { src: 'IMG-20260608-WA0022_2.jpg', label: 'Rose Gold Tennis Bracelet',     desc: 'Rose gold tennis bracelet' },
  { src: 'IMG-20260608-WA0022_3.jpg', label: 'Yellow Gold Tennis Bracelet',       desc: 'Yellow gold tennis bracelet' },
  { src: 'IMG-20260608-WA0023.jpg',   label: 'Diamond Stud Earrings',     desc: 'Round brilliant four-claw studs' },
  { src: 'IMG-20260608-WA0024.jpg',   label: 'Round Brilliant Solitaire', desc: 'White gold pavé engagement ring' },
  { src: 'IMG-20260608-WA0025.jpg',   label: 'Yellow Gold Solitaire',     desc: 'Round brilliant in yellow gold' },
  { src: 'IMG-20260608-WA0026.jpg',   label: 'Rose Gold Solitaire',       desc: 'Round brilliant in rose gold' },
  { src: 'IMG-20260514-WA0039.jpg',   label: 'Halo Diamond Bracelet',     desc: 'White gold halo-set bracelet' },
];

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  grid.innerHTML = galleryPieces.map((p, i) => `
    <div class="gallery-item" onclick="showGalleryModal(${i})">
      <img src="${p.src}" alt="${p.label}" loading="lazy">
      <div class="gallery-overlay">
        <div>
          <p>${p.label}</p>
          <small>${p.desc}</small>
        </div>
      </div>
    </div>
  `).join('');
}

function showGalleryModal(i) {
  const p = galleryPieces[i];
  document.getElementById('modalContent').innerHTML = `
    <img src="${p.src}" alt="${p.label}"
         style="width:100%;max-height:420px;object-fit:contain;background:#0A0A0A;margin-bottom:1.5rem">
    <div style="font-family:var(--serif);font-size:1.6rem;color:#F5F0E8;margin-bottom:0.4rem">${p.label}</div>
    <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1.8rem">${p.desc}</p>
    <div style="display:flex;gap:1rem">
      <button class="btn-primary" onclick="scrollToScheduler();closeModal()"><i class="fas fa-calendar"></i> Enquire About This</button>
      <button class="btn-ghost" onclick="closeModal()"><i class="fas fa-times"></i> Close</button>
    </div>
  `;
  document.getElementById('productModal').classList.add('active');
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
}
document.addEventListener('DOMContentLoaded', () => {
  const pm = document.getElementById('productModal');
  if (pm) pm.addEventListener('click', function(e) { if (e.target === this) closeModal(); });
});

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ===== BOOKING =====
function submitBooking() {
  const name  = document.getElementById('f-name')?.value.trim();
  const phone = document.getElementById('f-phone')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();

  if (!name || !phone) { showToast('Please fill in your name and phone number'); return; }

  // Build Google Calendar appointment URL
  const calendarUrl = 'https://calendar.app.google/YyGg8SXyDygZJgX38';

  showToast(`Redirecting you to book your consultation, ${name.split(' ')[0]}!`);
  setTimeout(() => window.open(calendarUrl, '_blank'), 800);

  // Clear form
  ['f-name','f-phone','f-email','f-type','f-vision'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = el.tagName === 'SELECT' ? el.options[0].value : '';
  });
}

function openWhatsApp() {
  window.open('https://wa.me/27722494793?text=Hello%20Republic%20of%20Diamonds%2C%20I%27d%20love%20to%20book%20a%20consultation.', '_blank');
}

// ===== SCROLL HELPER =====
function scrollToScheduler() {
  const el = document.getElementById('scheduler');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ===== MOBILE MENU =====
function openMobileMenu()  { document.getElementById('mobileMenu').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// ===== FADE-IN OBSERVER =====
function observeFade() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== NAV SCROLL SHRINK =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.style.padding = '0.7rem 3rem';
  } else {
    nav.style.padding = '1.2rem 3rem';
  }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
  renderFaq();
  observeFade();
});
