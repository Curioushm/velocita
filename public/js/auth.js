// ...existing code...

function showLoggedOutMessage() {
    const message = 'You have been logged out.';
// ...existing code...
}

function showLoggedInMessage() {
    const message = 'You have been logged in.';
    const messageType = 'success'; // Or 'info', 'warning', 'error'
    const messageContainer = document.getElementById('message-container');

    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `alert alert-${messageType}`; // Apply Bootstrap alert classes
        messageContainer.style.display = 'block';

        // Optional: Hide the message after a few seconds
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    } else {
        console.log(message); // Fallback if the container is not found
    }
}

async function loginUser(event) {
    event.preventDefault();
// ...existing code...
    try {
        const response = await fetch('/api/users/login', {
// ...existing code...
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token); // Store the token
            // Redirect to a protected page or update UI
            window.location.href = '/dashboard.html'; // Example redirect
            showLoggedInMessage(); // Display logged in message
        } else {
// ...existing code...
        }
    } catch (error) {
// ...existing code...
    }
}

// ...existing code...
async function logoutUser() {
// ...existing code...
    try {
// ...existing code...
        if (response.ok) {
            console.log('Logout successful');
            localStorage.removeItem('token'); // Remove the token
            showLoggedOutMessage(); // Display logged out message
            // Redirect to login page or home page
            setTimeout(() => { // Add a delay before redirecting to allow message to be seen
                window.location.href = '/login.html';
            }, 2000); // 2 seconds delay
        } else {
// ...existing code...
        }
    } catch (error) {
// ...existing code...
    }
}

// ...existing code...