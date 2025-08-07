
import React from "react";
import LightstickGallery from "../components/LightstickGallery";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import { products } from "./data";
import { useNavigate } from "react-router-dom";

// Ensure this has correct export

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <LightstickGallery />
      <div className="home-container">
        <h1 className="home-title">HOME</h1>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
        <div className="view-all-container">
          <button className="B1" onClick={() => navigate("/all-products")}>
            VIEW ALL
          </button>

        </div>
      </div>
    </>
  );
};

export default Home;
