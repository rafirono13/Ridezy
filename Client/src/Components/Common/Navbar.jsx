import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    const swalThemeProps = {
      background: '#FFFFFF',
      color: '#000000',
      iconColor: '#000000',
      confirmButtonColor: '#000000',
      customClass: {
        popup: 'rounded-xl',
        backdrop: 'backdrop-blur-sm bg-black/30',
      },
    };

    logout()
      .then(() => {
        navigate('/');
        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          ...swalThemeProps,
        });
      })
      .catch(err => {
        Swal.fire({
          title: 'Logout Failed',
          text: err.message || 'An error occurred during logout.',
          icon: 'error',
          ...swalThemeProps,
        });
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'font-bold border-b-2 border-white-focus'
      : 'hover:text-black-focus';

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-cars" className={navLinkClass}>
          Available Cars
        </NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-cars" className={navLinkClass}>
          Available Cars
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-car" className={navLinkClass}>
          Add Car
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-cars" className={navLinkClass}>
          My Cars
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-bookings" className={navLinkClass}>
          My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <motion.div>
        <div className="relative">
          <div className="p-4">
            <div className="navbar bg-transparent backdrop-blur-lg bg-white/10 border border-white/30 rounded-full shadow-md transition-all duration-300">
              <div className="navbar-start">
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="btn btn-ghost tooltip tooltip-bottom"
                    data-tip="Open Menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </button>
                </div>
                <Link
                  to="/"
                  className="font-bold text-xl md:text-2xl px-3 cursor-pointer text-black"
                >
                  Ridezy
                </Link>
              </div>

              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal space-x-6">
                  {user ? privateLinks : publicLinks}
                </ul>
              </div>

              <div className="navbar-end pr-2">
                {user ? (
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full ring ring-black ring-offset-base-100 ring-offset-2">
                        <img
                          alt="User Profile"
                          src={
                            user.photoURL ||
                            `https://ui-avatars.com/api/?name=${
                              user.displayName || 'User'
                            }&background=random`
                          }
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li className="p-2 font-semibold border-b mb-2">
                        Hi, {user.displayName || 'User'}
                      </li>
                      <li>
                        <Link to="/my-bookings">My Bookings</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    to="/auth/login"
                    className="btn btn-primary btn-outline rounded-full"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {isMenuOpen && (
        <div className="fixed inset-0 top-100 z-[999] px-4 flex justify-center items-center">
          <div className="bg-gray-200/80 glass p-6 rounded-2xl w-full max-w-sm shadow-2xl relative">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <IoMdClose size={20} />
            </button>

            <ul
              onClick={() => setIsMenuOpen(false)}
              className="menu text-lg space-y-2 mt-6 [&_a]:py-2"
            >
              {user ? privateLinks : publicLinks}
            </ul>

            <div className="mt-6 border-t pt-4">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-primary w-full text-white text-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary w-full text-lg"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
