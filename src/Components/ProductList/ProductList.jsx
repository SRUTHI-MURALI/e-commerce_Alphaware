import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(
        "http://3.7.252.58:4001/product/getAllProduct"
      );

      setData(response.data);
    };

    fetchData();
  }, []);

  const handleAddtoCart = (product) => {
    const existingCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const productExistsInCart = existingCartData.some(
      (item) => item.id === product._id
    );
    if (!productExistsInCart) {
      toast.success("product added to cart successfully");
      existingCartData.push({ product });

      localStorage.setItem("cartData", JSON.stringify(existingCartData));
    } else {
      toast.error("product already exists in cart");
    }
  };

  return (
    <>
      <Container>
        <ToastContainer position="top-center"></ToastContainer>
        <Row>
          {data.map((product, index) => (
            <Card
              key={product._id}
              className="m-3"
              style={{
                backgroundColor: "rgb(146, 199, 195)",
                width: "18rem",
                alignItems: "center",
                height: "32rem",
                alignContent: "center",
              }}
            >
              <Card.Img
                variant="top"
                src={product.imageUrl}
                style={{ height: "20rem", margin: "1rem" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: {product.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleAddtoCart(product);
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
