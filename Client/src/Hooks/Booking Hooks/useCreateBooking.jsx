import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useCreateBooking = () => {
  const queryCilent = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationFn: async bookingDetails => {
      if (!user.email) {
        throw new Error('User not logged in');
      }
      const res = await axiosSecure.post(`/bookings`, bookingDetails);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryCilent.invalidateQueries({ queryKey: ['my-cars', user?.email] });
      queryCilent.invalidateQueries({ queryKey: ['car', variables.carId] });
      queryCilent.invalidateQueries({ queryKey: ['my-bookings', user?.email] });
    },
  });
};

export default useCreateBooking;
