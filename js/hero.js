// js/hero.js

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide-frame');
    const dotGroup = document.getElementById('dotGroup');
    let currentIdx = 0;
    const slideDuration = 5000; // Time each image spends on screen (5 seconds)
    let autoCycleTimer;

    // 1. DYNAMIC INDICATOR DOTS SETUP
    // Generates navigation dot items matching the total number of slide objects
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            jumpToSlide(index);
        });
        dotGroup.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // 2. THE TRANSITION MATRIX CONTROLLER
    function renderActiveState() {
        slides.forEach((slide, idx) => {
            if (idx === currentIdx) {
                slide.classList.add('active');
                dots[idx].classList.add('active');
            } else {
                slide.classList.remove('active');
                dots[idx].classList.remove('active');
            }
        });
    }

    // 3. SEAMLESS RECYCLING CYCLE FUNCTION
    function proceedToNextSlide() {
        // Increment index, resetting back cleanly to zero using modulo
        currentIdx = (currentIdx + 1) % slides.length;
        renderActiveState();
    }

    // 4. MANUAL OVERRIDE INTERACTION HOOK
    function jumpToSlide(targetIndex) {
        currentIdx = targetIndex;
        renderActiveState();
        // Reset the timer when a user explicitly clicks a dot control
        clearInterval(autoCycleTimer);
        autoCycleTimer = setInterval(proceedToNextSlide, slideDuration);
    }

    // 5. ENGINE INITIATION
    autoCycleTimer = setInterval(proceedToNextSlide, slideDuration);
});