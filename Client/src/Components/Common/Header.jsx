import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

// Animation variants for the container to orchestrate the children's animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adds a small delay between each child animating in
    },
  },
};

// Animation variants for individual text elements to slide up and fade in
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Header = () => {
  // Hook for the typewriter effect
  const [typeEffect] = useTypewriter({
    words: [
      'Find Budget-Friendly Rides.',
      'Explore Luxury Sedans.',
      'Book Spacious SUVs.',
      'Rent Premium EVs.',
    ],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  return (
    <div className="text-center py-16 md:py-24 px-4">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* SEO H1 Tag: Clear and keyword-rich */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-800"
          variants={itemVariants}
        >
          Your Perfect Car,{' '}
          <span className="text-primary">Just a Click Away.</span>
        </motion.h1>

        {/* Engaging Sub-headline */}
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Unlock your next journey with Ridezy. We offer a seamless rental
          experience, from compact cars for city trips to luxury vehicles for
          that special occasion.
        </motion.p>

        {/* Dynamic Typewriter Effect for Engagement */}
        <motion.div
          className="mt-6 text-2xl md:text-3xl font-semibold text-secondary h-12" // h-12 ensures no layout shift
          variants={itemVariants}
        >
          <span>{typeEffect}</span>
          <Cursor cursorStyle="|" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
