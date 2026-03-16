<script>
// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking on login button in mobile menu
    const mobileLoginBtn = document.querySelector('.mobile-login .btn-login');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Scroll Animations
    const animateSections = document.querySelectorAll('.animate-section');
    
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animation sections
    animateSections.forEach(section => {
        observer.observe(section);
    });

    // Carousel Indicators (Optional: Add click functionality)
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // Remove active class from all indicators
            indicators.forEach(ind => ind.classList.remove('active'));
            // Add active class to clicked indicator
            indicator.classList.add('active');
        });
    });

    // Smooth scroll for any internal links (if added later)
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

    // Add scroll effect to header (optional)
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling
        if (scrollTop > 0) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Preload images for better performance
    const imagesToPreload = [
        'https://ext.same-assets.com/3341328982/613654952.jpeg',
        'https://ext.same-assets.com/3341328982/979906692.png'
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add loading class removal after page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth >= 1024) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Optional: Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        const parallaxScroll = throttle(function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled <= heroHeight) {
                const speed = scrolled * 0.5;
                heroImage.style.transform = `translateY(${speed}px)`;
            }
        }, 16);

        window.addEventListener('scroll', parallaxScroll);
    }

    // Console log for debugging
    console.log('GlobalTrack website loaded successfully!');
});

// Additional utility functions
function showElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

function hideElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
}

// Export functions for potential use in other scripts
window.GlobalTrack = {
    showElement,
    hideElement
};
</script>
