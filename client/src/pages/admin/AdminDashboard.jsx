import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { FaBox, FaCheck, FaRupeeSign, FaShoppingCart, FaTimes, FaUsers } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import Message from '../../components/common/message';
import Paginate from '../../components/Paginate';
import { useGetOrdersQuery } from '../../slices/orderApiSlice';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import { useGetUsersQuery } from '../../slices/userApiSlice';
import './AdminDashboard.css';

const OrderList = () => {
  const { pageNumber = 1 } = useParams();
  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : !data || !data.orders ? (
        <Message variant="info">No orders found.</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>₹{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</td>
                  <td>{order.isDelivered ? <FaCheck style={{ color: 'green' }} /> : <FaTimes style={{ color: 'red' }} />}</td>
                  <td>{order.status}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} listType="orderlist" />
        </>
      )}
    </>
  );
};

const AdminDashboard = () => {
  const { data: orders, isLoading: ordersLoading, error: ordersError } = useGetOrdersQuery({});
  const { data: users, isLoading: usersLoading, error: usersError } = useGetUsersQuery();
  const { data: products, isLoading: productsLoading, error: productsError } = useGetProductsQuery({});

  const totalSales = orders?.orders?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;

  if (ordersLoading || usersLoading || productsLoading) return <Loader />;

  if (ordersError || usersError || productsError) {
    return <Message variant="danger">Error loading dashboard data.</Message>;
  }

  const stats = [
    {
      title: 'Total Users',
      value: users?.length || 0,
      icon: <FaUsers className="dashboard-icon" size={40} />,
      color: 'primary',
      gradient: 'linear-gradient(45deg, #4158D0, #C850C0)'
    },
    {
      title: 'Total Orders',
      value: orders?.orders?.length || 0,
      icon: <FaShoppingCart className="dashboard-icon" size={40} />,
      color: 'success',
      gradient: 'linear-gradient(45deg, #00C853, #B2FF59)'
    },
    {
      title: 'Total Sales',
      value: `₹${totalSales.toFixed(2)}`,
      icon: <FaRupeeSign className="dashboard-icon" size={40} />,
      color: 'warning',
      gradient: 'linear-gradient(45deg, #FFB300, #FFE57F)'
    },
    {
      title: 'Total Products',
      value: products?.products?.length || 0,
      icon: <FaBox className="dashboard-icon" size={40} />,
      color: 'info',
      gradient: 'linear-gradient(45deg, #2196F3, #00BCD4)'
    }
  ];

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <Row>
        {stats.map((stat, index) => (
          <Col key={index} sm={12} md={6} lg={3} className="mb-4">
            <Card 
              className="dashboard-card"
              style={{ background: stat.gradient }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="stat-content">
                    <Card.Title className="stat-title">{stat.title}</Card.Title>
                    <h2 className="stat-value">{stat.value}</h2>
                  </div>
                  <div className="stat-icon">
                    {stat.icon}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="recent-orders-section">
        <h2 className="section-title">Recent Orders</h2>
        <div className="orders-grid">
          {orders?.orders?.slice(0, 5).map((order) => (
            <Card key={order._id} className="order-card">
              <Card.Body>
                <Row>
                  <Col md={3} className="order-detail">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{order._id}</span>
                  </Col>
                  <Col md={3} className="order-detail">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </Col>
                  <Col md={3} className="order-detail">
                    <span className="detail-label">Total:</span>
                    <span className="detail-value">₹{order.totalPrice.toFixed(2)}</span>
                  </Col>
                  <Col md={3} className="order-detail">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export { AdminDashboard, OrderList };
export default AdminDashboard;
