import React from "react";
import WatchListItem from "./WatchListItem";
import { Container } from "react-bootstrap";
function Watchlist() {
  const watchlist = [
    {
      ticker: "AAPL",
      name: "Apple Inc.",
      price: 123.45,
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      price: 234.56,
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corporation",
      price: 345.67,
    },
  ];
  if (watchlist.length === 0) {
    return (
      <div>
        <h1>Watchlist</h1>
        <p>Your watchlist is empty.</p>
      </div>
    );
  }
  const currentPrices = {
    AAPL: 123.45,
    GOOGL: 234.56,
    MSFT: 345.67,
  };

  return (
    <Container className="watchlistcontainer">
      <h1 className="watchlistTitle">Watchlist</h1>
      {/* Give watchlist aray and current price of the company */}
      {watchlist.map((company) => (
        <WatchListItem
          key={company.ticker}
          ticker={company.ticker}
          name={company.name}
          price={company.price}
          currentPrice={currentPrices[company.ticker]}
        />
      ))}
    </Container>
  );
}
export default Watchlist;
