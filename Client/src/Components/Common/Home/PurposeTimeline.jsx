import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const timelineData = [
  {
    year: '2018',
    title: 'The Idea Sparked',
    text: 'Frustrated by unreliable car rentals, we envisioned a platform built on trust, transparency, and tech-driven service.',
  },
  {
    year: '2019',
    title: 'Foundation & Research',
    text: 'Studied user behaviors, market gaps, and rental pain points. Crafted the blueprint of Ridezy’s philosophy.',
  },
  {
    year: '2020',
    title: 'Beta Launch',
    text: 'With a minimal fleet and powerful UI, Ridezy launched for a limited region, gathering early feedback.',
  },
  {
    year: '2021',
    title: 'Scaling the Fleet',
    text: 'Partnered with major dealers and integrated real-time booking. Fleet grew, so did trust.',
  },
  {
    year: '2024',
    title: 'Reimagining Experience',
    text: 'Ridezy now blends luxury and logic. From weekenders to digital nomads — we serve all with elegance.',
  },
];

const PurposeTimeline = () => {
  return (
    <section className="py-20 sm:py-28 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Discover the evolution of Ridezy, from an idea to a growing
            revolution in modern car rentals.
          </p>
        </motion.div>

        <div className="border-l border-white/20 pl-6 space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-8 top-0 bg-primary rounded-full w-4 h-4 border-2 border-white"></div>
              <time className="block text-sm text-white/50 font-mono mb-1">
                {item.year}
              </time>
              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              <p className="text-white/80 text-sm max-w-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurposeTimeline;
