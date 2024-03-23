import { React, useState, useEffect } from "react";
import WatchlistItem from "./WatchListItem";
import { Alert, Container, Spinner } from "react-bootstrap";
import Header from "../Header";
function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlist()
      .then(async (data) => {
        const promises = data.map((item) => {
          return getQuote(item.ticker)
            .then((quote) => {
              item.price = quote.c;
              item.change = quote.d;
              item.percentageChange = quote.dp;
              return item;
            })
            .catch((error) => {
              console.error("Failed to fetch quote:", error);
              return item;
            });
        });

        const updatedData = await Promise.all(promises);
        setWatchlist(updatedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch watchlist:", error);
        setLoading(false);
      });
  }, []);

  const removeItemFromWatchlist = (ticker) => {
    removeFromWatchlist(ticker)
      .then(() => {
        // Correctly filter the watchlist to remove the item with the given ticker
        const updatedWatchlist = watchlist.filter(
          (item) => item.ticker !== ticker
        );
        setWatchlist(updatedWatchlist); // Update the state with the filtered watchlist
      })
      .catch((error) => {
        console.error("Failed to remove item:", error);
      });
  };
  if (loading) {
    return (
      <Container>
        <Header />
        <Container>
          <Spinner animation="border" />
        </Container>
      </Container>
    );
  } else if (!watchlist.length) {
    return (
      <Container>
        <Header />
        <Container>
          <h2>My Watchlist</h2>
          <Alert variant="info">Your watchlist is empty.</Alert>
        </Container>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Container className="main-content">
        <div className=" my-3">
          <h2>My Watchlist</h2>
          {watchlist.map((item) => (
            <WatchlistItem
              key={item.ticker}
              ticker={item.ticker}
              companyName={item.name}
              price={item.price}
              change={item.change}
              percentageChange={item.percentageChange}
              onRemove={removeItemFromWatchlist}
            />
          ))}
        </div>
      </Container>
    </Container>
  );
}
async function fetchWatchlist() {
  const response = await fetch("http://localhost:8080/watchlist/GET", {
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
async function removeFromWatchlist(ticker) {
  try {
    const response = await fetch(
      `http://localhost:8080/watchlist/DELETE/${ticker}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Network response was not ok.");
    }

    const data = await response.json();
    console.log(data.message);

    return data;
  } catch (error) {
    console.error("Error during fetch operation:", error.message);
    throw error;
  }
}

async function getQuote(ticker) {
  const response = await fetch(`http://localhost:8080/quote/${ticker}`, {
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

export default Watchlist;
