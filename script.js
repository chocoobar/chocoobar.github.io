// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        if (scrollPos >= top && scrollPos <= bottom) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
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
        behavior: 'smooth'
    });
}

// Create and add scroll to top button
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.setAttribute('aria-label', 'Scroll to top');
    
    // Styling for the scroll button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #6366f1;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            font-size: 1.2rem;
        }
        
        .scroll-to-top:hover {
            background: #4f46e5;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 15px;
                right: 15px;
                width: 45px;
                height: 45px;
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

// Show/hide scroll to top button and navbar background
function handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide scroll to top button
    if (scrollTop > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
    
    // Add/remove navbar background blur effect
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(29, 3, 3, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(21, 2, 2, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animationElements = [
        { selector: '.section-header', class: 'fade-in' },
        { selector: '.hero-text', class: 'slide-in-left' },
        { selector: '.hero-image', class: 'slide-in-right' },
        { selector: '.about-text', class: 'slide-in-left' },
        { selector: '.about-image', class: 'slide-in-right' },
        { selector: '.project-card', class: 'fade-in' },
        { selector: '.skill-category', class: 'fade-in' },
        { selector: '.contact-info', class: 'slide-in-left' },
        { selector: '.contact-form', class: 'slide-in-right' }
    ];
    
    animationElements.forEach(({ selector, class: animationClass }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animationClass);
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual form handling)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling for notifications
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 90px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .notification-success {
            background: #10b981;
        }
        
        .notification-error {
            background: #ef4444;
        }
        
        .notification-info {
            background: #6366f1;
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
    
    // Add styles if they don't exist
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const nameSpan = heroTitle.querySelector('.highlight');
    
    if (nameSpan) {
        const nameText = nameSpan.textContent;
        const beforeName = originalText.split('<span class="highlight">')[0];
        const afterName = '</span>';
        
        let currentText = '';
        let currentIndex = 0;
        let isTypingName = false;
        
        heroTitle.innerHTML = beforeName + '<span class="highlight"></span>';
        const highlightSpan = heroTitle.querySelector('.highlight');
        
        function typeText() {
            if (!isTypingName && currentIndex < beforeName.length) {
                // Typing text before the name
                if (beforeName[currentIndex] === '<') {
                    // Skip HTML tags
                    const tagEnd = beforeName.indexOf('>', currentIndex);
                    currentText += beforeName.substring(currentIndex, tagEnd + 1);
                    currentIndex = tagEnd + 1;
                } else {
                    currentText += beforeName[currentIndex];
                    currentIndex++;
                }
            } else if (!isTypingName) {
                // Start typing the name
                isTypingName = true;
                currentIndex = 0;
            } else if (currentIndex < nameText.length) {
                // Typing the name
                highlightSpan.textContent += nameText[currentIndex];
                currentIndex++;
            } else {
                // Typing complete
                return;
            }
            
            if (!isTypingName) {
                heroTitle.innerHTML = currentText + '<span class="highlight"></span>';
            }
            
            setTimeout(typeText, 100);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeText, 1000);
    }
}

// Skill items hover effect
function initSkillItemEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Add a subtle rotation animation
            item.style.transform = 'translateY(-5px) rotate(2deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Project card image hover effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const links = card.querySelectorAll('.project-link');
        
        card.addEventListener('mouseenter', () => {
            // Animate project links
            links.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transform = 'scale(1) translateY(0)';
                    link.style.opacity = '1';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            links.forEach(link => {
                link.style.transform = 'scale(0.8) translateY(10px)';
                link.style.opacity = '0';
            });
        });
        
        // Initialize link states
        links.forEach(link => {
            link.style.transform = 'scale(0.8) translateY(10px)';
            link.style.opacity = '0';
            link.style.transition = 'all 0.3s ease';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initContactForm();
    initSkillItemEffects();
    initProjectCardEffects();
    
    // Set initial active nav link
    updateActiveNavLink();
});

// Handle scroll events
window.addEventListener('scroll', handleScroll);

// Handle resize events for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    
    // Update active nav link
    updateActiveNavLink();
});

// Prevent default form submission behavior for demo
document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('contact-form')) {
        e.preventDefault();
    }
});

// Add some interactive features for better UX
document.addEventListener('click', (e) => {
    // Close mobile menu when clicking outside
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Scroll to top with Home key
    if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        scrollToTop();
    }
});

// Performance optimization: Throttle scroll events
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

// Replace the direct scroll listener with throttled version
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', requestTick);
