// js/theme.js

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootElement = document.documentElement;

    // Check localStorage for saved theme, default to dark
    const savedTheme = localStorage.getItem('hcti-theme') || 'dark';
    rootElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('hcti-theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
});