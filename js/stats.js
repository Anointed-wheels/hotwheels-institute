// js/stats.js

document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Config values for counter speed
    const animationDuration = 2000; // Total count duration in milliseconds (2 seconds)

    function startCounting(element) {
        const targetValue = parseInt(element.getAttribute('data-target'), 10);
        const suffix = element.querySelector('.stat-suffix').outerHTML;
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Easing function for premium look (starts fast, slows down smoothly at the end)
            const easeOutQuad = progress * (2 - progress);
            
            const currentValue = Math.floor(easeOutQuad * targetValue);
            element.innerHTML = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.innerHTML = targetValue + suffix; // Guarantee absolute final target is met
            }
        }

        requestAnimationFrame(updateNumber);
    }

    // HIGH-END SCROLL OBSERVATION TRIGGER
    // Ensures animation fires exactly when it becomes visible, preventing counting out of screen bounds
    const observerOptions = {
        root: null,
        threshold: 0.3 // Fires when 30% of the element is visible on screen
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target); // Kill observer after firing once to preserve memory
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => statsObserver.observe(num));
});