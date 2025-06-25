import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCarSide,
  FaDollarSign,
  FaRegThumbsUp,
  FaHeadset,
} from 'react-icons/fa';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCarSide className="h-10 w-10" />,
      title: 'Diverse Vehicle Fleet',
      description:
        'From economical compacts for city tours to premium luxury cars for special events, find the perfect ride to match your needs.',
    },
    {
      icon: <FaDollarSign className="h-10 w-10" />,
      title: 'Transparent Pricing',
      description:
        'Enjoy competitive, all-inclusive rates with no hidden fees. What you see is what you pay, ensuring a trustworthy rental experience.',
    },
    {
      icon: <FaRegThumbsUp className="h-10 w-10" />,
      title: 'Effortless Booking',
      description:
        'Our streamlined platform allows you to reserve your ideal car in just a few clicks. A seamless process from start to finish.',
    },
    {
      icon: <FaHeadset className="h-10 w-10" />,
      title: '24/7 Expert Support',
      description:
        'Our dedicated customer service team is always available to assist you with any questions or support you may need, anytime.',
    },
  ];

  return (
    <div className="py-20 sm:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Ridezy Advantage
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We are committed to providing a superior car rental experience by
            focusing on what matters most: quality, transparency, and
            unparalleled customer care.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map(feature => (
            <motion.div
              key={feature.title}
              className="group relative p-8 bg-gray-50/10 rounded-2xl overflow-hidden border border-gray-200/80 transition-all duration-300 ease-in-out hover:!bg-white focus-within:!bg-white active:!bg-white"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="">
                <div className="text-gray-800 mb-5 transition-transform duration-300 ease-linear group-hover:scale-125 group-hover:-rotate-12">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
