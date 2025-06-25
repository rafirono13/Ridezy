import { useQuery } from '@tanstack/react-query';
import useAuth from '../useAuth';
import useAxiosSecure from './../useAxiosSecure';

const useMyCars = (email, sortOrder = 'newest') => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const getSortParams = () => {
    switch (sortOrder) {
      case 'price-asc':
        return { sortBy: 'dailyRentalPrice', order: 'asc' };
      case 'price-desc':
        return { sortBy: 'dailyRentalPrice', order: 'desc' };
      case 'oldest':
        return { sortBy: 'dateAdded', order: 'asc' };
      case 'newest':
      default:
        return { sortBy: 'dateAdded', order: 'desc' };
    }
  };

  const { sortBy, order } = getSortParams();

  return useQuery({
    queryKey: ['my-cars', email, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-cars?&sortBy=${sortBy}&order=${order}`
      );
      return res.data;
    },

    enabled: !!email,
  });
};

export default useMyCars;
