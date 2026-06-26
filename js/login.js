// Ensure your Login form submission JavaScript handling looks exactly like this:

const loginForm = document.getElementById('hctiLoginForm'); // Match your login form ID

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop standard browser form routing reload cycles

        const emailInput = document.getElementById('loginEmail').value;
        const passwordInput = document.getElementById('loginPassword').value;

        const loginPayload = {
            email: emailInput,
            password: passwordInput
        };

        console.log("📡 Dispatching secure credentials validation stream...", loginPayload);

        fetch('http://127.0.0.1:8000/api/auth/login/', { // Match your exact login view endpoint path
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginPayload)
        })
        .then(res => {
            // 🔒 CRITICAL DEFENSE RULE: If status is not 200 OK (e.g. 403 Forbidden, 401 Unauthorized), throw it to the catch block!
            if (!res.ok) throw res; 
            return res.json();
        })
        .then(data => {
            // This code block runs ONLY if status is 200 OK (User is both matched AND verified!)
            console.log("🎉 Credentials authenticated on HCTI network layers:", data);
            
            localStorage.setItem('hcti_authenticated', 'true');
            localStorage.setItem('hcti_user_type', data.user_type);
            
            alert(`Welcome back, ${data.display_name}! Redirecting to your assigned hub...`);
            
            // Dynamic Role Routing Engine
            if (data.user_type === 'admin') {
                window.location.href = "dashboard-admin.html";
            } else if (data.user_type === 'instructor') {
                window.location.href = "dashboard-instructor.html";
            } else if (data.user_type === 'staff') {
                window.location.href = "dashboard-staff.html";
            } else {
                window.location.href = "dashboard.html";
            }
        })
        .catch(async err => {
            // This block dynamically catches all 401 Unauthorized and 403 Forbidden errors directly from your Django view!
            console.error("🛑 Authentication request denied:", err);
            try {
                const errData = await err.json();
                
                // Show the exact error string returned from your python view file ("Account not verified. Check email...")
                alert(`🛑 Access Denied:\n${errData.error || "Authentication failure across system parameters."}`);
                
            } catch(e) {
                alert("🛑 Critical connection breakdown across system parameters.");
            }
        });
    });
}