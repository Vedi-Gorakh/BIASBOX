import React, { useState, useEffect, useRef } from "react";
import { extendedProducts } from "./data"; // this has all 20+
import ProductCard from "../components/ProductCard";
import "./AllProducts.css"; // Create this CSS file for styling
import { useSearchParams, useLocation } from "react-router-dom";

const AllProducts = () => {
    // const [search, setSearch] = useState("");
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const categoryFilter = searchParams.get("category")?.toLowerCase();
    const artistFilter = searchParams.get("artist")?.toLowerCase();

    const [inputValue, setInputValue] = useState(search);
    const location = useLocation();
    const searchInputRef = useRef(null);

    // Focus search input if navigated from Navbar
    useEffect(() => {
        if (location.state?.focusSearch) {
            searchInputRef.current?.focus();
        }
    }, [location]);



    const filteredProducts = extendedProducts.filter((item) => {
        const matchesInput =
            item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.category.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.artist.toLowerCase().includes(inputValue.toLowerCase());

        const matchesCategory = categoryFilter
            ? item.category.toLowerCase() === categoryFilter
            : true;

        const matchesArtist = artistFilter
            ? item.artist.toLowerCase() === artistFilter
            : true;

        return matchesInput && matchesCategory && matchesArtist;
    });



    return (
        <div className="all-products-container">
            <h1 className="all-products-title">All Products</h1>

            <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Search by name, category, or artist..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            




            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <ProductCard key={item.id} {...item} />
                    ))
                ) : (
                    <p className="no-results">No matching products found.</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
