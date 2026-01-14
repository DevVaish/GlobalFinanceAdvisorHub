

(function() {
    'use strict';

    // ===========================================
    // Smooth Scroll to Service Sections
    // ===========================================
    const serviceLinks = document.querySelectorAll('a[href^="#"]');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href !== '#') {
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    e.preventDefault();
                    
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===========================================
    // Service Detail Animations
    // ===========================================
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                serviceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    serviceDetails.forEach(detail => {
        detail.style.opacity = '0';
        detail.style.transform = 'translateY(30px)';
        detail.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        serviceObserver.observe(detail);
    });

    // ===========================================
    // Chart Bar Animations
    // ===========================================
    const chartBars = document.querySelectorAll('.chart-bar');
    
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.chart-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.animation = `growBar 1s ease ${index * 0.1}s both`;
                    }, 200);
                });
                
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const performanceChart = document.querySelector('.performance-chart');
    if (performanceChart) {
        chartObserver.observe(performanceChart);
    }

    // ===========================================
    // Service Feature List Stagger Animation
    // ===========================================
    const featureLists = document.querySelectorAll('.service-features-list');
    
    featureLists.forEach(list => {
        const items = list.querySelectorAll('li');
        
        const listObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 50);
                    });
                    
                    listObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        listObserver.observe(list);
    });

    // ===========================================
    // Process Steps Animation
    // ===========================================
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        processObserver.observe(step);
    });

    // ===========================================
    // Service Icon Rotation on Hover
    // ===========================================
    const serviceIcons = document.querySelectorAll('.service-icon-large');
    
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0deg) scale(1)';
        });
    });

    // ===========================================
    // Stat Card Counter Animation
    // ===========================================
    function animateStatValue(element) {
        const target = parseFloat(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = current.toFixed(target % 1 === 0 ? 0 : 1);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toFixed(target % 1 === 0 ? 0 : 1);
            }
        };

        updateCounter();
    }

    const statValues = document.querySelectorAll('.stat-value');
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateStatValue(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => {
        statObserver.observe(stat);
    });

    // ===========================================
    // Highlight Stats Animation
    // ===========================================
    const highlightStats = document.querySelectorAll('.highlight-stat');
    
    highlightStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            stat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'scale(1)';
        }, (index + 1) * 200);
    });

    // ===========================================
    // Protection Layer Hover Effects
    // ===========================================
    const protectionLayers = document.querySelectorAll('.protection-layer');
    
    protectionLayers.forEach(layer => {
        layer.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.layer-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        layer.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.layer-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ===========================================
    // Estate Steps Hover Effects
    // ===========================================
    const estateSteps = document.querySelectorAll('.estate-step');
    
    estateSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            estateSteps.forEach((s, i) => {
                if (i !== index) {
                    s.style.opacity = '0.5';
                }
            });
        });
        
        step.addEventListener('mouseleave', function() {
            estateSteps.forEach(s => {
                s.style.opacity = '1';
            });
        });
    });

    // ===========================================
    // Breakdown Item Animations
    // ===========================================
    const breakdownItems = document.querySelectorAll('.breakdown-item');
    
    breakdownItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });

    // ===========================================
    // Service Badge Pulse Animation
    // ===========================================
    const serviceBadge = document.querySelector('.service-badge');
    
    if (serviceBadge) {
        setInterval(() => {
            serviceBadge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                serviceBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // ===========================================
    // Parallax Effect for Service Visuals
    // ===========================================
    const serviceVisuals = document.querySelectorAll('.service-detail-visual');
    
    window.addEventListener('scroll', function() {
        serviceVisuals.forEach(visual => {
            const rect = visual.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rate = (rect.top - window.innerHeight / 2) * 0.05;
                visual.style.transform = `translateY(${rate}px)`;
            }
        });
    });

    // ===========================================
    // Active Service Section Highlighting
    // ===========================================
    function highlightActiveService() {
        const serviceDetails = document.querySelectorAll('.service-detail');
        const scrollPos = window.pageYOffset + 150;

        serviceDetails.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Add active class or highlighting
                section.style.borderLeft = '4px solid var(--color-accent)';
            } else {
                section.style.borderLeft = 'none';
            }
        });
    }

    window.addEventListener('scroll', highlightActiveService);

    // ===========================================
    // Print Current Page Info
    // ===========================================
    console.log('%c Services Page Loaded ', 'background: #1a365d; color: #d4af37; font-size: 16px; padding: 10px;');
    console.log('✓ Service animations initialized');
    console.log('✓ Interactive elements ready');
    console.log('✓ Scroll effects active');

})();
