"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../home.css";
// IMPORT FIXED: Added the 'Heart' icon so your Wishlist button doesn't crash
import { CheckCircle2, ShoppingCart, Heart } from 'lucide-react';

// IMPORT GLOBAL CONTEXTS AND DATABASE
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categoryDatabase } from "../../app/data/products";

// Define the static banner data for each tab since it's not in the main database
const bannerData = {
  'fashion': { subtitle: "Street Fashion", title: "Beautiful\nAnd Dynamic", btnText: "Shop Now", bgImg: "/home/fas.jpg" },
  'smartphone-laptop': { subtitle: "20% Off when buying online", title: "Galaxy S24 Ultra", btnText: "Shop Now", bgImg: "/home/tech-banner.png" },
  'jewelry': { subtitle: "Shine With Style", title: "Exclusive Jewelry Collection", btnText: "Shop Now", bgImg: "/home/j.jpg" }
};

export default function NewArrivals() {
  const [activeTab, setActiveTab] = useState("fashion");
  
  // --- GLOBAL CONTEXTS ---
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // --- QUICK VIEW STATE ---
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // --- DYNAMIC DATA SELECTION ---
  // Safely grab the first 8 products from the selected category in the database
  const currentCategoryData = categoryDatabase[activeTab]?.products || [];
  const displayProducts = currentCategoryData.slice(0, 8); 
  const currentBanner = bannerData[activeTab];

  // --- HANDLERS ---
  const openQuickView = (e, product, defaultImg) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setMainImage(defaultImg);
    setQuantity(1);
    setIsQuickViewOpen(true);
  };

  // ADDED: The missing Add To Cart handler
  const handleAddToCart = (e, product, qty = 1) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, qty);
    alert(`Added "${product.title}" to cart!`);
    setIsQuickViewOpen(false);
  };

  // FIXED: Uses 'selectedProduct' instead of 'foundProduct'
  const handleBuyNow = async (e) => {
    e.preventDefault();
    
    // Safety check
    if (!selectedProduct) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            items: [{ ...selectedProduct, quantity: quantity }] 
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };

  // --- PREVENT SCROLLING WHEN MODAL IS OPEN ---
  useEffect(() => {
    if (isQuickViewOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isQuickViewOpen]);

  return (
    <>
      <section className="new-arrivals-section relative">
        <div className="container">
          
          {/* --- HEADER & TABS --- */}
          <div className="na-header">
            <h2 className="na-title">New Arrivals</h2>
            <div className="na-tabs">
              <button className={`na-tab ${activeTab === "fashion" ? "active" : ""}`} onClick={() => setActiveTab("fashion")}>Fashion</button>
              <button className={`na-tab ${activeTab === "smartphone-laptop" ? "active" : ""}`} onClick={() => setActiveTab("smartphone-laptop")}>Smartphone & Laptop</button>
              <button className={`na-tab ${activeTab === "jewelry" ? "active" : ""}`} onClick={() => setActiveTab("jewelry")}>Jewelry</button>
            </div>
          </div>

          {/* --- ACCURATE 5-COLUMN GRID --- */}
          <div className="na-grid-wrapper" key={activeTab}>
            
            {/* Banner takes 2 columns, 1 row */}
            {currentBanner && (
              <div className="na-banner-card" style={{ backgroundImage: `url(${currentBanner.bgImg}), linear-gradient(#333, #333)` }}>
                <div className="na-banner-content">
                  <span className="na-banner-subtitle">{currentBanner.subtitle}</span>
                  <h3 className="na-banner-title">
                    {currentBanner.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>{line}<br/></React.Fragment>
                    ))}
                  </h3>
                  <Link href={`/category/${activeTab}`}>
                    <button className="na-banner-btn">{currentBanner.btnText}</button>
                  </Link>
                </div>
              </div>
            )}

            {/* Dynamic Product Cards */}
            {displayProducts.map((product) => {
              const displayImg = product.image || 'https://placehold.co/300x300/f8f9fa/a1a1aa?text=Image';

              return (
                <div className="na-product-card group relative block" key={product.id}>
                  
                  {/* 1. THE MAGIC STRETCHING BACKGROUND */}
                  <div className="na-card-bg"></div>

                  <div className="na-product-img-box relative">
                    <div className="na-badges absolute top-2 left-2 z-20 flex flex-col gap-1">
                      {product.id % 2 !== 0 && <span className="badge new-badge">NEW</span>}
                      {product.isSale && <span className="badge sale-badge">SALE</span>}
                    </div>
                    
                    {/* LINK WRAPS ONLY THE IMAGE */}
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      <div className="na-product-img" style={{ backgroundImage: `url(${displayImg}), linear-gradient(#f8f8f8, #f8f8f8)` }}></div>
                    </Link>
                    
                    {/* ACTION BUTTONS OUTSIDE LINK */}
                    <div className="na-action-stack absolute right-2 top-2 z-30 flex flex-col gap-2">
                      <button 
                        className="na-icon-btn flex items-center justify-center transition-colors hover:text-[#E63946]" 
                        title="Add to Wishlist"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
                      >
                        <Heart size={14} fill={isInWishlist(product.id) ? "#E63946" : "none"} color={isInWishlist(product.id) ? "#E63946" : "currentColor"} />
                      </button>
                      
                      {/* QUICK VIEW BUTTON */}
                      <button 
                        className="na-icon-btn flex items-center justify-center transition-colors hover:text-[#E63946]" 
                        title="Quick View"
                        onClick={(e) => openQuickView(e, product, displayImg)}
                      >
                        &#128065;
                      </button>
                    </div>
                  </div>

                  <div className="na-product-info">
                    <Link href={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                      <h4 className="na-product-name group-hover:text-[#E63946] transition-colors line-clamp-2">{product.title}</h4>
                    </Link>
                    <div className="na-prices">
                      <span className="na-current-price text-[#E63946] font-bold">${product.price?.toFixed(2)}</span>
                      {product.oldPrice && <span className="na-old-price text-gray-400 line-through text-xs ml-2">${product.oldPrice?.toFixed(2)}</span>}
                    </div>
                  </div>

                  {/* 2. THE EXTENDING DRAWER WITH RED BUTTON */}
                  <div className="na-add-to-cart-container">
                    <button 
                      className="na-add-to-cart-btn"
                      onClick={(e) => handleAddToCart(e, product, 1)}
                    >
                      <ShoppingCart size={14} /> Add To Cart
                    </button>
                  </div>
                  
                </div>
              );
            })}
            
          </div>
        </div>
      </section>

      {/* ====================================
          QUICK VIEW MODAL OVERLAY
      ==================================== */}
      {isQuickViewOpen && selectedProduct && (
        <div 
          className="model-quick fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
          style={{ zIndex: 999999 }} // Highest priority
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div 
            className="bg-white rounded-sm shadow-2xl flex flex-col md:flex-row max-w-4xl w-[90%] max-h-[90vh] overflow-y-auto relative p-8 gap-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-5 text-gray-400 hover:text-black text-2xl font-light z-10 transition-colors"
              onClick={() => setIsQuickViewOpen(false)}
            >
              ✕
            </button>

            {/* --- Modal Left: Images --- */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-[320px] aspect-square flex items-center justify-center mb-6">
                <img 
                  src={mainImage} 
                  alt="Main Product" 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              
              {selectedProduct.thumbnails && (
                <div className="flex justify-center gap-3 w-full">
                  {selectedProduct.thumbnails.map((thumb, idx) => (
                    <div 
                      key={idx} 
                      className={`w-[50px] h-[50px] flex-shrink-0 border p-1 cursor-pointer transition-colors flex items-center justify-center ${mainImage === thumb ? 'border-gray-400' : 'border-gray-200 hover:border-gray-300'}`}
                      onClick={() => setMainImage(thumb)}
                    >
                      <img src={thumb} alt="thumbnail" className="max-w-[90%] max-h-[90%] object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* --- Modal Right: Details --- */}
            <div className="flex-1 flex flex-col">
              <Link href={`/product/${selectedProduct.id}`} style={{textDecoration: 'none'}}>
                <h2 className="text-[24px] font-normal text-gray-800 mb-2 hover:text-[#E63946] transition-colors cursor-pointer leading-tight">
                  {selectedProduct.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 text-sm">★★★★★</span>
                <span className="text-[13px] text-gray-500">({selectedProduct.rating > 0 ? '1' : '0'}) Reviews</span>
              </div>
              
              <div className="text-[#28A745] text-[13px] font-medium mb-4 flex items-center gap-1">
                <CheckCircle2 size={14} /> Instock
              </div>
              
              <div className="text-[13px] text-gray-500 mb-4">Product Code: {selectedProduct.sku || `id1-${selectedProduct.id}`}</div>
              
              <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.shortDesc || "High quality product from our exclusive collection. Perfect for your daily needs."}
              </p>
              
              <div className="text-[28px] text-[#E63946] font-semibold mb-6 flex items-center">
                ${selectedProduct.price?.toFixed(2)}
                {selectedProduct.oldPrice && (
                  <span className="text-[16px] text-gray-400 line-through font-normal ml-3">${selectedProduct.oldPrice?.toFixed(2)}</span>
                )}
              </div>

              <div className="text-[13px] font-medium mb-2 text-black">Quantity:</div>
              <div className="flex flex-col gap-3 mt-auto">
                <div className="flex items-center gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-200 rounded w-[100px] h-10 bg-gray-50">
                    <button className="flex-1 text-lg text-gray-500 hover:text-black transition-colors" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                    <input type="text" value={quantity} readOnly className="w-8 text-center text-black outline-none text-[13px] font-medium" />
                    <button className="flex-1 text-lg text-gray-500 hover:text-black transition-colors" onClick={() => setQuantity((q) => q + 1)}>+</button>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, selectedProduct, quantity)}
                    className="flex-1 h-10 bg-white text-[#E63946] border border-gray-200 font-bold rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase text-[12px]"
                  >
                    <ShoppingCart size={14} /> ADD TO CART
                  </button>
                </div>
                
                {/* Buy Now Button */}
                <button 
                  className="w-full h-10 bg-black text-white font-bold rounded hover:bg-[#E63946] transition-colors uppercase text-[12px]" 
                  onClick={handleBuyNow}
                >
                  BUY NOW
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}