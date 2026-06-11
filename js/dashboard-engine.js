// js/dashboard-engine.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const btnLogout = document.getElementById('btnLogout');
    const dashSubmissionForm = document.getElementById('dashSubmissionForm');

    // ==========================================================================
    // MULTI-VIEW TOGGLE ROUTING SYSTEM
    // ==========================================================================
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetTabId = link.getAttribute('data-tab');
            if (!targetTabId) return;

            // 1. Wipe active state from all links and panel targets
            sidebarLinks.forEach(l => l.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // 2. Assign active state parameters to targeted instances
            link.classList.add('active');
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    // ==========================================================================
    // INTERACTIVE SUBMISSION INTERACTION
    // ==========================================================================
    if (dashSubmissionForm) {
        dashSubmissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const repoValue = document.getElementById('repoUrl').value;
            
            alert(`🚀 Code Core Dispatched!\n\nYour repository link:\n[${repoValue}]\nhas been funneled straight into the Instructor Review Queue Model.`);
            document.getElementById('repoUrl').value = '';
        });
    }

    // ==========================================================================
    // SECURE PORTAL DE-AUTHENTICATION LOGOUT ROUTINE
    // ==========================================================================
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (confirm("Are you sure you want to log out of your active student portal session securely?")) {
                // Clear simulated authentication cookies from browser memory
                localStorage.removeItem('hcti_authenticated');
                alert("🔒 Terminal session finalized. Redirecting to home terminal.");
                window.location.href = "index.html";
            }
        });
    }
});