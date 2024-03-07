import React from "react";

function Footer() {
  return (
    <footer className="text-dark footer mt-auto py-3 bg-light fixed-bottom">
      <div className="container text-center">
        Powered by{" "}
        <a href="https://finnhub.io" className="text-blue">
          Finnhub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
