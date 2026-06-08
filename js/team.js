// js/team.js

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamCards = document.querySelectorAll('.team-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active style from all toggle buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active focus onto current targeted element button
            button.classList.add('active');

            const selectedFilter = button.getAttribute('data-filter');

            teamCards.forEach(card => {
                const cardDepartment = card.getAttribute('data-dept');

                if (selectedFilter === 'all' || selectedFilter === cardDepartment) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});