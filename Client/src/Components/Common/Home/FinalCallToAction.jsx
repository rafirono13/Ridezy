import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa6';

const FinalCallToAction = () => {
  return (
    <section className="py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-xl p-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Ready to Ride the Future?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8"
        >
          Dive into a smoother, smarter, and more stylish rental experience with
          Ridezy. Whether it’s for a weekend escape or daily hustle — we got the
          keys.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/available-cars"
            className="btn btn-primary btn-wide rounded-full text-lg group"
          >
            Explore Cars
            <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCallToAction;
