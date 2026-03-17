'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, Star, Flame, CheckCircle2, ShoppingCart, 
  Heart, Layers, Package, CircleDollarSign, Headset, ShieldCheck 
} from 'lucide-react';

// IMPORT YOUR DATABASE & CONTEXT
import { categoryDatabase } from '../../data/products';
import { useCart } from './../../../context/CartContext';
import { useWishlist } from './../../../context/WishlistContext';

export default function ProductDetailsPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // --- 1. DYNAMICALLY FIND PRODUCT & CATEGORY DATA ---
  const productId = parseInt(params?.id);
  
  let foundProduct = null;
  let foundCategorySlug = null;
  let foundCategoryTitle = null;
  let categoryBestsellers = [];
  
  // FIXED: Fallback is now an array to match your database structure so .map() works safely!
  let categoryPromoImage = [{ id: 1, img: "https://placehold.co/270x400/2b4541/ffffff?text=Promo+Banner" }]; 

  if (categoryDatabase) {
    for (const [slug, category] of Object.entries(categoryDatabase)) {
      const productMatch = category.products.find(p => p.id === productId);
      if (productMatch) {
        foundProduct = productMatch;
        foundCategorySlug = slug;
        foundCategoryTitle = category.title;
        // Grab the bestsellers and promo image specifically from this category!
        if (category.bestsellers) categoryBestsellers = category.bestsellers;
        if (category.promoImage) categoryPromoImage = category.promoImage;
        break;
      }
    }
  }

  // --- 2. STATES ---
  const [mainImage, setMainImage] = useState(foundProduct?.image || null);
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // Set initial images and colors once the product is found
  useEffect(() => {
    if (foundProduct) {
      setMainImage(foundProduct.image || null);
      setActiveColor(foundProduct.swatches && foundProduct.swatches.length > 0 ? foundProduct.swatches[0] : null);
    }
  }, [foundProduct]);

  // --- 3. RELATED PRODUCTS (Get 4 random products from the same category) ---
  const relatedProducts = foundCategorySlug 
    ? categoryDatabase[foundCategorySlug].products.filter(p => p.id !== productId).slice(0, 4)
    : [];

  // --- 4. HANDLERS ---
  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    if (type === 'inc') setQuantity(q => q + 1);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if(foundProduct) {
        addToCart(foundProduct, quantity);
        alert(`Added ${quantity}x ${foundProduct.title} to cart!`);
    }
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            items: [{ ...foundProduct, quantity: quantity }] 
        }),
      });

      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
    }
  };

  // --- 5. FALLBACK IF NOT FOUND ---
  if (!foundProduct) {
      return (
          <div className="flex justify-center items-center min-h-[50vh] text-2xl font-light text-gray-500">
              Product Not Found
          </div>
      )
  }

  // Safely get thumbnails
  const productThumbnails = foundProduct.thumbnails && foundProduct.thumbnails.length > 0 
    ? foundProduct.thumbnails 
    : [foundProduct.image];

  const productSwatches = foundProduct.swatches || [];

  return (
    <div className="min-h-screen bg-white font-sans text-[#111] pb-20">
      
      {/* BREADCRUMBS */}
      <div className="py-10 text-center text-[13px] text-gray-500 flex items-center justify-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={12} className="text-gray-400" />
        <Link href={`/category/${foundCategorySlug}`} className="hover:text-black transition-colors">{foundCategoryTitle}</Link>
        <ChevronRight size={12} className="text-gray-400" />
        <span className="text-black">{foundProduct.title}</span>
      </div>

      <div className="max-w-[1400px] w-[90%] mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* =========================================
            LEFT SIDEBAR 
        ========================================= */}
        <aside className="w-full lg:w-[270px] flex-shrink-0">
          
          {/* Promo Banner (FIXED: Using categoryPromoImage) */}
          {categoryPromoImage.map((item) => (
            <Link href={`/product/${item.id}`} key={item.id} className="block mb-10 group relative h-[400px] bg-[#2b4541] rounded-[3px] overflow-hidden cursor-pointer">
              <img src={item.img} alt="Promo" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white z-10">
                <p className="text-[13px] mb-2 tracking-wide drop-shadow-md">Exclusive discounts</p>
                <h3 className="text-[28px] font-bold leading-tight mb-5 uppercase drop-shadow-md">SALE UP TO<br/>20% OFF</h3>
                <button className="bg-white text-black px-6 py-3 text-[12px] font-bold rounded-[3px] uppercase group-hover:bg-[#E63946] group-hover:text-white transition-colors shadow-lg">Shop Now</button>
              </div>
            </Link>
          ))}

          {/* Bestsellers */}
          {categoryBestsellers.length > 0 && (
            <div className="mb-12">
              <h3 className="text-[18px] font-normal mb-5 pb-4 border-b border-gray-200">Bestsellers</h3>
              {categoryBestsellers.map((item) => (
                <Link href={`/product/${item.id}`} key={item.id} className="flex gap-4 mb-5 group block">
                  <div className="w-[70px] h-[70px] border border-gray-200 rounded-[3px] p-1 flex items-center justify-center flex-shrink-0 bg-white">
                    <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[13px] text-gray-600 mb-1 leading-snug group-hover:text-[#E63946] transition-colors line-clamp-2">{item.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#E63946]">${item.price.toFixed(2)}</span>
                      {item.oldPrice && <span className="text-[12px] text-gray-400 line-through">${item.oldPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Shipping Info */}
          <div className="mb-10">
            <h3 className="text-[18px] font-normal mb-6 pb-4 border-b border-gray-200">Shipping & Delivery</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Package size={24} strokeWidth={1.5} className="text-black mt-1" />
                <div><h4 className="text-[14px] font-semibold mb-1">Free Shipping</h4><p className="text-[12px] text-gray-500">Free Shipping for orders over $99</p></div>
              </div>
              <div className="flex items-start gap-4">
                <CircleDollarSign size={24} strokeWidth={1.5} className="text-black mt-1" />
                <div><h4 className="text-[14px] font-semibold mb-1">Money Guarantee</h4><p className="text-[12px] text-gray-500">Within 30 days for an exchange</p></div>
              </div>
              <div className="flex items-start gap-4">
                <Headset size={24} strokeWidth={1.5} className="text-black mt-1" />
                <div><h4 className="text-[14px] font-semibold mb-1">Online Support</h4><p className="text-[12px] text-gray-500">24 hours a day, 7 days a week</p></div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck size={24} strokeWidth={1.5} className="text-black mt-1" />
                <div><h4 className="text-[14px] font-semibold mb-1">Flexible Payment</h4><p className="text-[12px] text-gray-500">Pay with Multiple Credit Cards</p></div>
              </div>
            </div>
          </div>
        </aside>

        {/* =========================================
            MAIN CONTENT AREA
        ========================================= */}
        <main className="flex-1">
          
          {/* TOP SECTION: Gallery & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="w-full aspect-square border border-gray-200 rounded-[3px] p-5 flex items-center justify-center">
                <img src={mainImage} alt={foundProduct.title} className="max-w-[90%] max-h-[90%] object-contain" />
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {productThumbnails.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`w-[70px] h-[70px] flex-shrink-0 border rounded-[3px] p-1.5 cursor-pointer transition-colors ${mainImage === img ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`} 
                    onClick={() => setMainImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-[26px] font-normal mb-4">{foundProduct.title}</h1>
              
              <div className="flex items-center gap-3 text-[13px] text-gray-500 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= (foundProduct.rating || 0) ? "#ffb300" : "none"} color={s <= (foundProduct.rating || 0) ? "#ffb300" : "#d1d5db"} />)}
                </div>
                <span>{foundProduct.rating > 0 ? '1 review' : '0 reviews'}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[13px] text-[#E63946] mb-4">
                <Flame size={16} fill="currentColor" />
                <span>{foundProduct.sold || 0} sold. Only {foundProduct.stock || 0} remain</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-[13px] text-[#28A745] font-medium mb-5">
                <CheckCircle2 size={16} /><span>In Stock</span>
              </div>
              
              <ul className="text-[13px] text-gray-600 leading-relaxed mb-5 space-y-1">
                <li><span className="font-semibold text-black mr-1">Brand:</span> {foundProduct.brand}</li>
                <li><span className="font-semibold text-black mr-1">Product Code:</span> {foundProduct.sku || `id1-${foundProduct.id}`}</li>
                <li><span className="font-semibold text-black mr-1">Tags:</span> {foundProduct.subCategory || foundProduct.tags || 'General'}</li>
              </ul>
              
              <p className="text-[13px] text-gray-600 leading-relaxed pb-6 border-b border-gray-200 mb-5">
                {foundProduct.shortDesc} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
              
              <div className="text-[28px] font-semibold text-[#E63946] mb-5">
                  ${foundProduct.price.toFixed(2)}
                  {foundProduct.oldPrice && (
                    <span className="text-[16px] text-gray-400 line-through font-normal ml-3">${foundProduct.oldPrice.toFixed(2)}</span>
                  )}
              </div>

              {/* Swatches */}
              {productSwatches.length > 0 && (
                <div className="mb-6">
                  <span className="text-[12px] block mb-2.5"><span className="text-[#E63946]">*</span> Color</span>
                  <div className="flex gap-2.5">
                    {productSwatches.map((color, idx) => (
                      <div 
                        key={idx} 
                        className={`w-6 h-6 rounded-full cursor-pointer transition-transform border-2 ${activeColor === color ? 'scale-110 shadow-[0_0_0_1px_#ebebeb] border-transparent' : 'border-transparent'}`}
                        style={{backgroundColor: color, boxShadow: color === '#ffffff' ? 'inset 0 0 0 1px #e5e7eb' : ''}} 
                        onClick={() => setActiveColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="text-[12px] mb-2 font-medium">Quantity:</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border border-gray-200 rounded-[3px] w-[100px] h-[46px] bg-gray-50 flex-shrink-0">
                  <button className="flex-1 text-[18px] text-gray-500 hover:text-black" onClick={() => handleQuantity('dec')}>-</button>
                  <input type="text" value={quantity} readOnly className="w-8 text-center text-[14px] bg-transparent outline-none" />
                  <button className="flex-1 text-[18px] text-gray-500 hover:text-black" onClick={() => handleQuantity('inc')}>+</button>
                </div>
                
                <button className="flex-1 h-[46px] bg-white border border-gray-200 text-[#E63946] font-bold text-[13px] uppercase rounded-[3px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors" onClick={handleAddToCartClick}> 
                  <ShoppingCart size={16} /> Add To Cart 
                </button>
                
                <button 
                  className="w-[46px] h-[46px] flex items-center justify-center bg-white border border-gray-200 rounded-[3px] text-gray-500 hover:text-[#E63946] hover:border-[#E63946] transition-colors flex-shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(foundProduct); // Toggle the like!
                  }}
                >
                  <Heart 
                    size={18} 
                    strokeWidth={1.5} 
                    fill={isInWishlist(foundProduct.id) ? "#E63946" : "none"} 
                    color={isInWishlist(foundProduct.id) ? "#E63946" : "currentColor"}
                  />
                </button>
              </div>
              
              {/* Buy Now connected to Stripe */}
              <button className="w-full h-[48px] bg-black text-white font-bold text-[13px] uppercase rounded-[3px] hover:bg-[#E63946] transition-colors mb-6" onClick={handleBuyNow}>
                Buy Now
              </button>

              <div className="text-[12px] text-black leading-relaxed mb-5">
                Estimated Delivery: <span className="text-[#E63946]">{foundProduct.countdown ? 'Within 3 days' : 'Apr 30 - May 03'}</span><br />
                Free Shipping and Returns on all orders over $99.00
              </div>
              
              <div className="bg-gray-50 p-5 text-center rounded-[3px]">
                <p className="text-[12px] font-semibold mb-2.5">Guarantee safe & secure checkout</p>
                <div className="flex justify-center gap-1.5">
                  <div className="w-[35px] h-[22px] bg-[#111] rounded-[2px]"></div>
                  <div className="w-[35px] h-[22px] bg-[#0052FF] rounded-[2px]"></div>
                  <div className="w-[35px] h-[22px] bg-[#1A1F71] rounded-[2px]"></div>
                  <div className="w-[35px] h-[22px] bg-[#0079C1] rounded-[2px]"></div>
                  <div className="w-[35px] h-[22px] bg-[#FFB300] rounded-[2px]"></div>
                  <div className="w-[35px] h-[22px] bg-[#E53238] rounded-[2px]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* TABS */}
          <div className="mb-16">
            <div className="flex justify-center gap-8 border-b border-gray-200 mb-8">
              <button className={`pb-4 text-[16px] relative font-medium ${activeTab === 'description' ? 'text-black' : 'text-gray-500 hover:text-black'}`} onClick={() => setActiveTab('description')}>
                Description
                {activeTab === 'description' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>}
              </button>
              <button className={`pb-4 text-[16px] relative font-medium ${activeTab === 'reviews' ? 'text-black' : 'text-gray-500 hover:text-black'}`} onClick={() => setActiveTab('reviews')}>
                Reviews ({foundProduct.rating > 0 ? '1' : '0'})
                {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>}
              </button>
              <button className={`pb-4 text-[16px] relative font-medium ${activeTab === 'shipping' ? 'text-black' : 'text-gray-500 hover:text-black'}`} onClick={() => setActiveTab('shipping')}>
                Shipping Methods
                {activeTab === 'shipping' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>}
              </button>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-[3px] text-[13px] text-gray-600 leading-relaxed">
              {activeTab === 'description' && (
                <>
                  <h4 className="text-[15px] text-black font-semibold mb-4">Product Description</h4>
                  {foundProduct.longDesc ? (
                    foundProduct.longDesc.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))
                  ) : (
                    <p className="mb-4">{foundProduct.shortDesc} Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  )}
                  <br />
                  {foundProduct.features && foundProduct.features.length > 0 && (
                    <>
                      <h4 className="text-[15px] text-black font-semibold mb-4">Product Features</h4>
                      <ul className="list-disc pl-5 mb-5 space-y-2">
                        {foundProduct.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </>
                  )}
                </>
              )}
              
              {activeTab === 'reviews' && (
                <div className="py-4">
                   <p>{foundProduct.rating > 0 ? 'Excellent product quality. Highly recommended!' : 'There are no reviews yet for this product.'}</p>
                </div>
              )}
              
              {activeTab === 'shipping' && (
                <div className="py-2">
                  <h4 className="text-[15px] text-black font-semibold mb-4">Returns Policy</h4>
                  <p className="mb-4">You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error.</p>
                  <p className="mb-6">You should expect to receive your refund within four weeks of giving your package to the return shipper. This time period includes the transit time for us to receive your return from the shipper.</p>

                  <h4 className="text-[15px] text-black font-semibold mb-4">Shipping</h4>
                  <p className="mb-4">We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.</p>
                  <p>When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose.</p>
                </div>
              )}
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <div className="text-center">
              <h2 className="text-[24px] font-normal mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {relatedProducts.map((prod) => (
                  <Link href={`/product/${prod.id}`} key={prod.id} className="block border border-gray-200 rounded-[3px] p-5 relative transition-colors hover:border-black bg-white group">
                    {prod.isSale && <span className="absolute top-4 left-4 bg-[#E63946] text-white text-[10px] px-2 py-1 rounded-full font-bold z-10">SALE</span>}
                    <div className="aspect-square flex items-center justify-center mb-4">
                      <img src={prod.image} alt={prod.title} className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                    </div>
                    <h4 className="text-[13px] text-gray-600 mb-2.5 leading-snug line-clamp-2">{prod.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[#E63946] text-[14px] font-bold">${prod.price.toFixed(2)}</span>
                      {prod.oldPrice && <span className="text-gray-400 text-[12px] line-through">${prod.oldPrice.toFixed(2)}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}