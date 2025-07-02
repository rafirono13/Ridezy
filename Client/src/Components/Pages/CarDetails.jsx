import { useNavigate, useParams } from 'react-router';
import useCarDetails from '../../Hooks/useCarDetails';
import { FiArrowLeft, FiMapPin, FiTag, FiUser } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../../Hooks/useAuth';
import useCreateBooking from '../../Hooks/Booking Hooks/useCreateBooking';
import Swal from 'sweetalert2';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: car, isLoading, isError, error } = useCarDetails(id);
  const { mutate: createBooking, isPending: isBooking } = useCreateBooking();

  // DELETED: We are removing the local `isBooked` state to rely on the database.
  // const [isBooked, setIsBooked] = useState(false);

  const handleBookNow = () => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    Swal.fire({
      title: `Confirm Your Booking`,
      html: `You are about to book the <strong>${car.carModel}</strong>.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm & Book!',
    }).then(result => {
      if (result.isConfirmed) {
        const bookingDetails = {
          carId: car._id,
          carModel: car.carModel,
          imageUrl: car.imageUrl,
          totalPrice: car.dailyRentalPrice,
        };
        createBooking(bookingDetails, {
          onSuccess: () => {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Booking Confirmed!',
              showConfirmButton: false,
              timer: 3000,
            });
            // DELETED: No more setIsBooked(true).
            // The query invalidation in useCreateBooking will automatically refresh the car's data.
          },
          onError: err => {
            Swal.fire(
              'Booking Failed',
              err.response?.data?.message || err.message,
              'error'
            );
          },
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error loading car: {error.message}</p>
      </div>
    );
  }

  // THE FIX: The button's state is now derived *only* from the server data (`car.isAvailable`).
  const isButtonDisabled = isBooking || !car?.isAvailable;

  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="max-w-5xl mx-auto md:px-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-sm mb-6"
          >
            <FiArrowLeft /> Back
          </button>

          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className="lg:w-1/2 w-full h-80 lg:h-auto">
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body lg:w-1/2">
              <span className="badge badge-primary badge-outline">
                Posted {formatDistanceToNow(new Date(car.dateAdded))} ago
              </span>
              <h2 className="card-title text-3xl font-bold">{car.carModel}</h2>
              <div className="flex items-center gap-4 text-sm text-base-content/70 mt-2">
                <span className="flex items-center gap-1">
                  <FiUser /> {car.userName}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin /> {car.location}
                </span>
              </div>
              <p className="mt-4">{car.description}</p>
              <div className="mt-4">
                <p className="font-semibold mb-2">Features:</p>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <span key={index} className="badge badge-ghost">
                      <FiTag className="mr-1" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-actions justify-between items-center mt-6">
                <p className="text-2xl font-bold text-primary">
                  ${car.dailyRentalPrice}
                  <span className="text-base font-normal text-base-content/80">
                    /day
                  </span>
                </p>

                {/* THE FIX: This button now correctly shows its state based on data from the database. */}
                <button
                  onClick={handleBookNow}
                  className="btn btn-primary"
                  disabled={isButtonDisabled}
                >
                  {isBooking && (
                    <span className="loading loading-spinner"></span>
                  )}
                  {isBooking
                    ? 'Booking...'
                    : !car?.isAvailable
                    ? 'Booked'
                    : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
