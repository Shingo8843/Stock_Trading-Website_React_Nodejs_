import React, { useState } from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import Summary from "./Summary";
import TopNews from "./TopNews";
import Charts from "./Chart";
import Insights from "./Insights";
import Current from "./Current";
import ShareModal from "./ShareModal";

function SearchResult({
  quoteData,
  companyData,
  portfolioData,
  recommendationTrend,
  historicalPrices,
  newsData,
  peerData,
  hourlyPrices,
  insiderSentimentsData,
  historicalEPSSurprises,
  onSell,
  onBuy,
}) {
  const [key, setKey] = useState("summary");

  return (
    <Container>
      <Current
        quoteData={quoteData}
        companyData={companyData}
        portfolioData={portfolioData}
        onBuy={onBuy}
        onSell={onSell}
      />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 custom-tabs" // Apply custom class for styling
      >
        <Tab eventKey="summary" title="Summary">
          <Summary
            quoteData={quoteData}
            companyData={companyData}
            peerData={peerData}
            hourlyPrices={hourlyPrices}
          />
        </Tab>
        <Tab eventKey="news" title="Top News">
          <TopNews newsData={newsData} />
        </Tab>
        <Tab eventKey="charts" title="Charts">
          <Charts historicalPrices={historicalPrices} />
        </Tab>
        <Tab eventKey="insights" title="Insights">
          <Insights
            companyData={companyData}
            insiderSentimentsData={insiderSentimentsData}
            recommendationTrend={recommendationTrend}
            historicalEPSSurprises={historicalEPSSurprises}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default SearchResult;
