import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiClock, FiUser, FiTag } from 'react-icons/fi';

// Mock blog data - in a real app, this would come from an API
const blogPosts = [
  {
    id: 1,
    title: 'Interfacing SHT30 Digital Temperature and Humidity Sensor with Arduino',
    slug: 'interfacing-sht30-digital-temperature-humidity-sensor-arduino',
    excerpt: 'Learn how to connect and program the SHT30 temperature and humidity sensor with Arduino for your IoT projects.',
    content: 'Full content of the blog post...',
    featuredImage: '/images/blog/sht30-arduino.jpg',
    category: 'Arduino',
    author: 'John Smith',
    date: '2025-04-15',
    tags: ['Arduino', 'Sensors', 'IoT', 'Temperature'],
    views: 1245,
  },
  {
    id: 2,
    title: 'Getting Started with Raspberry Pi 4: A Beginner\'s Guide',
    slug: 'getting-started-raspberry-pi-4-beginners-guide',
    excerpt: 'Everything you need to know to set up and start using your Raspberry Pi 4 for amazing projects.',
    content: 'Full content of the blog post...',
    featuredImage: '/images/blog/raspberry-pi-4.jpg',
    category: 'Raspberry Pi',
    author: 'Sarah Johnson',
    date: '2025-04-10',
    tags: ['Raspberry Pi', 'Beginners', 'Linux'],
    views: 2356,
  },
  {
    id: 3,
    title: 'How to Build a Smart Home Automation System with ESP32',
    slug: 'build-smart-home-automation-system-esp32',
    excerpt: 'Step-by-step guide to creating your own smart home system using the powerful ESP32 microcontroller.',
    content: 'Full content of the blog post...',
    featuredImage: '/images/blog/esp32-smart-home.jpg',
    category: 'IoT',
    author: 'Michael Brown',
    date: '2025-04-05',
    tags: ['ESP32', 'IoT', 'Smart Home', 'Automation'],
    views: 1876,
  },
  {
    id: 4,
    title: 'Understanding LiPo Batteries: Safety, Charging, and Best Practices',
    slug: 'understanding-lipo-batteries-safety-charging-best-practices',
    excerpt: 'Learn everything about Lithium Polymer batteries, how to use them safely, and extend their lifespan.',
    content: 'Full content of the blog post...',
    featuredImage: '/images/blog/lipo-batteries.jpg',
    category: 'Power',
    author: 'Emily Chen',
    date: '2025-03-28',
    tags: ['Batteries', 'LiPo', 'Safety', 'Power'],
    views: 1543,
  },
  {
    id: 5,
    title: 'Introduction to Circuit Design with KiCad',
    slug: 'introduction-circuit-design-kicad',
    excerpt: 'A comprehensive guide to designing your first PCB using the free and open-source KiCad software.',
    content: 'Full content of the blog post...',
    featuredImage: '/images/blog/kicad-pcb.jpg',
    category: 'PCB Design',
    author: 'David Wilson',
    date: '2025-03-20',
    tags: ['KiCad', 'PCB', 'Circuit Design', 'Electronics'],
    views: 1122,
  },
  {
    id: 6,
    title: 'Interfacing Ultrasonic Sensors with Arduino for Distance Measurement',
    slug: 'interfacing-ultrasonic-sensors-arduino-distance-measurement',
    excerpt: 'Learn how to use HC-SR04 ultrasonic sensors with Arduino to measure distances accurately for your robotics projects.',
    content: 'Full content of the blog post...',
    featuredImage: '/images/blog/ultrasonic-arduino.jpg',
    category: 'Arduino',
    author: 'John Smith',
    date: '2025-03-15',
    tags: ['Arduino', 'Sensors', 'Robotics', 'Distance Measurement'],
    views: 987,
  },
];

// Get all unique categories
const categories = [...new Set(blogPosts.map(post => post.category))];

// Get all unique tags
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const Blog = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter posts based on search, category, and tag
  useEffect(() => {
    setLoading(true);
    
    let filteredPosts = [...blogPosts];
    
    // Filter by search query
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }
    
    // Filter by tag
    if (selectedTag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(selectedTag));
    }
    
    setPosts(filteredPosts);
    setLoading(false);
  }, [searchQuery, selectedCategory, selectedTag]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // The useEffect will handle the filtering
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Blog & Tutorials</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            {/* Search form - visible on mobile only */}
            <div className="mb-6 lg:hidden">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
            
            {/* Blog posts */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-2xl font-semibold mb-2">No articles found</h2>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all articles.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setSelectedTag('');
                  }}
                  className="btn-primary"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:flex">
                      {/* Featured image */}
                      <div className="md:w-1/3">
                        <Link to={`/blog/${post.slug}`} className="block h-48 md:h-full overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </Link>
                      </div>
                      
                      {/* Content */}
                      <div className="md:w-2/3 p-6">
                        {/* Category */}
                        <div className="mb-2">
                          <Link
                            to={`/blog?category=${post.category}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedCategory(post.category);
                            }}
                            className="text-sm font-medium text-secondary hover:text-secondary-dark"
                          >
                            {post.category}
                          </Link>
                        </div>
                        
                        {/* Title */}
                        <h2 className="text-xl font-bold mb-2">
                          <Link to={`/blog/${post.slug}`} className="text-gray-800 hover:text-primary">
                            {post.title}
                          </Link>
                        </h2>
                        
                        {/* Meta info */}
                        <div className="flex flex-wrap text-sm text-gray-500 mb-3">
                          <div className="flex items-center mr-4 mb-2">
                            <FiUser className="mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center mr-4 mb-2">
                            <FiClock className="mr-1" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <FiTag className="mr-1" />
                            <span>{post.views} views</span>
                          </div>
                        </div>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 mb-4">
                          {post.excerpt}
                        </p>
                        
                        {/* Read more link */}
                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary hover:text-primary-dark font-medium inline-flex items-center"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-1">
                <a href="#" className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
                  Previous
                </a>
                <a href="#" className="px-3 py-1 rounded-md bg-primary text-white">
                  1
                </a>
                <a href="#" className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
                  2
                </a>
                <a href="#" className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
                  3
                </a>
                <span className="px-3 py-1 text-gray-600">...</span>
                <a href="#" className="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50">
                  Next
                </a>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Search form - hidden on mobile */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hidden lg:block">
              <h3 className="font-semibold mb-4">Search</h3>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-md transition-colors duration-300"
                >
                  <FiSearch />
                </button>
              </form>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      selectedCategory === '' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-2 py-1 rounded ${
                        selectedCategory === category ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular posts */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {blogPosts
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 3)
                  .map((post) => (
                    <div key={post.id} className="flex">
                      <div className="w-20 h-20 flex-shrink-0 mr-4">
                        <Link to={`/blog/${post.slug}`}>
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          <Link to={`/blog/${post.slug}`} className="text-gray-800 hover:text-primary">
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <FiClock className="mr-1" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTag === tag
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
