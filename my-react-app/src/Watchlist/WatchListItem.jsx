import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const WatchlistItem = ({
  ticker,
  companyName,
  price,
  change,
  percentageChange,
  onRemove,
  onNavigate,
}) => {
  let priceChangeClass = "text-black";
  if (change > 0) {
    priceChangeClass = "text-success";
  } else if (change < 0) {
    priceChangeClass = "text-danger";
  }

  // Formatting percentage change to 2 decimal places
  const formattedPercentageChange = parseFloat(percentageChange).toFixed(2);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/search/${ticker}`);
  };
  return (
    <Card className="mb-3" onClick={handleCardClick}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(ticker);
            }}
            className="close-button"
          >
            X
          </Button>
        </div>
        <Row>
          <Col>
            <Card.Title>{ticker}</Card.Title>
          </Col>
          <Col>
            <Card.Title className={`${priceChangeClass}`}>{price}</Card.Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Subtitle>{companyName}</Card.Subtitle>
          </Col>
          <Col>
            <Card.Subtitle className={`${priceChangeClass}`}>
              {change >= 0 ? "▲" : "▼"} {change} ({formattedPercentageChange}%)
            </Card.Subtitle>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WatchlistItem;
