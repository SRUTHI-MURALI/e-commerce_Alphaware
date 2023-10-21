import React, {  useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import './Cart.css';

function Cartproducts() {
  const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

 
  const initialProductCounts = {};
  cartData.forEach((item) => {
    const id = item?.product?._id;
    const storedCount = localStorage.getItem(`product_${id}`);
    initialProductCounts[id] = storedCount ? parseInt(storedCount, 10) : 0;
  });

  const [productCounts, setProductCounts] = useState(initialProductCounts);

  const handleDecrement = (id) => {
    if (productCounts[id] > 0) {
      const updatedCounts = { ...productCounts };
      updatedCounts[id] = productCounts[id] - 1;
      setProductCounts(updatedCounts);
      localStorage.setItem(`product_${id}`, updatedCounts[id].toString());
    }
  };

  const handleIncrement = (id) => {
    const updatedCounts = { ...productCounts };
    updatedCounts[id] = productCounts[id] + 1;
    setProductCounts(updatedCounts);
    localStorage.setItem(`product_${id}`, updatedCounts[id].toString());
  };

  const handleRemove=(id)=>{
    
    const existingCartData = JSON.parse(localStorage.getItem("cartData"))
    const newData= existingCartData.filter((item)=>{
      
      return item?.product?._id !== id
    })
    localStorage.setItem("cartData", JSON.stringify(newData));
    window.location.reload()
  }

  return (
    <Container>
      <Row>
        {cartData.map((item, index) => (
          <>
          <Card  key={item?.product?._id} className="m-3" style={{ backgroundColor: 'rgb(146, 199, 195)' }}>
            <Row>
              <Col xs={12} md={2}>
                <Card.Img src={item?.product?.imageUrl} style={{ height: '16rem' }} />
              </Col>
              <Col xs={12} md={7}>
                <Card.Body>
                  <Card.Title>Product Name: {item?.product?.name}</Card.Title>
                  <Card.Text className="text-dark m-4">Price: ₹ {item?.product?.price}</Card.Text>
                </Card.Body>
              </Col>
              <Col xs={12} md={3} className="mt-4">
                <Card.Body>
                  <Card.Title>
                    <button className="cart-button text-center" onClick={() => handleDecrement(item?.product?._id)}>-</button>
                    {productCounts[item?.product?._id]}
                    <button className="cart-button" onClick={() => handleIncrement(item?.product?._id)}>+</button>
                  </Card.Title>
                  <Button className="mt-5" onClick={()=>handleRemove(item?.product?._id)}>Remove</Button>
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
