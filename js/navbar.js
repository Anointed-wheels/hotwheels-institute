// js/navbar.js

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const menuWrapper = document.getElementById('menuWrapper');
    const subLinksSource = document.getElementById('subLinksSource');
    const mobileSubnavContainer = document.getElementById('mobileSubnavContainer');

    // 1. MOBILE RESPONSIVE SIDEBAR TOGGLE
    menuBtn.addEventListener('click', () => {
        menuWrapper.classList.toggle('active');
    });

    // 2. DYNAMIC MOBILE INJECTION ENGINE
    // This clones whatever sub-links exist on the current page and formats them neatly for the mobile sidebar drawer
    if (subLinksSource && mobileSubnavContainer && window.innerWidth <= 1024) {
        const dropdownWrapper = document.createElement('div');
        dropdownWrapper.className = 'mobile-dropdown-group';
        
        const title = document.createElement('div');
        title.className = 'mobile-dropdown-title';
        title.textContent = "Page Navigation";
        dropdownWrapper.appendChild(title);

        // Clone each link node element
        const linksClone = subLinksSource.cloneNode(true);
        linksClone.className = "nav-links mobile-sublinks-list";
        linksClone.style.flexDirection = "column";
        linksClone.style.gap = "15px";
        linksClone.style.paddingLeft = "10px";
        
        dropdownWrapper.appendChild(linksClone);
        mobileSubnavContainer.appendChild(dropdownWrapper);
    }

    // 3. PREMIUM SMOOTH ANCHOR LINK INTERACTION
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile drawers if active
                menuWrapper.classList.remove('active');
                
                // Account for the height of both nested headers so text doesn't hide underneath them
                const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 120;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. ALIVE AI ASSISTANT SYSTEM TRIGGER BOILERPLATE
    const aiTrigger = document.getElementById('aiAssistantTrigger');
    if(aiTrigger) {
        aiTrigger.addEventListener('click', () => {
            alert("HCTI AI Core Engine Initialization Hook Activated... Setup proceeding soon!");
        });
    }
});