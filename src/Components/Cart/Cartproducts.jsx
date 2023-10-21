import React from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";

function Cartproducts() {
  const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

  return (
    <Container>
      <Row>
        <Navbar bg="primary" data-bs-theme="dark" className="m-5">
          <Container>
            <Navbar.Brand href="/cart">Cart Page</Navbar.Brand>
            <Navbar.Brand href="/">Product Page</Navbar.Brand>
          </Container>
        </Navbar>
      </Row>

      <Row style={{ marginTop: '20px' }}>
      {cartData.map((item, index) => (
        <>
        <Card className="m-5 ">
         
            <Row key={index}>
              <Col xs={12} md={2}>
                <Card.Img
                  src={item?.product?.imageUrl} 
                  style={{ width: "180px" }}
                />
              </Col>
              <Col xs={12} md={10}>
                <Card.Body>
                  <Card.Title>Product Name: {item?.product?.name}</Card.Title>
                  <Card.Text className="text-dark">Price: {item?.product?.price}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
         
        </Card>
        </>
         ))}
      </Row>
    </Container>
  );
}

export default Cartproducts;
