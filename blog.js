// ================= BLOG FILTERING & SEARCH =================

// Blog Search Functionality
const blogSearch = document.getElementById('blogSearch');
const articlesGrid = document.getElementById('articlesGrid');
const filterBtns = document.querySelectorAll('[data-blog-filter]');
const articleCards = document.querySelectorAll('.article-card[data-category]');
const noResultsMsg = document.getElementById('noResults');

let currentFilter = 'all';
let currentSearch = '';

// Update active filter button
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');
        
        currentFilter = btn.getAttribute('data-blog-filter');
        filterArticles();
    });
});

// Search functionality
if (blogSearch) {
    blogSearch.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterArticles();
    });
}

// Combined filtering and search
function filterArticles() {
    let visibleCount = 0;

    articleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.getAttribute('data-title').toLowerCase();
        const description = card.getAttribute('data-description').toLowerCase();

        const matchesCategory = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = title.includes(currentSearch) || description.includes(currentSearch);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            // Trigger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Show/hide no results message
    if (visibleCount === 0) {
        noResultsMsg.style.display = 'block';
    } else {
        noResultsMsg.style.display = 'none';
    }
}

// Add CSS transition to article cards
articleCards.forEach(card => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// ================= ARTICLE PAGE FUNCTIONALITY =================

// Copy link functionality
const copyLinkBtn = document.getElementById('copyLink');
if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        
        // Visual feedback
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyLinkBtn.style.background = 'rgba(0, 200, 100, 0.2)';
        copyLinkBtn.style.borderColor = '#00c864';
        
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
            copyLinkBtn.style.background = '';
            copyLinkBtn.style.borderColor = '';
        }, 2000);
    });
}

// Subscribe form
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        
        // Create mailto link (or send to backend)
        const mailtoLink = `mailto:amanijordandev@gmail.com?subject=Blog Subscription&body=Please subscribe me to the blog updates: ${email}`;
        window.location.href = mailtoLink;
        
        // Reset form
        subscribeForm.reset();
    });
}

// ================= BLOG ANIMATIONS =================

// Fade-in animations for blog elements
document.addEventListener('DOMContentLoaded', () => {
    // Stagger animation for article cards
    const cards = document.querySelectorAll('.article-card.fade-in-up, .video-card.fade-in-up');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for lazy animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const classes = entry.target.className;
                if (classes.includes('fade-in-up')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                } else if (classes.includes('fade-in-left')) {
                    entry.target.style.animation = 'fadeInLeft 0.6s ease forwards';
                } else if (classes.includes('fade-in-right')) {
                    entry.target.style.animation = 'fadeInRight 0.6s ease forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[class*="fade-in"]').forEach(el => {
        observer.observe(el);
    });
});

// ================= SMOOTH ARTICLE PAGE SCROLLING =================

// Scroll to section smooth behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});