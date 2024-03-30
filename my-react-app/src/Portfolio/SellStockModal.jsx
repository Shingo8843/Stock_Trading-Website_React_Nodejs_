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
      console.log("Selling", quantityToSell, "shares of", ticker, "for", total);
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
          {/* <Form.Group className="mb-3">
            <Form.Label>Quantity Owned: {quantityOwned}</Form.Label>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantityToSell}
              onChange={handleQuantityChange}
              min={0}
              // max={quantityOwned}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label>Total: {total.toFixed(2)}</Form.Label>
          </Form.Group> */}
          {quantityToSell > quantityOwned && (
            <Form.Text className="text-danger">
              You cannot sell the stocks that you don't have.
            </Form.Text>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <span>Total: {total.toFixed(2)}</span>
        <Button
          variant="success"
          onClick={handleSellClick}
          disabled={quantityToSell <= 0 || quantityOwned < quantityToSell}
        >
          Sell
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SellStockModal;
