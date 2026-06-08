// js/testimonials.js

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;

    function updateCarouselPosition() {
        // Shift track horizontally based on current card slot index width multipliers
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Wrap around to the first slide
        }
        updateCarouselPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Wrap around to the last slide
        }
        updateCarouselPosition();
    });

    // Recalculate alignments correctly if window view width scales dynamically
    window.addEventListener('resize', updateCarouselPosition);
});