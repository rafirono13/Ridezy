import React from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaStar, FaCalendarPlus, FaBell } from 'react-icons/fa';
import { FaRegBell } from 'react-icons/fa6';

const offers = [
  {
    icon: <FaTag className="h-6 w-6 text-white/90" />,
    title: '15% Off Weekend Rides',
    desc: 'Book from Friday to Sunday and save big on a wide selection of our best cars!',
    cta: 'Book Now',
    tooltip: 'View weekend deals',
  },
  {
    icon: <FaStar className="h-6 w-6 text-white/90" />,
    title: 'Luxury Cars at $99/day',
    desc: 'This holiday season, treat yourself to a premium driving experience without the premium price tag.',
    cta: 'Reserve Today',
    tooltip: 'Explore luxury fleet',
  },
  {
    icon: <FaCalendarPlus className="h-6 w-6 text-white/90" />,
    title: 'Free Extra Day',
    desc: 'Rent any car for 3 consecutive days and get the 4th day on us! Limited time only.',
    cta: 'Grab Deal',
    tooltip: 'Learn more about this offer',
  },
];

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardItemVariants = {
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

const SpecialOffers = () => {
  return (
    <section aria-label="Special Offers" className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center text-center">
            <span className="flex gap-2">
              Special Offers
              <FaRegBell />
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Drive more, spend less. Explore our special car rental offers
            available for a limited time. From discounts to freebies, ride
            smarter with Ridezy.
          </p>
        </div>

        {/* Glassy Offer Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {offers.map(offer => (
            <motion.div
              key={offer.title}
              variants={cardItemVariants}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl p-6 border border-white/20 backdrop-blur-md bg-white/5 shadow-[0_0_20px_#ffffff20] transition-all duration-300 flex flex-col"
            >
              <div className="flex-grow">
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  {offer.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {offer.title}
                </h3>
                <p className="text-sm text-white/80 mb-4">{offer.desc}</p>
              </div>
              <button
                className="btn btn-outline text-white hover:bg-white/10 w-full mt-auto"
                data-tooltip-id={offer.tooltip}
              >
                {offer.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
