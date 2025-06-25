import React from 'react';
import { motion } from 'framer-motion';
import Header from '../Common/Header';
import Banner from '../Common/Banner';
import WhyChooseUs from '../Common/Home/WhyChooseUs';
import RecentListings from '../Common/Home/RecentListings';
import SpecialOffers from '../Common/Home/SpecialOffers';
import PurposeTimeline from '../Common/Home/PurposeTimeline';
import FinalCallToAction from './../Common/Home/FinalCallToAction';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const Homepage = () => {
  return (
    <div>
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Header />
      </motion.header>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Banner />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <WhyChooseUs />
      </motion.section>

      <motion.section>
        <RecentListings />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <SpecialOffers />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <PurposeTimeline />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <FinalCallToAction />
      </motion.section>
    </div>
  );
};

export default Homepage;
