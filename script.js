// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scrolling for navigation links (accounts for the fixed navbar height)
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
}

// Create and add scroll to top button
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');

    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 48px;
            height: 48px;
            background: #74c0fc;
            color: #04101c;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(116, 192, 252, 0.25);
            font-size: 1.1rem;
        }

        .scroll-to-top:hover {
            box-shadow: 0 12px 30px rgba(116, 192, 252, 0.4);
            transform: translateY(-2px);
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 16px;
                right: 16px;
                width: 44px;
                height: 44px;
                font-size: 1rem;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(scrollButton);

    scrollButton.addEventListener('click', scrollToTop);

    return scrollButton;
}

const scrollToTopButton = createScrollToTopButton();

// Scroll progress bar + hero parallax elements
const scrollProgress = document.getElementById('scrollProgress');
const parallaxImage = document.getElementById('parallaxImage');
const heroSection = document.querySelector('.hero');

// Handle scroll: navbar shadow, scroll-to-top visibility, progress bar, parallax, active link
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }

    navbar.classList.toggle('scrolled', scrollTop > 50);

    if (scrollProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
    }

    if (parallaxImage && heroSection && !prefersReducedMotion) {
        const heroHeight = heroSection.offsetHeight;
        if (scrollTop < heroHeight) {
            parallaxImage.style.transform = `translateY(${scrollTop * 0.12}px)`;
        }
    }

    updateActiveNavLink();
}

// Reveal-on-scroll system: staggers siblings sharing a parent via --reveal-i
function initRevealAnimations() {
    const revealEls = document.querySelectorAll('[data-reveal]');
    const indexByParent = new Map();

    revealEls.forEach(el => {
        const parent = el.parentElement;
        const i = indexByParent.get(parent) || 0;
        el.style.setProperty('--reveal-i', i);
        indexByParent.set(parent, i + 1);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
}

// Hero headline line-reveal, triggered shortly after load
function initHeroIntro() {
    if (!heroSection) return;
    window.requestAnimationFrame(() => {
        setTimeout(() => heroSection.classList.add('is-loaded'), 120);
    });
}

// Animate the About stats counting up once visible
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10) || 0;
            observer.unobserve(el);

            if (prefersReducedMotion) {
                el.textContent = target;
                return;
            }

            const duration = 1200;
            const start = performance.now();

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// Custom cursor: a lagging ring + a tight dot, desktop/fine-pointer only
function initCustomCursor() {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !supportsHover) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let started = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        if (!started) {
            started = true;
            document.documentElement.classList.add('cursor-active');
        }
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-item');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.documentElement.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.documentElement.classList.remove('cursor-hover'));
    });
}

// Magnetic buttons: gently pull elements marked [data-magnetic] toward the cursor
function initMagneticElements() {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (prefersReducedMotion || !supportsHover) return;

    const magneticEls = document.querySelectorAll('[data-magnetic]');

    magneticEls.forEach(el => {
        const strength = parseFloat(el.getAttribute('data-magnetic-strength')) || 0.35;

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const submitLabel = submitButton.querySelector('span');
            const originalText = submitLabel.textContent;

            submitLabel.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitLabel.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const notificationStyles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: #04101c;
            font-weight: 500;
            z-index: 1400;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
        }

        .notification-success {
            background: #4ade80;
        }

        .notification-error {
            background: #f87171;
        }

        .notification-info {
            background: #74c0fc;
        }

        .notification.show {
            transform: translateX(0);
        }

        @media (max-width: 768px) {
            .notification {
                top: 80px;
                right: 15px;
                left: 15px;
                max-width: none;
            }
        }
    `;

    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroIntro();
    initRevealAnimations();
    initCountUp();
    initCustomCursor();
    initMagneticElements();
    initContactForm();

    updateActiveNavLink();
});

// Handle resize events for responsive adjustments
window.addEventListener('resize', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');

    updateActiveNavLink();
});

// Prevent default form submission behavior for demo
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        scrollToTop();
    }
});

// Performance optimization: throttle scroll events via requestAnimationFrame
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);
