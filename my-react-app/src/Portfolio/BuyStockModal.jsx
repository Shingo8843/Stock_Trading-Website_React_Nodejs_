import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function BuyStockModal({ show, onHide, wallet, ticker, currentPrice, onBuy }) {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(currentPrice);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setTotal(newQuantity * currentPrice);
  };

  const handleBuyClick = () => {
    console.log("Buying", quantity, "shares of", ticker, "for", total);
    onBuy(ticker, quantity, total);

    onHide(); // Hide the modal after buying
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Buy {ticker}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Price: {currentPrice.toFixed(2)}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Money in Wallet: {wallet.toFixed(2)}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total: {total.toFixed(2)}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleBuyClick}>
          Buy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BuyStockModal;
