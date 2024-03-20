import React from "react";
import WatchListItem from "./WatchListItem";
import { Alert, Spinner } from "react-bootstrap";
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
    <div className="container mt-5">
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
    </div>
  );
}
const fetchWatchlist = async () => {
  // fetch watchlist from MongoDB Atlas
};

const removeFromWatchlist = async (ticker) => {
  // remove an item from the watchlist in MongoDB Atlas
};
export default Watchlist;
