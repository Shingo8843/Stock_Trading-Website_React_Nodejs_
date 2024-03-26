import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Insights({
  companyData,
  insiderSentimentsData,
  recommendationTrend,
  historicalEPSSurprises,
}) {
  let total = 0;
  let positive = 0;
  let negative = 0;
  let change = 0;
  let posChange = 0;
  let negChange = 0;
  for (let i = 0; i < insiderSentimentsData.data.length; i++) {
    total += insiderSentimentsData.data[i].mspr;
    change += insiderSentimentsData.data[i].change;
    if (insiderSentimentsData.data[i].change > 0) {
      positive += insiderSentimentsData.data[i].mspr;
      posChange += insiderSentimentsData.data[i].change;
    } else {
      negative += insiderSentimentsData.data[i].mspr;
      negChange += insiderSentimentsData.data[i].change;
    }
  }
  const categories = recommendationTrend.map((item) => item.period); // Gather periods for the xAxis
  const recommendationTrendData = {
    "Strong Buy": recommendationTrend.map((item) => item.strongBuy),
    Buy: recommendationTrend.map((item) => item.buy),
    Hold: recommendationTrend.map((item) => item.hold),
    Sell: recommendationTrend.map((item) => item.sell),
    "Strong Sell": recommendationTrend.map((item) => item.strongSell),
  };

  const recommendationTrendsOptions = {
    chart: {
      type: "column",
    },
    title: {
      text: "Recommendation Trends",
    },
    xAxis: {
      categories: categories.reverse(), // Reverse to match the order in the image
    },
    yAxis: {
      min: 0,
      title: {
        text: "Number of Analysts",
      },
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: "normal",
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          color: "black",
        },
      },
    },
    series: [
      {
        name: "Strong Buy",
        data: recommendationTrendData["Strong Buy"].reverse(),
        color: "#006837",
      },
      {
        name: "Buy",
        data: recommendationTrendData.Buy.reverse(),
        color: "#4daf4a",
      },
      {
        name: "Hold",
        data: recommendationTrendData.Hold.reverse(),
        color: "#a6d96a",
      },
      {
        name: "Sell",
        data: recommendationTrendData.Sell.reverse(),
        color: "#fdae61",
      },
      {
        name: "Strong Sell",
        data: recommendationTrendData["Strong Sell"].reverse(),
        color: "#d73027",
      },
    ],
  };
  const actualEPS = historicalEPSSurprises.map((surprise, index) => {
    return {
      x: index,
      y: surprise.actual,
      surprise: surprise.surprise,
      period: surprise.period,
    };
  });
  const estimatedEPS = historicalEPSSurprises.map((surprise, index) => {
    return {
      x: index,
      y: surprise.estimate,
      surprise: surprise.surprise,
      period: surprise.period,
    };
  });

  const historicalEPSSurprisesOptions = {
    chart: {
      type: "spline",
    },
    title: {
      text: "Historical EPS Surprises",
    },
    xAxis: {
      categories: historicalEPSSurprises.map(
        (surprise) => surprise.period + "<br/> Surprise: " + surprise.surprise
      ),
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Quarterly EPS",
      },
      min: 1,
    },
    tooltip: {
      headerFormat: "<b>{series.name}</b><br>",
      pointFormat:
        "Date: {point.period}<br>Surprise: {point.surprise:.4f}<br>Earnings per Share: {point.y:.2f}",
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
        data: actualEPS,
        color: "blue",
      },
      {
        name: "Estimated EPS",
        data: estimatedEPS,
        color: "lightblue",
      },
    ],
  };

  const InsiderSentiments = ({ data }) => (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>{companyData.name}</th>
          <th>MSPR</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Total</td>
          <td>{total}</td>
          <td>{change}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{positive}</td>
          <td>{posChange}</td>
        </tr>
        <tr>
          <td>Negative</td>
          <td>{negative}</td>
          <td>{negChange}</td>
        </tr>
      </tbody>
    </Table>
  );
  return (
    <Container fluid>
      <Row>
        <Col md={12} sm={12}>
          <InsiderSentiments data={insiderSentimentsData} />
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={recommendationTrendsOptions}
          />
        </Col>
        <Col md={6} sm={12}>
          <HighchartsReact
            highcharts={Highcharts}
            options={historicalEPSSurprisesOptions}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default Insights;
