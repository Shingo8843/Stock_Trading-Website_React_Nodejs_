import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function SellStockModal({
  show,
  onHide,
  wallet,
  ticker,
  currentPrice,
  quantityOwned,
  onSell,
}) {
  const [quantityToSell, setQuantityToSell] = useState(0);
  const [total, setTotal] = useState(0);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantityToSell(newQuantity);
    setTotal(newQuantity * currentPrice);
  };

  const handleSellClick = () => {
    if (quantityToSell > 0 && quantityToSell <= quantityOwned) {
      onSell(ticker, quantityToSell, total);
      onHide();
    } else {
      alert("Cannot sell more than you own.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sell {ticker}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Price: {currentPrice.toFixed(2)}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity Owned: {quantityOwned}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity to Sell</Form.Label>
            <Form.Control
              type="number"
              value={quantityToSell}
              onChange={handleQuantityChange}
              min={0}
              max={quantityOwned}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Total Return: {total.toFixed(2)}</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSellClick}>
          Sell
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SellStockModal;
