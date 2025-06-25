import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useMyBookings = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ['my-bookings', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) return;
      const res = await axiosSecure.get(`/my-bookings`);
      return res.data;
    },
  });
};

export default useMyBookings;
