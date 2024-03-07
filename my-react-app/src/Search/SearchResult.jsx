import { Tab, Tabs } from "react-bootstrap";
import React, { useState } from "react";
import Summary from "./Summary";
import TopNews from "./TopNews";
import Charts from "./Chart";
import Insights from "./Insights";
function SearchResult() {
  const [key, setKey] = useState("summary");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="summary" title="Summary">
        <Summary />
      </Tab>
      <Tab eventKey="news" title="Top News">
        <TopNews />
      </Tab>
      <Tab eventKey="charts" title="Charts">
        <Charts />
      </Tab>
      <Tab eventKey="insights" title="Insights">
        <Insights />
      </Tab>
    </Tabs>
  );
}
export default SearchResult;
