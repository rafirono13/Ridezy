import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa6';
import { formatDistanceToNow } from 'date-fns';
import useCars from '../../../Hooks/useCars';

const RecentListings = () => {
  const {
    data: cars = [],
    isLoading,
    isError,
    error,
  } = useCars('dateAdded', 'desc');

  const recentCars = cars.slice(0, 6);

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Recent Listings
          </h2>
          <p className="text-gray-300 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Explore our latest car additions — luxury and budget options updated
            daily.
          </p>
        </div>

        {/* Fancy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="min-h-[300px] rounded-xl border border-white/10 bg-white/5 backdrop-blur-md animate-pulse"
              />
            ))
          ) : isError ? (
            <div className="col-span-full text-center bg-red-100 p-6 rounded">
              <p className="text-red-600 font-semibold">
                Failed to load recent listings.
              </p>
              <p className="text-red-400 text-sm">{error?.message}</p>
            </div>
          ) : (
            recentCars.map(car => (
              <div
                key={car._id}
                className="rounded-2xl p-4 border border-white/20 backdrop-blur-md bg-white/5 glass shadow-md hover:shadow-[0_0_20px_#ffffff40] transition-all duration-300 flex flex-col"
              >
                <figure className="rounded-xl overflow-hidden mb-4 h-40 sm:h-48">
                  <img
                    src={car.imageUrl}
                    alt={car.carModel}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </figure>

                <div className="flex flex-col flex-grow text-white space-y-2">
                  <h3 className="text-lg font-bold">{car.carModel}</h3>
                  <p className="text-sm text-gray-300">
                    Added {formatDistanceToNow(new Date(car.dateAdded))} ago
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-primary">
                      ${car.dailyRentalPrice}
                    </span>
                    <span className="text-gray-300"> /day</span>
                  </p>
                  <p
                    className={`text-xs px-2 py-1 w-max rounded-full ${
                      car.isAvailable
                        ? 'bg-green-200/10 text-green-300 border border-green-400/30'
                        : 'bg-red-200/10 text-red-300 border border-red-400/30'
                    }`}
                  >
                    {car.isAvailable ? 'Available' : 'Booked'}
                  </p>
                  <p className="text-xs">
                    Booking Count: {car.bookingCount || 0}
                  </p>
                </div>

                <div className="mt-auto pt-4 text-right">
                  <Link
                    to={`/cars/${car._id}`}
                    className="text-sm text-white underline underline-offset-2 hover:text-primary transition-all"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <Link to="/available-cars" className="btn btn-primary btn-wide group">
            View All Cars
            <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentListings;
