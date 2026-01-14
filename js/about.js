

(function() {
    'use strict';

    // ===========================================
    // Timeline Animation
    // ===========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });

    // ===========================================
    // Mission Cards Hover Tilt Effect
    // ===========================================
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===========================================
    // Values Detail Stagger Animation
    // ===========================================
    const valueItems = document.querySelectorAll('.value-item');
    
    const valuesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                
                valuesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    valueItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        valuesObserver.observe(item);
    });

    // ===========================================
    // Team Member Card Animations
    // ===========================================
    const teamMembers = document.querySelectorAll('.team-member');
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        teamObserver.observe(member);
    });

    // ===========================================
    // Team Avatar Hover Effects
    // ===========================================
    const memberAvatars = document.querySelectorAll('.member-avatar');
    
    memberAvatars.forEach(avatar => {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===========================================
    // Credential Tags Animations
    // ===========================================
    const credentials = document.querySelectorAll('.credential');
    
    credentials.forEach((cred, index) => {
        cred.addEventListener('mouseenter', function() {
            this.style.background = 'var(--color-accent)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.1)';
        });
        
        cred.addEventListener('mouseleave', function() {
            this.style.background = 'var(--color-background-alt)';
            this.style.color = 'var(--color-primary)';
            this.style.transform = 'scale(1)';
        });
    });

    // ===========================================
    // Certification Cards Animation
    // ===========================================
    const certCards = document.querySelectorAll('.cert-card');
    
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    certCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        certObserver.observe(card);
    });

    // ===========================================
    // Affiliation Items Wave Animation
    // ===========================================
    const affiliationItems = document.querySelectorAll('.affiliation-item');
    
    const affiliationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                affiliationItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                });
                
                affiliationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const affiliationList = document.querySelector('.affiliation-list');
    if (affiliationList) {
        affiliationItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });
        
        affiliationObserver.observe(affiliationList);
    }

    // ===========================================
    // Stats Showcase Counter Animation
    // ===========================================
    function animateStatCounter(element, duration = 2000) {
        const target = parseInt(element.getAttribute('data-target'));
        const increment = target / (duration / 16);
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

    const statShowcases = document.querySelectorAll('.stat-showcase');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                
                if (statValue && !statValue.classList.contains('counted')) {
                    setTimeout(() => {
                        statValue.classList.add('counted');
                        animateStatCounter(statValue);
                        
                        // Animate the entire card
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            }
        });
    }, { threshold: 0.3 });

    statShowcases.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(30px)';
        stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        statsObserver.observe(stat);
    });

    // ===========================================
    // Awards Card Flip Effect
    // ===========================================
    const awardCards = document.querySelectorAll('.award-card');
    
    const awardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'rotateY(0deg)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    awardCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'rotateY(90deg)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        awardsObserver.observe(card);
    });

    // ===========================================
    // Timeline Year Pulse Animation
    // ===========================================
    const timelineYears = document.querySelectorAll('.timeline-year');
    
    function pulseTimelineYears() {
        timelineYears.forEach((year, index) => {
            setTimeout(() => {
                year.style.transform = 'translateX(-50%) scale(1.2)';
                setTimeout(() => {
                    year.style.transform = 'translateX(-50%) scale(1)';
                }, 300);
            }, index * 200);
        });
    }

    // Trigger pulse when timeline is in view
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const pulseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pulseTimelineYears();
                    pulseObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        pulseObserver.observe(timeline);
    }

    // ===========================================
    // Mission Icon Rotation
    // ===========================================
    const missionIcons = document.querySelectorAll('.mission-icon');
    
    missionIcons.forEach(icon => {
        let rotation = 0;
        
        setInterval(() => {
            rotation += 1;
            icon.style.transform = `rotate(${rotation}deg)`;
        }, 50);
        
        icon.closest('.mission-card').addEventListener('mouseenter', function() {
            icon.style.animation = 'spin 0.8s linear';
        });
    });

    // ===========================================
    // Value Number Highlight on Scroll
    // ===========================================
    const valueNumbers = document.querySelectorAll('.value-number');
    
    valueNumbers.forEach(number => {
        const parent = number.closest('.value-item');
        
        parent.addEventListener('mouseenter', function() {
            number.style.opacity = '1';
            number.style.transform = 'scale(1.2)';
        });
        
        parent.addEventListener('mouseleave', function() {
            number.style.opacity = '0.3';
            number.style.transform = 'scale(1)';
        });
    });

    // ===========================================
    // Cert Icon Bounce on Hover
    // ===========================================
    const certIcons = document.querySelectorAll('.cert-icon');
    
    certIcons.forEach(icon => {
        icon.closest('.cert-card').addEventListener('mouseenter', function() {
            icon.style.animation = 'bounce 0.6s ease';
        });
        
        icon.closest('.cert-card').addEventListener('mouseleave', function() {
            icon.style.animation = '';
        });
    });

    // Add bounce animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-10px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // ===========================================
    // Award Year Count-Up on Hover
    // ===========================================
    awardCards.forEach(card => {
        const yearElement = card.querySelector('.award-year');
        const originalYear = yearElement.textContent;
        
        card.addEventListener('mouseenter', function() {
            let year = 2000;
            const target = parseInt(originalYear);
            
            const interval = setInterval(() => {
                if (year <= target) {
                    yearElement.textContent = year;
                    year++;
                } else {
                    clearInterval(interval);
                    yearElement.textContent = originalYear;
                }
            }, 30);
        });
    });

    // ===========================================
    // Story Text Fade-in on Scroll
    // ===========================================
    const storyTexts = document.querySelectorAll('.story-text');
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    storyTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.transform = 'translateX(-20px)';
        text.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        storyObserver.observe(text);
    });

    // ===========================================
    // Parallax Effect for Timeline
    // ===========================================
    window.addEventListener('scroll', function() {
        if (timeline) {
            const rect = timeline.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.05;
                
                timelineYears.forEach((year, index) => {
                    year.style.transform = `translateX(-50%) translateY(${rate - (index * 5)}px)`;
                });
            }
        }
    });

    // ===========================================
    // Interactive Stat Icons
    // ===========================================
    const statIcons = document.querySelectorAll('.stat-showcase .stat-icon');
    
    statIcons.forEach(icon => {
        icon.closest('.stat-showcase').addEventListener('mouseenter', function() {
            icon.style.transform = 'scale(1.2) rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        icon.closest('.stat-showcase').addEventListener('mouseleave', function() {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ===========================================
    // Print Current Page Info
    // ===========================================
    console.log('%c About Page Loaded ', 'background: #1a365d; color: #d4af37; font-size: 16px; padding: 10px;');
    console.log('✓ Timeline animations initialized');
    console.log('✓ Team member cards ready');
    console.log('✓ Stats counter active');
    console.log('✓ Interactive elements loaded');

})();
