"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import "../home.css";
import { CheckCircle2, ShoppingCart, Heart } from 'lucide-react'; // Make sure Heart is imported!

// IMPORT GLOBAL CONTEXTS AND DATABASE
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categoryDatabase } from "../../app/data/products";

// --- MOCK DATA FOR MARQUEE ---
const marqueeItems = [
  "New Customers Save 10% With Code: Entry69",
  "Get 10% Off On Selected Items",
  "Limited Time Offer: Fashion Sale You Can't Resist",
  "Free Shipping and Returns",
];

export default function BestSelling() {
  const sliderRef = useRef(null);

  // --- GLOBAL CONTEXTS ---
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // --- QUICK VIEW STATE ---
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // --- DYNAMICALLY LOAD PRODUCTS FROM DATABASE ---
  const bestSellersData = useMemo(() => {
    let allProducts = [];
    if (categoryDatabase) {
      Object.values(categoryDatabase).forEach(category => {
        if (category.products && category.products.length > 0) {
          allProducts = [...allProducts, ...category.products];
        }
      });
    }
    // Reverse the array so it shows different products than the Best Deals section
    return allProducts.reverse().slice(0, 8);
  }, []);

  // --- BUY NOW HANDLER (FIXED) ---
  const handleBuyNow = async (e) => {
    e.preventDefault();
    
    // Safety check: Make sure a product is actually selected before running
    if (!selectedProduct) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            // Changed from 'foundProduct' to 'selectedProduct'
            items: [{ ...selectedProduct, quantity: quantity }] 
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };

  // --- SLIDER NAVIGATION LOGIC ---
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // --- HANDLERS ---
  const openQuickView = (e, product, defaultImg) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setMainImage(defaultImg);
    setQuantity(1);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (e, product, qty = 1) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, qty); 
    alert(`Added "${product.title}" to cart!`);

    setIsQuickViewOpen(false);
  };

  // --- PREVENT SCROLLING WHEN MODAL IS OPEN ---
  useEffect(() => {
    if (isQuickViewOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isQuickViewOpen]);

  return (
    <>
      <section className="best-selling-wrapper relative">
        
        {/* =========================================
            1. INFINITE MARQUEE BAR
        ========================================= */}
        <div className="marquee-container">
          <div className="marquee-track">
            {[...Array(3)].map((_, arrayIndex) => (
              <React.Fragment key={arrayIndex}>
                {marqueeItems.map((item, index) => (
                  <div className="marquee-item" key={`${arrayIndex}-${index}`}>
                    <span className="marquee-dot"></span>
                    {item}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* =========================================
            2. MAIN SPLIT LAYOUT
        ========================================= */}
        <div className="bs-layout">
          
          {/* --- LEFT SIDE: PRODUCT SLIDER --- */}
          <div className="bs-left-column">
            <h2 className="bs-title">Best Selling Products</h2>
            
            <div className="bs-slider-container">
              {/* Custom Navigation Arrows */}
              <button className="bs-nav-arrow bs-left-arrow" onClick={scrollLeft}>&#10094;</button>
              <button className="bs-nav-arrow bs-right-arrow" onClick={scrollRight}>&#10095;</button>

              {/* The Draggable/Scrollable Track */}
              <div className="bs-slider-track" ref={sliderRef}>
                {bestSellersData.map((product) => {
                  const displayImg = product.image || 'https://placehold.co/300x300/f8f9fa/a1a1aa?text=Image';

                  return (
                    <div className="bs-card group relative block" key={product.id}>
                      
                      <div className="bs-img-box relative">
                        <div className="bs-badges absolute top-2 left-2 z-20 flex flex-col gap-1">
                          {product.id % 3 === 0 && <span className="badge new-badge">NEW</span>}
                          {product.isSale && <span className="badge sale-badge">SALE</span>}
                        </div>

                        {/* LINK WRAPS ONLY THE IMAGE */}
                        <Link href={`/product/${product.id}`} className="block w-full h-full">
                          <div className="bs-img" style={{ backgroundImage: `url(${displayImg}), linear-gradient(#f8f8f8, #f8f8f8)` }}></div>
                        </Link>
                        
                        {/* Hover Side Icons OUTSIDE Link */}
                        <div className="bs-action-stack absolute right-2 top-2 z-30 flex flex-col gap-2">
                          
                          {/* FUNCTIONAL WISHLIST BUTTON */}
                          <button 
                            className="bs-icon-btn flex items-center justify-center transition-colors bg-white shadow-sm rounded w-8 h-8 hover:text-[#E63946]"
                            title="Add to Wishlist"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product);
                            }}
                            style={{ color: isInWishlist(product.id) ? '#E63946' : 'inherit' }}
                          >
                            <Heart size={14} fill={isInWishlist(product.id) ? "#E63946" : "none"} color={isInWishlist(product.id) ? "#E63946" : "currentColor"} />
                          </button>
                          
                          
                          
                          {/* FUNCTIONAL QUICK VIEW BUTTON */}
                          <button 
                            className="bs-icon-btn flex items-center justify-center transition-colors bg-white shadow-sm rounded w-8 h-8 hover:text-[#E63946]"
                            title="Quick View"
                            onClick={(e) => openQuickView(e, product, displayImg)}
                          >
                            &#128065;
                          </button>
                        </div>

                        {/* FUNCTIONAL ADD TO CART BUTTON OUTSIDE Link */}
                        <button 
                          className="bs-add-to-cart-btn absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm font-bold transition-colors hover:bg-[#E63946] flex items-center justify-center gap-2 z-30"
                          onClick={(e) => handleAddToCart(e, product, 1)}
                        >
                          <ShoppingCart size={14} /> Add To Cart
                        </button>
                      </div>

                      <div className="bs-info-box mt-3">
                        <Link href={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                          <h4 className="bs-product-name group-hover:text-[#E63946] transition-colors line-clamp-2 text-sm font-medium">{product.title}</h4>
                        </Link>
                        <div className="bs-prices mt-1">
                          <span className="bs-current-price text-[#E63946] font-bold">${product.price?.toFixed(2)}</span>
                          {product.oldPrice && <span className="bs-old-price text-gray-400 line-through text-xs ml-2">${product.oldPrice?.toFixed(2)}</span>}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: PROMO BANNER --- */}
          <div className="bs-right-column">
            <div className="bs-banner relative" style={{ backgroundImage: `url('/home/jew.png'), linear-gradient(#e0e0e0, #e0e0e0)` }}>
              <div className="bs-banner-overlay absolute inset-0 bg-black bg-opacity-20"></div>
              
              <div className="bs-banner-content relative z-10 p-6 flex flex-col justify-center h-full text-white">
                <span className="bs-banner-subtitle text-xs font-bold tracking-wider mb-2">SALE UP TO 30%</span>
                <h3 className="bs-banner-title text-3xl font-bold mb-3 leading-tight">
                  Luxury & Elegance
                </h3>
                <p className="bs-banner-desc text-sm mb-6">Explore our latest collection of elegant gold designs...</p>
                <Link href="/category/jewelry">
                  <button className="bs-banner-btn bg-white text-black px-6 py-2 text-sm font-bold uppercase hover:bg-[#E63946] hover:text-white transition-colors rounded">
                    SHOP NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================
          QUICK VIEW MODAL OVERLAY
      ==================================== */}
      {isQuickViewOpen && selectedProduct && (
        <div 
          className="model-quick fixed inset-0 flex items-center justify-center bg-opacity-60"
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
                <span className="text-[13px] text-gray-500">({selectedProduct.rating > 0 ? '1' : '0'})</span>
              </div>
              
              <div className="text-[#28A745] text-[13px] font-medium mb-4 flex items-center gap-1">
                <CheckCircle2 size={14} /> Instock
              </div>
              
              <div className="text-[13px] text-gray-500 mb-4">Product Code: {selectedProduct.sku || `id1-${selectedProduct.id}`}</div>
              
              <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.shortDesc || "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
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
                  
                  <button
                    onClick={(e) => handleAddToCart(e, selectedProduct, quantity)}
                    className="flex-1 h-10 bg-white text-[#E63946] border border-gray-200 font-bold rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase text-[12px]"
                  >
                    <ShoppingCart size={14} /> ADD TO CART
                  </button>
                </div>
                
                {/* Buy Now Button - Correctly calls handleBuyNow */}
                <button className="w-full h-10 bg-black text-white font-bold rounded hover:bg-[#E63946] transition-colors uppercase text-[12px]" onClick={handleBuyNow}>
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