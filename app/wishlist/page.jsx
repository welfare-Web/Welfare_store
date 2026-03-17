'use client'
import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShoppingCart, HeartOff, Info } from 'lucide-react';

// IMPORT GLOBAL CONTEXTS
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function WishlistPage() {
  // Pull in the global states
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Handler to add item to cart directly from the wishlist
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    alert(`Added "${product.title}" to cart!`);
  };

  // Handler to remove item from wishlist
  const handleRemove = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#111] pb-20">
      
      {/* BREADCRUMBS & PAGE HEADER */}
      <div className="py-12 bg-gray-50 text-center border-b border-gray-200 mb-10">
        <h1 className="text-3xl font-light text-gray-900 mb-3">My Wishlist</h1>
        <p className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#E63946] transition-colors">Home</Link> 
          <ChevronRight size={14} /> 
          <span className="text-gray-900">Wishlist</span>
        </p>
      </div>

      <div className="max-w-[1400px] w-[90%] mx-auto mt-8">
        
        {/* Header showing total count */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-medium text-gray-800">
            Saved Items <span className="text-gray-400 text-base font-normal">({wishlistItems.length})</span>
          </h2>
        </div>

        {/* --- EMPTY STATE --- */}
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-gray-50 border border-dashed border-gray-300 rounded-[4px]">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <HeartOff size={32} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-medium text-gray-600 mb-2">Your wishlist is currently empty</h2>
            <p className="text-sm text-gray-500 mb-8 max-w-md text-center">
              Looks like you haven't saved any items yet. Explore our collections and click the heart icon to save your favorite products here!
            </p>
            <Link 
              href="/category/fashion" 
              className="bg-black hover:bg-[#E63946] text-white font-bold py-3 px-8 rounded transition-colors text-sm uppercase tracking-wide"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          
          /* --- WISHLIST GRID --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              // Ensure we have an image string to render (using a fallback if missing)
              const productImage = product.image || product.img || product.img1 || 'https://placehold.co/300x300/f8f9fa/a1a1aa?text=Product';
              const productPrice = parseFloat(product.price) || 0;
              const productOldPrice = product.oldPrice ? parseFloat(product.oldPrice) : null;

              return (
                <div key={product.id} className="border border-gray-200 rounded-[3px] p-5 relative transition-all hover:border-black hover:shadow-lg bg-white group flex flex-col h-full">
                  
                  {/* Remove from Wishlist Button (Top Right) */}
                  <button 
                    className="absolute top-4 right-4 z-10 bg-white border border-gray-100 shadow-sm rounded-full p-2 text-gray-400 hover:text-[#E63946] hover:border-[#E63946] transition-colors"
                    title="Remove from Wishlist"
                    onClick={(e) => handleRemove(e, product)}
                  >
                    <HeartOff size={16} />
                  </button>

                  {/* Product Sale Badge */}
                  {product.isSale && (
                    <span className="absolute top-4 left-4 z-10 bg-[#E63946] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                      SALE
                    </span>
                  )}

                  {/* Image & Link to PDP */}
                  <Link href={`/product/${product.id}`} className="block flex-1 flex flex-col">
                    <div className="aspect-square flex items-center justify-center mb-5 relative">
                      <img 
                        src={productImage} 
                        alt={product.title} 
                        className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    
                    <h4 className="text-[13px] text-gray-600 mb-2.5 leading-relaxed line-clamp-2 group-hover:text-[#E63946] transition-colors font-medium">
                      {product.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 mb-4 mt-auto">
                      <span className="text-[#E63946] text-[16px] font-bold">${productPrice.toFixed(2)}</span>
                      {productOldPrice && (
                        <span className="text-gray-400 text-[13px] line-through">${productOldPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button 
                      className="w-full bg-gray-50 hover:bg-black text-gray-800 hover:text-white border border-gray-200 hover:border-black font-bold py-3 text-[12px] uppercase rounded-[3px] transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingCart size={15} /> Add To Cart
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}