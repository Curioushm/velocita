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
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-red-500 hover:text-red-600 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <FiHeart className="text-gray-400 w-16 h-16" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start adding your favorite items to your wishlist
            </p>
            <Link to="/products" className="btn-primary">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="relative">
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-48 object-contain"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                
                <div className="mt-4">
                  <Link 
                    to={`/product/${item.id}`}
                    className="text-gray-800 font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  
                  <div className="flex items-center mt-2">
                    {item.discount > 0 ? (
                      <>
                        <span className="text-primary font-semibold">
                          ₹{(item.price * (1 - item.discount/100)).toFixed(2)}
                        </span>
                        <span className="text-gray-500 text-sm line-through ml-2">
                          ₹{item.price.toFixed(2)}
                        </span>
                        <span className="ml-2 bg-secondary text-white text-xs px-2 py-1 rounded">
                          {item.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-primary font-semibold">
                        ₹{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className={`btn-primary p-2 rounded-full ${!item.inStock && 'opacity-50 cursor-not-allowed'}`}
                      disabled={!item.inStock}
                    >
                      <FiShoppingCart size={18} />
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
