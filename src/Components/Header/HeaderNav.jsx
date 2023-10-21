import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from "../../Assets/Images/logo.png"
import { useState } from 'react';


function HeaderNav() {
  const [searchQuery, setSearchQuery] = useState("");
  
  
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container style={{backgroundColor:'rgb(146, 199, 195)'}} fluid>
        
      <Navbar.Brand href="#">
          <img
            src={logo} 
            alt="Your Logo"
            style={{height:'5rem'}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
            
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              
            />
            <Button variant="outline-success"  onClick={(e) => setSearchQuery(e.target.value)}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;