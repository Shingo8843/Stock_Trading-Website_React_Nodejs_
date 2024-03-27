import { React, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import Header from "../Header";
import { Container } from "react-bootstrap";
import BuyStockModal from "../Portfolio/BuyStockModal";
import SellStockModal from "../Portfolio/SellStockModal";
function Search() {
  const url = "http://localhost:8080/";
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState({});
  const [quoteData, setQuoteData] = useState({});
  const [portfolioData, setportfolioData] = useState([]);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [recommendationTrend, setRecommendationTrend] = useState({});
  const [newsData, setNewsData] = useState([{}]);
  const [wallet, setWallet] = useState(100000);
  const [selectedStock, setSelectedStock] = useState(null);
  const [hourlyPrices, setHourlyPrices] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [insiderSentimentsData, setInsiderSentimentsData] = useState({});
  const [historicalEPSSurprises, setHistoricalEPSSurprises] = useState({});
  const initialWallet = 100000;
  async function fetchsuggestions(searchValue) {
    try {
      const response = await fetch(url + `search/${searchValue}`);
      const data = await response.json();
      // console.log("Suggestions:", data);
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
  async function fetchHistoricalPrices(ticker) {
    const queryParams = new URLSearchParams({
      timeNumber: 1,
      timeUnit: "day",
      fromDate: new Date().getTime() - 63113904000,
      toDate: new Date().getTime(),
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  async function fetchHourlyPrices(ticker, timestamp) {
    try {
      const currentTime = new Date();
      let toDate = currentTime.getTime();

      if (timestamp) {
        if (Math.abs(currentTime - toDate) > 300000) {
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
      // console.log(data);
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
    const stock = portfolioData.find((item) => item.ticker === ticker);
    if (!stock) {
      console.error("Stock not found in portfolio");
      return;
    }

    // Ensure quantityToSell is a number
    const quantityToSellNum = parseInt(quantityToSell, 10);
    // console.log("Quantity to sell:", quantityToSellNum);
    if (isNaN(quantityToSellNum) || quantityToSellNum > stock.quantity) {
      console.error(
        "Invalid sell operation due to non-numeric quantity or quantity exceeds holdings"
      );
      return;
    }

    const sellTotal = quantityToSellNum * quoteData.c;
    const newWalletBalance = wallet + sellTotal;
    setWallet(newWalletBalance);

    // Ensure stock.quantity is treated as a number and calculate new quantity
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
    setSelectedStock(updatedStock);
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
      // console.log("Delete result:", result);
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
    const stockExists = portfolioData.find((item) => item.ticker === ticker);
    let updatedPortfolio;
    if (stockExists) {
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
    } else {
      const newStock = {
        ticker,
        quantity,
        avgshare: totalCost / quantity,
        name: selectedStock.name,
        price: quoteData.c,
      };
      updatedPortfolio = [...portfolioData, newStock];
    }

    setportfolioData(updatedPortfolio);

    updatedPortfolio.forEach(async (stock) => {
      await updatePortfolioInDatabase(stock.ticker, {
        quantity: stock.quantity,
        avgshare: stock.avgshare,
      });
    });
    setSelectedStock(updatedPortfolio.find((item) => item.ticker === ticker));
  }
  async function updatePortfolioInDatabase(ticker, data) {
    // console.log("Update data:", data);
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
      // console.log("Update result:", result);
    } catch (error) {
      console.error("Failed to update portfolio:", error);
    }
  }
  async function handleSearch() {
    setLoading(true);
    try {
      await fetchQuoteData(searchValue).then((data) => {
        fetchHourlyPrices(searchValue, data.t);
      });
      const dataFetchPromises = [
        fetchCompanyData(searchValue),
        fetchRecommendationTrend(searchValue),
        fetchPeerData(searchValue),
        fetchNewsData(searchValue),
        fetchHistoricalPrices(searchValue),
        fetchInsiderSentiments(searchValue),
        fetchHistoricalEPSSurprises(searchValue),
      ];
      await Promise.all(dataFetchPromises);
      setSelectedStock(
        portfolioData.find((item) => item.ticker === searchValue)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setShowResults(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPortfolio();
    updateWallet(portfolioData);
  }, []);
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
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  function handleClear() {
    setSearchValue("");
    setShowResults(false);
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
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Error parsing JSON.");
    }
  }
  return (
    <Container>
      <Header />
      <Container className="main-content">
        <div className="search my-3">
          <h1 className="searchtitle">Stock Search</h1>
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
            handleClear={handleClear}
            fetchsuggestions={fetchsuggestions}
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            showResults && (
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
                onBuy={() => setShowBuyModal(true)}
                onSell={() => setShowSellModal(true)}
              />
            )
          )}
          {selectedStock && quoteData.c && (
            <SellStockModal
              show={showSellModal}
              onHide={() => setShowSellModal(false)}
              wallet={wallet}
              ticker={selectedStock.ticker}
              currentPrice={quoteData.c}
              quantityOwned={selectedStock.quantity}
              onSell={handleSell}
            />
          )}
          {selectedStock && quoteData.c && (
            <BuyStockModal
              show={showBuyModal}
              onHide={() => setShowBuyModal(false)}
              wallet={wallet}
              ticker={selectedStock.ticker}
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
