import React from "react";
import { Card } from "react-bootstrap";

function News({ image, headline, source, datetime, summary, url, onClick }) {
  const defaultImage = "https://via.placeholder.com/150";
  return (
    <Card
      onClick={() =>
        onClick({ image, headline, source, datetime, summary, url })
      }
      style={{ cursor: "pointer" }}
    >
      <Card.Body>
        <Card.Img src={image || defaultImage} />
        <Card.Title>{headline}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default News;
