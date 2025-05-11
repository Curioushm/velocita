document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.getElementById('ordersTableBody');
    const loadingMessage = document.getElementById('loadingMessage');
    const errorMessage = document.getElementById('errorMessage');
    const logoutButton = document.getElementById('logoutButton');

    // Function to check if the user is an admin
    // This relies on 'userRole' being set in localStorage upon successful admin login
    async function checkAdminStatus() {
        const userRole = localStorage.getItem('userRole');
        // You might also want to check for an authToken if your API requires it
        // const authToken = localStorage.getItem('authToken');

        if (userRole === 'admin') { // && authToken) {
            console.log('Admin status confirmed.');
            return true;
        } else {
            console.log('Admin status not confirmed. Redirecting to login.');
            // Redirect to login page if not an admin or token is missing
            window.location.href = 'login.html'; // Assuming your login page is login.html
            return false; // Return false, though redirection will likely occur first
        }
    }

    // Function to fetch orders from the backend
    async function fetchOrders() {
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';

        // --- BEGIN DEMO DATA ---
        // For demonstration purposes, we'll use mock data.
        // In a real application, you would fetch this from your backend.
        console.log("Using mock data for demonstration.");
        const mockOrders = [
            { id: 'ORD001', userId: 'user123', totalAmount: 75.50, status: 'Processing', date: '2024-07-28T10:30:00Z' },
            { id: 'ORD002', userId: 'user456', totalAmount: 120.00, status: 'Shipped', date: '2024-07-27T15:00:00Z' },
            { id: 'ORD003', userId: 'user789', totalAmount: 45.25, status: 'Delivered', date: '2024-07-26T12:00:00Z' },
            { id: 'ORD004', userId: 'user101', totalAmount: 200.00, status: 'Pending Payment', date: '2024-07-28T11:00:00Z' }
        ];
        
        // Simulate a network delay
        setTimeout(() => {
            displayOrders(mockOrders);
            loadingMessage.style.display = 'none';
        }, 1000); // 1 second delay
        
        return; // Stop here for the demo, don't try to fetch from API
        // --- END DEMO DATA ---

        /* // Original fetch logic (commented out for demo)
        try {
            // Replace with your actual API endpoint for fetching orders
            const response = await fetch('/api/orders'); // Example API endpoint
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const orders = await response.json();
            displayOrders(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            errorMessage.textContent = `Failed to load orders: ${error.message}. Please ensure the backend API is running and accessible.`;
            errorMessage.style.display = 'block';
        } finally {
            loadingMessage.style.display = 'none';
        }
        */
    }

    // Function to display orders in the table
    function displayOrders(orders) {
        ordersTableBody.innerHTML = ''; // Clear existing rows

        if (!orders || orders.length === 0) {
            const row = ordersTableBody.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6; // Number of columns
            cell.textContent = 'No orders found.';
            return;
        }

        orders.forEach(order => {
            const row = ordersTableBody.insertRow();
            row.insertCell().textContent = order.id || 'N/A';
            row.insertCell().textContent = order.userId || 'N/A';
            row.insertCell().textContent = order.totalAmount ? `$${order.totalAmount.toFixed(2)}` : 'N/A';
            row.insertCell().textContent = order.status || 'N/A';
            row.insertCell().textContent = order.date ? new Date(order.date).toLocaleDateString() : 'N/A';
            
            const detailsCell = row.insertCell();
            const detailsButton = document.createElement('button');
            detailsButton.textContent = 'View Details';
            detailsButton.onclick = () => viewOrderDetails(order.id);
            detailsCell.appendChild(detailsButton);
        });
    }

    function viewOrderDetails(orderId) {
        // Placeholder for viewing order details, e.g., navigate to another page or show a modal
        alert(`Viewing details for order ID: ${orderId}`);
        // window.location.href = `/admin/order_details.html?orderId=${orderId}`;
    }
    
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear admin session information
            localStorage.removeItem('userRole');
            localStorage.removeItem('authToken'); // Also remove token if you use one
            
            alert('You have been logged out.');
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    // Initialize
    async function init() {
        const isAdmin = await checkAdminStatus(); // This function now handles redirection
        if (isAdmin) {
            // Only fetch orders if admin status is confirmed and redirection hasn't happened
            fetchOrders();
        } else {
            // If checkAdminStatus somehow didn't redirect but returned false,
            // ensure the page doesn't try to load sensitive data.
            // This part might be redundant if redirection is solid.
            if (errorMessage) {
                errorMessage.textContent = 'Access denied. Please log in as an admin.';
                errorMessage.style.display = 'block';
            }
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            if (ordersTableBody) {
                ordersTableBody.innerHTML = ''; // Clear any potential content
            }
        }
    }

    init();
});
