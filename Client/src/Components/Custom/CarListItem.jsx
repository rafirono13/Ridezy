import { Link } from 'react-router';

const CarListItem = ({ car }) => {
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 w-full">
        <figure className="w-1/3 sm:w-1/4">
          <img
            src={car.imageUrl}
            alt={car.carModel}
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body p-4 sm:p-6 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="card-title text-lg sm:text-xl font-bold">
                {car.carModel}
              </h2>
              <p className="text-sm text-base-content/70">{car.location}</p>
            </div>
            <div className="text-right">
              <p className="text-lg sm:text-xl font-bold text-primary">
                ${car.dailyRentalPrice}
                <span className="text-sm font-normal text-base-content/70">
                  /day
                </span>
              </p>
              <span
                className={`badge mt-1 ${
                  car.isAvailable
                    ? ' outline-green-800 text-green-800'
                    : ' outline-red-800 text-red-800'
                } badge-outline text-xs`}
              >
                {car.isAvailable ? 'Available' : 'Booked'}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-base-content/60 my-2 line-clamp-2">
            {car.description}
          </p>
          <div className="card-actions justify-end mt-auto">
            <Link
              to={`/cars/${car._id}`}
              className="btn btn-primary btn-sm tooltip"
              data-tip="Click to view Details"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListItem;
