// Smooth scrolling for navigation links
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

// Experience tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const company = button.getAttribute('data-company');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.querySelector(`[data-company="${company}"].tab-content`).classList.add('active');
    });
});

// Navbar scroll effect
let scrollPosition = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > scrollPosition) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    scrollPosition = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-7px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const introText = document.querySelector('.intro');
    if (introText) {
        typeWriter(introText, "Hi, my name is", 50);
    }
});

// Form handling (if you add a contact form)
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Add your form submission logic here
    console.log('Form submitted');
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-open');
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (document.activeElement === lastElement) {
            e.preventDefault();
            focusableElements[0].focus();
        }
    }
});

// Performance optimization - lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading states
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Error handling for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!navigator.onLine) {
            e.preventDefault();
            alert('You are currently offline. Please check your internet connection.');
        }
    });
});

// Console Easter egg
console.log(`
    ███╗   ███╗ █████╗ ███████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
    ████╗ ████║██╔══██╗██╔════╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
    ██╔████╔██║███████║███████╗███████║██║   ██║██████╔╝█████╗  
    ██║╚██╔╝██║██╔══██║╚════██║██╔══██║██║   ██║██╔══██╗██╔══╝  
    ██║ ╚═╝ ██║██║  ██║███████║██║  ██║╚██████╔╝██║  ██║███████╗
    ╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
    
    Welcome to MadScie254's portfolio!
    Built with ❤️ using vanilla HTML, CSS, and JavaScript.
    
    GitHub: https://github.com/MadScie254
    Let's connect and build something amazing together!
`);
