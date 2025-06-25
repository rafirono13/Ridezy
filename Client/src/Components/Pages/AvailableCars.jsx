import React, { useState, useEffect } from 'react';
import useCars from '../../Hooks/useCars';
import CarCard from '../Custom/CarCard';
import CarCardSkeleton from '../Custom/CarCardSkeleton';
import { FiGrid, FiList, FiSearch } from 'react-icons/fi';
import CarListItem from './../Custom/CarListItem';

const AvailableCars = () => {
  const [sortOption, setSortOption] = useState('dateAdded-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, order] = sortOption.split('-');
  const [view, setView] = useState(localStorage.getItem('carView') || 'grid');
  const {
    data: cars = [],
    isLoading,
    isError,
    error,
  } = useCars(sortBy, order, searchQuery);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && cars.length > 0) {
      setImagesLoaded(false);

      const imagePromises = cars.map(
        car =>
          new Promise(resolve => {
            const img = new Image();
            img.onload = img.onerror = resolve;
            img.src = car.imageUrl;
          })
      );

      Promise.all(imagePromises).then(() => setImagesLoaded(true));
    } else if (!isLoading && cars.length === 0) {
      setImagesLoaded(true);
    }
  }, [cars, isLoading]);

  useEffect(() => {
    localStorage.setItem('carView', view);
  }, [view]);

  const handleSearch = e => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  const showLoading = isLoading || (!imagesLoaded && cars.length > 0);

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold text-error mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-base-content/70">
          We couldn't load the cars right now. Please try again later.
        </p>
        <p className="text-xs text-base-content/50 mt-4">
          Error: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12 bg-base-200/30 rounded-box">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Available Cars
        </h1>
        <p className="text-center text-gray-500 mb-8 lg:mb-12">
          Find the perfect ride for your next adventure.
        </p>

        {/* --- 5. Search Bar Form --- */}
        <form
          onSubmit={handleSearch}
          className="mb-8 flex justify-center items-center w-8/12 mx-auto"
        >
          <div className="form-control flex">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search by model or location..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn btn-square btn-primary">
                <FiSearch className="text-xl" />
              </button>
            </div>
          </div>
        </form>

        {/* --- Controls: Sorting and View Toggle --- */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="tooltip" data-tip="Grid View">
              <button
                onClick={() => setView('grid')}
                className={`btn btn-outline btn-square ${
                  view === 'grid' ? '' : 'btn-ghost'
                }`}
                aria-label="Grid View"
              >
                <FiGrid className="text-xl" />
              </button>
            </div>
            <div className="tooltip" data-tip="List View">
              <button
                onClick={() => setView('list')}
                className={`btn btn-outline btn-square ${
                  view === 'list' ? '' : 'btn-ghost'
                }`}
                aria-label="List View"
              >
                <FiList className="text-xl" />
              </button>
            </div>
          </div>
          {/* Sorting Dropdown */}
          <div>
            <select
              className="select select-bordered select-sm outline-1"
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
              disabled={showLoading}
              aria-label="Sort cars by"
            >
              <option value="dateAdded-desc">Sort by: Newest</option>
              <option value="dateAdded-asc">Oldest</option>
              <option value="dailyRentalPrice-asc">Price: Low to High</option>
              <option value="dailyRentalPrice-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* --- Conditional Grid Rendering --- */}
        <div
          className={`gap-8 ${
            view === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col'
          }`}
          role="list"
        >
          {showLoading
            ? [...Array(6)].map((_, index) => <CarCardSkeleton key={index} />)
            : view === 'grid'
            ? cars.map(car => <CarCard key={car._id} car={car} />)
            : cars.map(car => <CarListItem key={car._id} car={car} />)}
        </div>

        {/* --- Handle No Results --- */}
        {!isLoading && cars.length === 0 && (
          <div className="text-center col-span-full py-20">
            <h3 className="text-xl font-semibold text-gray-700">
              No Cars Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your sorting options or check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
