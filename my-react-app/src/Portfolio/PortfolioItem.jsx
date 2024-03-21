import React from "react";

import { Card, Button, Row, Col } from "react-bootstrap";
const PortfolioItem = ({
  ticker,
  name,
  quantity,
  avgCost,
  currentPrice,
  marketValue,
  change,
  onSell,
  onBuy,
}) => {
  return (
    <Card className="mb-3">
      <Card.Header as="h5">
        {ticker} - {name}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>Quantity: {quantity}</Card.Text>
            <Card.Text>Avg. Cost / Share: {avgCost}</Card.Text>
            <Card.Text>Total Cost: {avgCost * quantity}</Card.Text>
          </Col>
          <Col>
            <Card.Text>Change: {change}</Card.Text>
            <Card.Text>Current Price: {currentPrice}</Card.Text>
            <Card.Text>Market Value: {marketValue}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="align-">
        <Button variant="primary" onclick={() => onBuy(ticker)}>
          Buy
        </Button>

        <Button variant="danger" onclick={() => onSell(ticker)}>
          Sell
        </Button>
      </Card.Footer>
    </Card>
  );
};
export default PortfolioItem;
