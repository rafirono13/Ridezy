import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Common/Navbar';

const Authloyout = () => {
  return (
    <div>
      <nav className="sticky top-0 z-10 w-10/12 mx-auto pt-5">
        <Navbar />
      </nav>
      <div className="p-6 min-h-screen mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Authloyout;
