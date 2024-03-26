import React from "react";
import { Modal, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const date = new Date(datetime * 1000).toLocaleDateString();

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {source} - {date}
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
        <Container className="d-flex ">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
              headline
            )}`}
            className="btn btn-info"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ShareModal;
