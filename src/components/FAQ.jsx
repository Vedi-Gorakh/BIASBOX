import React from "react";
import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-container">
      <h2>FAQ</h2>
      <ol className="faq-list">
        <li>
          <strong>What type of K-pop merchandise do you sell?</strong><br />
          We offer albums, light-sticks, photo-cards, posters, apparel, accessories, and more for various K-pop groups.
        </li>
        <li>
          <strong>Are your products official or fan-made?</strong><br />
          We sell both official and fan-made merchandise. Each product is clearly labeled.
        </li>
        <li>
          <strong>How do I place an order?</strong><br />
          Simply browse the product page, select your item and quantity, and click "Add to Cart." Then proceed to checkout.
        </li>
        <li>
          <strong>Can I modify or cancel my order after placing it?</strong><br />
          Yes, but only within 12 hours of placing the order. Contact our support team quickly.
        </li>
        <li>
          <strong>How can I track my order?</strong><br />
          Once shipped, you'll receive an email with your tracking number and a link to track your package.
        </li>
      </ol>
    </div>
  );
};

export default FAQ;
