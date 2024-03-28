import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useNavigate } from "react-router-dom";
function Summary({ quoteData, companyData, peerData, hourlyPrices }) {
  const navigate = useNavigate();
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
  function handleClick(ticker) {
    navigate(`/search/${ticker}`);
  }
  return (
    <Container fluid>
      <Row>
        <Col md={6} variance="dark" className="text-center">
          <p>
            <span className="summary-hloc">High Price:</span> {quoteData.h}
          </p>
          <p>
            <span className="summary-hloc">Low Price:</span> {quoteData.l}
          </p>
          <p>
            <span className="summary-hloc">Open Price:</span> {quoteData.o}
          </p>
          <p>
            <span className="summary-hloc">Current Price:</span> {quoteData.c}
          </p>
          <h5 className="about-company">About the company</h5>
          <p>
            <span className="summary-hloc">IPO Start Date:</span>{" "}
            {companyData.ipo}
          </p>
          <p>
            <span className="summary-hloc"> Industry:</span>{" "}
            {companyData.finnhubIndustry}
          </p>

          <p>
            <span className="summary-hloc">Webpage:</span>{" "}
            {companyData.weburl ? (
              <a href={companyData.weburl} target="_blank" rel="noreferrer">
                {companyData.weburl}
              </a>
            ) : (
              "N/A"
            )}{" "}
          </p>

          <p className="summary-hloc">
            Company <param name="" value="" />
            peers:
          </p>
          <div>
            {peerData.map((peer, index) => (
              <span key={index} className="peer-link">
                <a href="" onClick={() => handleClick(peer)}>
                  {peer}
                </a>{" "}
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
