// js/velocity.js

document.addEventListener('DOMContentLoaded', () => {
    const progressLine = document.getElementById('scrollProgressLine');

    window.addEventListener('scroll', () => {
        // How many pixels the user has scrolled down vertically
        const windowScrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Total scrollable height of the entire webpage document
        const totalDocumentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (totalDocumentHeight > 0) {
            // Calculate percentage (0 to 100)
            const scrollPercentage = (windowScrollTop / totalDocumentHeight) * 100;
            
            // Apply the width value to the HTML line element
            progressLine.style.width = scrollPercentage + '%';
        }
    });
});