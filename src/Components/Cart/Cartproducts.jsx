import React, {  useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import './Cart.css';
import { useNavigate } from "react-router-dom";


function Cartproducts() {
  const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

  const navigate= useNavigate()
 
  const initialProductCounts = {};
  cartData.forEach((item) => {
    const id = item?.product?._id;
    const storedCount = localStorage.getItem(`product_${id}`);
    initialProductCounts[id] = storedCount ? parseInt(storedCount, 10) : 1;
  });

  const [productCounts, setProductCounts] = useState(initialProductCounts);

  const handleDecrement = (id) => {
    if (productCounts[id] > 1) {
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

  const handleHome= ()=>{
    navigate('/')
  }

  return (
    <Container>
      <Row>
      <Col>
         <Button className="float-end addcart-button" variant="info" onClick={handleHome}> Back to Home </Button>
          </Col>
       
      </Row>
      <Row>
     
    <Table striped bordered hover variant="light" className="mt-5">
      <thead>
        <tr className="text-center">
          <th>#</th>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Total Amount</th>
          <th>Actions </th>
        </tr>
      </thead>
      <tbody  className="text-center">
      {cartData.map((item, index) => (
        <>
        <tr key={item?.product?._id} >
          <td>{index+1} </td>
          <td><img src={item?.product?.imageUrl} style={{ height: '16rem' }} /></td>
          <td>{item?.product?.name}
                <br/>
                ₹ {item?.product?.price}
          </td>
         
          <td> ₹ {productCounts[item?.product?._id] * item?.product?.price}</td>
          <td><Button className="cart-button  m-2" variant="danger" onClick={() => handleDecrement(item?.product?._id)}>-</Button>
              {productCounts[item?.product?._id]}
              <Button className="cart-button m-2" variant="success"  onClick={() => handleIncrement(item?.product?._id)}>+</Button>
              <br/>
              <Button className="m-5 remove-button" variant="danger"  onClick={()=>handleRemove(item?.product?._id)}>  Remove</Button>
          </td>
        </tr>
        </>
         ))}
      </tbody>
    </Table>
      </Row>
    </Container>
  );
}

export default Cartproducts;
