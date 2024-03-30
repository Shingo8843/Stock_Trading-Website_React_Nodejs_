import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";

function ShareModal({
  show,
  onHide,
  onShare,
  image,
  headline,
  source,
  datetime,
  summary,
  url,
}) {
  const date = new Date(datetime * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  function onShare(type) {
    switch (type) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
            headline
          )}`
        );
        break;
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      default:
        break;
    }
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h1 className="share-modal-title">{source}</h1>
          <p className="share-modal-date">{date}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{headline}</h5>
        <p>{summary}</p>
        <p>
          For more details, click{" "}
          <a href={url} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
        <Container className=" share-container">
          <Row className="justify-content-md-left">
            <Col md={12} className="text-start">
              <h6 className="share-modal-title">Share</h6>
            </Col>
          </Row>
          <Row className="justify-content-md-left">
            <Col xs="auto">
              <Button
                variant="primary"
                className="share-modal-button text-start"
                onClick={() => onShare("twitter")}
              >
                <FontAwesomeIcon icon={faTwitter} />
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="primary"
                className="share-modal-button text-start"
                onClick={() => onShare("facebook")}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
            </Col>
          </Row>
          {/* href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} */}
          {/* href=
          {`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
            headline
          )}`} */}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ShareModal;
