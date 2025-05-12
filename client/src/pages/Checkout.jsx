import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiChevronLeft, FiShieldOff, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems } = useSelector(state => state.cart);
  const { user } = useContext(AuthContext); // Use AuthContext instead of Redux user state
  const [selectedPayment, setSelectedPayment] = useState('card');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount > 0 
      ? item.price - (item.price * item.discount / 100) 
      : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 80;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [user, navigate, location, cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your order submission logic here
    toast.success('Order placed successfully!');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <Link to="/cart" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
          <FiChevronLeft className="mr-2" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
              
              {/* Order Items Summary */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Order Summary ({cartItems.length} items)</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const itemPrice = item.discount > 0 
                      ? item.price - (item.price * item.discount / 100) 
                      : item.price;
                    return (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(itemPrice * item.quantity).toFixed(2)}</p>
                          {item.discount > 0 && (
                            <p className="text-xs text-gray-500 line-through">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Street Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">PIN Code</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="IN">India</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedPayment === 'card'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Pay securely with your card</p>
                      </div>
                      <FiLock className="text-gray-400" />
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={selectedPayment === 'cod'}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive</p>
                      </div>
                      <FiShieldOff className="text-gray-400" />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    (Including GST)
                  </p>
                </div>
              </div>

              <button
                type="submit"
                form="checkoutForm"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Place Order
              </button>

              <div className="mt-6 space-y-2 text-xs text-gray-500">
                <p className="flex items-center">
                  <FiLock className="mr-1" />
                  Secure payment gateway
                </p>
                <p>By placing your order, you agree to our Terms & Conditions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
