

(function() {
    'use strict';

    // ===========================================
    // Form Elements
    // ===========================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const service = document.getElementById('service');
    const message = document.getElementById('message');
    const newsletter = document.getElementById('newsletter');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // ===========================================
    // Validation Functions
    // ===========================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        if (!phone) return true; // Phone is optional
        const re = /^[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    function validateRequired(value) {
        return value.trim() !== '';
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error styling
        input.style.borderColor = '#dc3545';
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        input.style.borderColor = '';
    }

    function clearAllErrors() {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => clearError(input));
    }

    // ===========================================
    // Real-time Validation
    // ===========================================
    firstName.addEventListener('blur', function() {
        if (!validateRequired(this.value)) {
            showError(this, 'First name is required');
        } else {
            clearError(this);
        }
    });

    lastName.addEventListener('blur', function() {
        if (!validateRequired(this.value)) {
            showError(this, 'Last name is required');
        } else {
            clearError(this);
        }
    });

    email.addEventListener('blur', function() {
        if (!validateRequired(this.value)) {
            showError(this, 'Email is required');
        } else if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            clearError(this);
        }
    });

    phone.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            showError(this, 'Please enter a valid phone number');
        } else {
            clearError(this);
        }
    });

    service.addEventListener('change', function() {
        if (!validateRequired(this.value)) {
            showError(this, 'Please select a service');
        } else {
            clearError(this);
        }
    });

    message.addEventListener('blur', function() {
        if (!validateRequired(this.value)) {
            showError(this, 'Message is required');
        } else if (this.value.trim().length < 10) {
            showError(this, 'Message must be at least 10 characters');
        } else {
            clearError(this);
        }
    });

    // ===========================================
    // Form Submission
    // ===========================================
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearAllErrors();
        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
        
        // Validate all fields
        let isValid = true;

        if (!validateRequired(firstName.value)) {
            showError(firstName, 'First name is required');
            isValid = false;
        }

        if (!validateRequired(lastName.value)) {
            showError(lastName, 'Last name is required');
            isValid = false;
        }

        if (!validateRequired(email.value)) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        if (phone.value && !validatePhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        if (!validateRequired(service.value)) {
            showError(service, 'Please select a service');
            isValid = false;
        }

        if (!validateRequired(message.value)) {
            showError(message, 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }

        if (!isValid) {
            showFormMessage('Please correct the errors above', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Collect form data
        const formData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            service: service.value,
            message: message.value.trim(),
            newsletter: newsletter.checked,
            timestamp: new Date().toISOString()
        };

        // Simulate API call (replace with actual API endpoint)
        try {
            await simulateFormSubmission(formData);
            
            // Success
            showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            // Log to console (for demo purposes)
            console.log('Form submitted successfully:', formData);
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        } catch (error) {
            // Error
            showFormMessage('Sorry, there was an error submitting your form. Please try again or contact us directly.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // ===========================================
    // Helper Functions
    // ===========================================
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }

    function simulateFormSubmission(data) {
        // Simulate API call with 2 second delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 95% success rate
                if (Math.random() > 0.05) {
                    resolve(data);
                } else {
                    reject(new Error('Simulated API error'));
                }
            }, 2000);
        });
    }

    // ===========================================
    // Phone Number Formatting
    // ===========================================
    phone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        
        e.target.value = value;
    });

    // ===========================================
    // Character Counter for Message
    // ===========================================
    const messageCounter = document.createElement('div');
    messageCounter.className = 'character-counter';
    messageCounter.style.textAlign = 'right';
    messageCounter.style.fontSize = '0.875rem';
    messageCounter.style.color = 'var(--color-text-light)';
    messageCounter.style.marginTop = '0.25rem';
    message.parentElement.appendChild(messageCounter);

    function updateCharacterCount() {
        const count = message.value.length;
        const min = 10;
        const max = 1000;
        
        if (count < min) {
            messageCounter.textContent = `${count} / ${min} characters (minimum)`;
            messageCounter.style.color = '#dc3545';
        } else if (count > max) {
            messageCounter.textContent = `${count} / ${max} characters (maximum exceeded)`;
            messageCounter.style.color = '#dc3545';
            message.value = message.value.substring(0, max);
        } else {
            messageCounter.textContent = `${count} characters`;
            messageCounter.style.color = 'var(--color-text-light)';
        }
    }

    message.addEventListener('input', updateCharacterCount);
    updateCharacterCount();

    // ===========================================
    // Form Animation on Load
    // ===========================================
    const formGroups = contactForm.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 50);
    });

    // ===========================================
    // Prevent Multiple Submissions
    // ===========================================
    let isSubmitting = false;

    contactForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return false;
        }
    });

    // ===========================================
    // Auto-save Draft (Optional Enhancement)
    // ===========================================
    const AUTO_SAVE_KEY = 'gfah_contact_draft';
    const AUTO_SAVE_INTERVAL = 10000; // 10 seconds

    function saveDraft() {
        const draft = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            service: service.value,
            message: message.value,
            newsletter: newsletter.checked
        };
        
        try {
            localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(draft));
            console.log('Draft saved');
        } catch (e) {
            console.error('Failed to save draft:', e);
        }
    }

    function loadDraft() {
        try {
            const draft = localStorage.getItem(AUTO_SAVE_KEY);
            if (draft) {
                const data = JSON.parse(draft);
                
                // Ask user if they want to restore
                const restore = confirm('We found a saved draft. Would you like to restore it?');
                
                if (restore) {
                    firstName.value = data.firstName || '';
                    lastName.value = data.lastName || '';
                    email.value = data.email || '';
                    phone.value = data.phone || '';
                    service.value = data.service || '';
                    message.value = data.message || '';
                    newsletter.checked = data.newsletter || false;
                    
                    updateCharacterCount();
                }
            }
        } catch (e) {
            console.error('Failed to load draft:', e);
        }
    }

    function clearDraft() {
        try {
            localStorage.removeItem(AUTO_SAVE_KEY);
            console.log('Draft cleared');
        } catch (e) {
            console.error('Failed to clear draft:', e);
        }
    }

    // Load draft on page load
    window.addEventListener('load', loadDraft);

    // Auto-save periodically
    setInterval(saveDraft, AUTO_SAVE_INTERVAL);

    // Clear draft on successful submission
    contactForm.addEventListener('submit', function() {
        if (!contactForm.checkValidity()) return;
        
        setTimeout(() => {
            if (formMessage.classList.contains('success')) {
                clearDraft();
            }
        }, 2500);
    });

    // Save draft before leaving page
    window.addEventListener('beforeunload', function(e) {
        if (message.value.trim().length > 0) {
            saveDraft();
        }
    });

    console.log('Contact form initialized successfully');

})();
