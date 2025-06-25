import { createBrowserRouter } from 'react-router';
import Homelayout from '../Layouts/Homelayout';
import NotFound from '../Components/Common/NotFound';
import Login from '../Components/Common/Login';
import Register from '../Components/Common/Register';
import Authloyout from '../Layouts/Authloyout';
import Homepage from './../Components/Pages/Homepage';
import PrivateRoute from './PrivateRoute';
import MyCars from './../Components/private/MyCars';
import MyBookings from './../Components/private/MyBookings';
import UpdateCar from './../Components/private/UpdateCar';
import AddCar from './../Components/private/AddCar';
import AvailableCars from '../Components/Pages/AvailableCars';
import CarDetails from './../Components/Pages/CarDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homelayout></Homelayout>,
    children: [
      {
        index: true,
        element: <Homepage></Homepage>,
      },
      {
        path: '/available-cars',
        element: <AvailableCars></AvailableCars>,
      },
      {
        path: '/cars/:id',
        element: <CarDetails></CarDetails>,
      },
      {
        path: '/my-cars',
        element: (
          <PrivateRoute>
            <MyCars></MyCars>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: '/add-car',
        element: (
          <PrivateRoute>
            <AddCar></AddCar>
          </PrivateRoute>
        ),
      },
      {
        path: '/update-car/:id',
        element: (
          <PrivateRoute>
            <UpdateCar></UpdateCar>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: <Authloyout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
