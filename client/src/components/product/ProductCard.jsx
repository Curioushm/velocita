import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { id, name, price, image, discount, rating, inStock } = product;

  const discountedPrice = discount ? (price - (price * discount / 100)).toFixed(2) : Number(price).toFixed(2);

  return (
    <div className="card group">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded z-10">
            {discount}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute top-2 right-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded z-10">
            Out of Stock
          </div>
        )}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-gray-800 font-medium text-sm mb-1 line-clamp-2 h-10 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
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
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {discount > 0 ? (
              <div className="flex items-center">
                <span className="text-primary font-semibold">₹{discountedPrice}</span>
                <span className="text-gray-500 text-sm line-through ml-2">₹{Number(price).toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-primary font-semibold">₹{Number(price).toFixed(2)}</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button 
              className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              title="Add to Wishlist"
            >
              <FiHeart size={16} />
            </button>
            <button 
              className={`p-1.5 rounded-full ${
                inStock 
                  ? 'bg-primary text-white hover:bg-primary-dark' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors`}
              disabled={!inStock}
              title={inStock ? "Add to Cart" : "Out of Stock"}
            >
              <FiShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
