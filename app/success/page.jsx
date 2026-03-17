'use client'
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from './../../context/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();
  
  // Use a ref to guarantee the cart only clears exactly ONE time
  const hasCleared = useRef(false);

  useEffect(() => {
    if (!hasCleared.current) {
      clearCart();
      hasCleared.current = true; // Mark as cleared so it never runs again
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- EMPTY dependency array is the key to stopping the infinite loop!

  return (
    <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white max-w-lg w-full rounded-lg shadow-xl p-10 text-center border-t-4 border-[#28A745]">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#28A745]" />
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been received and is currently being processed. You will receive an email confirmation shortly.
        </p>

        {/* Order Details Mockup */}
        <div className="bg-gray-50 rounded p-4 mb-8 text-sm text-left">
          <div className="flex justify-between border-b border-gray-200 pb-2 mb-2">
            <span className="text-gray-500">Order Number:</span>
            <span className="font-bold text-gray-900">#ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date:</span>
            <span className="font-bold text-gray-900">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/category/smartphone-tablet" 
            className="flex-1 bg-[#E63946] hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
          >
            <ShoppingBag size={16} /> Continue Shopping
          </Link>
          <Link 
            href="/" 
            className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 rounded transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
          >
            Back to Home <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}