"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import "../home.css";
import { CheckCircle2, ShoppingCart, Heart } from 'lucide-react'; 

// IMPORT GLOBAL CONTEXTS AND DATABASE
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { categoryDatabase } from "../../app/data/products";

export default function BestDealsCarousel() {
  const [timeLeft, setTimeLeft] = useState({ days: 293, hours: 7, minutes: 17, seconds: 19 });

  // --- GLOBAL CONTEXTS ---
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // --- QUICK VIEW STATE ---
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  // --- DYNAMICALLY LOAD PRODUCTS FROM DATABASE ---
  const dealsData = useMemo(() => {
    let allProducts = [];
    if (categoryDatabase) {
      Object.values(categoryDatabase).forEach(category => {
        if (category.products && category.products.length > 0) {
          allProducts = [...allProducts, ...category.products];
        }
      });
    }
    return allProducts.slice(0, 10);
  }, []);

  // --- BUY NOW HANDLER ---
  const handleBuyNow = async (e) => {
    e.preventDefault();
    
    // Guard: Don't do anything if no product is selected
    if (!selectedProduct) return; 

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            // FIXED: Send the 'selectedProduct' from the modal instead of the empty 'foundProduct'
            items: [{ ...selectedProduct, quantity: quantity }] 
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else { minutes = 59; if (hours > 0) hours--; else { hours = 23; days--; } }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- DRAG TO SCROLL LOGIC ---
  const carouselRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    carouselRef.current.classList.add("dragging");
    startX.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    carouselRef.current.classList.remove("dragging");
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    carouselRef.current.classList.remove("dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
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

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isQuickViewOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isQuickViewOpen]);

  return (
    <>
      <section className="best-deals-wrapper relative">
        <div className="deals-layout full-width-layout">
          
          {/* --- LEFT BANNER: COUNTDOWN --- */}
          <div className="deals-countdown-box">
            <h2 className="deals-title">Today's Best Deals</h2>
            <p className="deals-description">
              Don't miss today's hottest deals! Enjoy exclusive discounts on trending products before the timer runs out.
            </p>
            <div className="timer-container">
              <div className="timer-block"><span className="time-num">{timeLeft.days}</span><span className="time-label">DAYS</span></div>
              <div className="timer-block"><span className="time-num">{timeLeft.hours}</span><span className="time-label">HRS</span></div>
              <div className="timer-block"><span className="time-num">{timeLeft.minutes}</span><span className="time-label">MINS</span></div>
              <div className="timer-block"><span className="time-num">{timeLeft.seconds}</span><span className="time-label">SECS</span></div>
            </div>
            <button className="see-all-btn">See All</button>
          </div>

          {/* --- RIGHT AREA: DRAGGABLE PRODUCT CAROUSEL --- */}
          <div 
            className="deals-carousel" 
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {dealsData.map((product) => {
              const img1 = product.image || 'https://placehold.co/300x300/f8f9fa/a1a1aa?text=Image+1';
              const img2 = product.thumbnails && product.thumbnails.length > 1 ? product.thumbnails[1] : img1;

              return (
                <div className="deal-card relative block group" key={product.id}>
                  
                  <div className="deal-image-area relative">
                    {product.isSale && <span className="deal-sale-badge absolute top-2 left-2 z-20">SALE</span>}
                    
                    {/* LINK ONLY WRAPS THE IMAGES NOW */}
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      <div className="deal-img primary-img" style={{ backgroundImage: `url(${img1}), linear-gradient(#f8f8f8, #f8f8f8)` }}></div>
                      <div className="deal-img secondary-img" style={{ backgroundImage: `url(${img2})` }}></div>
                    </Link>
                    
                    {/* ACTION BUTTONS ARE OUTSIDE THE LINK SO CLICKS WORK */}
                    <div className="deal-action-stack absolute right-2 top-2 z-30 flex flex-col gap-2">
                      <button 
                        className="icon-btn flex items-center justify-center transition-colors bg-white shadow-sm rounded w-8 h-8 hover:text-[#E63946]" 
                        title="Add to Wishlist"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                      >
                        <Heart 
                          size={14} 
                          fill={isInWishlist(product.id) ? "#E63946" : "none"} 
                          color={isInWishlist(product.id) ? "#E63946" : "currentColor"}
                        />
                      </button>
                      
                      <button 
                        className="icon-btn flex items-center justify-center bg-white shadow-sm rounded w-8 h-8 hover:text-[#E63946]" 
                        title="Quick View" 
                        onClick={(e) => openQuickView(e, product, img1)}
                      >
                        &#128065;
                      </button>
                    </div>
                  </div>

                  <div className="deal-info mt-3">
                    <Link href={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                      <h3 className="deal-name group-hover:text-[#E63946] transition-colors line-clamp-2 text-sm font-medium">{product.title}</h3>
                    </Link>
                    <div className="deal-prices mt-1">
                      <span className="price-current text-[#E63946] font-bold">${product.price?.toFixed(2)}</span>
                      {product.oldPrice && <span className="price-old text-gray-400 line-through text-xs ml-2">${product.oldPrice?.toFixed(2)}</span>}
                    </div>
                  </div>

                  {/* FUNCTIONAL ADD TO CART BUTTON */}
                  <div className="na-add-to-cart-drawer mt-auto pt-3" style={{zIndex:20, position:"relative"}}>
                    <button
                      className="na-add-to-cart-btn w-full bg-black text-white py-2 text-sm font-bold transition-colors hover:bg-[#E63946] rounded flex justify-center items-center gap-2"
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