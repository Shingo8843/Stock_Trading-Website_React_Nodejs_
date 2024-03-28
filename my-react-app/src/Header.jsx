import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSearch } from "./SearchContext";
function Header() {
  const { searchValue, setSearchValue } = useSearch();
  console.log("Header rendered", searchValue);
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
          <LinkContainer
            to={{
              pathname: searchValue ? `/search/${searchValue}` : "/search",
              state: { search: searchValue },
            }}
          >
            <Nav.Link>Search</Nav.Link>
          </LinkContainer>
          <LinkContainer
            to={{
              pathname: "/watchlist",
              state: { search: searchValue },
            }}
          >
            <Nav.Link>Watchlist</Nav.Link>
          </LinkContainer>
          <LinkContainer
            to={{
              pathname: "/portfolio",
              state: { search: searchValue },
            }}
          >
            <Nav.Link>Portfolio</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
