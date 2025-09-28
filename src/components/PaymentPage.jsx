// src/components/PaymentPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem(`cart-${user?.email}`)) || [];
  const address = JSON.parse(localStorage.getItem("deliveryAddress"));

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("✅ Razorpay script loaded");
      setIsRazorpayLoaded(true);
    };
    script.onerror = () => console.error("❌ Failed to load Razorpay script");
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    if (!isRazorpayLoaded || typeof window.Razorpay === "undefined") {
      alert("Razorpay not loaded. Please wait a few seconds and try again.");
      return;
    }

    const options = {
      key: "rzp_test_TsJUtDM01EQDNx",
      amount: totalAmount * 100, // in paise
      currency: "INR",
      name: "BiasBox Store",
      description: "Order Payment",
      image: "/logo.png",
      handler: function (response) {
        alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
        localStorage.removeItem(`cart-${user.email}`);
        localStorage.removeItem("deliveryAddress");
        navigate("/order-confirmation");
      },
      prefill: { name: `${user.firstName} ${user.lastName}`, email: user.email },
      method: { upi: true, card: true, netbanking: true, wallet: true, paylater: true },
      theme: { color: "#5E1675" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Payment</h2>
      <p><strong>Total: ₹{totalAmount}</strong></p>
      <button
        onClick={handlePayment}
        style={{
          padding: "12px 30px",
          fontSize: "16px",
          backgroundColor: "#5E1675",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "30px",
          marginBottom: "30px"
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

