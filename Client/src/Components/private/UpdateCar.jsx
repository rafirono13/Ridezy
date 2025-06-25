import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import useCarDetails from './../../Hooks/useCarDetails';
import useUpdateCar from '../../Hooks/MyCars hooks/useUpdateCar';
import Swal from 'sweetalert2';

const UpdateCar = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: car, isLoading: isLoadingDetails } = useCarDetails(id);

  const { mutate: updateCar, isPending: isUpdating } = useUpdateCar();

  const featureOptions = [
    'GPS Navigation',
    'AC',
    'Bluetooth',
    'Camera',
    'Auto',
    'Sunroof',
    'Leather Seats',
    'Premium Sound System',
    'Heated Seats',
    'All-Wheel Drive',
  ];

  const swalThemeProps = {
    background: '#FFFFFF',
    color: '#000000',
    iconColor: '#000000',
    confirmButtonColor: '#000000',
    customClass: {
      popup: 'rounded-xl',
      backdrop: 'backdrop-blur-sm bg-black/30',
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const updatedData = {
      carModel: formData.get('carModel'),
      dailyRentalPrice: parseFloat(formData.get('dailyRentalPrice')),
      vehicleRegistrationNumber: formData.get('vehicleRegistrationNumber'),
      features: formData.getAll('features'),
      description: formData.get('description'),
      location: formData.get('location'),
      imageUrl: formData.get('imageUrl'),
      isAvailable: formData.get('isAvailable') === 'on',
    };

    updateCar(
      { carId: id, updatedData },
      {
        onSuccess: () => {
          Swal.fire({
            title: 'Update Successful!',
            text: 'Your vehicle details have been updated.',
            icon: 'success',
            ...swalThemeProps,
          }).then(() => {
            navigate('/my-cars');
          });
        },
        onError: error => {
          Swal.fire({
            title: 'Update Failed',
            text: error.response?.data?.message || 'Could not update the car.',
            icon: 'error',
            ...swalThemeProps,
          });
        },
      }
    );
  };

  if (isLoadingDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!car) {
    return <div className="text-center py-20">Car not found.</div>;
  }

  return (
    <div>
      <div className="py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Update Car Details
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
          >
            {/* Car Model */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Car Model</span>
              </label>
              <input
                name="carModel"
                defaultValue={car.carModel}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Price & Registration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Daily Rental Price ($)
                  </span>
                </label>
                <input
                  name="dailyRentalPrice"
                  type="number"
                  defaultValue={car.dailyRentalPrice}
                  className="input input-bordered w-full"
                  min="1"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Registration Number
                  </span>
                </label>
                <input
                  name="vehicleRegistrationNumber"
                  defaultValue={car.vehicleRegistrationNumber}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                defaultValue={car.description}
                className="textarea textarea-bordered w-full"
                rows={4}
                required
              ></textarea>
            </div>

            {/* Image URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Image URL</span>
              </label>
              <input
                name="imageUrl"
                defaultValue={car.imageUrl}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Location & Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={car.location}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control flex justify-center items-end h-full">
                <label className="label cursor-pointer flex gap-4">
                  <span className="label-text font-medium">
                    Available for Booking
                  </span>
                  <input
                    type="checkbox"
                    name="isAvailable"
                    defaultChecked={car.isAvailable}
                    className="toggle toggle-success"
                  />
                </label>
              </div>
            </div>

            {/* Features */}
            <div className="form-control">
              <label className="label py-2">
                <span className="label-text font-medium">Features</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {featureOptions.map(feature => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 cursor-pointer pt-2"
                  >
                    <input
                      type="checkbox"
                      name="features"
                      value={feature}
                      defaultChecked={car.features?.includes(feature)}
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUpdating}
              className="btn btn-primary w-full mt-6"
            >
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner"></span>Updating...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCar;
