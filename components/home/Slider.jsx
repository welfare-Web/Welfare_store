"use client";
import React, { useState, useEffect } from "react";
import "../home.css";

const slides = [
  {
    id: 1,
    subtitle: "TECH COLLECTION",
    title: "Best Mobile &\nLaptop Collections",
    description: "Upgrade your digital life with the latest technology",
    buttonText: "SHOP NOW",
    bgColor: "#9cbcd2",
    textColor: "#ffffff",
    bgImage: "/home/mobilelap.png",
  },
  {
    id: 2,
    subtitle: "LIMITED TIME SALE",
    title: "Elegant Fashion for\nMen & Women",
    description: "Upgrade your wardrobe with stylish outfits for every occasion",
    buttonText: "SHOP NOW",
    bgColor: "#db0038",
    textColor: "#ffffff",
    bgImage: "/home/fashion11.png",
  },
  {
    id: 3,
    subtitle: "NEW ARRIVALS",
    title: "Women's Sterling\nSilver Jewelry",
    description: "Three-piece women's jewelry set\nmade entirely from pure silver",
    buttonText: "SHOP NOW",
    bgColor: "#1c1819",
    textColor: "#ffffff",
   bgImage: "/home/gold.png",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Optional: Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="hero-slider-container">
      <div
        className="hero-slider-wrapper"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            /* Add 'active' class to trigger child animations */
            className={`hero-slide ${currentSlide === index ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.bgImage})`,backgroundColor: slide.bgColor, color: slide.textColor }}
          >
            <div className="slide-content-layout container">
              <div className="slide-text">
                <h4 className="slide-subtitle">{slide.subtitle}</h4>
                <h2 className="slide-title">
                  {slide.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
                <p className="slide-description">
                  {slide.description.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <button className="slide-btn">{slide.buttonText}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-arrow left-arrow" onClick={prevSlide}>&#10094;</button>
      <button className="nav-arrow right-arrow" onClick={nextSlide}>&#10095;</button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}