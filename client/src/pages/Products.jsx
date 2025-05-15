import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';

// Mock data - in a real app, this would come from an API
import { allProducts, getProductsByCategory } from '../data/products';

const Products = () => {
  const { category } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  // --- NEW: Get all products and compute max price ---
  const allProductList = useMemo(() => allProducts.map(p => ({
    ...p,
    // Normalize price to number (strip ₹ and parse)
    price: typeof p.price === 'string' ? Number(String(p.price).replace(/[^\d.]/g, '')) : p.price,
    brand: p.brand || 'Unknown'
  })), []);

  const maxProductPrice = useMemo(() => {
    return Math.max(...allProductList.map(p => {
      const price = p.discount ? p.price - (p.price * p.discount / 100) : p.price;
      return price;
    }));
  }, [allProductList]);

  // --- END NEW ---

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // --- CHANGE: Set initial price range based on max price ---
  const [priceRange, setPriceRange] = useState([0, maxProductPrice]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]); // NEW: for rating filter
  const [sortBy, setSortBy] = useState('featured');
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    brand: true,
    rating: true,
  });

  // --- CHANGE: Get all available brands from normalized products ---
  const allBrands = useMemo(
    () => [...new Set(allProductList.map(product => product.brand || 'Unknown'))],
    [allProductList]
  );

  // --- Filter and sort products based on selected filters ---
  useEffect(() => {
    setLoading(true);

    // --- CHANGE: Use normalized products ---
    let initialProducts = [];

    if (category) {
      initialProducts = allProductList.filter(
        p => p.category === category
      );
    } else if (searchQuery) {
      initialProducts = allProductList.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && (
          (typeof product.description === 'string'
            ? product.description
            : product.description.short || '') // handle both string and object
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        ))
      );
    } else {
      initialProducts = [...allProductList];
    }

    setProducts(initialProducts);

    let result = [...initialProducts];

    // --- Filter by price range ---
    result = result.filter(product => {
      const price = product.discount
        ? product.price - (product.price * product.discount / 100)
        : product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // --- Filter by selected brands ---
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand));
    }

    // --- Filter by selected ratings ---
    if (selectedRatings.length > 0) {
      result = result.filter(product =>
        selectedRatings.some(rating => Math.floor(product.rating) >= rating)
      );
    }

    // --- Sort products ---
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const priceB = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = a.discount ? a.price - (a.price * a.discount / 100) : a.price;
          const priceB = b.discount ? b.price - (b.price * b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(result);
    setLoading(false);
  }, [category, searchQuery, priceRange, selectedBrands, selectedRatings, sortBy, allProductList]);

  // --- Toggle filter section on mobile ---
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // --- Toggle expanded state of filter sections ---
  const toggleFilterSection = (section) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section],
    });
  };

  // --- Handle brand selection ---
  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // --- Handle rating selection ---
  const handleRatingChange = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  // --- Handle price range change ---
  const handlePriceChange = (e, index) => {
    let value = Number(e.target.value);
    // Ensure min <= max
    let newRange = [...priceRange];
    newRange[index] = value;
    if (index === 0 && value > priceRange[1]) newRange[1] = value;
    if (index === 1 && value < priceRange[0]) newRange[0] = value;
    setPriceRange(newRange);
  };

  // --- Reset filters ---
  const clearAllFilters = () => {
    setPriceRange([0, maxProductPrice]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSortBy('featured');
  };

  // --- Get page title based on category or search ---
  const getPageTitle = () => {
    if (category) {
      return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } else if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else {
      return 'All Products';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">{getPageTitle()}</h1>
        
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFilter}
            className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <FiFilter className="mr-2" />
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className={`w-full md:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow-sm p-4">
              {/* Filter header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Clear All
                </button>
              </div>
              
              {/* Price filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection('price')}
                >
                  <h3 className="font-medium">Price Range</h3>
                  {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                
                {expandedFilters.price && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <input
                        type="range"
                        min="0"
                        max={maxProductPrice}
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxProductPrice}
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Brand filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection('brand')}
                >
                  <h3 className="font-medium">Brand</h3>
                  {expandedFilters.brand ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                
                {expandedFilters.brand && (
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                    {allBrands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          className="mr-2"
                        />
                        <label htmlFor={`brand-${brand}`} className="text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Rating filter */}
              <div className="mb-6">
                <div 
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => toggleFilterSection('rating')}
                >
                  <h3 className="font-medium">Rating</h3>
                  {expandedFilters.rating ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                
                {expandedFilters.rating && (
                  <div className="mt-3 space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          className="mr-2"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-gray-700">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="w-full md:w-3/4">
            {/* Sort and count */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-gray-600 mb-2 sm:mb-0">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-600 mr-2">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
            
            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">No products found</h2>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
