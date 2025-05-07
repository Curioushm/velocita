import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart, FiPhone, FiMail } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
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
    <header className="bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+917478186693" className="flex items-center hover:text-gray-200">
              <FiPhone className="mr-1" /> +91 74781 86693
            </a>
            <a href="mailto:support@velocita-electronics.xyz" className="flex items-center hover:text-gray-200">
              <FiMail className="mr-1" /> support@velocita-electronics.xyz
            </a>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Link to="/about" className="hover:text-gray-200">About Us</Link>
            <Link to="/blog" className="hover:text-gray-200">Blog</Link>
            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
            <span>Free Shipping on Orders above ₹5000</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/velotica-logo.png" alt="Velotica Electronics Logo" className="h-10" />
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-primary"
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-700 hover:text-primary">
              <FiHeart size={22} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-primary relative">
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-primary">
              <FiUser size={22} />
            </Link>
            <button
              className="md:hidden text-gray-700 hover:text-primary"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search - visible only on mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-primary"
              >
                <FiSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-100 py-3">
        <div className="container-custom">
          <ul className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <li key={category.path}>
                <Link
                  to={category.path}
                  className="text-gray-700 hover:text-primary font-medium"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products/deals" className="text-secondary hover:text-secondary-dark font-medium">
                Special Deals
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container-custom py-4">
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="block text-gray-700 hover:text-primary font-medium py-2"
                    onClick={toggleMenu}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/products/deals" 
                  className="block text-secondary hover:text-secondary-dark font-medium py-2"
                  onClick={toggleMenu}
                >
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
