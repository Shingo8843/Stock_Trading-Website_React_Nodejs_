import React, { useState } from "react";
function MyComponent() {
  const [name, setName] = useState("No Name");
  const [quantity, setQuantity] = useState(0);
  const [comments, setComments] = useState([]);
  const [payment, setPayment] = useState("Credit Card");
  const [shipping, setShipping] = useState("Standard");
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleQuantityChange(e) {
    setQuantity(e.target.value);
  }
  function handleCommentChange(e) {
    setComments(e.target.value);
  }
  function handlePaymentChange(e) {
    setPayment(e.target.value);
  }
  function handleShippingChange(e) {
    setShipping(e.target.value);
  }
  //   const updateName = () => {
  //     setName("SpongeBob");
  //   };
  return (
    // <div>
    //   <p>My name is {name}</p>
    //   <button onClick={updateName}>Set Name</button>
    // </div>
    <div>
      <input value={name} onChange={handleChange} />
      <p>Name: {name}</p>

      <input value={quantity} onChange={handleQuantityChange} />
      <p>Quantity: {quantity}</p>

      <textarea
        value={comments}
        onChange={handleCommentChange}
        placeholder="Enter your comments here"
      ></textarea>
      <p>Comments: {comments}</p>

      <select value={payment} onChange={handlePaymentChange}>
        <option value="Credit Card">Credit Card</option>
        <option value="Debit Card">Debit Card</option>
        <option value="Net Banking">Net Banking</option>
        <option value="PayPal">PayPal</option>
      </select>
      <p>Payment: {payment}</p>

      <input
        type="radio"
        value="Standard"
        checked={shipping === "Standard"}
        onChange={handleShippingChange}
      />
      <label>Standard</label>
      <input
        type="radio"
        value="Express"
        checked={shipping === "Express"}
        onChange={handleShippingChange}
      />
      <label>Express</label>
      <p>Shipping: {shipping}</p>
    </div>
  );
}
export default MyComponent;
