import React, { useEffect, useState } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList() {
  const imageUrl='https://m.media-amazon.com/images/'
  const [data, setData] = useState([]);
  const [price, setPrice] = useState(''); // You need to set the price state

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('http://3.7.252.58:4001/product/getAllProduct'); // Use GET instead of POST if you're retrieving data

      setData(response.data);
    }

    fetchData();
  }, []); 

  const handleAddtoCart =(product)=>{
    const existingCartData = JSON.parse(localStorage.getItem('cartData')) || [];
    const productExistsInCart = existingCartData.some((item) => item.id === product._id);
    if (!productExistsInCart) {
      toast.success('product added to cart successfully')
      existingCartData.push({ product });
  
      localStorage.setItem('cartData', JSON.stringify(existingCartData));
  
  }else{
    toast.error('product already exists in cart')
  }
}

  

  return (
    <Container>
       <ToastContainer position="top-center"></ToastContainer>
      <Row>
        <Navbar bg="primary" data-bs-theme="dark" className='m-5'>
          <Container>
            <Navbar.Brand href="/">Product Page</Navbar.Brand>
            <Navbar.Brand href="/cart">Cart Page</Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row >
        
        {data.map((product, index) => (
          <Card key={product._id} className='m-5' style={{ width: '18rem',alignItems:'center',height:'32rem',alignContent:'center' }}>
             <Card.Img variant="top" src={product.imageUrl} style={{height:'20rem'}} />
            <Card.Body>
             
              <Card.Title>{product.name}</Card.Title> {/* Display the name instead of _id */}
              <Card.Text>
                Price: {product.price} {/* Display the price from the data */}
              </Card.Text>
              <Button  variant="primary" onClick={()=>{handleAddtoCart(product)}}>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
