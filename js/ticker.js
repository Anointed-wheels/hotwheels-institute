// js/ticker.js

document.addEventListener('DOMContentLoaded', () => {
    const seatCounterElement = document.getElementById('liveSeatCounter');
    
    // Starting total of remaining campus seats available across cohorts
    let currentSeatsRemaining = 14;

    function simulateLiveRegistration() {
        // Generate a random timing interval between 15 to 45 seconds
        const randomTimeTrigger = Math.floor(Math.random() * (45000 - 15000 + 1)) + 15000;

        setTimeout(() => {
            // Safely countdown available slots but never drop lower than 3 available spots
            if (currentSeatsRemaining > 3) {
                // 30% mathematical probability that a slot gets taken during the random check
                if (Math.random() > 0.7) {
                    currentSeatsRemaining--;
                    
                    // Apply a slight visual flash effect when the number drops
                    seatCounterElement.style.transform = 'scale(1.2)';
                    seatCounterElement.style.color = '#ff4500';
                    seatCounterElement.textContent = currentSeatsRemaining;

                    // Return element sizing smoothly back to default
                    setTimeout(() => {
                        seatCounterElement.style.transform = 'scale(1)';
                        seatCounterElement.style.color = '';
                    }, 400);
                }
            }
            // Loop the engine indefinitely
            simulateLiveRegistration();
        }, randomTimeTrigger);
    }

    // Launch the ticker tracking simulation process loop
    simulateLiveRegistration();
});