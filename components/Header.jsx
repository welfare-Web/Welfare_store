"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ShoppingCart, Search } from 'lucide-react';
import { useRouter } from "next/navigation";
import "./home.css";

// IMPORT YOUR GLOBAL CONTEXTS AND DATABASE
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { categoryDatabase } from "../app/data/products";

export default function Header() {
  const router = useRouter();

  // --- GLOBAL STATE ---
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  
  // --- LOCAL STATE ---
  const [isMounted, setIsMounted] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [liveResults, setLiveResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Ref to detect clicks outside the search bar
  const searchWrapperRef = useRef(null);

  // Prevent hydration mismatch errors on reload
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safely calculate totals
  const totalCartItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalWishlistItems = wishlistItems?.length || 0;

  // --- PRE-LOAD ALL PRODUCTS ONCE FOR FAST SEARCHING ---
  const allProducts = useMemo(() => {
    let products = [];
    if (categoryDatabase) {
      Object.entries(categoryDatabase).forEach(([catSlug, catData]) => {
        if (catData.products) {
          // Attach the category title so we can display "Fashion > Shirt" in the dropdown
          const prodsWithCategory = catData.products.map(p => ({
            ...p,
            categoryTitle: catData.title 
          }));
          products = [...products, ...prodsWithCategory];
        }
      });
    }
    return products;
  }, []);

  // --- LIVE SEARCH LOGIC ---
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setLiveResults([]);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    
    // Find top 5 matches
    const matches = allProducts.filter(product => 
      product.title?.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery) ||
      product.tags?.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Limit to 5 results so dropdown isn't massive

    setLiveResults(matches);
  }, [searchQuery, allProducts]);

  // Handle clicking outside the search to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- SEARCH HANDLER (Hitting Enter) ---
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setIsSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // --- CLICKING A LIVE RESULT ---
  const handleLiveResultClick = (productId) => {
    setSearchQuery("");
    setIsSearchFocused(false);
    router.push(`/product/${productId}`);
  };

  return (
    <>
    <header className="site-header">
      {/* Main Middle Header */}
      <div className="main-header">
        <div className="container main-header-inner">
          
          {/* Logo */}
          <div className="logo-section">
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h1 className="logo-text">WELFARE HEALTHTECH<span className="dot"></span></h1>
            </Link>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-icon">&#9993;</div>
            <div className="contact-details">
              <span className="email">info@welfarehealthtechslm.com</span>
              <span className="phone">+91 95147 44844, +91 99626 36458</span>
            </div>
          </div>

          {/* SEARCH BAR W/ LIVE DROPDOWN */}
          <div className="search-wrapper" style={{ position: 'relative', flex: 1, maxWidth: '500px' }} ref={searchWrapperRef}>
            <form className="search-bar" onSubmit={handleSearchSubmit} style={{ width: '100%', margin: 0 }}>
              
              <input 
                type="text" 
                placeholder="Search..." 
                className="search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <button type="submit" className="search-btn"><Search size={14} /></button>
            </form>

            {/* LIVE AUTOCOMPLETE DROPDOWN */}
            {isSearchFocused && searchQuery.trim() !== "" && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #eaeaea',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  zIndex: 9999,
                  marginTop: '5px',
                  overflow: 'hidden'
                }}
              >
                {liveResults.length > 0 ? (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {liveResults.map((product) => (
                      <li 
                        key={product.id}
                        onClick={() => handleLiveResultClick(product.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 20px',
                          borderBottom: '1px solid #f5f5f5',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {/* Tiny Product Thumbnail */}
                        <div style={{ width: '30px', height: '30px', marginRight: '15px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img 
                            src={product.image || 'https://placehold.co/50x50'} 
                            alt="" 
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                          />
                        </div>
                        
                        {/* Product Title format (e.g. "Fashion > Babydoll...") */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '13px', color: '#555' }}>
                            <span style={{ color: '#999', marginRight: '5px' }}>{product.categoryTitle} &gt;</span>
                            {product.title}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: '#999' }}>
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ICONS (Wishlist & Cart) */}
          <div className="header-icons">
            <Link href="/wishlist" className="icon-wrapper" style={{ position: 'relative', textDecoration: 'none', color: 'inherit' }}>
              &#9825;
              {isMounted && totalWishlistItems > 0 && (
                <span className="cart-badge" style={{ position: 'absolute', top: '-8px', right: '-10px', backgroundColor: '#E63946' }}>
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link href="/cart" className="icon-wrapper cart-icon" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ShoppingCart size={14} /> <span className="cart-text">Cart</span>
              <span className="cart-badge" style={{ backgroundColor: '#E63946' }}>
                {isMounted ? totalCartItems : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="nav-bar">
        <div className="container nav-bar-inner">
          <div 
            className="categories-dropdown-wrapper"
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <div className="categories-btn" onClick={() => setIsCategoryOpen(!isCategoryOpen)} style={{ cursor: 'pointer' }}>
              <span className="hamburger">&#9776;</span>
              Shop By Categories
              <span className="arrow-down">&#9662;</span>
            </div>
            
            <ul 
              className="categories-dropdown-menu"
              style={{ display: isCategoryOpen ? 'block' : 'none', position: 'absolute', zIndex: 50 }}
            >
              <li>
                <Link href="/category/smartphone-tablet" onClick={() => setIsCategoryOpen(false)}>
                  <span className="cat-icon">&#128241;</span> Smartphone & Laptop
                  <span className="cat-arrow">&#10095;</span>
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" onClick={() => setIsCategoryOpen(false)}>
                  <span className="cat-icon">&#128085;</span> Fashion
                  <span className="cat-arrow">&#10095;</span>
                </Link>
              </li>
              <li>
                <Link href="/category/jewelry" onClick={() => setIsCategoryOpen(false)}>
                  <span className="cat-icon">&#128715;</span> Jewelry
                  <span className="cat-arrow">&#10095;</span>
                </Link>
              </li>
            </ul>
          </div>

          <nav className="main-menu">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </nav>

          <div className="special-offers">
            <span className="star-icon">&#10022;</span> 
          </div>
        </div>
      </div>
    </header>
    </>
  );
}