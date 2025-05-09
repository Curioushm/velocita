import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';

// Mock data - in a real app, this would come from an API
import { featuredProducts, latestProducts } from '../data/products';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: 'Next-Gen Development Boards',
      description: 'Build your dream projects with our premium development boards',
      image: '/images/hero/hero-1.jpg',
      cta: 'Shop Development Boards',
      link: '/products/development-boards',
      bgColor: 'bg-blue-100',
    },
    {
      id: 2,
      title: 'Premium Sensor Collection',
      description: 'High-precision sensors for all your IoT and robotics projects',
      image: '/images/hero/hero-2.jpg',
      cta: 'Explore Sensors',
      link: '/products/sensors',
      bgColor: 'bg-green-100',
    },
    {
      id: 3,
      title: 'Power Solutions',
      description: 'Reliable power components for your electronic projects',
      image: '/images/hero/hero-3.jpg',
      cta: 'View Power Solutions',
      link: '/products/power',
      bgColor: 'bg-orange-100',
    },
  ];

  // Categories for the category section
  const categories = [
    {
      id: 1,
      name: 'Development Boards',
      image: '/images/all-dev-boards.png',
      link: '/products/development-boards',
    },
    {
      id: 2,
      name: 'Sensors',
      image: '/images/all-sensors.jpg',
      link: '/products/sensors',
    },
    {
      id: 3,
      name: 'Power',
      image: '/images/categories/power.jpg',
      link: '/products/power',
    },
    {
      id: 4,
      name: 'Batteries',
      image: '/images/categories/batteries.jpg',
      link: '/products/batteries',
    },
    {
      id: 5,
      name: 'Components',
      image: '/images/categories/components.jpg',
      link: '/products/components',
    },
    {
      id: 6,
      name: 'Tools',
      image: '/images/categories/tools.jpg',
      link: '/products/tools',
    },
  ];

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Change slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative">
        <div className="overflow-hidden relative h-[500px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              } ${slide.bgColor}`}
            >
              <div className="container-custom flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-8 md:p-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="btn-primary inline-flex items-center"
                  >
                    {slide.cta} <FiArrowRight className="ml-2" />
                  </Link>
                </div>
                <div className="md:w-1/2 p-4">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[300px] md:max-h-[400px] mx-auto object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-light p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Quality Guaranteed</h3>
                <p className="text-gray-600">All products tested and verified</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-light p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Fast Shipping</h3>
                <p className="text-gray-600">Free on orders over $50</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-primary-light p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">24/7 Support</h3>
                <p className="text-gray-600">Expert assistance available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary hover:text-primary-dark flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-12">
        <div className="container-custom">
          <div className="bg-primary rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Special Offer on Raspberry Pi Kits
                </h2>
                <p className="text-white/80 mb-6">
                  Get 15% off on all Raspberry Pi starter kits. Limited time offer!
                </p>
                <Link
                  to="/products/deals"
                  className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-6 rounded-md inline-flex items-center"
                >
                  Shop Now <FiArrowRight className="ml-2" />
                </Link>
              </div>
              <div className="md:w-1/2 p-8">
                <img
                  src="/images/banner/raspberry-pi-kit.png"
                  alt="Raspberry Pi Kit"
                  className="max-h-[300px] mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Products</h2>
            <Link to="/products/new" className="text-primary hover:text-primary-dark flex items-center">
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  {i === 1 && "Velocita Electronics has the best selection of components I've found. Fast shipping and excellent customer service!"}
                  {i === 2 && "The Arduino kit I purchased was perfect for my project. Great quality and the tutorial was very helpful."}
                  {i === 3 && "I've been shopping here for all my electronic needs. Their prices are competitive and the quality is always top-notch."}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium">
                      {i === 1 && "John D."}
                      {i === 2 && "Sarah M."}
                      {i === 3 && "Robert K."}
                    </h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-white/80 mb-6">
              Stay updated with our latest products, offers, and tutorials.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
