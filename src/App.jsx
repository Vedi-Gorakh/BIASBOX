
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// import Footer from './components/Footer';
// import './App.css'
// import TrackPackage from './components/TrackPackage';
// import FAQ from './components/FAQ';
// import AuthForm from './components/AuthForm';
// import Profile from './components/Profile';
// import Cart from './components/Cart';
// import ProductDetail from './components/ProductDetail';
// function App() {

//   return (
//     <>
//       <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/track" element={<TrackPackage />} />
//         <Route path="/faq" element={<FAQ />} />
//         <Route path="/authform" element={<AuthForm />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/product/:id" element={<ProductDetail />} />


//         {/* Add more routes here if needed */}

//       </Routes>
//       <Footer />
//     </Router>
//     </>
//   )
// }

// export default App
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; // moved to pages
import About from './components/About';
import Footer from './components/Footer';
import './App.css';
import TrackPackage from './components/TrackPackage';
import FAQ from './components/FAQ';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import AllProducts from './components/AllProducts';
import DeliveryForm from './components/DeliveryForm';
import PaymentPage from './components/PaymentPage';
import OrderConfirmation from './components/OrderConfirmation';
import { CartProvider } from "./components/CartContext";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <Router basename="/BIASBOX">
      <CartProvider>

        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/track" element={<TrackPackage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/authform" element={<AuthForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/checkout" element={<DeliveryForm />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />

        </Routes>

        <Footer />
        <ToastContainer />
      </CartProvider>

    </Router>
  );
}

export default App;

