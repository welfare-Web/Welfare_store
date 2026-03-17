"use client";
import React from "react";
import Link from "next/link"; // <-- 1. Import Next.js Link
import "../home.css";

// --- DATA ---
const features = [
  {
    id: 1,
    title: "Free Shipping",
    subtitle: "On order over $49.00",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    ),
  },
  {
    id: 2,
    title: "Money Guarantee",
    subtitle: "Within 30 days for an exchange",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><line x1="12" y1="18" x2="12" y2="14"></line><line x1="12" y1="10" x2="12" y2="6"></line></svg>
    ),
  },
  {
    id: 3,
    title: "Online Support",
    subtitle: "24 hours a day, 7 days a week",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1v-3a2 2 0 0 1 2-2h1zM3 19a2 2 0 0 0 2 2h1v-3a2 2 0 0 0-2-2H3z"></path><path d="M12 2v2"></path></svg>
    ),
  },
  {
    id: 4,
    title: "Flexible Payment",
    subtitle: "Pay with Multiple Credit Cards",
    icon: (
      <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line><path d="M7 15h.01"></path><path d="M11 15h2"></path></svg>
    ),
  },
];

// --- 2. Add 'slug' to map correctly to your categoryDatabase URLs ---
const categories = [
  { id: 1, title: "Jewelry", imgSrc: "/home/jewel.png", gridClass: "grid-item-1", slug: "jewelry" },
  { id: 2, title: "Smartphone", imgSrc: "/home/mobile.jpg", gridClass: "grid-item-2", slug: "smartphone-laptop" },
  { id: 4, title: "Fashion", imgSrc: "/home/fashion1.png", gridClass: "grid-item-4", slug: "fashion" },
  { id: 6, title: "Laptops", imgSrc: "/home/laptop.jpg", gridClass: "grid-item-6", slug: "smartphone-laptop" },
];

export default function FeaturesAndCategories() {
  return (
    <section className="fnc-section">
      <div className="container">
        
        {/* --- Top Features Row --- */}
        <div className="features-row">
          {features.map((feature) => (
            <div key={feature.id} className="feature-box">
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-text">
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-subtitle">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Masonry-style Category Grid --- */}
        <div className="category-grid">
          {categories.map((cat) => (
            // --- 3. Replaced <a> tag with Next.js <Link> ---
            <Link href={`/category/${cat.slug}`} key={cat.id} className={`category-card ${cat.gridClass}`}>
              <div 
                className="category-bg" 
                style={{ backgroundImage: `url(${cat.imgSrc})` }}
              ></div>
              <div className="category-btn-wrapper">
                <span className="category-btn">{cat.title}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}