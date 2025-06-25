import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ridezy-server-side.vercel.app',
});

export default axiosInstance;
