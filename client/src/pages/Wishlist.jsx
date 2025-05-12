import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, clearWishlist } from '../slices/wishlistSlice';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (product) => {
    if (product.inStock) {
      dispatch(addToCart({ product, quantity: 1 }));
      dispatch(removeFromWishlist(product.id));
      toast.success('Added to cart successfully!');
    }
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.success('Wishlist cleared');
  };

  return (
    <div className="bg-gray-50 min-h-screen section-padding">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="flex items-center px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <FiTrash2 className="mr-2" />
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <FiHeart className="text-gray-400 w-16 h-16" />
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start adding your favorite items to your wishlist
            </p>
            <Link to="/products" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden transform hover:-translate-y-1 transition-all duration-200 hover:shadow-md">
                <div className="relative group">
                  <Link to={`/product/${item.id}`} className="block">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                
                <div className="p-4">
                  <Link 
                    to={`/product/${item.id}`}
                    className="block text-gray-800 font-medium hover:text-primary transition-colors duration-200"
                  >
                    <h3 className="text-lg mb-2 line-clamp-2 min-h-[3rem]">{item.name}</h3>
                  </Link>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {item.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-primary">
                            ₹{(item.price * (1 - item.discount/100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <span className="text-xs font-semibold text-white bg-secondary px-2 py-1 rounded">
                            -{item.discount}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-xl font-bold text-primary">
                          ₹{item.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                        item.inStock 
                          ? 'bg-primary text-white hover:bg-primary-dark' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
