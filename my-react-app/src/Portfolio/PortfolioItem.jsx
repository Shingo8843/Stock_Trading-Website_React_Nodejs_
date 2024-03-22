import React from "react";
import { Card, Button, Table, Row, Col } from "react-bootstrap";

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
  const changeColor = change >= 0 ? "text-success" : "text-danger";

  return (
    <Card className="mb-3">
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
                <Card.Text>{quantity.toFixed(2)}</Card.Text>
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
        <Button variant="primary" onClick={() => onBuy(ticker)} size="sm">
          Buy
        </Button>{" "}
        <Button variant="danger" onClick={() => onSell(ticker)} size="sm">
          Sell
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default PortfolioItem;
