import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";

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

  return (
    <Card className="mb-3" onClick={() => onNavigate(ticker)}>
      <Card.Body>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(ticker);
          }}
          className="float-end"
        >
          X
        </Button>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title>{ticker}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {companyName}
            </Card.Subtitle>
          </div>
          <div className={priceChangeClass}>
            <div>{price}</div>
            <div>
              {change >= 0 ? "▲" : "▼"} {change} ({formattedPercentageChange}%)
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WatchlistItem;
