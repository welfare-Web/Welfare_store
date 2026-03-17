'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from local storage on startup
  useEffect(() => {
    const savedWishlist = localStorage.getItem('ecommerce_wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecommerce_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Toggle function: If it's there, remove it. If it's not, add it.
  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const isAlreadyLiked = prevItems.some((item) => item.id === product.id);
      
      if (isAlreadyLiked) {
        return prevItems.filter((item) => item.id !== product.id); // Remove
      } else {
        return [...prevItems, product]; // Add
      }
    });
  };

  // Helper function to check if a product is currently liked
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}