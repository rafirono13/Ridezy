import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from '../useAxiosSecure';

const useUpdateCar = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationFn: async ({ carId, updatedData }) => {
      if (!user.email) {
        throw new Error('User not logged in');
      }
      const res = await axiosSecure.put(`/cars/${carId}`, updatedData);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['my-cars', user?.email],
      });
      queryClient.invalidateQueries({
        queryKey: ['car', variables.carId],
      });
    },
  });
};

export default useUpdateCar;
