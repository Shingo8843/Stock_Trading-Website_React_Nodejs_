import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PortfolioItem from "./PortfolioItem";
import Header from "../Header";

function Portfolio() {
  const initialWallet = 100000;
  const [portfoliodata, setPortfolioData] = useState([]);
  const [wallet, setWallet] = useState(initialWallet);

  useEffect(() => {
    fetchPortfolio()
      .then((data) => {
        processPortfolio(data);
      })
      .then((data) => {
        setPortfolioData(data);

        updateWallet(data);
      })
      .catch((error) => {
        console.error("Failed to fetch portfolio:", error);
      });
  }, []);

  function updateWallet(portfolioItems) {
    const totalInvestment = portfolioItems.reduce((acc, item) => {
      return acc + item.quantity * item.avgCost;
    }, 0);
    setWallet(initialWallet - totalInvestment);
  }

  function handleBuy(ticker) {
    console.log("Buying", ticker);
    // Here you will implement the buy logic
  }

  function handleSell(ticker) {
    console.log("Selling", ticker);
    // Here you will implement the sell logic
  }
  return (
    <Container>
      <Header />
      <Container className="main-content">
        <h2 className="text-start">My Portfolio</h2>
        <p className="text-start">Money in Wallet: {wallet}</p>
        {portfoliodata.map((item) => (
          <PortfolioItem
            key={item.ticker}
            ticker={item.ticker}
            name={item.name}
            quantity={item.quantity}
            avgCost={item.avgCost}
            currentPrice={item.currentPrice}
            marketValue={item.marketValue}
            change={item.change}
            onBuy={handleBuy}
            onSell={handleSell}
          />
        ))}
      </Container>
    </Container>
  );
}
async function fetchPortfolio() {
  const response = await fetch("http://localhost:8080/portfolio/GET", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }

  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw new Error("Error parsing JSON.");
  }
}
export default Portfolio;
