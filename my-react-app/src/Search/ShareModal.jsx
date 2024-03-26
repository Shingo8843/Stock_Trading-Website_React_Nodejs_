import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-solid-svg-icons"; // Ensure you have the correct icons imported

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
          {source} <small className="text-muted">{date}</small>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={image}
          alt="News"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <h5>{headline}</h5>
        <p>{summary}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <FontAwesomeIcon icon={faXmark} /> Close
        </Button>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faFacebook} /> Share on Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${url}&text=${encodeURI(
            headline
          )}`}
          className="btn btn-info"
        >
          <FontAwesomeIcon icon={faTwitter} /> Tweet
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default ShareModal;
