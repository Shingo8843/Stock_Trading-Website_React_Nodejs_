import React from "react";
import { Container } from "react-bootstrap";
function Footer() {
  return (
    <footer className="text-dark footer mt-auto py-3 bg-light fixed-bottom">
      <Container className="text-center">
        Powered by{" "}
        <a href="https://finnhub.io" className="text-blue">
          Finnhub
        </a>
      </Container>
    </footer>
  );
}

export default Footer;
