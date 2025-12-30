// ============================================
// CLASSICAL MUSIC INSPIRED WEBSITE - SIMPLE JS
// ============================================

// Magic Wand Cursor
const createMagicWand = () => {
    const wand = document.createElement('div');
    wand.className = 'magic-wand';
    wand.innerHTML = '🪄';
    wand.style.fontSize = '32px';
    document.body.appendChild(wand);

    let mouseX = 0;
    let mouseY = 0;
    let wandX = 0;
    let wandY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createSparkle(e.clientX, e.clientY);
    });

    // Smooth cursor movement
    const animateWand = () => {
        wandX += (mouseX - wandX) * 0.15;
        wandY += (mouseY - wandY) * 0.15;

        wand.style.left = wandX + 'px';
        wand.style.top = wandY + 'px';

        requestAnimationFrame(animateWand);
    };

    animateWand();
};

// Sparkle Effect
let lastSparkleTime = 0;
const sparkleDelay = 50; // milliseconds between sparkles

const createSparkle = (x, y) => {
    const now = Date.now();
    if (now - lastSparkleTime < sparkleDelay) return;
    lastSparkleTime = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // Random sparkle characters
    const sparkles = ['✨', '⭐', '💫', '🌟', '✦', '✧', '◦'];
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];

    // Random size
    const size = 12 + Math.random() * 12;
    sparkle.style.fontSize = size + 'px';

    // Position with slight random offset
    sparkle.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
    sparkle.style.top = (y + (Math.random() - 0.5) * 20) + 'px';

    // Random color from theme
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#5B9FED', '#95E1D3'];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
};

// Initialize magic wand on page load
window.addEventListener('load', () => {
    createMagicWand();
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

