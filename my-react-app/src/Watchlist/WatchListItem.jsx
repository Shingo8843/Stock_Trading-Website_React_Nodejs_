import React from "react";
import { Card, Button } from "react-bootstrap";
// icons.getbootstrap.com/icons/caret-up-fill/
// icons.getbootstrap.com/icons/caret-down-fill/

function WatchListItem(props) {
  return (
    <Card className="watchlistCard">
      <Card.Body>
        <Card.Title>{props.ticker}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.name}</Card.Subtitle>
        <Card.Text>
          {props.price}{" "}
          <span
            style={{
              color: props.price < props.currentPrice ? "red" : "green",
            }}
          >
            {props.price < props.currentPrice ? (
              <img
                src="https://icons.getbootstrap.com/icons/caret-down-fill/"
                alt="Price Decreased"
              />
            ) : (
              <img
                src="https://icons.getbootstrap.com/icons/caret-up-fill/"
                alt="Price Increased"
              />
            )}
          </span>
        </Card.Text>
        <Button variant="primary"></Button>
      </Card.Body>
    </Card>
  );
}
export default WatchListItem;
