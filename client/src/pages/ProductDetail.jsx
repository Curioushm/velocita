import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiMinus, FiPlus, FiShare2, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '../slices/wishlistSlice';

// Mock data - in a real app, this would come from an API
import { getProductById, getRelatedProducts } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state?.wishlist?.items || []);
  const isInWishlist = wishlistItems.some(item => item.id === parseInt(id));

  useEffect(() => {
    setLoading(true);
    
    // Fetch product details
    const fetchedProduct = getProductById(parseInt(id));
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      
      // Fetch related products
      const related = getRelatedProducts(parseInt(id));
      setRelatedProducts(related);
    }
    
    setLoading(false);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= (product?.countInStock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product && product.inStock) {
      dispatch(addToCart({ product, quantity }));
      toast.success('Added to cart successfully!');
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  // Generate breadcrumb links
  const generateBreadcrumbs = () => {
    if (!product) return [];
    
    return [
      { name: 'Home', path: '/' },
      { name: product.category.charAt(0).toUpperCase() + product.category.slice(1), path: `/products/${product.category}` },
      { name: product.name, path: `/product/${product.id}` },
    ];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  // Calculate discounted price
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : product.price.toFixed(2);

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <FiChevronRight className="mx-2 text-gray-400" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600">{crumb.name}</span>
              ) : (
                <Link to={crumb.path} className="text-primary hover:text-primary-dark">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Product details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product images */}
            <div>
              <div className="mb-4 border rounded-lg overflow-hidden bg-white flex items-center justify-center h-80">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div 
                    key={index}
                    className={`border rounded-md overflow-hidden cursor-pointer p-2 ${
                      activeImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={product.image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 ml-2">{product.rating.toFixed(1)} ({Math.floor(product.rating * 10)} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.discount > 0 ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-primary">₹{discountedPrice}</span>
                    <span className="text-xl text-gray-500 line-through ml-3">₹{product.price.toFixed(2)}</span>
                    <span className="ml-3 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Stock status */}
              <div className="mb-6">
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {/* Short description */}
              <p className="text-gray-600 mb-6">
                {product.description.long}
              </p>
              
              {/* Quantity selector */}
              <div className="flex items-center mb-6">
                <span className="text-gray-700 mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 text-gray-600 hover:text-primary"
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4 py-1 border-l border-r border-gray-300">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 text-gray-600 hover:text-primary"
                    disabled={quantity >= (product.countInStock || 10)}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center"
                  disabled={!product.inStock}
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className="btn-outline flex-1 flex items-center justify-center"
                >
                  <FiHeart className={`mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
              
              {/* SKU and categories */}
              <div className="text-sm text-gray-600">
                <p className="mb-1"><span className="font-medium">SKU:</span> {product.id.toString().padStart(6, '0')}</p>
                <p className="mb-1">
                  <span className="font-medium">Category:</span>{' '}
                  <Link to={`/products/${product.category}`} className="text-primary hover:underline">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </Link>
                </p>
                <p>
                  <span className="font-medium">Brand:</span> {product.brand || 'VELOCITA'}
                </p>
              </div>
              
              {/* Share */}
              <div className="mt-6 flex items-center">
                <span className="text-gray-700 mr-4">Share:</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <button className="text-gray-600 hover:text-primary">
                    <FiShare2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t">
            <div className="flex border-b">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'specifications'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Product Description</h3>
                  <p className="text-gray-600 mb-4">
                    The {product.name} is a high-quality electronic component designed for reliability and performance. 
                    Perfect for DIY projects, professional applications, and educational purposes.
                  </p>
                  <p className="text-gray-600 mb-4">
                    This component features precise manufacturing standards, ensuring consistent performance in various 
                    environmental conditions. The robust design makes it suitable for both beginners and experienced 
                    electronics enthusiasts.
                  </p>
                  <p className="text-gray-600">
                    VELOCITA ELECTRONICS ensures all products meet rigorous quality control standards, providing you 
                    with components you can trust for your most important projects.
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technical Specifications</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2 bg-gray-50 font-medium">Brand</td>
                          <td className="px-4 py-2">{product.brand || 'VELOCITA'}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 bg-gray-50 font-medium">Model</td>
                          <td className="px-4 py-2">{product.id.toString().padStart(6, '0')}-V</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 bg-gray-50 font-medium">Dimensions</td>
                          <td className="px-4 py-2">5.5 × 3.2 × 1.8 cm</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 bg-gray-50 font-medium">Weight</td>
                          <td className="px-4 py-2">45g</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 bg-gray-50 font-medium">Operating Voltage</td>
                          <td className="px-4 py-2">3.3V - 5V DC</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2 bg-gray-50 font-medium">Operating Temperature</td>
                          <td className="px-4 py-2">-10°C to 85°C</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 bg-gray-50 font-medium">Package Contents</td>
                          <td className="px-4 py-2">1 × {product.name}, User Manual</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex mr-4">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-medium">{product.rating.toFixed(1)} out of 5</span>
                  </div>
                  
                  <div className="mb-6">
                    <button className="btn-primary">Write a Review</button>
                  </div>
                  
                  {/* Sample reviews */}
                  <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">John D.</h4>
                          <span className="text-gray-500 text-sm">
                            {new Date(Date.now() - (index * 86400000)).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < (5 - index) ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600">
                          {index === 0 && "Excellent product! Works perfectly for my project. The quality is outstanding and it arrived quickly."}
                          {index === 1 && "Good component, but the documentation could be better. Still, it works as expected and the price is reasonable."}
                          {index === 2 && "Decent product for the price. Shipping was fast and the packaging was secure."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related products */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
