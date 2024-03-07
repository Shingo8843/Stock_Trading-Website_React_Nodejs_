import React from "react";
import { Navbar, Nav } from "react-bootstrap";
function Header() {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="tertiary"
      fixed="top"
    >
      <Navbar.Brand href="#home">Stock Search</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Nav.Link href="#search">Search</Nav.Link>
          <Nav.Link href="#watchlist">Watchlist</Nav.Link>
          <Nav.Link href="#portfolio">Portfolio</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;
