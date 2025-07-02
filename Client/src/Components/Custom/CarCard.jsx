import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const CarCard = ({ car }) => {
  const {
    _id,
    carModel,
    imageUrl,
    location,
    dateAdded,
    dailyRentalPrice,
    isAvailable,
  } = car;

  return (
    <motion.div
      className="card card-compact bg-white/10 shadow-xl border rounded-2xl overflow-hidden"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <figure className="relative">
        <img
          src={imageUrl}
          alt={carModel}
          className="w-full h-56 object-cover"
        />
        <div
          className={`absolute top-3 right-3 badge-lg badge font-semibold ${
            isAvailable
              ? 'border-green-700 bg-green-500/20 text-white'
              : 'badge-error text-white'
          }`}
        >
          {isAvailable ? 'Available' : 'Booked'}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{carModel}</h2>
        <div className="flex items-center  text-sm mt-1">
          <FaMapMarkerAlt className="mr-2" /> {location}
        </div>
        <div className="flex items-center  text-sm">
          <FaCalendarAlt className="mr-2" />
          Posted {formatDistanceToNow(new Date(dateAdded))} ago
        </div>
        <div className="card-actions justify-between items-center mt-4">
          <p className="font-bold text-lg">
            <span className="text-primary">${dailyRentalPrice}</span>
            <span className=" font-normal text-sm">/day</span>
          </p>
          <Link
            to={`/cars/${_id}`}
            className="btn btn-primary btn-outline btn-sm rounded-full px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
