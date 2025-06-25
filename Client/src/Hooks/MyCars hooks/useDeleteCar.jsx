import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useDeleteCar = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async carId => {
      if (!user.email) {
        throw new Error('User not logged in');
      }
      const res = await axiosSecure.delete(`/cars/${carId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cars', user?.email] });
    },
  });
};

export default useDeleteCar;
