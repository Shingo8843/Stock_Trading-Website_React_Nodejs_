import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const PortfolioItem = ({
  ticker,
  name,
  quantity,
  avgCost,
  currentPrice,
  onSell,
  onBuy,
}) => {
  if (!currentPrice) {
    currentPrice = 0;
  }
  const navigate = useNavigate();
  const marketValue = currentPrice * quantity;
  const change = currentPrice - avgCost;
  const changeColor = change >= 0 ? "text-success" : "text-danger";
  function handleClick(ticker) {
    navigate(`/search/${ticker}`);
  }
  return (
    <Card className="mb-3" onClick={() => handleClick(ticker)}>
      <Card.Header as="h5" className="text-start">
        {ticker} {name}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col xs="12" lg="6">
            <Row className="justify-content-center">
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>Quantity: </Card.Text>
              </Col>
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>{quantity}</Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>Avg. Cost / Share: </Card.Text>
              </Col>
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>{avgCost.toFixed(2)}</Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>Total Cost: </Card.Text>
              </Col>
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>{(avgCost * quantity).toFixed(2)}</Card.Text>
              </Col>
            </Row>
          </Col>
          <Col xs="12" lg="6">
            <Row className="justify-content-center">
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>Current Price: </Card.Text>
              </Col>
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>{currentPrice.toFixed(2)}</Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>Market Value: </Card.Text>
              </Col>
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>{marketValue.toFixed(2)}</Card.Text>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text>Change: </Card.Text>
              </Col>
              <Col className="text-start" xs="6" md="6" lg="6">
                <Card.Text className={changeColor}>
                  {change.toFixed(2)} ({((change / avgCost) * 100).toFixed(2)}
                  %)
                </Card.Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-start">
        <Button
          variant="primary"
          onClick={(event) => {
            event.stopPropagation();
            onBuy(ticker);
          }}
          size="sm"
        >
          Buy
        </Button>{" "}
        <Button
          variant="danger"
          onClick={(event) => {
            event.stopPropagation();
            onSell(ticker);
          }}
          size="sm"
        >
          Sell
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PortfolioItem;
