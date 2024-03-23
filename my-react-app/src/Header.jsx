import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap"; // Import LinkContainer

function Header() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="tertiary"
      fixed="top"
    >
      <Navbar.Brand>Stock Search</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <LinkContainer to="/search">
            <Nav.Link>Search</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/watchlist">
            <Nav.Link>Watchlist</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/portfolio">
            <Nav.Link>Portfolio</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
