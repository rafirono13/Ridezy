import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useMyBookings from '../../Hooks/Booking Hooks/useMyBookings';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import useCancelBooking from '../../Hooks/Booking Hooks/useCancelBooking';
import useModifyBooking from '../../Hooks/Booking Hooks/useModifyBooking';
import { format } from 'date-fns';

const MyBookings = () => {
  const { user } = useAuth();
  const [processingId, setProcessingId] = useState(null);
  const { data: bookings = [], isLoading, isError, error } = useMyBookings();
  const { mutate: cancelBooking } = useCancelBooking();
  const { mutate: modifyBooking } = useModifyBooking();

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

  // Placeholder functions for the action buttons
  const handleCancelBooking = (bookingId, carId) => {
    Swal.fire({
      title: 'Cancel Booking',
      text: 'Are you sure you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      ...swalThemeProps,
      confirmButtonText: 'Yes, cancel it!',
    }).then(result => {
      if (result.isConfirmed) {
        setProcessingId(bookingId);
        cancelBooking(
          { bookingId, carId },
          {
            onSuccess: () => {
              Swal.fire({
                title: 'Cancelled!',
                text: 'Your booking has been canceled.',
                icon: 'success',
                ...swalThemeProps,
              });
            },
            onError: error => {
              Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                ...swalThemeProps,
              });
            },
            onSettled: () => {
              setProcessingId(null);
            },
          }
        );
      }
    });
  };

  const handleModifyDate = (bookingId, currentBookingDate) => {
    Swal.fire({
      title: 'Modify Booking Date',
      html: `      <p class="my-2 text-sm text-gray-400">Select a new date for your booking:</p>
        <input
          type="date"
          id="booking-date-picker"
          class="swal2-input"
          // Use date-fns to reliably format the date to YYYY-MM-DD
          value="${format(new Date(currentBookingDate), 'yyyy-MM-dd')}"
        />`,
      confirmButtonText: 'Update Date',
      showCancelButton: true,
      ...swalThemeProps,
      preConfirm: () => {
        const newDate = document.getElementById('booking-date-picker').value;
        if (!newDate) {
          Swal.showValidationMessage('Please select a new date.');
          return false;
        }
        return newDate;
      },
    }).then(result => {
      if (result.isConfirmed && result.value) {
        setProcessingId(bookingId);
        modifyBooking(
          { bookingId, newBookingDate: result.value },
          {
            onSuccess: () => {
              Swal.fire({
                title: 'Date Updated!',
                text: 'Your booking date has been updated.',
                icon: 'success',
                ...swalThemeProps,
              });
            },
            onError: error => {
              Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                ...swalThemeProps,
              });
            },
            onSettled: () => {
              setProcessingId(null);
            },
          }
        );
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
    return <p className="text-center text-red-500 py-20">{error.message}</p>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-base-200/50 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">No Bookings Yet</h3>
            <p className="text-base-content/70 mb-4">
              You haven't booked any cars. Let's find you a ride!
            </p>
            <Link to="/available-cars" className="btn btn-primary">
              Browse Available Cars
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
            <table className="table w-full">
              <thead className="text-sm bg-base-200">
                <tr>
                  <th>Car</th>
                  <th>Booking Date</th>
                  <th>Total Price</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id} className="hover">
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={booking.imageUrl}
                              alt={booking.carModel}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{booking.carModel}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {format(new Date(booking.bookingDate), 'dd-MM-yyyy')}
                    </td>
                    <td className="font-semibold">${booking.totalPrice}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${
                          booking.status === 'confirmed'
                            ? 'badge-success'
                            : booking.status === 'cancelled'
                            ? 'badge-error'
                            : 'badge-ghost'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            handleModifyDate(booking._id, booking.bookingDate)
                          }
                          disabled={
                            booking.status !== 'confirmed' ||
                            processingId === booking._id
                          }
                          className="btn btn-ghost btn-xs"
                          aria-label="Modify Date"
                        >
                          {processingId === booking._id && (
                            <span className="loading loading-spinner loading-xs"></span>
                          )}
                          {processingId !== booking._id && (
                            <FiEdit className="text-blue-500" />
                          )}
                          Modify
                        </button>
                        <button
                          onClick={() =>
                            handleCancelBooking(booking._id, booking.carId)
                          }
                          className="btn btn-ghost btn-xs"
                          aria-label="Cancel Booking"
                          disabled={
                            booking.status === 'cancelled' ||
                            processingId === booking._id
                          }
                        >
                          {processingId === booking._id ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <FiTrash2 className="text-red-500" />
                          )}
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
