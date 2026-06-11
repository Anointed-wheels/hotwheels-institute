// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('hctiSignUpForm');
    const otpForm = document.getElementById('hctiOtpForm');
    
    const signupStepBlock = document.getElementById('signupStepBlock');
    const otpVerificationStepBlock = document.getElementById('otpVerificationStepBlock');
    const emailDisplay = document.getElementById('userTargetEmailDisplay');

    // Dropdown Elements References
    const countrySelect = document.getElementById('regCountry');
    const stateSelect = document.getElementById('regState');
    const townSelect = document.getElementById('regTown');

    // ==========================================================================
    // 🌍 FREE GEOLOCATION LOCATION ENGINE & DATA DICTIONARY BLUEPRINT
    // ==========================================================================
    const locationDataTree = {
        "Nigeria": {
            "Oyo": ["Ibadan", "Ogbomoso", "Okeho", "Oyo Town", "Shaki"],
            "Lagos": ["Ikeja", "Lekki", "Surulere", "Badagry"],
            "FCT": ["Garki", "Wuse", "Asokoro"]
        },
        "United Kingdom": {
            "England": ["London", "Manchester", "Birmingham"],
            "Scotland": ["Edinburgh", "Glasgow"]
        }
    };

    // Initialize location selectors
    function initLocationSelectors() {
        countrySelect.innerHTML = '<option value="">-- Choose Country --</option>';
        Object.keys(locationDataTree).forEach(country => {
            countrySelect.innerHTML += `<option value="${country}">${country}</option>`;
        });

        // SIMULATED AUTO-GEOLOCATION DETECTOR: Auto-fills local hub metrics for free
        setTimeout(() => {
            countrySelect.value = "Nigeria";
            triggerCountryChange();
            stateSelect.value = "Oyo";
            triggerStateChange();
            townSelect.value = "Ibadan";
        }, 1200);
    }

    function triggerCountryChange() {
        const country = countrySelect.value;
        if (!country) {
            stateSelect.innerHTML = '<option value="">Select country first...</option>';
            stateSelect.disabled = true;
            townSelect.innerHTML = '<option value="">Select state first...</option>';
            townSelect.disabled = true;
            return;
        }

        stateSelect.innerHTML = '<option value="">-- Choose State --</option>';
        Object.keys(locationDataTree[country]).forEach(state => {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        });
        stateSelect.disabled = false;
        townSelect.innerHTML = '<option value="">Select state first...</option>';
        townSelect.disabled = true;
    }

    function triggerStateChange() {
        const country = countrySelect.value;
        const state = stateSelect.value;
        if (!state) {
            townSelect.innerHTML = '<option value="">Select state first...</option>';
            townSelect.disabled = true;
            return;
        }

        townSelect.innerHTML = '<option value="">-- Choose Town --</option>';
        locationDataTree[country][state].forEach(town => {
            townSelect.innerHTML += `<option value="${town}">${town}</option>`;
        });
        townSelect.disabled = false;
    }

    countrySelect.addEventListener('change', triggerCountryChange);
    stateSelect.addEventListener('change', triggerStateChange);
    initLocationSelectors();

    // ==========================================================================
    // 🔒 REGISTRATION SUBMISSION STEP TRANSITION HANDLER
    // ==========================================================================
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Password validation check
        const pass = document.getElementById('regPassword').value;
        const confirmPass = document.getElementById('regConfirmPassword').value;

        if (pass !== confirmPass) {
            alert("⚠️ Validation Error: Security passwords do not match. Please re-type.");
            return;
        }

        // 2. Capture target email address context
        const emailInput = document.getElementById('regEmail').value;
        emailDisplay.textContent = emailInput;

        // 3. Switch screens instantly without page refresh
        signupStepBlock.classList.remove('active');
        otpVerificationStepBlock.classList.add('active');
        
        // Auto focus onto the first input of OTP
        document.querySelector('.otp-input-field').focus();
    });

    // ==========================================================================
    // ✉️ OTP CODE AUTO-FOCUS UI NAVIGATION MOTOR
    // ==========================================================================
    const otpInputs = document.querySelectorAll('.otp-input-field');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('keyup', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus(); // Move forward automatically
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus(); // Move backward seamlessly on delete
            }
        });
    });

    // ==========================================================================
    // 🔥 FINAL SECURITY CODE TOKEN VALIDATION SYSTEM
    // ==========================================================================
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect the 6 digits entered by the user
        let enteredCode = "";
        otpInputs.forEach(input => enteredCode += input.value);

        // Simulated success confirmation response
        alert(`✓ Token ${enteredCode} Verified Successfully!\n\nAccount created flawlessly. Welcome to Hotwheelscoder Tech Institute network!\n\nRedirecting to your student dashboard interface...`);
        
        window.location.href = "dashboard.html"; // Routes right to our next layout block blueprint
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navDashboardLink = document.getElementById('navDashboardLink');

    if (navDashboardLink) {
        navDashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulating a backend check: look for an active login session token
            const isUserLoggedIn = false; // We will flip this to true when logged in

            if (!isUserLoggedIn) {
                alert("🔒 Access Denied: Please log into your HCTI account first to access your student terminal console.");
                window.location.href = "login.html";
            } else {
                window.location.href = "dashboard.html";
            }
        });
    }
});

// Inside js/auth.js -> otpForm event listener...
    otpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let enteredCode = "";
        otpInputs.forEach(input => enteredCode += input.value);

        // ⚡ SIMULATE ACTIVE LOGIN SESSION IN BROWSER STORAGE
        localStorage.setItem('hcti_authenticated', 'true');

        alert(`✓ Token ${enteredCode} Verified Successfully!\n\nRedirecting to your student dashboard interface...`);
        
        window.location.href = "dashboard.html"; 
    });

document.addEventListener('DOMContentLoaded', () => {
    const navDashboardLink = document.getElementById('navDashboardLink');

    if (navDashboardLink) {
        navDashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check browser storage to see if the user successfully passed our OTP sign-up
            const isUserLoggedIn = localStorage.getItem('hcti_authenticated') === 'true';

            if (!isUserLoggedIn) {
                alert("🔒 Access Protected: Please create an account or log in first to access your student terminal workspace.");
                window.location.href = "login.html";
            } else {
                window.location.href = "dashboard.html";
            }
        });
    }
});