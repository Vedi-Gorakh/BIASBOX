import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-subtitle">We are more than just a merch store — we’re a fan community.</p>

      <section className="about-section">
        <h2> Who We Are</h2>
        <p>
          At <strong>BIASBOX</strong>, we celebrate fans and fandom. Born from the love of K-pop and creative culture,
          we curate merchandise that connects you with your <em>bias</em>.
        </p>
      </section>

      <section className="about-section">
        <h2> Our Mission</h2>
        <p>
          To empower fans with stylish, meaningful, and affordable merch that reflects their passions.
        </p>
      </section>

      <section className="about-section">
        <h2> What We Offer</h2>
        <ul>
          <li>K-pop Inspired Merchandise (Tote Bags, Lightsticks, Apparel)</li>
          <li>Artist-Specific Collections</li>
          <li>Seasonal Drops & Limited Editions</li>
          <li>100% fan-verified designs</li>
        </ul>
      </section>

      <section className="about-section">
        <h2> Why Choose Us?</h2>
        <ul>
          <li>Affordable pricing with premium quality</li>
          <li>Designed by fans, for fans</li>
          <li>Fast shipping & secure checkout</li>
          <li>Sustainable packaging</li>
        </ul>
      </section>

      <section className="about-section">
        <h2> Join the BIASBOX Family</h2>
        <p>
          Whether you're a new fan or a forever stan, BIASBOX has something for everyone.
          Join us and wear your bias with pride.
        </p>
      </section>
    </div>
  );
};

export default About;
