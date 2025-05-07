import React from 'react';
import { FiZap, FiTarget, FiUsers, FiCpu, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Placeholder team member data - replace with actual data
const teamMembers = [
  { name: 'Sohom Das', role: 'Founder & Chief Executive Officer', image: '/images/team/sohom.jpg' },
  { name: 'Naihrit Mukherjee', role: 'Chief Technical Officer', image: '/images/team/naihrit.jpg' },
  { name: 'Rajdeep Majumder', role: 'Marketing and Communication Head', image: '/images/team/rajdeep.jpg' },
  { name: 'Krishnendu Ghosh', role: 'System Analyser', image: '/images/team/krishnendu.jpg' },
];

// Placeholder core values data
const coreValues = [
  { icon: FiZap, title: 'Innovation', description: 'Driving the future of electronics with cutting-edge solutions.' },
  { icon: FiTarget, title: 'Quality', description: 'Committing to the highest standards in every component we offer.' },
  { icon: FiUsers, title: 'Community', description: 'Empowering makers and engineers through shared knowledge and support.' },
  { icon: FiCpu, title: 'Expertise', description: 'Providing deep technical knowledge and guidance for your projects.' },
];

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="py-20 md:py-32 bg-primary text-white text-center"
      >
        <div className="container-custom">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            About VELOCITA ELECTRONICS
          </motion.h1>
          <motion.p
            variants={itemVariants}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-primary-light max-w-3xl mx-auto"
          >
            Empowering innovation by providing premium electronic components and fostering a community of creators.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-16 md:py-24"
      >
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Journey</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2025, VELOCITA ELECTRONICS began with a simple mission: to make high-quality electronic components accessible to everyone, from hobbyists tinkering in their garages to engineers developing groundbreaking technology.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We saw a need for a reliable source that not only offered a wide range of products but also provided the support and resources necessary to bring ideas to life. Today, we're proud to be a trusted partner for thousands of innovators worldwide.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            {/* Replace with an actual image */}
            <img src="/images/about/our-story.jpg" alt="Our Story" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-16 md:py-24 bg-gray-100"
      >
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-block p-4 bg-primary-light text-primary rounded-full mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet the Team Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="py-16 md:py-24"
      >
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden text-center group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
        className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-dark text-white"
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-lg text-primary-light mb-8 max-w-2xl mx-auto">
            Explore our extensive catalog of electronic components and find everything you need for your next project.
          </p>
          <Link
            to="/products"
            className="btn-secondary inline-flex items-center text-lg px-8 py-3"
          >
            Browse Products
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
