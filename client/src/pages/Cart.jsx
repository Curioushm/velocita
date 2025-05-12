import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart, updateCartQuantity } from '../slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Calculate cart totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount > 0 
        ? item.price - (item.price * item.discount / 100) 
        : item.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - couponDiscount;

  // Update item quantity
  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1 && newQuantity <= (item.countInStock || 10)) {
        dispatch(updateCartQuantity({ id: itemId, quantity: newQuantity }));
      }
    }
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart');
  };

  // Apply coupon code
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'velocita10') {
      setCouponApplied(true);
      setCouponDiscount(subtotal * 0.1); // 10% discount
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared successfully');
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-600 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <FiShoppingCart className="text-gray-400 w-16 h-16" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
                  <div className="col-span-6">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Subtotal</span>
                  </div>
                </div>

                {/* Cart items */}
                {cartItems.map((item) => {
                  const itemPrice = item.discount > 0 
                    ? (item.price - (item.price * item.discount / 100)).toFixed(2) 
                    : item.price.toFixed(2);
                  const itemSubtotal = (itemPrice * item.quantity).toFixed(2);

                  return (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                      {/* Product info */}
                      <div className="col-span-6 flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-primary">
                            {item.name}
                          </Link>
                          {item.discount > 0 && (
                            <div className="text-xs text-secondary font-medium mt-1">
                              {item.discount}% OFF
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <div className="md:hidden inline-block font-medium mr-2">Price:</div>
                        {item.discount > 0 ? (
                          <div>
                            <span className="font-medium">₹{itemPrice}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">₹{item.price.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="font-medium">₹{itemPrice}</span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="md:hidden inline-block font-medium mr-2">Quantity:</div>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="px-2 py-1 text-gray-600 hover:text-primary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="px-2 py-1 text-gray-600 hover:text-primary transition-colors"
                            disabled={item.quantity >= (item.countInStock || 10)}
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="md:col-span-2 text-center flex justify-between md:justify-center items-center">
                        <div className="md:hidden inline-block font-medium">Subtotal:</div>
                        <div className="flex items-center">
                          <span className="font-medium text-primary">₹{itemSubtotal}</span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Continue shopping */}
                <div className="p-4 flex justify-between">
                  <Link to="/products" className="text-primary hover:text-primary-dark flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Continue Shopping
                  </Link>
                  <button 
                    onClick={handleClearCart}
                    className="text-gray-600 hover:text-red-500 flex items-center"
                  >
                    <FiTrash2 className="mr-1" />
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Coupon code */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-3">Apply Coupon Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                    disabled={couponApplied}
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-green-600 text-sm mt-2">
                    Coupon applied successfully! You saved ₹{couponDiscount.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-primary">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="btn-primary w-full flex items-center justify-center"
                >
                  Proceed to Checkout <FiArrowRight className="ml-2" />
                </Link>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">We Accept</h3>
                  <div className="flex space-x-3">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="Visa" 
                      className="h-8 object-contain"
                    />
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                      alt="Mastercard" 
                      className="h-8 object-contain"
                    />
                    <img 
                      src="C:\Users\naihr\Downloads\ve\client\public\images\gpay.png"
                      alt="Google Pay" 
                      className="h-8 object-contain"
                    />
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png"
                      alt="Paytm" 
                      className="h-8 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
