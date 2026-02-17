const toggleBtn = document.getElementById('dark-mode-toggle');
const icon = toggleBtn?.querySelector('img');

function getSavedTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        console.warn('localStorage not available:', e);
        return null;
    }
}

function setSavedTheme(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.warn('Failed to save theme preference:', e);
    }
}

// Apply saved theme on page load
const savedTheme = getSavedTheme();
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (icon) icon.src = 'assets/sun-solid-full.svg';
} else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    if (icon) icon.src = 'assets/moon-solid-full.svg';
} else {
    // System preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        if (icon) icon.src = 'assets/sun-solid-full.svg';
    }
}

// Toggle dark mode manually
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        if (icon) icon.src = isDark ? 'assets/sun-solid-full.svg' : 'assets/moon-solid-full.svg';
        setSavedTheme(isDark ? 'dark' : 'light');
    });
}

// Smooth scrolling for nav links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        const href = e.target.getAttribute("href");
        // Only handle internal links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            } else {
                console.warn('Scroll target not found:', href);
            }
        }
    });
});

// Responsive menu toggle (hamburger)
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('nav ul');
if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        const shown = navList.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', shown ? 'true' : 'false');
    });

    // Close the mobile menu when a nav link is clicked
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}