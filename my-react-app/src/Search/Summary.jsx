import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
function Summary() {
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
  return (
    <Container fluid>
      <Row>
        <Col md={6} variance="dark">
          <h5>High Price: {stockData.highPrice}</h5>
          <h5>Low Price: {stockData.lowPrice}</h5>

          <h5>About the company</h5>
          <p>IPO Start Date: {stockData.ipoDate}</p>
          <p>Industry: {stockData.industry}</p>
          <p>
            Webpage: <a href={stockData.webpage}>Dell Technologies</a>
          </p>

          <p>Company peers:</p>
          <div>
            {stockData.peers.map((peer, index) => (
              <span key={index} className="peer-link">
                {peer}
              </span>
            ))}
          </div>
        </Col>
        <Col md={6}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>
      </Row>
    </Container>
  );
}

export default Summary;
