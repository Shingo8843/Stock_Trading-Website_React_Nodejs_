import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import PortfolioItem from "./PortfolioItem";
import Header from "../Header";
import BuyStockModal from "./BuyStockModal";
import SellStockModal from "./SellStockModal";
import { useLocation } from "react-router-dom";

function Portfolio() {
  const initialWallet = 25000;
  const [portfoliodata, setPortfolioData] = useState([]);
  const [wallet, setWallet] = useState(initialWallet);
  const [isLoading, setIsLoading] = useState(true);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const location = useLocation();
  console.log("location", location);
  useEffect(() => {
    const fetchAndUpdatePortfolio = async () => {
      try {
        const data = await fetchPortfolio();
        const pricePromises = data.map((item) =>
          fetchStockPrice(item.ticker)
            .then((price) => ({
              ...item,
              price,
            }))
            .catch((error) => {
              console.error(
                `Failed to fetch stock price for ${item.ticker}:`,
                error
              );
              return { ...item, price: undefined };
            })
        );

        const updatedPortfolio = await Promise.all(pricePromises);

        setPortfolioData(updatedPortfolio);

        updateWallet(updatedPortfolio);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
      }
    };

    fetchAndUpdatePortfolio();
  }, []);
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
  async function fetchStockPrice(ticker) {
    const response = await fetch(`http://localhost:8080/quote/${ticker}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.c);
    return data.c;
  }
  async function handleSell(ticker, quantityToSell, totalCost) {
    const stock = portfoliodata.find((item) => item.ticker === ticker);
    if (!stock) {
      console.error("Stock not found in portfolio");
      return;
    }

    // Ensure quantityToSell is a number
    const quantityToSellNum = parseInt(quantityToSell, 10);
    console.log("Quantity to sell:", quantityToSellNum);
    if (isNaN(quantityToSellNum) || quantityToSellNum > stock.quantity) {
      console.error(
        "Invalid sell operation due to non-numeric quantity or quantity exceeds holdings"
      );
      return;
    }

    const sellTotal = quantityToSellNum * stock.price;
    const newWalletBalance = wallet + sellTotal;
    setWallet(newWalletBalance);

    // Ensure stock.quantity is treated as a number and calculate new quantity
    const newQuantity = parseInt(stock.quantity, 10) - quantityToSellNum;
    const updatedStock = {
      ticker: stock.ticker,
      quantity: newQuantity,
      avgshare: stock.avgshare,
      totalshare: totalCost,
      price: stock.price,
    };

    const updatedPortfolio = portfoliodata
      .map((item) => (item.ticker === ticker ? updatedStock : item))
      .filter((item) => item.quantity > 0);
    setPortfolioData(updatedPortfolio);
    if (newQuantity === 0) {
      await deletePortfolioInDatabase(ticker);
    } else {
      await updatePortfolioInDatabase(ticker, updatedStock);
    }
  }
  async function deletePortfolioInDatabase(ticker) {
    try {
      const response = await fetch(
        `http://localhost:8080/portfolio/DELETE/${ticker}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete portfolio in the database.");
      }
      const result = await response.json();
      console.log("Delete result:", result);
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
    }
  }
  async function handleBuy(ticker, quantity, totalCost) {
    if (totalCost > wallet) {
      console.error("Insufficient funds for this purchase");
      return;
    }
    const newWalletBalance = wallet - totalCost;
    setWallet(newWalletBalance);
    const stockExists = portfoliodata.find((item) => item.ticker === ticker);
    let updatedPortfolio;
    if (stockExists) {
      const newQuantity = quantity + parseInt(stockExists.quantity);
      const newAvgShare =
        (stockExists.avgshare * stockExists.quantity + totalCost) / newQuantity;
      totalCost = stockExists.avgshare * stockExists.quantity + totalCost;
      updatedPortfolio = portfoliodata.map((item) =>
        item.ticker === ticker
          ? {
              ...item,
              quantity: newQuantity,
              avgshare: newAvgShare,
              totalshare: totalCost,
            }
          : item
      );
    } else {
      const newStock = {
        ticker,
        quantity,
        avgshare: totalCost / quantity,
        name: selectedStock.name,
        price: selectedStock.price,
      };
      updatedPortfolio = [...portfoliodata, newStock];
    }

    setPortfolioData(updatedPortfolio);

    updatedPortfolio.forEach(async (stock) => {
      await updatePortfolioInDatabase(stock.ticker, {
        quantity: stock.quantity,
        avgshare: stock.avgshare,
      });
    });
  }
  async function updatePortfolioInDatabase(ticker, data) {
    console.log("Update data:", data);
    try {
      const response = await fetch(
        `http://localhost:8080/portfolio/UPDATE/${ticker}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update portfolio in the database.");
      }
      const result = await response.json();
      console.log("Update result:", result);
    } catch (error) {
      console.error("Failed to update portfolio:", error);
    }
  }
  function updateWallet(portfolioItems) {
    const totalInvestment = portfolioItems.reduce((acc, item) => {
      return acc + item.totalshare;
    }, 0);
    setWallet(initialWallet - totalInvestment);
  }

  if (isLoading) {
    return (
      <Container>
        <Header />
        <Container className="main-content">
          <h2 className="text-start">My Portfolio</h2>
          <p className="text-start">Money in Wallet: {wallet}</p>
          <p className="text-start">Loading...</p>
        </Container>
      </Container>
    );
  }
  if (!portfoliodata.length) {
    return (
      <Container>
        <Header />
        <Container className="main-content text-center">
          <h1 className="text-start font-weight-bold">My Portfolio</h1>
          <h5 className="text-start font-weight-bold">
            Money in Wallet: ${wallet.toFixed(2)}
          </h5>
          <Alert variant="warning">Currently you don't have any stock.</Alert>
        </Container>
      </Container>
    );
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
            avgCost={item.avgshare}
            currentPrice={item.price}
            onBuy={() => {
              setSelectedStock(item);
              setShowBuyModal(true);
            }}
            onSell={() => {
              setSelectedStock(item);
              setShowSellModal(true);
            }}
          />
        ))}
      </Container>
      {selectedStock && (
        <SellStockModal
          show={showSellModal}
          onHide={() => setShowSellModal(false)}
          wallet={wallet}
          ticker={selectedStock.ticker}
          currentPrice={selectedStock.price}
          quantityOwned={selectedStock.quantity}
          onSell={handleSell}
        />
      )}
      {selectedStock && (
        <BuyStockModal
          show={showBuyModal}
          onHide={() => setShowBuyModal(false)}
          wallet={wallet}
          ticker={selectedStock.ticker}
          currentPrice={selectedStock.price}
          onBuy={handleBuy}
        />
      )}
    </Container>
  );
}

export default Portfolio;
