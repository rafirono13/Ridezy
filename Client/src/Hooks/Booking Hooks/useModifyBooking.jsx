import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useModifyBooking = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationFn: async ({ bookingId, newBookingDate }) => {
      if (!user?.email) {
        throw new Error('Authetication is requied');
      }

      const res = await axiosSecure.patch(`/bookings/modify/${bookingId}`, {
        newBookingDate,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-bookings', user?.email],
      });
    },
  });
};

export default useModifyBooking;
