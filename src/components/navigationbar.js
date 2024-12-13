import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../Logo.png';  // Import Logo.jpg from the src folder (adjust path if needed)
import './navigationbarCSS.css';  // Import the CSS file for styles

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Logo with custom size, using the class for styles */}
        <Navbar.Brand href="/content">
          <img
            src={logo}  // Use the imported logo
            alt="Logo"
            className="navbar-logo"  // Apply the CSS class for the logo
          />
          Home
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/create">Add_Music</Nav.Link>
          <Nav.Link href="/read">Music_List</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
