// Theme toggling
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const toggleIcon = themeToggle.querySelector('i');
const toggleText = themeToggle.querySelector('.toggle-text');

// Initialize theme from localStorage or default to dark
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    toggleIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    toggleText.textContent = savedTheme === 'dark' ? 'Dark' : 'Light';
};

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    toggleIcon.className = newTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    toggleText.textContent = newTheme === 'dark' ? 'Dark' : 'Light';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
});

// Language switching
const langSwitch = document.querySelector('.lang-switch');
const langText = langSwitch.querySelector('.lang-text');

const translations = {
    en: {
        welcome: "Xandll",
        projects: "Projects",
        tools: "Tools",
        about: "About Me",
        skills: "Skills",
        connect: "Connect",
        aboutText: "Hi! I'm a Computer Science Student with a passion for Linux. I enjoy building tools that solve real problems or just for fun.",
        heroSubtitle: "Computer Science Student & Linux Enthusiast",
        viewProjects: "View Projects",
        contact: "Contact Me",
        timeline: "Development Timeline",
        timeline2024: "Advanced JavaScript & C programming, Linux system administration",
        timeline2023: "Advanced HTML/CSS, Introduction to C and Linux fundamentals",
        timeline2022: "Started learning HTML & CSS at school",
        timeline2021: "First steps in programming with Python basics"
    },
    de: {
        welcome: "Xandll",
        projects: "Projekte",
        tools: "Tools",
        about: "Über Mich",
        skills: "Fähigkeiten",
        connect: "Kontakt",
        aboutText: "Hi! Ich bin ein Informatik Schüler mit einer Leidenschaft für Linux. Ich entwickle gerne Tools, die echte Probleme lösen oder nur zum Spaß.",
        heroSubtitle: "Informatik Schüler & Linux-Enthusiast",
        viewProjects: "Projekte Ansehen",
        contact: "Kontaktiere Mich",
        timeline: "Entwicklungs-Timeline",
        timeline2024: "JS & C (Vertiefung), Linux-Administration (Schule & Freizeit)",
        timeline2023: "HTML/CSS (Vertiefung), C & Linux Grundlagen (Schule & Freizeit)",
        timeline2022: "HTML & CSS Grundlagen (Schule)",
        timeline2021: "Python Grundlagen (Selbststudium)"
    }
};

// Initialize language from localStorage or default to en
const initLanguage = () => {
    const savedLang = localStorage.getItem('language') || 'en';
    langText.textContent = savedLang.toUpperCase();
    updateContent(savedLang);
};

const updateContent = (lang) => {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
};

langSwitch.addEventListener('click', () => {
    const currentLang = langText.textContent.toLowerCase();
    const newLang = currentLang === 'en' ? 'de' : 'en';
    langText.textContent = newLang.toUpperCase();
    
    // Update content and save preference
    updateContent(newLang);
    localStorage.setItem('language', newLang);
});

// Initialize theme and language on page load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
});

// Scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header background change on scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add toggle container functionality
const toggleContainer = document.querySelector('.toggle-container');
const toggleHandle = document.querySelector('.toggle-handle');

// Toggle active state on click
toggleHandle.addEventListener('click', () => {
    toggleContainer.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (!toggleContainer.contains(e.target)) {
        toggleContainer.classList.remove('active');
    }
});

// Close when a toggle is clicked
document.querySelectorAll('.theme-toggle, .lang-switch').forEach(toggle => {
    toggle.addEventListener('click', () => {
        setTimeout(() => {
            toggleContainer.classList.remove('active');
        }, 300);
    });
});

// Add mouse follower functionality
const mouseFollower = document.querySelector('.mouse-follower');
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Add custom scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const windowHeight = window.innerHeight;
            const elementHeight = targetElement.offsetHeight;
            
            // Calculate position to center the section vertically, but slightly higher
            const centerOffset = Math.max(0, (windowHeight - elementHeight) / 8);
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - centerOffset;
            
            // Custom smooth scroll with easing
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 600;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function
                const ease = progress => {
                    return progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                };

                window.scrollTo(0, startPosition + distance * ease(progress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    });
});

// Add this code near the end of your script.js file
document.querySelector('.discord-link').addEventListener('click', (e) => {
    e.preventDefault();
    // Copy Discord username to clipboard
    navigator.clipboard.writeText('Xandll');
    
    // Change tooltip text temporarily to show it was copied
    const tooltip = e.currentTarget.querySelector('.discord-tooltip');
    const originalText = tooltip.textContent;
    tooltip.textContent = 'Copied!';
    
    // Reset tooltip text after 2 seconds
    setTimeout(() => {
        tooltip.textContent = originalText;
    }, 2000);
});

// Add this with your other JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    const discordLink = document.querySelector('.discord-link');
    const discordPopup = document.getElementById('discordPopup');
    const closePopup = document.querySelector('.close-popup');

    discordLink.addEventListener('click', function(e) {
        e.preventDefault();
        discordPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function() {
        discordPopup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === discordPopup) {
            discordPopup.style.display = 'none';
        }
    });
});

