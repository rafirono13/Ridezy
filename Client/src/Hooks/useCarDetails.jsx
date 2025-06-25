import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../API/axiosInstance';

const useCarDetails = id => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/cars/${id}`);
      return res.data;
    },
  });
};

export default useCarDetails;
