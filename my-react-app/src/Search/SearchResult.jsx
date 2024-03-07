import React, { useState, useEffect } from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import Summary from "./Summary";
import TopNews from "./TopNews";
import Charts from "./Chart";
import Insights from "./Insights";
import Current from "./Current";

function SearchResult() {
  const stockData = {
    highPrice: "89.12",
    lowPrice: "85.40",
    openPrice: "81.29",
    prevClose: "81.39",
    ipoDate: "2016-08-01",
    industry: "Technology",
    webpage: "https://www.delltechnologies.com/",
    peers: ["AAPL", "SMCI", "HPQ", "HPE", "WDC", "NTAP", "PSTG", "XRX"],
  };
  const options = {
    title: {
      text: "DELL Hourly Price Variation",
    },
    xAxis: {
      type: "datetime",
      categories: [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "00:00",
      ],
    },
    yAxis: {
      title: {
        text: "Stock Price",
      },
    },
    series: [
      {
        name: "DELL",
        data: [81, 82, 83, 82, 84, 83, 85, 86, 87, 88, 85, 84, 86, 87, 88],
      },
    ],
  };
  const newsList = [
    {
      Source: "BBC",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Covid-19: UK to close all travel corridors from Monday",
      Description:
        "The prime minister says it is the right time to end the daily televised press briefings.",
      Url: "https://www.bbc.com/news/uk-55681861",
    },
    {
      Source: "CNN",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Biden unveils $1.9 trillion Covid relief package",
      Description:
        "The president-elect has unveiled a plan to help the US through the coronavirus pandemic.",
      Url: "https://www.cnn.com/2021/01/14/politics/biden-economic-relief-package-coronavirus/index.html",
    },
    {
      Source: "ABC",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Trump to leave Washington on morning of Biden's inauguration",
      Description:
        "The president will leave office on Wednesday morning, ahead of Joe Biden's inauguration.",
      Url: "https://abcnews.go.com/Politics/trump-leave-washington-morning-bidens-inauguration/story?id=75299064",
    },
    {
      Source: "NBC",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Biden to propose 8-year citizenship path, faster for DACA",
      Description:
        "The president-elect will propose an eight-year path to citizenship, faster for DACA recipients.",
      Url: "https://www.nbcnews.com",
    },
    {
      Source: "CBS",
      PublishedDate: "2021-01-15T00:00:00Z",
      Title: "Biden to propose 8-year citizenship path, faster for DACA",
      Description:
        "The president-elect will propose an eight-year path to citizenship, faster for DACA recipients.",
      Url: "https://www.cbsnews.com",
    },
  ];
  const insiderSentimentsData = {
    company: "NVIDIA Corp",
    total: {
      mspr: -1023.44,
      change: -470839,
    },
    positive: {
      mspr: 0,
      change: 0,
    },
    negative: {
      mspr: -1023.44,
      change: -470839,
    },
  };
  const recommendationTrendsOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Recommendation Trends",
    },
    xAxis: {
      categories: ["Q1 2021", "Q2 2021", "Q3 2021", "Q4 2021"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Analysts",
      },
    },
    tooltip: {
      pointFormat: "Analysts: <b>{point.y}</b>",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      { name: "Strong Buy", data: [10, 14, 16, 12] },
      { name: "Buy", data: [7, 10, 8, 5] },
      { name: "Hold", data: [5, 3, 4, 7] },
      { name: "Sell", data: [2, 1, 3, 2] },
      { name: "Strong Sell", data: [1, 0, 1, 0] },
    ],
  };

  const historicalEPSSurprisesOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Historical EPS Surprises",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        month: "%e. %b",
        year: "%b",
      },
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Earnings per Share",
      },
      min: 0,
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Actual EPS",
        data: [
          [Date.UTC(2021, 0, 1), 0.2],
          [Date.UTC(2021, 1, 1), 0.29],
          [Date.UTC(2021, 2, 1), 0.25],
          [Date.UTC(2021, 3, 1), 0.15],
          [Date.UTC(2021, 4, 1), 0.3],
          [Date.UTC(2021, 5, 1), 0.4],
          [Date.UTC(2021, 6, 1), 0.45],
        ],
        pointStart: Date.UTC(2021, 0, 1),
        pointInterval: 30 * 24 * 3600 * 1000,
      },
    ],
  };
  const [key, setKey] = useState("summary");
  const [summaryData, setSummaryData] = useState([stockData, options]);
  const [newsData, setNewsData] = useState(newsList);
  const [chartData, setChartData] = useState(options);
  const [insightsData, setInsightsData] = useState([
    insiderSentimentsData,
    recommendationTrendsOptions,
    historicalEPSSurprisesOptions,
  ]);

  useEffect(() => {
    switch (key) {
      case "summary":
        getSummaryData();
        break;
      case "news":
        getNewsData();
        break;
      case "charts":
        getChartData();
        break;
      case "insights":
        getInsightsData();
        break;
      default:
        break;
    }
  }, [key]);

  function getSummaryData() {
    // Fetch summary data
    // setSummaryData(fetchedData);
  }

  function getNewsData() {
    // setNewsData(fetchedData);
  }

  function getChartData() {
    // Fetch chart data
    // setChartData(fetchedData);
  }

  function getInsightsData() {
    // Fetch insights data
    // setInsightsData(fetchedData);
  }

  return (
    <Container>
      <Current />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="summary" title="Summary">
          <Summary options={summaryData[1]} stockData={summaryData[0]} />
        </Tab>
        <Tab eventKey="news" title="Top News">
          <TopNews newsList={newsData} />
        </Tab>
        <Tab eventKey="charts" title="Charts">
          <Charts options={chartData} />
        </Tab>
        <Tab eventKey="insights" title="Insights">
          <Insights
            insiderSentimentsData={insightsData[0]}
            recommendationTrendsOptions={insightsData[1]}
            historicalEPSSurprisesOptions={insightsData[2]}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default SearchResult;
