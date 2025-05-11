import React, { useState, useEffect } from 'react';
// You would typically import your CSS file here if it's modular or global
// import './admin_dashboard.css'; // or import '../css/style.css';

// Define the inline styles as JavaScript objects
const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    thTd: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    th: {
        backgroundColor: '#f2f2f2',
    },
    errorMessage: {
        color: 'red',
        // display: 'none' will be handled by conditional rendering
    }
};

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Simulate admin check
    const [checkingAuth, setCheckingAuth] = useState(true); // To manage auth check loading state

    useEffect(() => {
        // Simulate checking user role (e.g., from a token or API)
        const checkUserRole = async () => {
            // In a real app, you would verify the user's session/token
            // and check if they have admin privileges.
            // For demonstration, we'll use a timeout.
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
            // Replace this with your actual admin check logic
            const userIsAdmin = true; // Assume user is admin for now
            setIsAdmin(userIsAdmin);
            setCheckingAuth(false);
        };

        checkUserRole();
    }, []);

    useEffect(() => {
        // Fetch orders only if the user is an admin and auth check is complete
        if (isAdmin && !checkingAuth) {
            setLoading(true);
            // Placeholder for fetching orders
            // fetch('/api/orders') // Replace with your actual API endpoint
            //   .then(response => {
            //     if (!response.ok) {
            //       throw new Error('Network response was not ok');
            //     }
            //     return response.json();
            //   })
            //   .then(data => {
            //     setOrders(data);
            //     setLoading(false);
            //   })
            //   .catch(err => {
            //     setError('Failed to load orders: ' + err.message);
            //     setLoading(false);
            //   });

            // Simulating data fetching
            setTimeout(() => {
                setOrders([
                    { id: 1, userId: 101, totalAmount: 99.99, status: 'Shipped', date: '2024-07-28', detailsLink: '#' },
                    { id: 2, userId: 102, totalAmount: 45.50, status: 'Processing', date: '2024-07-29', detailsLink: '#' },
                ]);
                setLoading(false);
            }, 1000);
        } else if (!checkingAuth && !isAdmin) {
            setLoading(false); // Not loading orders if not admin
        }
    }, [isAdmin, checkingAuth]); // Rerun if isAdmin or checkingAuth changes

    const handleLogout = () => {
        // Placeholder for logout logic
        // This is where the logic from your js/admin_dashboard.js for logout would go.
        console.log('Logout clicked');
        // Example: clear session, redirect to login page
        // window.location.href = '/login.html';
    };

    if (checkingAuth) {
        return <div>Checking authentication...</div>; // Or a spinner component
    }

    if (!isAdmin) {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You do not have permission to view this page.</p>
                {/* Optionally, provide a link to login or home page */}
            </div>
        );
    }

    return (
        <div>
            <header>
                <h1>Admin Dashboard</h1>
                <nav>
                    <a href="#">Orders</a>
                    {/* Add other admin links here */}
                    <a href="#" id="logoutButton" onClick={handleLogout}>Logout</a>
                </nav>
            </header>

            <main>
                <h2>User Orders</h2>
                <div id="ordersContainer">
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{...styles.thTd, ...styles.th}}>Order ID</th>
                                <th style={{...styles.thTd, ...styles.th}}>User ID</th>
                                <th style={{...styles.thTd, ...styles.th}}>Total Amount</th>
                                <th style={{...styles.thTd, ...styles.th}}>Status</th>
                                <th style={{...styles.thTd, ...styles.th}}>Date</th>
                                <th style={{...styles.thTd, ...styles.th}}>Details</th>
                            </tr>
                        </thead>
                        <tbody id="ordersTableBody">
                            {loading && (
                                <tr>
                                    <td colSpan="6" style={styles.thTd}>Loading orders...</td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan="6" style={{...styles.thTd, ...styles.errorMessage}}>{error}</td>
                                </tr>
                            )}
                            {!loading && !error && orders.map(order => (
                                <tr key={order.id}>
                                    <td style={styles.thTd}>{order.id}</td>
                                    <td style={styles.thTd}>{order.userId}</td>
                                    <td style={styles.thTd}>{order.totalAmount}</td>
                                    <td style={styles.thTd}>{order.status}</td>
                                    <td style={styles.thTd}>{order.date}</td>
                                    <td style={styles.thTd}><a href={order.detailsLink}>View Details</a></td>
                                </tr>
                            ))}
                            {!loading && !error && orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={styles.thTd}>No orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* The loading and error messages are now handled within the table body rendering */}
                </div>
            </main>

            <footer>
                <p>&copy; 2024 Your Company</p>
            </footer>
        </div>
    );
}

export default AdminDashboard;
