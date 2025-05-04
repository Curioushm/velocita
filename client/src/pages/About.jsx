import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-primary mb-4"
        >
          About Velocita Electronics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Your trusted partner in electronic components and development boards
        </motion.p>
      </div>

      {/* Company Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600">
              Founded in 2025, Velocita Electronics has been dedicated to providing high-quality electronic components and development boards to makers, engineers, and hobbyists worldwide.
            </p>
            <p className="text-gray-600">
              Our mission is to empower creators by offering reliable, affordable, and innovative electronic solutions that bring ideas to life. We believe in the power of technology to solve real-world problems and create amazing projects.
            </p>
          </motion.div>
        </div>
        <div className="relative h-[400px]">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src="/images/about/company-story.jpg"
              alt="Company Story"
              className="object-cover w-full h-full rounded-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: 'FiArrowRight',
              title: 'Quality First',
              description: 'We only source and sell top-quality components that meet our strict standards',
            },
            {
              icon: 'FiArrowRight',
              title: 'Customer Focus',
              description: 'Your success is our priority - we provide exceptional support and resources',
            },
            {
              icon: 'FiArrowRight',
              title: 'Innovation',
              description: 'We stay ahead of the curve by offering the latest technology and solutions',
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white rounded-lg shadow"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FiArrowRight className="text-primary" />
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: 'John Smith',
              role: 'CEO & Founder',
              image: '/images/about/john-smith.jpg',
            },
            {
              name: 'Sarah Johnson',
              role: 'CTO',
              image: '/images/about/sarah-johnson.jpg',
            },
            {
              name: 'Michael Brown',
              role: 'Head of Engineering',
              image: '/images/about/michael-brown.jpg',
            },
            {
              name: 'Emily Wilson',
              role: 'Customer Success Manager',
              image: '/images/about/emily-wilson.jpg',
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow p-6 text-center"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Next Project?</h3>
        <p className="text-white mb-6">Explore our wide range of electronic components and development boards</p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors"
        >
          Browse Products
          <FiArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default About;
