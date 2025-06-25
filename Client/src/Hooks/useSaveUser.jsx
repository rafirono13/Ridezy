import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../API/axiosInstance';

const useSaveUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async user => {
      const res = await axiosInstance.post('/users', user);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: error => {
      console.error('Error saving user', error.message);
    },
  });

  return mutation;
};

export default useSaveUser;
