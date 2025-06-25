import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useCancelBooking = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async ({ bookingId, carId }) => {
      if (!user?.email) {
        throw new Error('You must be logged in to cancel a booking');
      }
      const res = await axiosSecure.patch(`/bookings/cancel/${bookingId}`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['my-bookings', user?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ['car', variables.carId],
      });
    },
  });
};

export default useCancelBooking;
