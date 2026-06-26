// hcti-website-front/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = 'http://127.0.0.1:8000/api/';

    const signupForm = document.getElementById('hctiSignUpForm');
    const otpForm = document.getElementById('hctiOtpForm');
    const countrySelect = document.getElementById('regCountry');
    const stateSelect = document.getElementById('regState');
    const townSelect = document.getElementById('regTown');
    
    let cacheLocationMatrix = null;
    let globalRegistrationUserId = null; 

    // ==========================================================================
    // 🌍 LOCATION DROPDOWN MATRIX ENGINE
    // ==========================================================================
    function fetchBackendLocationMatrix() {
        fetch(`${API_BASE}locations/`)
            .then(res => res.json())
            .then(data => {
                cacheLocationMatrix = data;
                countrySelect.innerHTML = '<option value="">-- Choose Country --</option>';
                Object.keys(data).forEach(country => {
                    countrySelect.innerHTML += `<option value="${country}">${country}</option>`;
                });
            })
            .catch(err => console.error("🛑 Failed to fetch locations:", err));
    }

    countrySelect.addEventListener('change', () => {
        const country = countrySelect.value;
        if (!country || !cacheLocationMatrix) {
            stateSelect.disabled = true; townSelect.disabled = true;
            return;
        }
        stateSelect.innerHTML = '<option value="">-- Choose State --</option>';
        Object.keys(cacheLocationMatrix[country]).forEach(state => {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        });
        stateSelect.disabled = false;
        townSelect.innerHTML = '<option value="">Select state first...</option>';
        townSelect.disabled = true;
    });

    stateSelect.addEventListener('change', () => {
        const country = countrySelect.value;
        const state = stateSelect.value;
        if (!state || !cacheLocationMatrix) { townSelect.disabled = true; return; }

        townSelect.innerHTML = '<option value="">-- Choose Town --</option>';
        cacheLocationMatrix[country][state].forEach(town => {
            townSelect.innerHTML += `<option value="${town}">${town}</option>`;
        });
        townSelect.disabled = false;
    });

    fetchBackendLocationMatrix();

    // ==========================================================================
    // 👥 SECURE INTERCEPTED SIGNUP ACTIONS
    // ==========================================================================
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const password = document.getElementById('regPassword').value;
            const confirm_password = document.getElementById('regConfirmPassword').value;

            if (password !== confirm_password) {
                alert("⚠️ Security passwords do not match!");
                return;
            }

            const registrationPayload = {
                surname: document.getElementById('regSurname').value,
                firstname: document.getElementById('regFirstname').value,
                lastname: document.getElementById('regLastname').value || null,
                age: parseInt(document.getElementById('regAge').value) || 0,
                gender: document.getElementById('regGender').value,
                marital_status: document.getElementById('regMarital').value || null,
                email: document.getElementById('regEmail').value,
                country: countrySelect.value,
                state: stateSelect.value,
                town: townSelect.value,
                password: password,
                confirm_password: confirm_password
            };

            console.log("📡 Dispatching secure profile initialization vectors...", registrationPayload);

            fetch(`${API_BASE}auth/register/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(registrationPayload)
            })
            .then(res => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    globalRegistrationUserId = data.user_id;
                    
                    const emailDisplay = document.getElementById('userTargetEmailDisplay');
                    if (emailDisplay) emailDisplay.textContent = registrationPayload.email;
                    
                    // 🌟 STRUCTURAL STYLE FIX: Forcing explicit visibility overrides
                    const signupBlock = document.getElementById('signupStepBlock');
                    const otpBlock = document.getElementById('otpVerificationStepBlock');
                    
                    if (signupBlock && otpBlock) {
                        signupBlock.style.setProperty('display', 'none', 'important');
                        signupBlock.classList.remove('active');
                        
                        otpBlock.style.setProperty('display', 'block', 'important');
                        otpBlock.classList.add('active');
                        
                        const firstOtpInput = document.querySelector('.otp-input-field');
                        if (firstOtpInput) firstOtpInput.focus();
                    }
                }
            })
            .catch(async err => {
                try {
                    const errData = await err.json();
                    alert(`🛑 Registration Cancelled:\n${JSON.stringify(errData)}`);
                } catch(e) {
                    alert("🛑 Outbound payload transmission error.");
                }
            });
        });
    }

    // ==========================================================================
    // 🔒 EVALUATE SECURITY SECURE TOKENS
    // ==========================================================================
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            let token_code = "";
            document.querySelectorAll('.otp-input-field').forEach(input => token_code += input.value);

            fetch(`${API_BASE}auth/verify-token/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: globalRegistrationUserId, token_code: token_code })
            })
            .then(res => {
                if (!res.ok) throw res;
                return res.json();
            })
            .then(data => {
                if (data.verified) {
                    localStorage.setItem('hcti_authenticated', 'true');
                    localStorage.setItem('hcti_user_type', data.user_type);
                    
                    alert("✓ Account Activated successfully. Opening assigned dashboard ecosystem...");
                    routeDynamicDashboardUserType(data.user_type);
                }
            })
            .catch(err => {
                alert("🛑 Verification mismatch. Please evaluate token sequence entries.");
            });
        });
    }

    function routeDynamicDashboardUserType(role) {
        if (role === 'admin') {
            window.location.href = "dashboard-admin.html";
        } else if (role === 'instructor') {
            window.location.href = "dashboard-instructor.html";
        } else if (role === 'staff') {
            window.location.href = "dashboard-staff.html";
        } else {
            window.location.href = "dashboard.html"; 
        }
    }
});