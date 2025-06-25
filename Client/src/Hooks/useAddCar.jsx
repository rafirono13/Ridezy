import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAddCar = () => {
  const axiosSecure = useAxiosSecure();
  return useMutation({
    mutationFn: async carData => {
      const res = await axiosSecure.post('/cars', carData);
      return res.data;
    },
  });
};

export default useAddCar;
