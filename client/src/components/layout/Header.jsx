import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import {
  FiSearch, FiShoppingCart, FiUser, FiLogIn, FiLogOut, FiUserPlus,
  FiMenu, FiX, FiHeart, FiPhone, FiMail, FiShield, FiHome
} from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const cartState = useSelector(state => state.cart);
  const cartItemCount = cartState.itemCount;
  const wishlistItems = useSelector(state => state.wishlist?.items || []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { state: { message: 'You have been logged out.' } });
  };

  const categories = [
    { name: 'Development Boards', path: '/products/development-boards' },
    { name: 'Sensors', path: '/products/sensors' },
    { name: 'Power', path: '/products/power' },
    { name: 'Batteries', path: '/products/batteries' },
    { name: 'Components', path: '/products/components' },
    { name: 'Tools', path: '/products/tools' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black text-gray-300 py-2">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+917478186693" className="flex items-center text-gray-300 hover:text-white">
              <FiPhone className="mr-1" /> +91 74781 86693
            </a>
            <a href="mailto:support@velocita-electronics.xyz" className="flex items-center text-gray-300 hover:text-white">
              <FiMail className="mr-1" /> support@velocita-electronics.xyz
            </a>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            <span className="text-gray-300">Free Shipping on Orders above ₹1000</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between bg-white p-2 rounded-md">
          {/* Logo with classy effect */}
          <Link to="/" className="flex-shrink-0">
            <div className="relative group">
              <img 
                src="/velotica-logo.png" 
                alt="Velotica Electronics Logo" 
                className="h-10 object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </Link>

          {/* Centered Content */}
          <div className="flex-1 flex justify-center items-center space-x-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex w-[40%] bg-cyan-600 p-1 rounded-md">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full py-3 px-4 border border-transparent rounded-md focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" aria-label="Search" className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-primary">
                    <FiSearch size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/wishlist">
                <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-all duration-300 hover:scale-105">
                  <FiHeart size={22} className="mr-1" />
                  <span className="hidden sm:inline">Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </span>
              </Link>

              <Link to="/cart" className="relative">
                <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-all duration-300 hover:scale-105">
                  <FiShoppingCart size={22} className="mr-1" />
                  <span className="hidden sm:inline">Cart</span>
                </span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Right Side User Controls */}
          <div className="flex items-center space-x-5">
            {user ? (
              <>
                <Link to="/profile">
                  <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-opacity">
                    {user.role === 'admin' ? (
                      <FiShield size={22} className="mr-1" title="Admin" />
                    ) : (
                      <FiUser size={22} className="mr-1" title="User" />
                    )}
                    <span className="hidden sm:inline">{user.name || 'Profile'}</span>
                  </span>
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin-dashboard">
                    <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-opacity">
                      Admin Dashboard
                    </span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-opacity">
                    <FiLogOut size={22} className="mr-1" />
                    <span className="hidden sm:inline">Logout</span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-opacity">
                    <FiLogIn size={22} className="mr-1" />
                    <span className="hidden sm:inline">Login</span>
                  </span>
                </Link>
                <Link to="/register">
                  <span className="inline-flex items-center justify-center rounded-full px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-opacity">
                    <FiUserPlus size={22} className="mr-1" />
                    <span className="hidden sm:inline">Register</span>
                  </span>
                </Link>
              </>
            )}
            <button
              type="button"
              className="md:hidden"
              onClick={toggleMenu}
            >
              <span className="inline-flex items-center justify-center rounded-full p-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-80 transition-opacity">
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </span>
            </button>
          </div>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary bg-white text-gray-900 placeholder-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" aria-label="Search" className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-primary">
                <FiSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Bar (Desktop) - Centered Categories */}
      <nav className="bg-gray-50 py-3 border-t border-b border-gray-200">
        <div className="container-custom">
          <ul className="hidden md:flex items-center justify-center space-x-8">
            <li>
              <Link 
                to="/" 
                className="text-primary hover:text-primary-dark transition-colors duration-200"
                title="Home"
              >
                <FiHome size={24} />
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.path}>
                <Link to={category.path} className="text-gray-700 hover:text-primary font-medium py-2 transition-colors duration-200">
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products/deals" className="text-secondary hover:text-secondary-dark font-medium py-2 transition-colors duration-200">
                Special Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Navigation (Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="container-custom py-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="block text-gray-700 hover:text-primary font-medium py-3 px-2 rounded-md hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/products/deals"
                  className="block text-secondary hover:text-secondary-dark font-medium py-3 px-2 rounded-md hover:bg-gray-100"
                  onClick={toggleMenu}
                >
                  Special Deals
                </Link>
              </li>
              {/* Top Links for Mobile */}
              <li className="pt-4 border-t border-gray-200 mt-2">
                <Link to="/about" className="block text-gray-700 hover:text-primary py-3 px-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="block text-gray-700 hover:text-primary py-3 px-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="block text-gray-700 hover:text-primary py-3 px-2 rounded-md hover:bg-gray-100" onClick={toggleMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
