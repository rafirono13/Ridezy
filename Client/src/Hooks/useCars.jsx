import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../API/axiosInstance';

const useCars = (sortBy = 'dateAdded', order = 'desc', search = '') => {
  return useQuery({
    queryKey: ['cars', sortBy, order, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        sortBy,
        order,
      });

      if (search) {
        params.set('search', search);
      }

      const res = await axiosInstance.get(`/cars?${params.toString()}`);
      return res.data;
    },
  });
};

export default useCars;
