// ============================================
// CLASSICAL MUSIC INSPIRED WEBSITE - SIMPLE JS
// ============================================

// Sparks Cursor Trail Effect - Gradient Colors
const createMouseTrail = () => {
    const sparks = [];
    const maxSparks = 50;

    // Vibrant gradient colors matching the website theme
    const colors = [
        '#FF6B9D',  // Coral Pink (primary-accent)
        '#8B5CF6',  // Rich Purple (tertiary-accent)
        '#06D6A0',  // Vibrant Teal (secondary-accent)
        '#F59E0B',  // Warm Amber (quaternary-accent)
        '#FFB3D1',  // Light Pink (primary-accent-light)
        '#A78BFA'   // Light Purple (tertiary-accent-light)
    ];

    let lastX = 0;
    let lastY = 0;
    let isMoving = false;

    // Create spark particle
    const createSpark = (x, y) => {
        if (sparks.length >= maxSparks) {
            const oldSpark = sparks.shift();
            oldSpark.element.remove();
        }

        const spark = document.createElement('div');
        spark.className = 'trail-dot';

        // Random color from gradient palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        spark.style.backgroundColor = color;
        spark.style.color = color; // For currentColor in box-shadow

        // Random size variation
        const size = 4 + Math.random() * 4;
        spark.style.width = size + 'px';
        spark.style.height = size + 'px';

        // Starting position
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';

        document.body.appendChild(spark);

        // Random velocity for spark-like scatter effect
        const angle = Math.random() * Math.PI * 2;
        const velocity = 0.5 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        // Add slight upward bias (sparks tend to rise)
        const sparkData = {
            element: spark,
            x: x,
            y: y,
            vx: vx,
            vy: vy - 0.3,
            life: 1.0,
            decay: 0.015 + Math.random() * 0.015,
            rotation: Math.random() * 360
        };

        sparks.push(sparkData);
    };

    // Track mouse movement
    let createSparkTimer = 0;
    document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        lastX = e.clientX;
        lastY = e.clientY;
        isMoving = true;

        // Create more sparks when moving faster
        if (distance > 2) {
            createSparkTimer++;
            if (createSparkTimer % 2 === 0) { // Create spark every other frame when moving
                createSpark(e.clientX, e.clientY);
            }
        }
    });

    // Animate sparks
    const animateSparks = () => {
        sparks.forEach((spark, index) => {
            // Update position with velocity
            spark.x += spark.vx;
            spark.y += spark.vy;

            // Apply slight gravity and air resistance
            spark.vy += 0.05; // gravity
            spark.vx *= 0.98; // air resistance
            spark.vy *= 0.98;

            // Decrease life
            spark.life -= spark.decay;

            // Update visual properties
            if (spark.life > 0) {
                spark.element.style.left = spark.x + 'px';
                spark.element.style.top = spark.y + 'px';
                spark.element.style.opacity = Math.max(0, spark.life);

                // Rotate and scale down as it fades
                const scale = 0.3 + spark.life * 0.7;
                spark.rotation += 2;
                spark.element.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${spark.rotation}deg)`;
            } else {
                // Remove dead sparks
                spark.element.remove();
                sparks.splice(index, 1);
            }
        });

        requestAnimationFrame(animateSparks);
    };

    animateSparks();
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

