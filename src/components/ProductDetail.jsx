import { extendedProducts } from "./data";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = extendedProducts.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please sign in to add items to your cart.");
      return;
    }

    const cartKey = `cart-${user.email}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Check if product already in cart
    const existingIndex = existingCart.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    toast(
      <div>
        <strong>{product.name}</strong> added to cart!
        <button
          onClick={() => navigate("/cart")}
          style={{
            marginLeft: "10px",
            background: "#5E1675",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Cart
        </button>
      </div>,
      {
        autoClose: 3000,
        style: { width: "400px" },
      }
    );
  };

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} className="detail-img" />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
        <div className="stars">
          {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
        </div>
        <p className="description">{product.description}</p>
        <button
          className="buy-btn"
          onClick={() => {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
              alert("🚫 Please sign in to continue to checkout.");
              return;
            }

            navigate("/checkout");
          }}
        >
          Buy Now
        </button>

        <button className="cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div className="navigation-buttons">
          <button className="back-btn" onClick={() => navigate("/")}>← Home</button>
          <button className="back-btn" onClick={() => navigate("/all-products")}>← All Products</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

