import React from "react";
import { Container } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

// Import necessary modules
// import rangeSelector from "highcharts/modules/range-selector";
import Candlestick from "highcharts/modules/stock";
import VBP from "highcharts/indicators/volume-by-price";
import SMA from "highcharts/indicators/indicators";
import IndicatorsAll from "highcharts/indicators/indicators-all";

// rangeSelector(Highcharts);
Candlestick(Highcharts);
SMA(Highcharts);
IndicatorsAll(Highcharts);
VBP(Highcharts);

function Chart({ historicalPrices }) {
  // console.log("Historical Data", historicalPrices);
  if (!historicalPrices) {
    return <div>Loading...</div>;
  }
  let ohlc = [];
  let volume = [];

  for (let i = 0; i < historicalPrices.results.length; i++) {
    let date = new Date(historicalPrices.results[i].t);
    ohlc.push([
      historicalPrices.results[i].t,
      historicalPrices.results[i].o,
      historicalPrices.results[i].h,
      historicalPrices.results[i].l,
      historicalPrices.results[i].c,
    ]);
    volume.push([historicalPrices.results[i].t, historicalPrices.results[i].v]);
  }
  const groupingUnits = [
    ["week", [1]],
    ["month", [1, 3, 6]],
    ["year", [1]],
  ];
  const options = {
    chart: {
      backgroundColor: "#f8f9fa",
    },
    rangeSelector: {
      enabled: true,
      selected: 1,
      buttons: [
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "ytd",
          text: "YTD",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
    },
    legend: {
      enabled: false,
    },
    title: {
      text: historicalPrices.ticker + "Historical",
    },

    subtitle: {
      text: "With SMA and Volume by Price technical indicators",
    },
    navigator: {
      enabled: true,
      height: 40,
      margin: 5,
      xAxis: {
        labels: {
          format: "{value:%e %b}",
          style: {
            color: "#666",
            fontSize: "10px",
          },
        },
      },
    },

    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%e %b",
      },
    },

    yAxis: [
      {
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
        opposite: true,
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
        opposite: true,
      },
    ],

    tooltip: {
      split: true,
    },

    plotOptions: {
      series: {
        dataGrouping: {
          units: groupingUnits,
        },
      },
    },

    series: [
      {
        type: "candlestick",
        name: historicalPrices.ticker,
        id: historicalPrices.ticker,
        zIndex: 2,
        data: ohlc,
      },
      {
        type: "column",
        name: "Volume",
        id: "volume",
        data: volume,
        yAxis: 1,
      },
      {
        type: "vbp",
        linkedTo: historicalPrices.ticker,
        params: {
          volumeSeriesID: "volume",
        },
        dataLabels: {
          enabled: false,
        },
        zoneLines: {
          enabled: false,
        },
      },
      {
        type: "sma",
        linkedTo: historicalPrices.ticker,
        zIndex: 1,
        marker: {
          enabled: false,
        },
      },
    ],
  };
  return (
    <Container className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  );
}
export default Chart;
