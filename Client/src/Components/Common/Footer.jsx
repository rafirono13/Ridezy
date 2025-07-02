import React from 'react';
import { Link } from 'react-router';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black/20 text-white mt-16 rounded-t-2xl shadow-lg">
      <div className="w-11/12 md:w-10/12 mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Top section with Logo, Links, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ridezy Brand Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="text-3xl font-bold text-white hover:text-gray-300 transition-colors"
            >
              Ridezy
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Your journey, your car, your way. Drive your dreams with the
              perfect rental car from our extensive and reliable fleet.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="font-semibold tracking-wider uppercase text-gray-200">
              Quick Links
            </h6>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link
                to="/"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/available-cars"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                Available Cars
              </Link>
              <Link
                to="/my-bookings"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                My Bookings
              </Link>
              <Link
                to="/add-car"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                Add a Car
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h6 className="font-semibold tracking-wider uppercase text-gray-200">
              Legal
            </h6>
            <nav className="mt-4 flex flex-col space-y-2">
              <a
                href="#"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <a
                href="#"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="link link-hover text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </nav>
          </div>

          {/* Newsletter Subscription */}
          <div className="md:col-span-2 lg:col-span-1">
            <h6 className="font-semibold tracking-wider uppercase text-gray-200">
              Stay Updated
            </h6>
            <p className="mt-4 text-sm text-gray-400">
              Subscribe to our newsletter for the latest deals and updates.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
              <button
                type="submit"
                className="hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section with Copyright and Socials */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Ridezy. All Rights Reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
