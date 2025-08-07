
// import './Navbar.css';
// import { Link } from 'react-router-dom';
// import { FaSearch, FaUser, FaShoppingCart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";


// import React, { useState } from "react";
// function Navbar() {
//   const navigate = useNavigate();
//   const [showCategories, setShowCategories] = useState(false);
//   const [showArtists, setShowArtists] = useState(false);
//   const token = localStorage.getItem("token");

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     alert("Logged out");
//     navigate('/authform'); // Or use navigate('/')
//   };

//   const [showSearchBar, setShowSearchBar] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   const categories = [
//     'Tote Bags',
//     'Lightsticks',
//     'Bottles',
//     'Hoodie',
//     'Violet',
//     'Keychain',
//   ];
//   const artists = [
//     'BTS',
//     'EXO',
//     'SEVENTEEN',
//     'BLACKPINK',
//     'TWICE',
//     'STRAY KIDS',
//     'ATEEZ',

//   ];
//   return (

//     <div className="navbar-container">
//       {/* Top Section */}
//       <div className="navbar-top">
//         <div className="logo">BIASBOX</div>
//         <div className="top-right">
//           <FaSearch
//             className="icon"
//             onClick={() => {
//               navigate("/all-products", { state: { focusSearch: true } });
//             }}
//             style={{ cursor: "pointer" }}
//           />


//           <Link to="/cart">
//             <FaShoppingCart className="icon" />
//           </Link>

//           {token ? (
//             <button onClick={logout} className="signin-link">
//               <span className="signin-text">LOGOUT</span>
//             </button>
//           ) : (
//             <Link to="/authform" className="signin-link">
//               <span className="signin-text">SIGN IN</span>
//             </Link>
//           )}
//           <Link to="/profile">
//             <FaUser className="icon" />
//           </Link>

//         </div>
//       </div>

//       <hr
//         style={{
//           border: 'none',
//           height: '1px',
//           backgroundColor: '#5E1675',
//           margin: '0',
//         }}
//       />

//       {/* Bottom Section */}
//       <div className="navbar-bottom">
//         <div className="nav-links">
//           <Link to="/">HOME</Link>
//           <div
//             className="dropdown-wrapper"
//             onClick={() => setShowCategories(!showCategories)}
//           >
//             <span className="dropdown-toggle">
//               CATEGORIES {showCategories ? <FaChevronUp /> : <FaChevronDown />}
//             </span>
//             {showCategories && (
//               <div className="dropdown-menu">
//                 {categories.map((cat, idx) => (
//                   <div
//                     key={idx}
//                     className="dropdown-item"
//                     onClick={() => {
//                       navigate(`/all-products?category=${encodeURIComponent(cat)}`);
//                       setShowCategories(false); // close dropdown
//                     }}
//                   >
//                     {cat}
//                   </div>

//                 ))}

//               </div>
//             )}

//           </div>
//           <Link to="/about">ABOUT US</Link>
//           <div
//             className="dropdown-wrapper"
//             onClick={() => setShowArtists(!showArtists)}
//           >
//             <span className="dropdown-toggle">
//               ARTISTS {showArtists ? <FaChevronUp /> : <FaChevronDown />}
//             </span>
//             {showArtists && (
//               <div className="dropdown-menu">
//                 {artists.map((cat, idx) => (
//                   <div
//                     key={idx}
//                     className="dropdown-item"
//                     onClick={() => {
//                       navigate(`/all-products?artist=${encodeURIComponent(cat)}`);
//                       setShowArtists(false); // close dropdown
//                     }}
//                   >
//                     {cat}
//                   </div>

//                 ))}
//               </div>
//             )}
//           </div>
//           <Link to="/track">TRACK YOUR PACKAGE</Link>
//         </div>
//         <Link to="/faq">
//           <button className="faq-btn">FAQ</button>
//         </Link>
//       </div>

//     </div>

//   );
// }

