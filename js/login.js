// Define your two special admin accounts here (e.g., by email or username)
const PREDEFINED_ADMIN_ACCOUNT_1 = 'naihritmukherjee05@gmail.com'; // Updated admin account
const PREDEFINED_ADMIN_ACCOUNT_2 = 'admin2@example.com'; // Updated admin account

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value; // Or username, or whatever your form uses
    const password = document.getElementById('password').value;
    const loginErrorElement = document.getElementById('loginError'); // Assuming you have an element to show errors

    if (loginErrorElement) {
        loginErrorElement.style.display = 'none'; // Hide previous errors
    }

    try {
        // Replace '/api/auth/login' with your actual backend login endpoint
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Password is sent to backend, not checked here
        });

        if (!response.ok) {
            // ... (existing error handling for failed login) ...
            let errorMessage = 'Login failed. Please check your credentials.';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                console.warn('Could not parse error response as JSON.');
            }
            throw new Error(errorMessage);
        }

        const responseData = await response.json(); // Backend confirms credentials are valid

        // **Client-side check for predefined admin accounts**
        // This happens *after* successful authentication by the backend.
        if (email.toLowerCase() === PREDEFINED_ADMIN_ACCOUNT_1.toLowerCase() || email.toLowerCase() === PREDEFINED_ADMIN_ACCOUNT_2.toLowerCase()) {
            // If the logged-in email matches one of the predefined admin accounts
            console.log(`User ${email} recognized as a predefined admin. Redirecting to admin dashboard.`);
            // Store token or session info if your app uses it
            // e.g., localStorage.setItem('authToken', responseData.token);
            // localStorage.setItem('userRole', 'admin'); // Optionally set a local role
            window.location.href = 'admin_dashboard.html'; // Redirect admin
            return; // Exit after redirection
        }

        // If not a predefined admin, proceed with role check from backend response
        if (responseData.user && responseData.user.role === 'admin') {
            // ... (existing admin role check and redirection) ...
            // e.g., localStorage.setItem('authToken', responseData.token);
            // localStorage.setItem('userRole', responseData.user.role);
            window.location.href = 'admin_dashboard.html';
        } else if (responseData.user && responseData.user.role === 'user') {
            // ... (existing user role check and redirection) ...
            // e.g., localStorage.setItem('authToken', responseData.token);
            // localStorage.setItem('userRole', responseData.user.role);
            window.location.href = 'user_dashboard.html';
        } else {
            // ... (existing fallback for undetermined role) ...
            console.warn('User role not clearly defined in login response or user data missing. Redirecting to default page.');
            throw new Error('Login successful, but user role could not be determined for redirection.');
        }

    } catch (error) {
        console.error('Login error:', error);
        if (loginErrorElement) {
            loginErrorElement.textContent = error.message;
            loginErrorElement.style.display = 'block';
        } else {
            alert(`Login failed: ${error.message}`);
        }
    }
}