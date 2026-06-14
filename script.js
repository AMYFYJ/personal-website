// ============================================
// CLASSICAL MUSIC INSPIRED WEBSITE - SIMPLE JS
// ============================================

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

// Initialize button effects on page load
window.addEventListener('load', () => {
    addRippleEffects();
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


// Typing effect for hero subtitle
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
    let typingSpeed = 100;

    const type = () => {
        const currentKeyword = keywords[keywordIndex];

        if (isDeleting) {
            // Deleting characters
            typedTextElement.textContent = currentKeyword.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typedTextElement.textContent = currentKeyword.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // When word is complete
        if (!isDeleting && charIndex === currentKeyword.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        }
        // When word is fully deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            keywordIndex = (keywordIndex + 1) % keywords.length; // Move to next word
            typingSpeed = 500; // Brief pause before typing next word
        }

        setTimeout(type, typingSpeed);
    };

    // Start the typing effect
    type();
};

// Initialize typing effect on page load
window.addEventListener('load', () => {
    initTypingEffect();
});


