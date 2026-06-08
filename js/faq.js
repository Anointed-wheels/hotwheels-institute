// js/faq.js

document.addEventListener('DOMContentLoaded', () => {
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const currentBody = currentItem.querySelector('.faq-body');
            const isCurrentlyActive = currentItem.classList.contains('active');

            // --- PREMIUM ACCORDION RULE: CLOSE ALL OTHER OPEN FAQS ---
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-body').style.maxHeight = null;
            });

            // --- TOGGLE TARGETED ELEMENT BASE ---
            if (!isCurrentlyActive) {
                currentItem.classList.add('active');
                // Calculate and apply the precise container height dynamically
                currentBody.style.maxHeight = currentBody.scrollHeight + "px";
            }
        });
    });
});