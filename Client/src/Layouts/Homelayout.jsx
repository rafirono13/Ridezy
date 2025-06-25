import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../Components/Common/Navbar';
import Footer from '../Components/Common/Footer';
import useAuth from '../Hooks/useAuth';
import LoadingScreen from '../Components/Custom/LoadingScreen';

const Homelayout = () => {
  const location = useLocation();
  const { loading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-[1000] w-full bg-transparent backdrop-blur-md bg-white/10 border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="w-11/12 md:w-10/12 mx-auto">
          <Navbar />
        </div>
      </header>
      <div className="px-4 md:w-10/12 md:p-10 min-h-screen mx-auto">
        <Outlet></Outlet>
      </div>
      <footer className="w-11/12 md:w-10/12 mx-auto">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Homelayout;
