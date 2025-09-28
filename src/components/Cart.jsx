// src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserEmail(user.email);
      const cartKey = `cart-${user.email}`;
      const cartData = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCartItems(cartData);
    }
  }, []);

  const updateCartStorage = (items) => {
    localStorage.setItem(`cart-${userEmail}`, JSON.stringify(items));
    setCartItems(items);
  };

  const updateQuantity = (id, quantity) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: parseInt(quantity) || 1 } : item
    );
    updateCartStorage(updated);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCartStorage(updated);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!userEmail) {
    return <p className="empty-cart">Please sign in to view your cart.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div className="cart-card" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <p className="cart-name">{item.name}</p>
              <p className="cart-color">Color: {item.color || "N/A"}</p>
              <div className="cart-quantity">
                <label>Qty: </label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                />
              </div>
            </div>
            <div className="cart-actions">
              <p className="cart-price">₹{item.price * item.quantity}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="cart-summary">
        <p><strong>Total:</strong> ₹{total}</p>
        <button onClick={() => navigate("/checkout")} className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}


