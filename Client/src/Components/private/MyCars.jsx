import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import useAuth from './../../Hooks/useAuth';
import useMyCars from '../../Hooks/MyCars hooks/useMyCars';
import useDeleteCar from '../../Hooks/MyCars hooks/useDeleteCar';
import Swal from 'sweetalert2';

const MyCars = () => {
  const { user } = useAuth();
  const [sortOrder, setSortOrder] = useState('newest');
  const [processingCarId, setProcessingCarId] = useState(null);
  const navigate = useNavigate();
  const {
    data: cars = [],
    isLoading,
    isError,
    error,
  } = useMyCars(user?.email, sortOrder);
  const { mutate: deleteCar, isPending: isDeleting } = useDeleteCar();

  const swalThemeProps = {
    background: '#FFFFFF',
    color: '#000000',
    iconColor: '#000000',
    confirmButtonColor: '#000000',
    cancelButtonColor: '#000000',
    customClass: {
      popup: 'rounded-xl',
      backdrop: 'backdrop-blur-sm bg-black/30',
    },
  };

  const handleUpdate = carId => {
    navigate(`/update-car/${carId}`);
  };

  const handleDelete = carId => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      ...swalThemeProps,
      // Note: confirmButtonColor and cancelButtonColor from swalThemeProps will override defaults or previous values
    }).then(result => {
      if (result.isConfirmed) {
        setProcessingCarId(carId);
        deleteCar(carId, {
          onSuccess: () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your car has been removed.',
              icon: 'success',
              ...swalThemeProps,
            });
          },
          onError: err => {
            Swal.fire({
              title: 'Error!',
              text:
                err.response?.data?.message ||
                err.message ||
                'Could not delete the car.',
              icon: 'error',
              ...swalThemeProps,
            });
          },
          onSettled: () => {
            setProcessingCarId(null);
          },
        });
      }
    });
  };

  const handleSortChange = e => {
    setSortOrder(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500 py-20">{error.message}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex-col flex md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold ">My Listed Cars</h2>
        {/* TODO: Add Sorting Dropdowns Here */}
        <div className="flex items-center gap-4">
          <h3 className="text-md font-medium">SortBy:</h3>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="select select-bordered select-sm w-full max-w-xs"
          >
            <option value="newest">Date (Newest First)</option>
            <option value="oldest">Date (Oldest First)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-16 bg-base-100/30 backdrop-blur-sm border border-dashed rounded-xl">
          <p className="text-xl mb-4">You haven't added any cars yet.</p>
          <Link to="/add-car" className="btn btn-primary">
            Add Your First Car
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100/30 backdrop-blur-sm border border-dashed border-gray-500/50 rounded-xl p-4">
          <table className="table w-full bg-transparent">
            <thead className="bg-transparent text-base-content/80">
              <tr>
                <th className="bg-transparent font-bold">Car</th>
                <th className="bg-transparent font-bold">Daily Price</th>
                <th className="bg-transparent font-bold">Booking Count</th>
                <th className="bg-transparent font-bold">Availability</th>
                <th className="bg-transparent font-bold">Date Added</th>
                <th className="bg-transparent font-bold">Actions</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {cars.map(car => (
                <tr key={car._id} className="hover">
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-18 h-18">
                          <img src={car.imageUrl} alt={car.carModel} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{car.carModel}</div>
                        <div className="text-sm opacity-60">{car.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>${car.dailyRentalPrice}/day</td>
                  <td className="text-center">{car.bookingCount}</td>
                  <td>
                    {car.isAvailable ? (
                      <span className="border-1 p-2 rounded-full text-[#255F38]">
                        Available
                      </span>
                    ) : (
                      <span className="badge badge-error badge-outline">
                        Booked
                      </span>
                    )}
                  </td>
                  <td className="pl-6">
                    {new Date(car.dateAdded).toLocaleDateString()}
                  </td>
                  <td className="space-x-3">
                    <button
                      onClick={() => handleUpdate(car._id)}
                      disabled={isDeleting || processingCarId === car._id}
                      className="btn btn-info btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      disabled={isDeleting || processingCarId === car._id}
                      className="btn btn-error btn-sm"
                    >
                      {isDeleting || processingCarId === car._id ? (
                        <span className="loading loading-spinner loading-xs mr-1"></span>
                      ) : null}
                      {isDeleting || processingCarId === car._id
                        ? 'Deleting...'
                        : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCars;
