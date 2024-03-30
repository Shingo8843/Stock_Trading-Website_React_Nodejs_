import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
function Current({
  quoteData,
  companyData,
  onBuy,
  onSell,
  portfolioData,
  setshowWatchlistAddAlert,
  setshowWatchlistRemoveAlert,
  star,
  setStar,
  addWatchlist,
  removeWatchlist,
}) {
  if (!quoteData || !companyData) {
    return <div>Loading...</div>;
  }
  const toggleStar = () => {
    if (star) {
      removeWatchlist(companyData.ticker);
      setshowWatchlistAddAlert(false);
      setshowWatchlistRemoveAlert(true);
    } else {
      addWatchlist(companyData.ticker, companyData.name);
      setshowWatchlistAddAlert(true);
      setshowWatchlistRemoveAlert(false);
    }
    setStar(!star);
  };
  function numberToTime(t) {
    const date = new Date(t * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const getPriceChangeClass = (change) => {
    return change > 0 ? "price-up" : change < 0 ? "price-down" : "no-change";
  };
  const CurrentTime = new Date();
  return (
    <Card className="stock-card">
      <Card.Body className="text-center">
        <Row>
          <Col xs={5} md={4} lg={4} className="my-auto stock-info">
            <Card.Title className="current-coompany-title">
              {companyData.ticker}
              <FontAwesomeIcon
                icon={star ? faStarSolid : faStarRegular}
                className={
                  star ? "text-warning current-star" : "text-muted current-star"
                }
                onClick={toggleStar}
                style={{ cursor: "pointer" }}
              />
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted stock-card-subtitle">
              {companyData.name}
            </Card.Subtitle>
            <Card.Text className="text-muted">{companyData.exchange}</Card.Text>
            <Button variant="success" size="sm" onClick={onBuy}>
              Buy
            </Button>{" "}
            {portfolioData.find(
              (item) => item.ticker === companyData.ticker
            ) ? (
              <Button variant="danger" size="sm" onClick={onSell}>
                Sell
              </Button>
            ) : (
              ""
            )}
          </Col>
          <Col xs={2} md={4} lg={4} className="text-center company-logo">
            <Card.Img src={companyData.logo} />
          </Col>
          <Col xs={5} md={4} lg={4} className="my-auto stock-quote">
            <Card.Title
              className={`quote-current ${getPriceChangeClass(quoteData.d)}`}
            >
              {quoteData.c ? `${quoteData.c}` : "0.00"}
            </Card.Title>
            <Card.Text
              className={`quote-change ${getPriceChangeClass(quoteData.d)}`}
            >
              {quoteData.d !== 0 && <span>{quoteData.d > 0 ? "▲" : "▼"}</span>}

              {quoteData.d
                ? `${quoteData.d} (${quoteData.dp.toFixed(2)}%)`
                : ""}
            </Card.Text>
            <Card.Text>
              <small className="quote-time">
                {quoteData.t
                  ? `${numberToTime(quoteData.t)}`
                  : "No data available"}
              </small>
            </Card.Text>
          </Col>
        </Row>
        <Row>
          <Col className="text-muted text-center">
            {Math.abs(CurrentTime - quoteData.t * 1000) < 300000 ? (
              <small className="text-success market-status-current">
                Market is open
              </small>
            ) : (
              <small className="text-danger market-status-current">
                Market is closed
              </small>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Current;
