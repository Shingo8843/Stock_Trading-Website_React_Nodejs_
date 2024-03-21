import { React, useState, useEffect } from "react";
import WatchlistItem from "./WatchListItem";
import { Alert, Container, Spinner } from "react-bootstrap";
function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume fetchWatchlist is a function that retrieves the watchlist from MongoDB Atlas
    fetchWatchlist()
      .then((data) => {
        setWatchlist(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch watchlist:", error);
        setLoading(false);
      });
  }, []);

  const removeItemFromWatchlist = (ticker) => {
    // Assume removeFromWatchlist is a function that removes the item from MongoDB Atlas
    removeFromWatchlist(ticker)
      .then(() => {
        setWatchlist(watchlist.filter((item) => item.ticker !== ticker));
      })
      .catch((error) => {
        console.error("Failed to remove item:", error);
      });
  };

  const navigateToDetails = (ticker) => {
    // Navigate to details route for the ticker
    // For example: this.props.history.push(`/details/${ticker}`);
    console.log("Navigate to:", `/details/${ticker}`);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!watchlist.length) {
    return <Alert variant="info">Your watchlist is empty.</Alert>;
  }

  return (
    <Container>
      <h2>My Watchlist</h2>
      {watchlist.map((item) => (
        <WatchlistItem
          key={item.ticker}
          ticker={item.ticker}
          companyName={item.companyName}
          price={item.price}
          change={item.change}
          percentageChange={item.percentageChange}
          onRemove={removeItemFromWatchlist}
          onNavigate={navigateToDetails}
        />
      ))}
    </Container>
  );
}
const fetchWatchlist = async () => {
  // fetch watchlist from MongoDB Atlas
  // var list = await fetch("http://localhost:5038/watchlist/GET");
  // return list;
  return [
    {
      ticker: "AAPL",
      companyName: "Apple Inc.",
      price: 123.45,
      change: 1.23,
      percentageChange: 1.0,
    },
    {
      ticker: "GOOGL",
      companyName: "Alphabet Inc.",
      price: 234.56,
      change: -2.34,
      percentageChange: -1.0,
    },
  ];
};

const removeFromWatchlist = async (ticker) => {
  // remove an item from the watchlist in MongoDB Atlas
  await fetch(`http://localhost:5038/watchlist/DELETE/${ticker}`);
};
export default Watchlist;
