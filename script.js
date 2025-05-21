// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Enhanced Navbar Scroll Effect
let lastScroll = 0;
let scrollTimer;
const navbar = document.querySelector('.navbar');
const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'));

function showNavbar() {
    navbar.style.transform = 'translateY(0)';
    navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
}

function hideNavbar() {
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > navbarHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        showNavbar(); // Always show navbar at the top
    }
    
    // Show navbar when scrolling down or at the top
    if (currentScroll > lastScroll || currentScroll <= navbarHeight) {
        showNavbar();
    } else {
        hideNavbar();
    }
    
    // Clear the previous timer
    clearTimeout(scrollTimer);
    
    // Set a new timer to show navbar when scrolling stops
    scrollTimer = setTimeout(() => {
        showNavbar();
    }, 150); // Show navbar after 150ms of no scrolling
    
    lastScroll = currentScroll;
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navbarOffset = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition - navbarOffset,
            behavior: 'smooth'
        });
    });
});

// Enhanced Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation to child elements
            if (entry.target.classList.contains('stagger-container')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .stagger-container').forEach(el => observer.observe(el));

// Form Submission Animation
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Add loading animation
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message sent successfully!';
        form.appendChild(successMessage);
        
        // Reset form and button
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
        }, 5000);
    });
}

// Enhanced Typing Effect
const typingElements = document.querySelectorAll('.typing-effect');
typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.display = 'inline-block';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            element.appendChild(cursor);
        }
    };
    
    typeWriter();
});

// Enhanced Hover Effects
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.boxShadow = 'var(--shadow-hover)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'var(--shadow)';
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Cursor Trail Effect
const cursorTrail = document.createElement('div');
cursorTrail.className = 'cursor-trail';
document.body.appendChild(cursorTrail);

let trail = [];
const trailLength = 20;

for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    cursorTrail.appendChild(dot);
    trail.push({
        element: dot,
        x: 0,
        y: 0
    });
}

document.addEventListener('mousemove', (e) => {
    trail[0].x = e.clientX;
    trail[0].y = e.clientY;
});

function updateTrail() {
    for (let i = trail.length - 1; i > 0; i--) {
        trail[i].x = trail[i - 1].x;
        trail[i].y = trail[i - 1].y;
    }
    
    trail.forEach((dot, index) => {
        dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        dot.element.style.opacity = 1 - (index / trailLength);
    });
    
    requestAnimationFrame(updateTrail);
}

updateTrail();

// Add CSS for cursor trail
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    }
    
    .cursor-dot {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    }
    
    .typing-cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: var(--primary-color);
        margin-left: 2px;
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        50% { opacity: 0; }
    }
`;

document.head.appendChild(style); 