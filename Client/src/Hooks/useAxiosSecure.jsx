import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const axiosSecure = axios.create({
  baseURL: 'https://ridezy-server-side.vercel.app',
});

const useAxiosSecure = () => {
  const { idToken, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercepter for outgoing response
    const requestInterceptor = axiosSecure.interceptors.request.use(
      config => {
        if (idToken) {
          config.headers.Authorization = `Bearer ${idToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // intercepter for incoming response
    const responseInterceptor = axiosSecure.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logout();
          navigate('/auth/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [idToken, logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
