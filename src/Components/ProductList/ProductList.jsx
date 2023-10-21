import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cart from "../../Assets/Images/cart.png";
import "./product.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

function ProductList() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

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
      (item) => item.product._id === product._id
    );
    if (!productExistsInCart) {
      toast.success("Product added to cart successfully");
      existingCartData.push({ product });

      localStorage.setItem("cartData", JSON.stringify(existingCartData));

    } else {
      const storedCount = localStorage.getItem(`product_${product._id}`);
      const updatedCount = parseInt(storedCount, 10) + 1;
      localStorage.setItem(`product_${product._id}`, updatedCount.toString());

      
      toast.success("Existing product count incremented in the cart");
    }
  };

  const handleCart = () => {
    navigate("/cart");
  };

  let PageSize = 8;

  const pageCount = Math.ceil(data.length / PageSize);

  const currentTableData = useMemo(() => {
    const firstPageIndex = currentPage * PageSize;
    const lastPageIndex = Math.min(firstPageIndex + PageSize, data.length);
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Container>
        <ToastContainer position="top-center"></ToastContainer>
        <Row>
          <Col>
            <img
              style={{ width: "3rem", height: "3rem", float: "right" }}
              src={cart}
            />
            <Button
              className="float-end addcart-button"
              variant="info"
              onClick={handleCart}
            >
              {" "}
              Go to cart{" "}
            </Button>
          </Col>
        </Row>

        <Row>
          {currentTableData.map((product, index) => (
            <Card
              key={product._id}
              className="m-3"
              style={{
                backgroundColor: "rgb(146, 199, 195)",
                width: "18rem",
                alignItems: "center",
                height: "30rem",
                alignContent: "center",
              }}
            >
              <Card.Img
                variant="top"
                src={product?.imageUrl}
                style={{
                  height: "15rem",
                  margin: "1rem",
                  backgroundColor: "white",
                }}
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
        <ReactPaginate
          previousLabel={<FaBackward />}
          nextLabel={<TbPlayerTrackNextFilled />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </Container>
    </>
  );
}

export default ProductList;
