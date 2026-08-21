document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initTestimonialSlider();
});

// Hero Slider Implementation
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const prevBtn = slider.querySelector('.hero-prev');
  const nextBtn = slider.querySelector('.hero-next');
  const dotsContainer = slider.querySelector('.hero-dots');
  
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayInterval;
  
  // Create dots
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  const dots = Array.from(slider.querySelectorAll('.slider-dot'));

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoplay();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  slider.addEventListener('mouseleave', startAutoplay);

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextSlide();
      resetAutoplay();
    }
    if (touchEndX > touchStartX + threshold) {
      prevSlide();
      resetAutoplay();
    }
  }

  // Initialize
  startAutoplay();
}

// Testimonial Slider Implementation
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const track = slider.querySelector('.slider-track');
  const slides = Array.from(slider.querySelectorAll('.testimonial-card'));
  const dotsContainer = slider.querySelector('.slider-dots');
  
  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let slidesPerView = getSlidesPerView();
  let maxIndex = Math.max(0, slides.length - slidesPerView);
  let autoplayInterval;

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  // Create dots
  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    
    // Number of dots = number of groups
    const dotsCount = Math.ceil(slides.length / slidesPerView);
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = Math.min(i * slidesPerView, maxIndex);
        updateSlider();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const slideWidth = 100 / slidesPerView;
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    if (dotsContainer) {
      const dots = Array.from(dotsContainer.querySelectorAll('.slider-dot'));
      const activeDotIndex = Math.ceil(currentIndex / slidesPerView);
      
      dots.forEach((dot, index) => {
        if (index === activeDotIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  }

  function nextSlide() {
    currentIndex += slidesPerView;
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    updateSlider();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Window resize handling
  window.addEventListener('resize', () => {
    const newSlidesPerView = getSlidesPerView();
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      maxIndex = Math.max(0, slides.length - slidesPerView);
      currentIndex = 0; // reset to start
      renderDots();
      updateSlider();
    }
  });

  // Touch support for testimonials
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
  }, { passive: true });

  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 50;
    
    if (touchEndX < touchStartX - threshold) {
      currentIndex = Math.min(currentIndex + 1, maxIndex);
    }
    if (touchEndX > touchStartX + threshold) {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    
    updateSlider();
    startAutoplay();
  }, { passive: true });

  slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  slider.addEventListener('mouseleave', startAutoplay);

  // Initialize
  renderDots();
  updateSlider();
  startAutoplay();
}
