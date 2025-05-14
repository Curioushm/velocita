import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaBox } from 'react-icons/fa';

const AdminLayout = () => {
  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/orders', name: 'Orders', icon: <FaShoppingCart /> },
    { path: '/admin/users', name: 'Users', icon: <FaUsers /> },
    { path: '/admin/products', name: 'Products', icon: <FaBox /> },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md={3} lg={2} className="bg-light sidebar py-3">
          <Nav className="flex-column">
            {menuItems.map((item) => (
              <LinkContainer key={item.path} to={item.path}>
                <Nav.Link className="d-flex align-items-center">
                  {item.icon}
                  <span className="ms-2">{item.name}</span>
                </Nav.Link>
              </LinkContainer>
            ))}
          </Nav>
        </Col>
        <Col md={9} lg={10} className="ms-sm-auto px-4 py-3">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
