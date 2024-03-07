import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

function News({ image, title, description, url }) {
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Link href={url} target="_blank">
          Read More
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

News.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default News;
