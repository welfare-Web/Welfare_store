'use client'
import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, RefreshCcw, X } from 'lucide-react';
import { useState } from 'react';

// IMPORT THE CUSTOM HOOK
import { useCart } from './../../context/CartContext';


export default function CartPage() {
  // PULL STATE AND FUNCTIONS FROM GLOBAL CONTEXT
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false); // To show a loading state

  const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subTotal;
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Send cartItems to our backend route
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect the user to the secure Stripe Checkout URL
        window.location.href = data.url;
      } else {
        alert("Something went wrong with the payment gateway.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#111] pb-20">
      
      {/* BREADCRUMBS */}
      <div className="py-10 text-center text-[13px] text-gray-500 flex items-center justify-center gap-2 border-b border-gray-100">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={12} className="text-gray-400" />
        <span className="text-black">Shopping Cart</span>
      </div>

      <div className="max-w-[1400px] w-[90%] mx-auto mt-12">
        
        <h1 className="text-[32px] font-semibold mb-8">Shopping Cart</h1>

        <div className="overflow-x-auto mb-10">
          <table className="w-full min-w-[800px] border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider text-left border-b border-gray-200">
                <th className="py-4 px-6 w-32 text-center">Image</th>
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6 w-48 text-center">Quantity</th>
                <th className="py-4 px-6 w-32 text-right">Unit Price</th>
                <th className="py-4 px-6 w-32 text-right">Total</th>
              </tr>
            </thead>
            
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 text-base">
                    Your shopping cart is empty!
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4 px-6 flex justify-center">
                      <div className="w-[70px] h-[70px] border border-gray-200 p-1 flex items-center justify-center">
                        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Link href={`/product/${item.id}`} className="text-[#111] hover:text-[#E63946] transition-colors font-medium block mb-1">
                        {item.title}
                      </Link>
                      <span className="text-gray-500 text-[12px]">- Model: {item.sku || `id1-${item.id}`}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-center h-[38px]">
                        <input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                          className="w-14 border border-gray-300 text-center outline-none text-[13px]"
                          min="1"
                        />
                        <button 
                          className="w-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                          title="Update Quantity"
                        >
                          <RefreshCcw size={14} />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 bg-[#E63946] text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                          title="Remove"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-[14px]">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right text-[14px] font-medium text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            
            {cartItems.length > 0 && (
              <tfoot>
                <tr className="border-b border-gray-200">
                  <td colSpan="4" className="py-4 px-6 text-right font-bold text-[13px] text-gray-800">
                    Sub-Total
                  </td>
                  <td className="py-4 px-6 text-right text-[14px]">
                    ${subTotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="py-4 px-6 text-right font-bold text-[13px] text-gray-800">
                    Total
                  </td>
                  <td className="py-4 px-6 text-right text-[14px]">
                    ${total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {cartItems.length > 0 && (
          <div>
            <h2 className="text-[24px] font-semibold mb-2">What would you like to do next?</h2>
            <p className="text-[13px] text-gray-500 mb-6">
              Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.
            </p>

            <div className="space-y-3 mb-10 max-w-full">
              <div className="border border-gray-200 rounded-[3px] p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[13px] text-gray-700 font-medium">Estimate Shipping & Taxes</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
              <div className="border border-gray-200 rounded-[3px] p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-[13px] text-gray-700 font-medium">Use Coupon Code</span>
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link 
                href="/category/smartphone-tablet" 
                className="w-full sm:w-auto px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-black text-[13px] font-bold rounded-[3px] transition-colors text-center"
              >
                Continue Shopping
              </Link>
              <button 
                className={`w-full sm:w-auto px-10 py-3.5 bg-black text-white text-[13px] font-bold rounded-[3px] transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E63946]'}`}
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}