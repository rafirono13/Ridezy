import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; // Corrected import for React Router Link

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: 0.8,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 font-inter">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-white backdrop-filter backdrop-blur-lg bg-opacity-5 border border-gray-800 shadow-xl"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border border-gray-700 shadow-2xl max-w-xl w-full text-center text-black overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-8xl sm:text-9xl font-extrabold tracking-wider mb-4 text-black"
          variants={itemVariants}
        >
          404
        </motion.h1>

        <motion.p
          className="text-2xl sm:text-3xl font-semibold mt-4 mb-6 text-black"
          variants={itemVariants}
        >
          Oops! Page Not Found
        </motion.p>

        <motion.p
          className="text-md sm:text-lg mb-10 text-gray-800"
          variants={itemVariants}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </motion.p>

        <motion.div variants={buttonVariants}>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-white/10 hover:bg-gray-100/30 transition-colors duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>

      <style jsx>{`
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
