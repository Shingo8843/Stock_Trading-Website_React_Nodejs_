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
    } else {
      addWatchlist(companyData.ticker, companyData.name);
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
  const CurrentTime = new Date();
  return (
    <Card className="m-2" bg="light">
      <Card.Body className="text-center">
        <Row>
          <Col xs={5} md={4} lg={4} className="my-auto">
            <Card.Title>{companyData.ticker}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {companyData.name}
              <FontAwesomeIcon
                icon={star ? faStarSolid : faStarRegular}
                className={star ? "text-warning" : "text-muted"}
                onClick={toggleStar}
                style={{ cursor: "pointer" }}
              />
            </Card.Subtitle>
            <Card.Text className="text-muted">{companyData.exchange}</Card.Text>
            <Button variant="primary" size="sm" onClick={onBuy}>
              Buy
            </Button>{" "}
            {portfolioData.find(
              (item) => item.ticker === companyData.ticker
            ) ? (
              <Button variant="secondary" size="sm" onClick={onSell}>
                Sell
              </Button>
            ) : (
              ""
            )}
          </Col>
          <Col xs md lg className="my-auto text-center">
            <Card.Img src={companyData.logo} />
          </Col>
          {quoteData.d > 0 ? (
            <Col xs={5} md={4} lg={4} className="my-auto ">
              <Card.Title className="text-success">
                {quoteData.c ? `$${quoteData.c}` : "$0.00"}
              </Card.Title>
              <Card.Text className="text-success">
                {quoteData.d ? (
                  quoteData.d > 0 ? (
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className="text-success"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className="text-danger"
                    />
                  )
                ) : (
                  ""
                )}
                {quoteData.d ? `${quoteData.d} (${quoteData.dp}%)` : ""}
              </Card.Text>
              <Card.Text>
                <small>
                  {quoteData.t
                    ? `${numberToTime(quoteData.t)}`
                    : "No data available"}
                </small>
              </Card.Text>
            </Col>
          ) : (
            <Col xs={5} md={4} lg={4} className="my-auto">
              <Card.Title className="text-danger">
                {quoteData.c ? `$${quoteData.c}` : "$0.00"}
              </Card.Title>
              <Card.Text className="text-danger">
                {quoteData.d ? (
                  quoteData.d > 0 ? (
                    <i className="fa fa-arrow-up text-success"></i>
                  ) : (
                    <i className="fa fa-arrow-down text-danger"></i>
                  )
                ) : (
                  ""
                )}
                {quoteData.d ? `${quoteData.d} (${quoteData.dp}%)` : ""}
              </Card.Text>
              <Card.Text>
                <small>
                  {quoteData.t
                    ? `${numberToTime(quoteData.t)}`
                    : "No data available"}
                </small>
              </Card.Text>
            </Col>
          )}
        </Row>
        <Row>
          <Col className="text-muted text-center">
            {Math.abs(CurrentTime - quoteData.t * 1000) < 300000 ? (
              <small className="text-success">Market is open</small>
            ) : (
              <small className="text-danger">Market is closed</small>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Current;
