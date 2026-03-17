'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import './CategoryPage.css'; 
import { 
  Search, ChevronDown, LayoutGrid, List as ListIcon, Heart, 
  Eye, Layers, ShoppingCart, GripHorizontal, AlignJustify, ChevronRight, CheckCircle2
} from 'lucide-react';

// IMPORT DATABASE & CONTEXT
import { categoryDatabase } from '../../data/products';
import { useCart } from './../../../context/CartContext';
import { useWishlist } from './../../../context/WishlistContext'; 

export default function CategoryPage() {
    const params = useParams();
    
    // GET CONTEXT FUNCTIONS
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    
    const currentSlug = params?.slug && categoryDatabase[params.slug] ? params.slug : 'smartphone-laptop';
    const categoryData = categoryDatabase[currentSlug];

    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('');
    const [cardImages, setCardImages] = useState({});
    
    const [filteredProducts, setFilteredProducts] = useState(categoryData.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState(categoryData.minPrice.toString());
    const [maxPrice, setMaxPrice] = useState(categoryData.maxPrice.toString());
    
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortOrder, setSortOrder] = useState('Default');
  
    useEffect(() => {
      let updatedList = [...categoryData.products];

      if (searchQuery.trim() !== '') {
        updatedList = updatedList.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      if (selectedBrands.length > 0) {
        updatedList = updatedList.filter((p) => selectedBrands.includes(p.brand));
      }
      if (selectedSubCategories.length > 0) {
        updatedList = updatedList.filter((p) => selectedSubCategories.includes(p.subCategory));
      }
      if (selectedSizes.length > 0) {
        updatedList = updatedList.filter((p) => selectedSizes.includes(p.size));
      }
      if (selectedColors.length > 0) {
        updatedList = updatedList.filter((p) => selectedColors.includes(p.color));
      }

      const min = parseFloat(String(minPrice).replace(/[^0-9.]/g, '')) || 0;
      const max = parseFloat(String(maxPrice).replace(/[^0-9.]/g, '')) || Infinity;
      updatedList = updatedList.filter((p) => p.price >= min && p.price <= max);

      if (sortOrder === 'Price: Low to High') {
        updatedList.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'Price: High to Low') {
        updatedList.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(updatedList);
    }, [searchQuery, minPrice, maxPrice, selectedBrands, selectedSubCategories, selectedSizes, selectedColors, sortOrder, categoryData.products]);

    useEffect(() => {
      setMinPrice(categoryData.minPrice.toString());
      setMaxPrice(categoryData.maxPrice.toString());
      setSelectedBrands([]);
      setSelectedSubCategories([]);
      setSelectedSizes([]);
      setSelectedColors([]);
      setSearchQuery('');
    }, [currentSlug, categoryData]);

    const toggleFilter = (item, selectedList, setListFunction) => {
      setListFunction((prev) => 
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    const openQuickView = (e, product) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedProduct(product);
      setMainImage(product.image);
      setQuantity(1);
      setIsQuickViewOpen(true);
    };

    const handleAddToCart = (e, product, qty = 1) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product, qty);
      alert(`Added "${product.title}" to cart!`);
    };

    const changeCardImage = (productId, image) => {
      setCardImages((prev) => ({
        ...prev,
        [productId]: image,
      }));
    };

    const handleResetFilters = () => {
      setSearchQuery('');
      setMinPrice(categoryData.minPrice.toString());
      setMaxPrice(categoryData.maxPrice.toString());
      setSelectedBrands([]);
      setSelectedSubCategories([]);
      setSelectedColors([]);
      setSelectedSizes([]);
      setSortOrder('Default');
    };

    // Prevent scrolling when modal opens
    useEffect(() => {
      if (isQuickViewOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = 'unset';
      return () => { document.body.style.overflow = 'unset'; };
    }, [isQuickViewOpen]);

  return (
    <>
      <div className="category-page">
        <div className="page-header">
          <h1>{categoryData.title}</h1>
          <p className="breadcrumbs">
            <Link href="/">Home</Link> 
            <ChevronRight size={14} /> 
            <span style={{color: 'var(--text-dark)'}}>{categoryData.title}</span>
          </p>
        </div>

        <div className="main-layout">
          <aside className="sidebar">
            {/* Search */}
            <div className="filter-section">
              <h3 className="filter-title">Search <ChevronDown size={16} /></h3>
              <div className="search-input-wrapper">
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." />
                <button><Search size={16} /></button>
              </div>
            </div>

            {/* Subcategory */}
            {categoryData.filters.subCategories && (
              <div className="filter-section">
                <h3 className="filter-title">SubCategory <ChevronDown size={16} /></h3>
                <div className="checkbox-list">
                  {categoryData.filters.subCategories.map((sub) => (
                    <label key={sub} className="checkbox-label">
                      <input type="checkbox" checked={selectedSubCategories.includes(sub)} onChange={() => toggleFilter(sub, selectedSubCategories, setSelectedSubCategories)} /> {sub}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Manufacturer */}
            <div className="filter-section">
              <h3 className="filter-title">Manufacturer <ChevronDown size={16} /></h3>
              <div className="checkbox-list">
                {categoryData.filters.manufacturers.map((brand) => (
                  <label key={brand} className="checkbox-label">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)} /> {brand}
                  </label>
                ))}
              </div>
            </div>

            {/* Color */}
            {categoryData.filters.colors && (
              <div className="filter-section">
                <h3 className="filter-title">Color <ChevronDown size={16} /></h3>
                <div className="checkbox-list">
                  {categoryData.filters.colors.map((color) => (
                    <label key={color} className="checkbox-label">
                      <input type="checkbox" checked={selectedColors.includes(color)} onChange={() => toggleFilter(color, selectedColors, setSelectedColors)} /> {color}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {categoryData.filters.sizes && (
              <div className="filter-section">
                <h3 className="filter-title">Size <ChevronDown size={16} /></h3>
                <div className="checkbox-list">
                  {categoryData.filters.sizes.map((size) => (
                    <label key={size} className="checkbox-label">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleFilter(size, selectedSizes, setSelectedSizes)} /> {size}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="filter-section">
              <h3 className="filter-title">Price <ChevronDown size={16} /></h3>
              <div className="price-inputs">
                <div className="price-input-wrapper"><span className="price-currency">$</span><input type="text" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} /></div>
                <span className="price-divider">to</span>
                <div className="price-input-wrapper"><span className="price-currency">$</span><input type="text" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} /></div>
              </div>
              <div className="visual-slider"><div className="slider-track"></div><div className="slider-thumb left"></div><div className="slider-thumb right"></div></div>
              <button onClick={handleResetFilters} className="btn-reset">Reset All</button>
            </div>

            {/* PROMO BANNER (Handles the new Array format securely!) */}
            {Array.isArray(categoryData.promoImage) ? (
              categoryData.promoImage.map((item, idx) => (
                <Link href={`/product/${item.id}`} key={idx} className="promo-banner block cursor-pointer">
                  <img src={item.img} alt="Promo" />
                  <div className="promo-content">
                    <p>Exclusive discounts</p>
                    <h4>SALE UP TO<br/>20% OFF</h4>
                    <button className="btn-shop-now">Shop Now</button>
                  </div>
                </Link>
              ))
            ) : (
              /* Fallback for old string format */
              categoryData.promoImage && (
                <div className="promo-banner">
                  <img src={categoryData.promoImage} alt="Promo" />
                  <div className="promo-content">
                    <p>Exclusive discounts</p>
                    <h4>SALE UP TO<br/>20% OFF</h4>
                    <button className="btn-shop-now">Shop Now</button>
                  </div>
                </div>
              )
            )}
          </aside>

          <div className="content-area">
            <div className="top-toolbar">
              <div className="sort-wrapper">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="Default">Default</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
                <ChevronDown size={14} className="icon" />
              </div>
              
            </div>

            <div className="product-grid">
              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <Search size={32} style={{margin: '0 auto 12px', color: 'var(--text-light)'}} />
                  No products found matching your current filters.<br/>
                  <button onClick={handleResetFilters} className="clear-filters-link">Clear all filters</button>
                </div>
              )}

              {filteredProducts.map((product) => (
                <div key={product.id} className={`product-card ${product.showHoverState ? 'force-hover' : ''}`}>
                  {product.isSale && <span className="sale-badge">SALE</span>}
                  
                  {/* WRAPPED IMAGE ONLY */}
                  <div className="product-image-area">
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      <img
                        src={cardImages[product.id] || product.image || 'https://placehold.co/300x300/f8f9fa/a1a1aa?text=Image'}
                        alt={product.title}
                        className="main-img"
                      />
                    </Link>

                    <div className="hover-overlay">
                      {product.thumbnails && (
                        <div className="thumbnails-left">
                          {product.thumbnails.map((thumb, idx) => (
                            <div
                              key={idx}
                              className="thumb-box"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                changeCardImage(product.id, thumb);
                              }}
                            >
                              <img src={thumb} alt="" />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="actions-right">
                        {/* FUNCTIONAL WISHLIST BUTTON */}
                        <button 
                          className="icon-btn flex items-center justify-center" 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                        >
                          <Heart size={16} fill={isInWishlist(product.id) ? '#E63946' : 'none'} color={isInWishlist(product.id) ? '#E63946' : 'currentColor'} />
                        </button>
                        
                        <button className="icon-btn flex items-center justify-center" onClick={(e) => openQuickView(e, product)}><Eye size={16} /></button>
                      </div>
                    </div>
                  </div>

                  {product.countdown && <div className="countdown">{product.countdown}</div>}

                  <div className="product-details">
                    <Link href={`/product/${product.id}`} style={{textDecoration: 'none'}}>
                      <h4 className="product-title">{product.title}</h4>
                    </Link>

                    {product.swatches && product.swatches.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                        {product.swatches.map((color, idx) => (
                          <div key={idx} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: color, border: color === '#d1d5db' ? '1px solid #ccc' : 'none' }}></div>
                        ))}
                      </div>
                    )}

                    <div className="product-pricing">
                      <span className="price-current">${product.price.toFixed(2)}</span>
                      {product.oldPrice && <span className="price-old">${product.oldPrice.toFixed(2)}</span>}
                    </div>
                    
                    <div className="add-to-cart-wrapper mt-3">
                      <button onClick={(e) => handleAddToCart(e, product)} className="btn-add-cart w-full">
                        <ShoppingCart size={14} /> Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================
          QUICK VIEW MODAL OVERLAY
          (Updated to match sleek styling)
      ==================================== */}
      {isQuickViewOpen && selectedProduct && (
        <div 
          className="model-quick fixed inset-0 flex items-center justify-center  bg-opacity-60"
          style={{ zIndex: 999999 }}
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

            {/* Modal Left: Images */}
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

            {/* Modal Right: Details */}
            <div className="flex-1 flex flex-col">
              <Link href={`/product/${selectedProduct.id}`} style={{textDecoration: 'none'}}>
                <h2 className="text-[24px] font-normal text-gray-800 mb-2 hover:text-[#E63946] transition-colors cursor-pointer leading-tight">
                  {selectedProduct.title}
                </h2>
              </Link>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 text-sm">★★★★★</span>
                <span className="text-[13px] text-gray-500">({selectedProduct.rating > 0 ? '1' : '0'}) Reviews</span>
              </div>
              
              <div className="text-[#28A745] text-[13px] font-medium mb-4 flex items-center gap-1">
                <CheckCircle2 size={14} /> Instock
              </div>
              
              <div className="text-[13px] text-gray-500 mb-4">Product Code: {selectedProduct.sku || `id1-${selectedProduct.id}`}</div>
              
              <p className="text-[13px] text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.shortDesc || "High quality product from our exclusive collection. Perfect for your daily needs."}
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
                  <div className="flex items-center border border-gray-200 rounded w-[100px] h-10 bg-gray-50">
                    <button className="flex-1 text-lg text-gray-500 hover:text-black transition-colors" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                    <input type="text" value={quantity} readOnly className="w-8 text-center bg-transparent outline-none text-[13px] font-medium" />
                    <button className="flex-1 text-lg text-gray-500 hover:text-black transition-colors" onClick={() => setQuantity((q) => q + 1)}>+</button>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      handleAddToCart(e, selectedProduct, quantity);
                      setIsQuickViewOpen(false);
                    }}
                    className="flex-1 h-10 bg-white text-[#E63946] border border-gray-200 font-bold rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase text-[12px]"
                  >
                    <ShoppingCart size={14} /> ADD TO CART
                  </button>
                </div>
                
                <button className="w-full h-10 bg-black text-white font-bold rounded hover:bg-[#E63946] transition-colors uppercase text-[12px]">
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