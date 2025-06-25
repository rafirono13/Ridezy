import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaChevronDown,
} from 'react-icons/fa';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-black rounded-[20px]">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-[url('https://i.ibb.co/rRsVtmYv/eibaidzkfmzbwbpdnmir.jpg')] bg-cover bg-center opacity-70"
      />

      {/* Content */}
      <div className="relative flex h-full items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center text-white max-w-4xl"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block">Ridezy Premium</span>
            <span className="block font-light">Car Rental Experience</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light"
          >
            Luxury vehicles. Transparent pricing.{' '}
            <span className="block mt-2">Seamless booking process.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <Link to="/available-cars">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor: '#ffffff',
                  color: '#000000',
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border-2 border-white text-white font-medium py-3 px-8 rounded-full text-lg md:text-xl transition-all duration-300 hover:bg-white hover:text-black"
              >
                Explore Collection
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-light"
          >
            <div className="flex items-center gap-2">
              <FaCheckCircle className="h-4 w-4" />
              <span>Verified Vehicles</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBolt className="h-4 w-4" />
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="h-4 w-4" />
              <span>Full Coverage</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;

//
