// src/components/ProductCard.jsx
// import React from "react";
// import "./ProductCard.css";

// const ProductCard = ({ name, price, image }) => {
//   return (
//     <div className="product-card">
//       <img src={image} alt={name} className="product-img" />
//       <div className="product-info">
//         <h3>{name}</h3>
//         <p>Price: ₹{price}</p>
//         <button>View Details</button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductCard.css";

// const ProductCard = ({ id, name, price, image, rating }) => {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <div className="product-card">
//       <img src={image} alt={name} className="product-img" />
//       <div className="product-info">
//         <h3>{name}</h3>
//         <p>Price: ₹{price}</p>
//         <div className="stars">
//           {"★".repeat(rating)}{"☆".repeat(5 - rating)}
//         </div>
//         <button onClick={handleViewDetails}>View Details</button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ id, name, price, image, rating }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-img" />
      <div className="product-info">
        <h3>{name}</h3>
        <p>Price: ₹{price}</p>
        <div className="stars">
          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
        </div>
        <button onClick={handleViewDetails}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;




