import React from 'react';
import useAuth from './../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import useAddCar from '../../Hooks/useAddCar';
import Swal from 'sweetalert2';

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate: addCar, isPending } = useAddCar();

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
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const carData = {
      carModel: formData.get('carModel'),
      dailyRentalPrice: parseFloat(formData.get('dailyRentalPrice')),
      vehicleRegistrationNumber: formData.get('vehicleRegistrationNumber'),
      features: formData.getAll('features'),
      description: formData.get('description'),
      location: formData.get('location'),
      imageUrl: formData.get('imageUrl'),
      isAvailable: formData.get('isAvailable') === 'on',
      userEmail: user?.email,
      userName: user?.displayName,
    };
    addCar(carData, {
      onSuccess: () => {
        Swal.fire({
          title: 'Car Added Successfully!',
          text: 'Your vehicle is now listed in "My Cars".',
          icon: 'success',
          background: '#FFFFFF', // White background
          color: '#000000', // Black text
          iconColor: '#000000', // Black icon
          confirmButtonText: 'View My Cars',
          confirmButtonColor: '#000000', // Black button
          // SweetAlert2 usually handles button text color for contrast (e.g., white text on black button)
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/my-cars');
          }
        });
      },
      onError: error => {
        console.error('Error adding car:', error);
        Swal.fire({
          title: 'Oops! Something Went Wrong',
          text:
            error.response?.data?.message ||
            'Could not add car. Please check your input and try again.',
          icon: 'error',
          background: '#000000', // Black background
          color: '#FFFFFF', // White text
          iconColor: '#FF3B30', // A clear red for the error icon on dark background
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#FF3B30', // Red button for error action
        });
      },
    });
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a New Car</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          {/* Car Model */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Car Model</span>
            </label>
            <input
              name="carModel"
              placeholder="e.g., BMW X5 2024"
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
                placeholder="e.g., 120"
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
                placeholder="e.g., DHK-LUX-2024-005"
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
              placeholder="Describe the car features and condition..."
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
              placeholder="https://example.com/car-image.jpg"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Location & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <input
                name="location"
                type="text"
                placeholder="e.g., London, UK"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control flex justify-center items-end">
              <label className="label cursor-pointer flex gap-4">
                <span className="label-text font-medium">
                  Available for Booking
                </span>
                <input
                  type="checkbox"
                  name="isAvailable"
                  defaultChecked
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
            disabled={isPending}
            className="btn btn-primary w-full mt-6"
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span>
                Adding Car...
              </>
            ) : (
              'Add Car to Inventory'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
