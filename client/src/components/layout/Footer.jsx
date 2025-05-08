import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">VELOCITA ELECTRONICS</h3>
            <p className="text-gray-300 mb-4">
              Premium electronic components, development boards, sensors, and tools for makers,
              hobbyists, and professionals.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FiFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FiTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FiInstagram size={20} />
              </a>
              <a href="https://www.youtube.com/@sohomdiy" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FiYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/development-boards" className="text-gray-300 hover:text-white">Development Boards</Link>
              </li>
              <li>
                <Link to="/products/sensors" className="text-gray-300 hover:text-white">Sensors</Link>
              </li>
              <li>
                <Link to="/products/power" className="text-gray-300 hover:text-white">Power</Link>
              </li>
              <li>
                <Link to="/products/batteries" className="text-gray-300 hover:text-white">Batteries</Link>
              </li>
              <li>
                <Link to="/products/components" className="text-gray-300 hover:text-white">Components</Link>
              </li>
              <li>
                <Link to="/products/tools" className="text-gray-300 hover:text-white">Tools</Link>
              </li>
              <li>
                <Link to="/products/deals" className="text-gray-300 hover:text-white">Special Deals</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-gray-300 hover:text-white">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white">Order History</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-300 hover:text-white">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-secondary" />
                <span className="text-gray-300">
                  123 Tech Street, Silicon Valley, CA 94043, USA
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-secondary" />
                <a href="tel:+917478186693" className="text-gray-300 hover:text-primary">
                  +91 74781 86693
                </a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-secondary" />
                <a href="mailto:support@velocita-electronics.xyz" className="text-gray-300 hover:text-white">
                support@velocita-electronics.xyz
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-r-md"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} VELOCITA ELECTRONICS. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <img
                src="/payment-methods.png"
                alt="Payment Methods"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
