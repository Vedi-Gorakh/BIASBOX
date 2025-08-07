// src/components/Footer.jsx
import React from "react";
import "./Footer.css";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section about">
        <p>
          The word <strong>BIASBOX™</strong> is true combination of Hallyu (Korean cultural wave) with wide range of quality latest trend products of K-fashion, K-POP, K-beauty and Japanese creative lifestyle products. Giving true experience of Korean products shopping.
        </p>
        <p><strong>Address :</strong><br />A-33, Second Floor, Block-A,<br />Wazirpur Industrial Area, WWWW-4524</p>
        <p><strong>Email :</strong> biasbox.india@gmail.com</p>
      </div>

      <div className="footer-section newsletter">
        <p><strong>Newsletter :</strong><br />Sign up for exclusive offers, original stories, events and more.</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Your Mail" />
          <button><FaArrowRight /></button>
        </div>
      </div>

      <div className="footer-section links">
        <p><strong>Links :</strong></p>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms and choice</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
