const toggleBtn = document.getElementById('dark-mode-toggle');
const icon = toggleBtn.querySelector('img');

// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    icon.src = 'assets/sun-solid-full.svg';
} else if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    icon.src = 'assets/moon-solid-full.svg';
} else {
    // System preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        icon.src = 'assets/sun-solid-full.svg';
    }
}

// Toggle dark mode manually
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    icon.src = isDark ? 'assets/sun-solid-full.svg' : 'assets/moon-solid-full.svg';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scrolling for nav links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
    });
});
