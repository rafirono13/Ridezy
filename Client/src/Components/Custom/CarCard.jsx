import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { animate } from 'motion';

const CarCard = ({ car }) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      animate(
        cardElement,
        {
          opacity: [0, 1],
          y: [20, 0],
          scale: [0.98, 1],
        },
        { duration: 0.5, easing: 'ease-out' }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="card bg-[#e0e9f3dc] shadow-xl rounded-2xl overflow-hidden border border-transparent hover:border-primary transition-all duration-300"
      role="listitem"
    >
      <figure className="relative h-56">
        <img
          src={car.imageUrl}
          alt={`Image of ${car.carModel}`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </figure>
      <div className="card-body p-5">
        <h2
          className="card-title text-xl font-bold text-gray-800"
          aria-label={`Car Model: ${car.carModel}`}
        >
          {car.carModel}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{car.location}</p>
        <p className="text-xs text-gray-400 mt-2">
          Posted {formatDistanceToNow(new Date(car.dateAdded))} ago
        </p>

        <div
          className={`badge mt-1 ${
            car.isAvailable
              ? 'outline-green-800 text-green-800'
              : 'outline-red-800 text-red-800'
          } badge-outline text-xs`}
          aria-label={`Car Status: ${car.isAvailable ? 'Available' : 'Booked'}`}
        >
          {car.isAvailable ? 'Available' : 'Booked'}
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <p
            className="text-lg font-semibold text-primary"
            aria-label={`Rental Price: $${car.dailyRentalPrice} per day`}
          >
            ${car.dailyRentalPrice}
            <span className="text-sm font-normal text-gray-600">/day</span>
          </p>
          <Link
            to={`/cars/${car._id}`}
            className="btn btn-primary btn-outline rounded-full px-6 tooltip"
            aria-label={`View details for ${car.carModel}`}
            role="button"
            data-tip="Click to view Details"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
