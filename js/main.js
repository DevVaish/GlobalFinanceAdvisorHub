

(function() {
    'use strict';

    // ===========================================
    // Navigation & Mobile Menu
    // ===========================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });

    // ===========================================
    // Scroll Effects
    // ===========================================
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow to header on scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===========================================
    // Smooth Scroll for Anchor Links
    // ===========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // Active Navigation Link on Scroll
    // ===========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // ===========================================
    // Number Counter Animation
    // ===========================================
    function animateCounter(element, duration = 2000) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe all counter elements
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===========================================
    // Scroll Reveal Animation
    // ===========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for reveal animation
    const revealElements = document.querySelectorAll('.service-card, .trust-stat, .about-feature');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        revealObserver.observe(el);
    });

    // ===========================================
    // Page Load Animation
    // ===========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger counter animations if in viewport
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            }
        });
    });

    // ===========================================
    // Form Validation Helpers (for contact page)
    // ===========================================
    window.validateEmail = function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    window.validatePhone = function(phone) {
        const re = /^[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    };

    // ===========================================
    // Utility Functions
    // ===========================================
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll events
    const optimizedScroll = debounce(() => {
        updateActiveNavLink();
    }, 10);

    window.addEventListener('scroll', optimizedScroll);

    // ===========================================
    // Service Card Hover Effects
    // ===========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ===========================================
    // Trust Stats Animation on Scroll
    // ===========================================
    const trustStats = document.querySelectorAll('.trust-stat');
    
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });

    trustStats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px) scale(0.95)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        trustObserver.observe(stat);
    });

    // ===========================================
    // Parallax Effect for Hero Background
    // ===========================================
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroPattern.style.transform = `translateY(${rate}px)`;
        });
    }

    // ===========================================
    // Logo Animation
    // ===========================================
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================================
    // Console Welcome Message
    // ===========================================
    console.log('%c Global Finance Advisor Hub ', 'background: #1a365d; color: #d4af37; font-size: 20px; padding: 10px;');
    console.log('%c Empowering Your Financial Future ', 'background: #d4af37; color: #1a365d; font-size: 14px; padding: 5px;');

})();
