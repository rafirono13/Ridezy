import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  const RLogoVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 1,
      },
    },
  };

  const pulsatingCircleVariants = {
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-white text-white p-4 font-inter">
      <motion.div
        className="relative flex flex-col items-center justify-center p-8 rounded-3xl backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 border border-gray-700 shadow-2xl overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="relative mb-8 flex items-center justify-center w-32 h-32 rounded-full bg-white bg-opacity-20 border-2 border-gray-600 shadow-xl overflow-hidden"
          variants={RLogoVariants}
        >
          <motion.div
            className="absolute inset-0 m-auto w-full h-full rounded-full bg-white/5"
            variants={pulsatingCircleVariants}
            animate="animate"
          ></motion.div>
          <motion.div
            className="absolute inset-0 m-auto w-3/4 h-3/4 rounded-full bg-white/10"
            variants={pulsatingCircleVariants}
            animate="animate"
            style={{ animationDelay: '0.2s' }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full bg-white/15"
            variants={pulsatingCircleVariants}
            animate="animate"
            style={{ animationDelay: '0.4s' }}
          ></motion.div>

          {/* The R letter */}
          <motion.span
            className="text-7xl font-extrabold text-white text-shadow-lg select-none z-10"
            variants={itemVariants}
          >
            R
          </motion.span>
        </motion.div>

        {/* App Name */}
        <motion.h2
          className="text-5xl font-light tracking-widest uppercase mb-3"
          variants={itemVariants}
        >
          RIDEZY
        </motion.h2>

        {/* Loading message */}
        <motion.p className="text-base text-gray-300" variants={itemVariants}>
          Loading your journey...
        </motion.p>
      </motion.div>

      <style>{`
        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
