// ============================================
// AMY FANG — PORTFOLIO INTERACTIONS
// ============================================

// --------------------------------------------
// Mobile navigation (hamburger + overlay)
// --------------------------------------------
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const body = document.body;

const openMenu = () => {
    body.classList.add('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
    body.classList.remove('menu-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle) {
    navToggle.addEventListener('click', () => {
        body.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
}

// Close the menu after tapping any nav/brand link
document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// --------------------------------------------
// Scroll-spy: highlight the active section link
// --------------------------------------------
const navLinks = Array.from(document.querySelectorAll('.sidebar-nav .nav-link'));
const linkById = {};
navLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    linkById[id] = link;
});

const setActive = (id) => {
    navLinks.forEach(link => link.classList.remove('active'));
    if (linkById[id]) linkById[id].classList.add('active');
};

if ('IntersectionObserver' in window && navLinks.length) {
    const spy = new IntersectionObserver((entries) => {
        // Pick the most visible intersecting section
        let best = null;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!best || entry.intersectionRatio > best.intersectionRatio) {
                    best = entry;
                }
            }
        });
        if (best) setActive(best.target.id);
    }, { rootMargin: '-44% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] });

    navLinks.forEach(link => {
        const el = document.getElementById(link.getAttribute('href').slice(1));
        if (el) spy.observe(el);
    });
}

// --------------------------------------------
// Ripple effect for buttons
// --------------------------------------------
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
    setTimeout(() => ripple.remove(), 600);
};

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// --------------------------------------------
// Scroll-to-top button
// --------------------------------------------
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.pageYOffset > 320);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// --------------------------------------------
// Reveal sections on scroll
// --------------------------------------------
const revealSections = document.querySelectorAll('.reveal-section');

const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    revealSections.forEach(section => {
        if (section.getBoundingClientRect().top < trigger) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// --------------------------------------------
// Typing effect for hero subtitle
// --------------------------------------------
const initTypingEffect = () => {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const keywords = [
        'Data Scientist',
        'AI Engineer',
        'Strategist',
        'Researcher',
        'Creator'
    ];

    let keywordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentKeyword = keywords[keywordIndex];
        let typingSpeed;

        if (isDeleting) {
            typedTextElement.textContent = currentKeyword.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentKeyword.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentKeyword.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            keywordIndex = (keywordIndex + 1) % keywords.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    };

    type();
};

window.addEventListener('load', initTypingEffect);
