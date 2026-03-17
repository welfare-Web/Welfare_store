"use client";
import React from "react";
import "./home.css";

export default function Footer() {
  const brands = [
    { name: "Samsung", img: "/logos/Apple.png" },
    { name: "ThinkPad", img: "/logos/Dell.png" },
    { name: "vivo", img: "/logos/Hp.png" },
    { name: "Huawei", img: "/logos/Think.png" },
    { name: "SONY", img: "/logos/Moto.png" },
    { name: "HiKOKI", img: "/logos/Asus.png" },
    { name: "LG", img: "/logos/Samsung.png" },
  ];


  return (
    <footer className="footer-wrapper">
      
      {/* --- TOP ROW: BRANDS --- */}
      <div className="footer-brands-section">
        <div className="container footer-brands-flex">
          {brands.map((brand, index) => (
            <div className="brand-logo-placeholder" key={index}>
              {/* Replace src with your actual brand images */}
              <img src={brand.img} alt={brand.name} title={brand.name} />
            </div>
          ))}
        </div>
      </div>

      {/* --- MAIN FOOTER --- */}
      <div className="footer-main-section">
        <div className="container footer-grid">
          
          {/* Column 1: Company Info */}
          <div className="footer-col footer-col-info">
            <div className="footer-logo">
              <h2 className="logo-text">WELFARE HEALTHTECH<span className="logo-triangle"></span></h2>
            </div>
            <p className="footer-address">Gf. 379-1, SS pushpam Complex, Bharadhi street, Opp. Gowri theatre, 5-Roads, Salem – 636 004</p>
            <p className="footer-phone"> +91 95147 44844, +91 99626 36458</p>
            <a href="mailto:entry@support.com" className="footer-email">info@welfarehealthtechslm.com</a>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/category/jewelry">Shopping Cart</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter & Social */}
          <div className="footer-col footer-col-newsletter">
            <h4 className="footer-newsletter-title">Join Our Newsletter And Get $50 Discount For Your First Order</h4>
            
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address..." required className="newsletter-input" />
              <button type="submit" className="newsletter-btn">
                {/* Arrow up-right SVG */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </form>

            <div className="footer-socials">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">📷</a> {/* Replace with actual Instagram SVG if needed */}
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">♪</a> {/* Replace with actual TikTok SVG if needed */}
              <a href="#" className="social-icon">▶</a>
            </div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM COPYRIGHT & PAYMENTS --- */}
      <div className="footer-bottom-section">
        <div className="container">
          <p className="copyright-text">So Entry © 2026. All Rights Reserved. Designed by WelfareHealthTech.Com</p>
        </div>
      </div>
      
    </footer>
  );
}