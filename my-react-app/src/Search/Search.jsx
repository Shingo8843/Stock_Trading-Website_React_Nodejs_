import { React, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import Header from "../Header";
import { Alert, Container } from "react-bootstrap";
import BuyStockModal from "../Portfolio/BuyStockModal";
import SellStockModal from "../Portfolio/SellStockModal";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useSearch } from "../SearchContext";
import { Spinner } from "react-bootstrap";
function Search() {
  const url = "http://shingomohw38843.us-east-1.elasticbeanstalk.com/api/";

  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const { companyData, setCompanyData } = useSearch();
  const { quoteData, setQuoteData } = useSearch();
  const { portfolioData, setportfolioData } = useSearch();
  const { recommendationTrend, setRecommendationTrend } = useSearch();
  const { newsData, setNewsData } = useSearch();
  const { selectedStock, setSelectedStock } = useSearch();
  const { hourlyPrices, setHourlyPrices } = useSearch();
  const { peerData, setPeerData } = useSearch();
  const { historicalPrices, setHistoricalPrices } = useSearch();
  const { insiderSentimentsData, setInsiderSentimentsData } = useSearch();
  const { historicalEPSSurprises, setHistoricalEPSSurprises } = useSearch();

  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  const [wallet, setWallet] = useState(100000);

  const [star, setStar] = useState(false);
  const [Watchlist, setWatchlist] = useState([]);
  const location = useLocation();
  const initialWallet = 25000;
  const { ticker } = useParams();
  const { searchValue, setSearchValue } = useSearch();
  const [showSellAlert, setShowSellAlert] = useState(false);
  const [showBuyAlert, setShowBuyAlert] = useState(false);
  const [showWatchlistAddAlert, setshowWatchlistAddAlert] = useState(false);
  const [showWatchlistRemoveAlert, setshowWatchlistRemoveAlert] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Watchlist.find((item) => item.ticker === searchValue)) {
      setStar(true);
    } else {
      setStar(false);
    }
  }, [portfolioData, searchValue, Watchlist]);
  async function fetchWatchlist() {
    const response = await fetch(url + "watchlist/GET", {
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
      console.log("Watchlist:", data);
      setWatchlist(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Error parsing JSON.");
    }
  }
  async function addWatchlist(ticker, name) {
    let data = { ticker: ticker, name: name };
    try {
      const response = await fetch(url + `watchlist/ADD`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Add watchlist result:", result);
    } catch (error) {
      console.error("Failed to add stock to watchlist:", error);
    }
  }
  async function removeWatchlist(ticker) {
    try {
      const response = await fetch(url + `watchlist/DELETE/${ticker}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to remove stock from watchlist.");
      }
      const result = await response.json();
      console.log("Remove watchlist result:", result);
    } catch (error) {
      console.error("Failed to remove stock from watchlist:", error);
    }
  }
  async function fetchsuggestions(suggestVal) {
    try {
      const response = await fetch(url + `search/${suggestVal}`);
      const data = await response.json();
      console.log("Suggestions:", data);
      return data.result;
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchInsiderSentiments(ticker) {
    try {
      const response = await fetch(url + `insider/${ticker}`);
      const data = await response.json();
      setInsiderSentimentsData(data);
      console.log("Insider Sentiments:", data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchHistoricalEPSSurprises(ticker) {
    try {
      const response = await fetch(url + `earnings/${ticker}`);
      const data = await response.json();
      setHistoricalEPSSurprises(data);
      console.log("Historical EPS Surprises:", data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchNewsData(ticker) {
    try {
      const response = await fetch(url + `news/${ticker}`);
      const data = await response.json();
      setNewsData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchHistoricalPrices(ticker, timestamp) {
    console.log("Timestamp:", timestamp);
    let CurrentTime = new Date().getTime();
    if (Math.abs(CurrentTime - timestamp * 1000) < 300000) {
      console.log("Market is closed");
      CurrentTime = CurrentTime - 63113904000;
    }
    const queryParams = new URLSearchParams({
      timeNumber: 1,
      timeUnit: "day",
      fromDate: CurrentTime - 63113904000,
      toDate: CurrentTime,
    });
    console.log("Query Params", queryParams);
    try {
      const response = await fetch(
        `${url}historical/${ticker}?${queryParams}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setHistoricalPrices(data);
      console.log("Fetched Historical Prices", data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchHourlyPrices(ticker, timestamp) {
    const currentTime = new Date();
    let toDate = currentTime.getTime();
    console.log("Current Time", currentTime.getTime() - timestamp * 1000);
    try {
      if (timestamp) {
        if (Math.abs(currentTime.getTime() - timestamp * 1000) > 300000) {
          toDate = timestamp * 1000;
        }
      } else {
        console.log("quoteData.t is undefined");
        return;
      }

      const queryParams = new URLSearchParams({
        timeNumber: 1,
        timeUnit: "hour",
        fromDate: toDate - 86400000,
        toDate: toDate,
      });

      const response = await fetch(
        `${url}historical/${ticker}?${queryParams}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      setHourlyPrices(data);
      console.log("Fetched Hourly prices", data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchPeerData(ticker) {
    try {
      const response = await fetch(url + `peers/${ticker}`);
      const data = await response.json();
      setPeerData(data);
      console.log("Peer Data:", data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchRecommendationTrend(ticker) {
    try {
      const response = await fetch(url + `recommendation/${ticker}`);
      const data = await response.json();
      setRecommendationTrend(data);
      console.log("Recommendation Trend:", data);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleSell(ticker, quantityToSell, totalCost) {
    setSelectedStock(portfolioData.find((item) => item.ticker === ticker));
    const stock = portfolioData.find((item) => item.ticker === ticker);
    if (!stock) {
      console.error("Stock not found in portfolio");
      return;
    }

    const quantityToSellNum = parseInt(quantityToSell, 10);
    if (isNaN(quantityToSellNum) || quantityToSellNum > stock.quantity) {
      console.error(
        "Invalid sell operation due to non-numeric quantity or quantity exceeds holdings"
      );
      return;
    }

    const sellTotal = quantityToSellNum * quoteData.c;
    const newWalletBalance = wallet + sellTotal;
    setWallet(newWalletBalance);

    const newQuantity = parseInt(stock.quantity, 10) - quantityToSellNum;
    const updatedStock = {
      ticker: stock.ticker,
      quantity: newQuantity,
      avgshare: stock.avgshare,
      totalshare: totalCost,
      price: quoteData.c,
    };

    const updatedPortfolio = portfolioData
      .map((item) => (item.ticker === ticker ? updatedStock : item))
      .filter((item) => item.quantity > 0);
    setportfolioData(updatedPortfolio);
    if (newQuantity === 0) {
      await deletePortfolioInDatabase(ticker);
    } else {
      await updatePortfolioInDatabase(ticker, updatedStock);
    }
    setSelectedStock(updatedPortfolio.find((item) => item.ticker === ticker));
    setShowSellAlert(true);
  }
  async function deletePortfolioInDatabase(ticker) {
    try {
      const response = await fetch(
        `http://shingomohw38843.us-east-1.elasticbeanstalk.com/api/portfolio/DELETE/${ticker}`,
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
    setSelectedStock(portfolioData.find((item) => item.ticker === ticker));
    if (totalCost > wallet) {
      console.error("Insufficient funds for this purchase");
      return;
    }
    const newWalletBalance = wallet - totalCost;
    setWallet(newWalletBalance);
    const stockExists = portfolioData.find((item) => item.ticker === ticker);
    let updatedPortfolio;
    if (stockExists) {
      console.log("Stock Exists:", stockExists);
      const newQuantity = quantity + parseInt(stockExists.quantity);
      const newAvgShare =
        (stockExists.avgshare * stockExists.quantity + totalCost) / newQuantity;
      totalCost = stockExists.avgshare * stockExists.quantity + totalCost;
      updatedPortfolio = portfolioData.map((item) =>
        item.ticker === ticker
          ? {
              ...item,
              quantity: newQuantity,
              avgshare: newAvgShare,
              totalshare: totalCost,
            }
          : item
      );
      try {
        const updatedStock = {
          ticker: ticker,
          quantity: newQuantity,
          avgshare: newAvgShare,
          totalshare: totalCost,
          price: quoteData.c,
        };
        await updatePortfolioInDatabase(ticker, updatedStock);
      } catch (error) {
        console.error("Failed to update portfolio in database:", error);
      }
    } else {
      const newStock = {
        ticker,
        quantity,
        avgshare: totalCost / quantity,
        name: companyData.name,
        price: quoteData.c,
      };
      try {
        await addPortfolioToDatabase(newStock);
      } catch (error) {
        console.error("Failed to add portfolio to database:", error);
      }
      updatedPortfolio = [...portfolioData, newStock];
    }
    setportfolioData(updatedPortfolio);
    console.log("Updated Portfolio:", updatedPortfolio);
    updatedPortfolio.forEach(async (stock) => {
      await updatePortfolioInDatabase(stock.ticker, {
        quantity: stock.quantity,
        avgshare: stock.avgshare,
      });
    });
    setShowBuyAlert(true);
  }
  async function addPortfolioToDatabase(data) {
    try {
      const response = await fetch(
        "http://shingomohw38843.us-east-1.elasticbeanstalk.com/api/portfolio/ADD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add portfolio to the database.");
      }
      const result = await response.json();
      console.log("Add result:", result);
    } catch (error) {
      console.error("Failed to add portfolio:", error);
    }
  }
  useEffect(() => {
    setSelectedStock(portfolioData.find((item) => item.ticker === searchValue));
    console.log("Selected Stock:", selectedStock);
  }, [searchValue, portfolioData]);

  async function updatePortfolioInDatabase(ticker, data) {
    try {
      const response = await fetch(
        `http://shingomohw38843.us-east-1.elasticbeanstalk.com/api/portfolio/UPDATE/${ticker}`,
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

  useEffect(() => {
    console.log("Location:", location, ticker);
    async function fetchData() {
      setShowSellAlert(false);
      setShowBuyAlert(false);
      setshowWatchlistAddAlert(false);
      const search = ticker;
      console.log("Search:", search, searchValue);
      if (search && search !== searchValue) {
        setLoading(true);
        setSearchValue(search);
        try {
          await fetchQuoteData(search).then((data) => {
            fetchHourlyPrices(search, data.t);
            fetchHistoricalPrices(search, data.t);
          });
          await Promise.all([
            fetchCompanyData(search),
            fetchRecommendationTrend(search),
            fetchPeerData(search),
            fetchNewsData(search),

            fetchInsiderSentiments(search),
            fetchHistoricalEPSSurprises(search),
          ]);

          setShowResults(true);
        } catch (error) {
          console.error(error);
          setShowResults(false);
        } finally {
          console.log("Finally");
          console.log("Search Value:", searchValue);
          console.log("Ticker:", ticker);
          console.log("Location:", location);
          console.log("companyData:", companyData);
          console.log("quoteData:", quoteData);
          console.log("portfolioData:", portfolioData);
          console.log("recommendationTrend:", recommendationTrend);
          console.log("newsData:", newsData);
          console.log("selectedStock:", selectedStock);
          console.log("hourlyPrices:", hourlyPrices);
          console.log("peerData:", peerData);
          console.log("historicalPrices:", historicalPrices);
          console.log("insiderSentimentsData:", insiderSentimentsData);
          console.log("historicalEPSSurprises:", historicalEPSSurprises);

          setLoading(false);
        }
      } else if (searchValue == ticker) {
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }

    fetchData();
  }, [ticker]);

  useEffect(() => {
    console.log("Search Value:", searchValue);
    console.log("location:", location);
  });
  useEffect(() => {
    fetchPortfolio();
    async function SetWalletPortfolio() {
      await fetchPortfolio().then((data) => {
        updateWallet(data);
      });
    }
    SetWalletPortfolio();
    fetchWatchlist();
  }, [searchValue]);
  function updateWallet(portfolioItems) {
    const totalInvestment = portfolioItems.reduce((acc, item) => {
      return acc + item.totalshare;
    }, 0);
    setWallet(initialWallet - totalInvestment);
  }
  async function fetchQuoteData(ticker) {
    try {
      const response = await fetch(url + `quote/${ticker}`);
      const data = await response.json();
      setQuoteData(data);
      console.log("Quote data:", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchCompanyData(ticker) {
    try {
      const response = await fetch(url + `company/${ticker}`);
      const data = await response.json();
      setCompanyData(data);
      console.log("Company data:", data);
    } catch (error) {
      console.error(error);
    }
  }
  function handleClear() {
    navigate("/search");
    setSearchValue("");
    setShowResults(false);
    setShowBuyAlert(false);
    setShowSellAlert(false);
    setshowWatchlistAddAlert(false);
  }

  async function fetchPortfolio() {
    const response = await fetch(url + "portfolio/GET", {
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
      setportfolioData(data);
      return data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Error parsing JSON.");
    }
  }
  return (
    <Container>
      <Header searchValue={searchValue} />
      <Container className="main-content">
        <div className="search my-3">
          <Container className="searchtitle-container">
            <h1 className="searchtitle">Stock Search</h1>
          </Container>
          <SearchBar
            handleClear={handleClear}
            fetchsuggestions={fetchsuggestions}
          />
          {showWatchlistAddAlert && (
            <Alert
              className="Watchlist-Transaction-container text-center"
              variant="success"
              onClose={() => setshowWatchlistAddAlert(false)}
              dismissible
            >
              <p>{searchValue} added to watchlist successfully.</p>
            </Alert>
          )}
          {showWatchlistRemoveAlert && (
            <Alert
              className="Watchlist-Transaction-container text-center"
              variant="danger"
              onClose={() => setshowWatchlistRemoveAlert(false)}
              dismissible
            >
              <p>{searchValue} removed from watchlist successfully.</p>
            </Alert>
          )}
          {showBuyAlert && (
            <Alert
              className="Buy-Transaction-container text-center"
              variant="success"
              onClose={() => setShowBuyAlert(false)}
              dismissible
            >
              <p>{searchValue} bought successfully.</p>
            </Alert>
          )}
          {showSellAlert && (
            <Alert
              className="Sell-Transaction-container text-center"
              variant="danger"
              onClose={() => setShowSellAlert(false)}
              dismissible
            >
              <p>{searchValue} sold successfully.</p>
            </Alert>
          )}

          {loading ? (
            <Container className="text-center">
              <Spinner animation="border" />
            </Container>
          ) : (
            showResults &&
            (companyData &&
            quoteData &&
            recommendationTrend &&
            newsData &&
            hourlyPrices.results &&
            peerData &&
            historicalPrices.results &&
            insiderSentimentsData &&
            historicalEPSSurprises.length !== 0 ? (
              <SearchResult
                quoteData={quoteData}
                companyData={companyData}
                portfolioData={portfolioData}
                recommendationTrend={recommendationTrend}
                hourlyPrices={hourlyPrices}
                peerData={peerData}
                newsData={newsData}
                historicalPrices={historicalPrices}
                insiderSentimentsData={insiderSentimentsData}
                historicalEPSSurprises={historicalEPSSurprises}
                addWatchlist={addWatchlist}
                removeWatchlist={removeWatchlist}
                star={star}
                setStar={setStar}
                setshowWatchlistAddAlert={setshowWatchlistAddAlert}
                setshowWatchlistRemoveAlert={setshowWatchlistRemoveAlert}
                onBuy={() => setShowBuyModal(true)}
                onSell={() => setShowSellModal(true)}
              />
            ) : (
              <Container>
                <Alert variant="danger" className="text-center">
                  No data found. Please enter a valid Ticker
                </Alert>
              </Container>
            ))
          )}
          {portfolioData && quoteData.c && (
            <SellStockModal
              show={showSellModal}
              onHide={() => setShowSellModal(false)}
              wallet={wallet}
              ticker={searchValue}
              currentPrice={quoteData.c}
              quantityOwned={
                portfolioData.find((item) => item.ticker === searchValue)
                  ?.quantity
              }
              onSell={handleSell}
            />
          )}
          {portfolioData && quoteData.c && (
            <BuyStockModal
              show={showBuyModal}
              onHide={() => setShowBuyModal(false)}
              wallet={wallet}
              ticker={searchValue}
              currentPrice={quoteData.c}
              onBuy={handleBuy}
            />
          )}
        </div>
      </Container>
    </Container>
  );
}
export default Search;
