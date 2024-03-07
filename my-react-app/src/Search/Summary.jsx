import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
function Summary(props) {
  const { stockData, options } = props;
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
        <Col lg md={6} xs>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Col>
      </Row>
    </Container>
  );
}

export default Summary;
