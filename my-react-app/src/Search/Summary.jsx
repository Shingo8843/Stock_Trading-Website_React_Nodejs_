import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
function Summary({ quoteData, companyData, peerData, hourlyPrices }) {
  let options = {};
  if (!hourlyPrices) {
    return <div>Loading...</div>;
  }
  const hours = hourlyPrices.results.map(
    (result) => new Date(result.t).getHours() + ":00"
  );
  const prices = hourlyPrices.results.map((result) => result.c);
  options = {
    chart: {
      type: "line",
    },
    legend: {
      enabled: false,
    },
    title: {
      text: `${companyData.ticker} Stock Price`,
    },
    xAxis: {
      categories: hours,
    },
    yAxis: {
      title: {
        text: "Price",
      },
    },
    series: [
      {
        name: "Stock Price",
        data: prices,
      },
    ],
  };

  return (
    <Container fluid>
      <Row>
        <Col md={6} variance="dark">
          <h5>High Price: {quoteData.h}</h5>
          <h5>Low Price: {quoteData.l}</h5>
          <h5>Open Price: {quoteData.o}</h5>
          <h5>Prev. Close: {quoteData.pc}</h5>
          <h5>About the company</h5>
          <p>IPO Start Date: {companyData.ipo}</p>
          <p>Industry: {companyData.finnhubIndustry}</p>
          <p>
            Webpage: <a href={companyData.weburl}>{companyData.weburl}</a>
          </p>

          <p>Company peers:</p>
          <div>
            {peerData.map((peer, index) => (
              <span key={index} className="peer-link">
                {peer}{" "}
              </span>
            ))}
          </div>
        </Col>
        <Col lg md={6} xs>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>
      </Row>
    </Container>
  );
}

export default Summary;
