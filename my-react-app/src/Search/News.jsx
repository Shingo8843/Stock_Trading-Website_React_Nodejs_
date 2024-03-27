import React from "react";
import { Card } from "react-bootstrap";

function News({ image, headline, source, datetime, summary, url, onClick }) {
  const defaultImage = "https://via.placeholder.com/150";
  return (
    <Card
      className="news-card"
      onClick={() =>
        onClick({ image, headline, source, datetime, summary, url })
      }
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="news-body">
        <Card.Img className="news-img" src={image || defaultImage} />
        <Card.Text className="news-title">{headline}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default News;
