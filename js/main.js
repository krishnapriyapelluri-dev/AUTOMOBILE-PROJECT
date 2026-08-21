/**
 * Krishna Priya Automobiles - Core UI Controller & Interactive Features
 */

// Toast Notification Global Utility
window.showToast = function(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '❌';

  toast.innerHTML = `
    <span style="font-size:1.2rem;">${icon}</span>
    <span style="font-size:0.9rem; font-weight:600;">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, 300);
  }, 3500);
};

document.addEventListener('DOMContentLoaded', () => {
  // Preloader Smooth Hide
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 300);
  }

  // Theme Switcher Persistence
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('kp_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('kp_theme', nextTheme);
    });
  }

  // Navbar Scroll Dynamics
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Mobile Hamburger Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  // Hero Carousel Slider
  const heroTrack = document.getElementById('heroTrack');
  const slides = document.querySelectorAll('.hero-slide');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');
  const heroDots = document.getElementById('heroDots');

  if (heroTrack && slides.length > 0) {
    let currentSlide = 0;

    if (heroDots) {
      heroDots.innerHTML = Array.from(slides).map((_, i) => 
        `<span class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></span>`
      ).join('');
    }

    const updateSlider = () => {
      heroTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      const dots = document.querySelectorAll('.hero-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    window.goToSlide = (index) => {
      currentSlide = index;
      updateSlider();
    };

    if (heroNext) {
      heroNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
      });
    }

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }, 6000);
  }

  // WhatsApp Floating Widget Controller
  const waFab = document.getElementById('waFabToggle');
  const waCard = document.getElementById('waChatCard');
  const waClose = document.getElementById('waChatClose');

  if (waFab && waCard) {
    waFab.addEventListener('click', () => {
      waCard.classList.toggle('active');
    });

    if (waClose) {
      waClose.addEventListener('click', () => {
        waCard.classList.remove('active');
      });
    }
  }

  // Category Tab Filtering on Homepage
  const categoryTabs = document.querySelectorAll('.category-tab');
  if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-category');
        renderHomepageCategory(cat);
      });
    });
  }

  function renderHomepageCategory(category) {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid || !window.vehicles) return;

    let list = window.vehicles;
    if (category === 'SUV') list = window.vehicles.filter(v => v.type === 'SUV');
    else if (category === 'EV') list = window.vehicles.filter(v => v.fuel === 'Electric');
    else if (category === 'Sedan') list = window.vehicles.filter(v => v.type === 'Sedan');
    else if (category === 'MPV') list = window.vehicles.filter(v => v.type === 'MPV');

    // Take top 6
    const displayList = list.slice(0, 6);

    featuredGrid.innerHTML = displayList.map(car => `
      <div class="card fade-in">
        <div class="card-image">
          <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.onerror=null; this.src='images/car_creta.jpg';">
          ${car.badge ? `<span class="card-badge">${car.badge}</span>` : ''}
          <button class="btn-360-badge" onclick="open360Viewer(${car.id})">🔄 360° View</button>
        </div>
        <div class="card-body">
          <h3 class="card-title">${car.name}</h3>
          <p class="card-meta">${car.year} • ${car.transmission} • ${car.fuel}</p>
          <div class="card-specs-row">
            <div class="spec-item"><span class="spec-label">Mileage</span><span class="spec-val">${car.mileage.split(' ')[0]}</span></div>
            <div class="spec-item"><span class="spec-label">Engine</span><span class="spec-val">${car.engine.split(' ')[0]} cc</span></div>
            <div class="spec-item"><span class="spec-label">Safety</span><span class="spec-val">${car.safety.split(' ')[0]} ★</span></div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.2rem; margin-top:0.5rem;">
            <div>
              <span style="font-size:0.75rem;color:var(--clr-text-muted);">Ex-Showroom Price</span>
              <h4 class="card-price">₹${car.price.toLocaleString('en-IN')}</h4>
            </div>
          </div>
          <div style="display:flex; gap:0.6rem;">
            <button onclick="showVehicleDetail(${car.id})" class="btn btn-primary" style="flex:1;">View Specs</button>
            <button onclick="open360Viewer(${car.id})" class="btn btn-gold">360°</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Submit Review Modal Handler
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your review has been submitted for verification.', 'success');
      const modal = document.getElementById('writeReviewModal');
      if (modal) modal.style.display = 'none';
      reviewForm.reset();
    });
  }
});
