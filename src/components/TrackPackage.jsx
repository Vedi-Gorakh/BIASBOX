import React from "react";
import "./TrackPackage.css";

const TrackPackage = () => {
  return (
    <div className="track-container">
      <h2 className="track-title">TRACK YOUR PACKAGE</h2>
      <div className="track-form-wrapper">
        {/* Left Side */}
        <div className="track-left">
          <label>ORDER NUMBER</label>
          <input type="text" placeholder="Enter order number" />
          <label>EMAIL OR MOBILE NUMBER</label>
          <input type="text" placeholder="Enter email or phone" />
          <button className="track-btn">TRACK</button>
        </div>

        {/* Divider */}
        <div className="track-divider"></div>

        {/* Right Side */}
        <div className="track-right">
          <label>TRACKING NUMBER</label>
          <input type="text" placeholder="Enter tracking number" />
          <button className="track-btn">TRACK</button>
        </div>
      </div>
    </div>
  );
};

export default TrackPackage;
