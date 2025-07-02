import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useCreateBooking = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async bookingDetails => {
      if (!user?.email) {
        throw new Error('User not logged in');
      }
      const res = await axiosSecure.post(`/bookings`, bookingDetails);
      return res.data;
    },
    // This part now works perfectly!
    onSuccess: (data, variables) => {
      // This tells the 'Available Cars' page to get fresh data
      queryClient.invalidateQueries({ queryKey: ['cars'] });

      // This tells the 'Car Details' page to get fresh data
      queryClient.invalidateQueries({ queryKey: ['car', variables.carId] });

      // These are for your other lists, which is great!
      queryClient.invalidateQueries({ queryKey: ['my-cars', user?.email] });
      queryClient.invalidateQueries({ queryKey: ['my-bookings', user?.email] });
    },
  });
};

export default useCreateBooking;
