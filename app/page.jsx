import React from "react";
import Slider from "../components/home/Slider";
import { CheckCircle2, ShoppingCart } from 'lucide-react';
import FeaturesAndCategories from "../components/home/FeaturesAndCategories";
import BestDealsCarousel from "../components/home/BestDealsCarousel";
import NewArrival from "../components/home/NewArrival";
import BestSelling from "../components/home/BestSelling";

export default function HomePage() {
  return (
    <div className="bg-white">
      <Slider />
      <FeaturesAndCategories />
      <BestDealsCarousel />
      <NewArrival />
      <BestSelling />
    </div>
  );
}