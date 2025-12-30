// ============================================
// CLASSICAL MUSIC INSPIRED WEBSITE - SIMPLE JS
// ============================================

// Simple Mouse Trail
const createMouseTrail = () => {
    const trailLength = 12;
    const trails = [];
    const colors = ['#2D6A5F', '#3a8775', '#B8860B', '#4A628A'];

    // Create fixed number of trail dots
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail-dot';
        const colorIndex = Math.floor(i / 3) % colors.length;
        trail.style.backgroundColor = colors[colorIndex];
        trail.style.opacity = '0';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            currentX: 0,
            currentY: 0
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate trail
    const animateTrail = () => {
        // Update first trail position to mouse
        trails[0].x = mouseX;
        trails[0].y = mouseY;

        // Each trail follows the previous one
        for (let i = 0; i < trails.length; i++) {
            const trail = trails[i];

            if (i > 0) {
                const prev = trails[i - 1];
                trail.x += (prev.currentX - trail.x) * 0.4;
                trail.y += (prev.currentY - trail.y) * 0.4;
            }

            trail.currentX += (trail.x - trail.currentX) * 0.3;
            trail.currentY += (trail.y - trail.currentY) * 0.3;

            // Position and fade based on index
            trail.element.style.left = trail.currentX + 'px';
            trail.element.style.top = trail.currentY + 'px';
            trail.element.style.opacity = (1 - (i / trailLength)) * 0.6;

            // Scale smaller for dots further back
            const scale = 1 - (i / trailLength) * 0.5;
            trail.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        requestAnimationFrame(animateTrail);
    };

    animateTrail();
};

// Ripple Effect for Buttons
const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
};

// Add ripple effect to all buttons
const addRippleEffects = () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
};

// Initialize mouse trail on page load
window.addEventListener('load', () => {
    createMouseTrail();
    addRippleEffects();
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to top button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Reveal sections on scroll
const revealSections = document.querySelectorAll('.reveal-section');

const revealOnScroll = () => {
    revealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Initial check after page load
window.addEventListener('load', () => {
    revealOnScroll();
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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

