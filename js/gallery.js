document.addEventListener('DOMContentLoaded', () => {
  
  // --- Stats Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-target'));
        const duration = 2000; // ms
        const steps = 60;
        const stepValue = finalValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += stepValue;
          if (current >= finalValue) {
            target.textContent = finalValue + (finalValue > 1000 ? '+' : '+');
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(current);
          }
        }, duration / steps);
        
        observer.unobserve(target);
      }
    });
  };
  
  const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
  statNumbers.forEach(stat => statsObserver.observe(stat));

  // --- Gallery Filter & Lightbox ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  
  let currentFilter = 'all';
  let filteredItems = [];
  let currentIndex = 0;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add to clicked
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      currentFilter = filterValue;
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          // trigger reflow
          void item.offsetWidth;
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            if (currentFilter === filterValue || item.getAttribute('data-category') !== currentFilter && currentFilter !== 'all') {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
      
      updateFilteredItems();
    });
  });

  const updateFilteredItems = () => {
    filteredItems = Array.from(galleryItems).filter(item => 
      currentFilter === 'all' || item.getAttribute('data-category') === currentFilter
    );
  };
  
  updateFilteredItems();

  // Lightbox functionality
  const openLightbox = (index) => {
    currentIndex = index;
    const item = filteredItems[currentIndex];
    const bg = item.style.background;
    const title = item.querySelector('.gallery-title').textContent;
    
    lightboxImg.style.background = bg;
    lightboxCaption.textContent = title;
    lightboxCounter.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightboxHandler = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showNext = (e) => {
    if(e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % filteredItems.length;
    openLightbox(currentIndex);
  };

  const showPrev = (e) => {
    if(e) e.stopPropagation();
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    openLightbox(currentIndex);
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Find index in currently filtered items
      const index = filteredItems.indexOf(item);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightboxHandler);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightboxHandler();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightboxHandler();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // --- Career Cards Accordion ---
  const careerCards = document.querySelectorAll('.career-card');
  careerCards.forEach(card => {
    const header = card.querySelector('.career-header');
    header.addEventListener('click', () => {
      // Toggle current
      card.classList.toggle('active');
      const body = card.querySelector('.career-body');
      const icon = header.querySelector('div:last-child');
      
      if (card.classList.contains('active')) {
        body.style.maxHeight = body.scrollHeight + 100 + 'px';
        icon.textContent = '−';
      } else {
        body.style.maxHeight = '0';
        icon.textContent = '+';
      }
    });
  });

  // --- Toast Notification ---
  const showToast = (message) => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    
    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 3000);
  };

  // Career Apply Buttons
  const applyBtns = document.querySelectorAll('.apply-btn');
  applyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Application portal opening soon!');
    });
  });

  // --- Review Form ---
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for sharing your experience!');
      reviewForm.reset();
    });
  }
});
