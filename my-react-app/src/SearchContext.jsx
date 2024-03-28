import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [companyData, setCompanyData] = useState({});
  const [quoteData, setQuoteData] = useState({});
  const [portfolioData, setportfolioData] = useState([]);
  const [recommendationTrend, setRecommendationTrend] = useState({});
  const [newsData, setNewsData] = useState([{}]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [hourlyPrices, setHourlyPrices] = useState([]);
  const [peerData, setPeerData] = useState([]);
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [insiderSentimentsData, setInsiderSentimentsData] = useState({});
  const [historicalEPSSurprises, setHistoricalEPSSurprises] = useState({});

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        companyData,
        setCompanyData,
        quoteData,
        setQuoteData,
        portfolioData,
        setportfolioData,
        recommendationTrend,
        setRecommendationTrend,
        newsData,
        setNewsData,
        selectedStock,
        setSelectedStock,
        hourlyPrices,
        setHourlyPrices,
        peerData,
        setPeerData,
        historicalPrices,
        setHistoricalPrices,
        insiderSentimentsData,
        setInsiderSentimentsData,
        historicalEPSSurprises,
        setHistoricalEPSSurprises,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
