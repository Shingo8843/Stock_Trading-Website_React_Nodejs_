import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
function Current() {
  const [star, setStar] = useState(false);
  const toggleStar = () => {
    setStar(!star);
  };
  return (
    <Card className="m-2" bg="light">
      <Card.Body>
        <Row>
          <Col xs={5} md={4} lg={4} className="my-auto">
            <Card.Title>AAPL</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Apple Inc.{" "}
              <FontAwesomeIcon
                icon={star ? faStarSolid : faStarRegular}
                className={star ? "text-warning" : "text-muted"}
                onClick={toggleStar}
                style={{ cursor: "pointer" }}
              />
            </Card.Subtitle>
            <Card.Text className="text-muted">
              NASDAQ NMS - GLOBAL MARKET
            </Card.Text>
            <Button variant="primary" size="sm">
              Buy
            </Button>
          </Col>
          <Col xs md lg className="my-auto text-center">
            <Card.Img src="https://logo.clearbit.com/apple.com" />
          </Col>

          <Col xs={5} md={4} lg={4} className="my-auto text-success">
            <Card.Text>184.56</Card.Text>
            <Card.Text>
              <i className="fa fa-arrow-up"></i> 2.24 (1.23%)
            </Card.Text>
            <Card.Text>2024-02-22 11:12:33</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col className="text-muted text-center">
            <small>Market is Open</small>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Current;
