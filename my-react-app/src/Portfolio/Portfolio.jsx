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
  function fetchPortfolio() {
    // Assume fetchPortfolio is a function that retrieves the portfolio from MongoDB Atlas
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          {
            ticker: "AAPL",
            name: "Apple Inc.",
            quantity: 10,
            avgCost: 150,
            currentPrice: 155,
            marketValue: 1550,
            change: 50,
          },
          {
            ticker: "GOOGL",
            name: "Alphabet Inc.",
            quantity: 5,
            avgCost: 2000,
            currentPrice: 2100,
            marketValue: 10500,
            change: 500,
          },
        ]);
      }, 1000);
    });
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
export default Portfolio;
