document.addEventListener('DOMContentLoaded', () => {
  // --- FAQ Accordion ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      
      // Close all other active items
      document.querySelectorAll('.accordion-header.active').forEach(activeHeader => {
        if (activeHeader !== header) {
          activeHeader.classList.remove('active');
          activeHeader.parentElement.querySelector('.accordion-body').style.maxHeight = '0';
        }
      });
      
      // Toggle current
      header.classList.toggle('active');
      
      if (header.classList.contains('active')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0';
      }
    });
  });

  // --- FAQ Category Filter ---
  const faqTabs = document.querySelectorAll('.faq-tab');
  const faqItems = document.querySelectorAll('.accordion-item');

  faqTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      faqTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      const category = tab.getAttribute('data-category');
      
      // Filter items
      faqItems.forEach(item => {
        // Reset state for smooth transition
        item.style.display = 'none';
        
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
        }
        
        // Ensure all are closed when switching tabs
        const header = item.querySelector('.accordion-header');
        const body = item.querySelector('.accordion-body');
        if (header.classList.contains('active')) {
          header.classList.remove('active');
          body.style.maxHeight = '0';
        }
      });
    });
  });
});
