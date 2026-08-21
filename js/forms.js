document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const modal = document.getElementById('contactSuccessModal');

    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
      return /^[0-9]{10}$/.test(phone);
    };

    const showError = (input, message) => {
      const errorElement = document.getElementById(input.id + 'Error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      input.style.borderColor = 'var(--clr-red)';
    };

    const clearError = (input) => {
      const errorElement = document.getElementById(input.id + 'Error');
      errorElement.style.display = 'none';
      input.style.borderColor = 'var(--clr-border)';
    };

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim()) showError(nameInput, 'Full Name is required');
      else clearError(nameInput);
    });

    emailInput.addEventListener('blur', () => {
      if (!emailInput.value.trim()) showError(emailInput, 'Email Address is required');
      else if (!validateEmail(emailInput.value.trim())) showError(emailInput, 'Please enter a valid email address');
      else clearError(emailInput);
    });

    phoneInput.addEventListener('blur', () => {
      if (!phoneInput.value.trim()) showError(phoneInput, 'Phone Number is required');
      else if (!validatePhone(phoneInput.value.trim())) showError(phoneInput, 'Please enter a valid 10-digit number');
      else clearError(phoneInput);
    });

    subjectInput.addEventListener('blur', () => {
      if (!subjectInput.value) showError(subjectInput, 'Please select a subject');
      else clearError(subjectInput);
    });

    messageInput.addEventListener('blur', () => {
      if (!messageInput.value.trim()) showError(messageInput, 'Message cannot be empty');
      else clearError(messageInput);
    });

    // Form Submit
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Full Name is required');
        isValid = false;
      }

      // Email validation
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Valid email required');
        isValid = false;
      }

      // Phone validation
      if (!phoneInput.value.trim() || !validatePhone(phoneInput.value.trim())) {
        showError(phoneInput, 'Valid 10-digit number required');
        isValid = false;
      }

      // Subject validation
      if (!subjectInput.value) {
        showError(subjectInput, 'Please select a subject');
        isValid = false;
      }

      // Message validation
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Message cannot be empty');
        isValid = false;
      }

      if (isValid) {
        modal.style.display = 'flex';
        contactForm.reset();
        
        // Clear all success styling borders if any
        [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(clearError);
      }
    });

    // Close Modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});
