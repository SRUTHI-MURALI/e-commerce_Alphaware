import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import logo from "../../Assets/Images/logo.png";
import cart from "../../Assets/Images/cart.png";
import { useEffect, useState } from "react";

function HeaderNav({ data, query }) {
  const [searchQuery, setSearchQuery] = useState("");
  const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(cartData.length);
  }, []);

  const handleSearch = () => {
    query(searchQuery);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{ backgroundColor: "rgb(146, 199, 195)" }} fluid>
        <Navbar.Brand href="#">
          <img src={logo} alt="Your Logo" style={{ height: "5rem" }} />
        </Navbar.Brand>
        {/* <Nav.Item className="nav-heading  ">{data}</Nav.Item> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          {data === "home" ? (
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          ) : (
            <>
              <Nav.Item className="nav-heading m-2">
                {" "}
                {count} Items in Cart{" "}
              </Nav.Item>
              <img src={cart} alt="cart" style={{ height: "4rem" }} />
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;
