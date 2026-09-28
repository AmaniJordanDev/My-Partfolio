// ============================================
// AMANI JORDAN DEV - PORTFOLIO JS
// Interactive Features & Animations
// ============================================

// ================= MOBILE MENU TOGGLE =================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ================= ACTIVE NAV LINK =================
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
updateActiveNavLink();

// ================= TYPING ANIMATION =================
function typeText() {
    const typedElement = document.querySelector('.typed-text');
    if (!typedElement) return;

    const text = typedElement.textContent;
    const words = ['Front-End Developer', 'Web Developer', 'Creative Developer', 'Code Craftsman'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const speed = 100;
    const pauseTime = 2000;

    function type() {
        const currentWord = words[wordIndex];
        const currentText = currentWord.substring(0, charIndex);
        typedElement.textContent = currentText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, speed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            wordIndex = (wordIndex + 1) % words.length;
            isDeleting = false;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation when DOM is ready
document.addEventListener('DOMContentLoaded', typeText);

// ================= SCROLL ANIMATIONS =================
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = `${entry.target.className.match(/fade-in-\w+/)?.[0]} 0.6s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-down').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

// ================= SMOOTH SCROLL REVEAL =================
const revealElements = document.querySelectorAll('[data-aos]');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealOnScroll.observe(el);
});

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(7, 7, 7, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(7, 7, 7, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// ================= CONTACT FORM HANDLING =================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name')?.value || '',
            email: document.getElementById('email')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            message: document.getElementById('message')?.value || '',
            budget: document.getElementById('budget')?.value || ''
        };

        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        // Create mailto link with form data
        const mailtoLink = `mailto:amanijordandev@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact from Portfolio')}&body=${encodeURIComponent(
            `Name: ${formData.name}
Email: ${formData.email}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        showSuccessMessage();

        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 500);
    });
}

// ================= SUCCESS MESSAGE =================
function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.style.display = 'flex';
        successMsg.style.flexDirection = 'column';
        successMsg.style.alignItems = 'center';
        
        setTimeout(() => {
            closeSuccess();
        }, 5000);
    }
}

function closeSuccess() {
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.style.display = 'none';
    }
}

// ================= PROJECT FILTER =================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Initialize filter
document.addEventListener('DOMContentLoaded', () => {
    const activeFilter = document.querySelector('.filter-btn.active');
    if (activeFilter) {
        activeFilter.click();
    }
});

// ================= FAQ ACCORDION =================
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    
    if (question) {
        question.addEventListener('click', () => {
            // Close other FAQs
            faqCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });

            // Toggle current FAQ
            card.classList.toggle('active');
        });
    }
});

// ================= SCROLL TO TOP BUTTON =================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    const style = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff004f, #ff3d76);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    scrollBtn.setAttribute('style', style);
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
    });

    scrollBtn.style.transform = 'scale(1)';
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ================= STATS COUNTER ANIMATION =================
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 30;

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + '+';
                    }
                }, 30);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => counterObserver.observe(stat));
}

document.addEventListener('DOMContentLoaded', animateCounters);

// ================= PARALLAX EFFECT =================
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollValue = window.scrollY;
            element.style.transform = `translateY(${scrollValue * 0.5}px)`;
        });
    });
}

document.addEventListener('DOMContentLoaded', addParallaxEffect);

// ================= SKILL PROGRESS BAR ANIMATION =================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fillBar 1.5s ease-out forwards';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => barObserver.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateSkillBars);

// ================= SMOOTH PAGE TRANSITIONS =================
function handleSmoothPageTransitions() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        if (link && link.href && !link.target && link.origin === window.location.origin) {
            const href = link.getAttribute('href');
            
            if (!href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                // Add fade out animation
                document.body.style.opacity = '0.5';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        }
    });

    // Fade in on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
    handleSmoothPageTransitions();
});

// ================= FORM INPUT FOCUS EFFECT =================
const formInputs = document.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = '#ff004f';
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }
    });
});

// ================= LOADING ANIMATION =================
function showPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    
    const style = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(7, 7, 7, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    loader.setAttribute('style', style);
    document.body.appendChild(loader);
}

// ================= UTILITY: Debounce Function =================
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

// ================= RESPONSIVE ADJUSTMENTS =================
function handleResponsive() {
    const isMobile = window.innerWidth < 700;
    
    // Adjust animations based on screen size
    if (isMobile) {
        document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
            el.style.animationDuration = '0.4s';
        });
    }
}

window.addEventListener('resize', debounce(handleResponsive, 250));
document.addEventListener('DOMContentLoaded', handleResponsive);

// ================= CONSOLE MESSAGE =================
console.log('%c 🚀 Amani Jordan Dev Portfolio', 'color: #ff004f; font-size: 20px; font-weight: bold;');
console.log('%c Built with ❤️ using HTML, CSS & JavaScript', 'color: #ff004f; font-size: 14px;');
console.log('%c Contact: amanijordandev@gmail.com', 'color: #ff004f; font-size: 12px;');

// ================= INITIALIZE ALL ON DOM READY =================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Observe all elements that need animation
    observeElements();
});

// ================= PERFORMANCE: Lazy Load Images =================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}