// export default Navbar;
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch, FaUser, FaShoppingCart,
  FaChevronDown, FaChevronUp, FaBars, FaTimes
} from 'react-icons/fa';
import React, { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [showArtists, setShowArtists] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out");
    navigate('/authform');
  };

  const categories = ['Tote Bags', 'Lightsticks', 'Bottles', 'Hoodie', 'Violet', 'Keychain'];
  const artists = ['BTS', 'EXO', 'SEVENTEEN', 'BLACKPINK', 'TWICE', 'STRAY KIDS', 'ATEEZ'];

  return (
    <div className="navbar-container">
      {/* Top Section */}
      <div className="navbar-top">
        <div className="logo">BIASBOX</div>



        <div className="top-right">
          <FaSearch className="icon" onClick={() => navigate("/all-products", { state: { focusSearch: true } })} />
          <Link to="/cart"><FaShoppingCart className="icon" /></Link>
          {token ? (
            <button onClick={logout} className="signin-link"><span className="signin-text">LOGOUT</span></button>
          ) : (
            <Link to="/authform" className="signin-link"><span className="signin-text">SIGN IN</span></Link>
          )}
          <Link to="/profile"><FaUser className="icon" /></Link>
        </div>
      </div>

      <hr style={{ border: 'none', height: '1px', backgroundColor: '#5E1675', margin: '0' }} />

      {/* Bottom Section */}
      {/* Bottom Section */}
<div className="navbar-bottom">
  {/* Desktop Menu */}
  <div className="nav-links-desktop">
    <Link to="/">HOME</Link>
    <div className="dropdown-wrapper" onClick={() => setShowCategories(!showCategories)}>
      <span className="dropdown-toggle">
        CATEGORIES {showCategories ? <FaChevronUp /> : <FaChevronDown />}
      </span>
      {showCategories && (
        <div className="dropdown-menu">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="dropdown-item"
              onClick={() => {
                navigate(`/all-products?category=${encodeURIComponent(cat)}`);
                setShowCategories(false);
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>

    <Link to="/about">ABOUT US</Link>

    <div className="dropdown-wrapper" onClick={() => setShowArtists(!showArtists)}>
      <span className="dropdown-toggle">
        ARTISTS {showArtists ? <FaChevronUp /> : <FaChevronDown />}
      </span>
      {showArtists && (
        <div className="dropdown-menu">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              className="dropdown-item"
              onClick={() => {
                navigate(`/all-products?artist=${encodeURIComponent(artist)}`);
                setShowArtists(false);
              }}
            >
              {artist}
            </div>
          ))}
        </div>
      )}
    </div>

    <Link to="/track">TRACK YOUR PACKAGE</Link>
    <Link to="/faq"><button className="faq-btn">FAQ</button></Link>
  </div>

  {/* Mobile Icon */}
  <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />

  {/* Sliding Menu (Mobile) */}
  <div className={`slide-menu ${menuOpen ? "open" : ""}`}>
    <FaTimes className="close-icon" onClick={() => setMenuOpen(false)} />

    <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>

    <div className="dropdown-wrapper" onClick={() => setShowCategories(!showCategories)}>
      <span className="dropdown-toggle">
        CATEGORIES {showCategories ? <FaChevronUp /> : <FaChevronDown />}
      </span>
      {showCategories && (
        <div className="dropdown-menu">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="dropdown-item"
              onClick={() => {
                navigate(`/all-products?category=${encodeURIComponent(cat)}`);
                setMenuOpen(false);
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>

    <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT US</Link>

    <div className="dropdown-wrapper" onClick={() => setShowArtists(!showArtists)}>
      <span className="dropdown-toggle">
        ARTISTS {showArtists ? <FaChevronUp /> : <FaChevronDown />}
      </span>
      {showArtists && (
        <div className="dropdown-menu">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              className="dropdown-item"
              onClick={() => {
                navigate(`/all-products?artist=${encodeURIComponent(artist)}`);
                setMenuOpen(false);
              }}
            >
              {artist}
            </div>
          ))}
        </div>
      )}
    </div>

    <Link to="/track" onClick={() => setMenuOpen(false)}>TRACK YOUR PACKAGE</Link>
    <Link to="/faq" onClick={() => setMenuOpen(false)}><button className="faq-btn">FAQ</button></Link>
  </div>
</div>


    </div>
  );
}

export default Navbar;




