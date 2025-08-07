import React, { useState } from 'react';
import './DeliveryForm.css';
import { useNavigate } from 'react-router-dom';

export default function DeliveryForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    // Save address to localStorage (or send to backend later)
    localStorage.setItem("deliveryAddress", JSON.stringify(form));

    // Go to Razorpay payment page
    navigate("/payment");
  };

  return (
    <div className="delivery-container">
      <h2>Enter Delivery Details</h2>
      <form onSubmit={handleNext}>
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
        <input type="text" name="city" placeholder="City" required onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
}
