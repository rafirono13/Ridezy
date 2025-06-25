import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div className="mt-5">
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-4 rounded-t-box">
        {/* Explore Section */}
        <nav>
          <h6 className="footer-title">Explore</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/available-cars" className="link link-hover">
            Available Cars
          </Link>
          <Link to="/auth/login" className="link link-hover">
            Login
          </Link>
          <Link to="/auth/register" className="link link-hover">
            Register
          </Link>
        </nav>

        {/* Dashboard Section */}
        <nav>
          <h6 className="footer-title">Dashboard</h6>
          <Link to="/my-cars" className="link link-hover">
            My Cars
          </Link>
          <Link to="/add-car" className="link link-hover">
            Add Car
          </Link>
          <Link to="/my-bookings" className="link link-hover">
            My Bookings
          </Link>
        </nav>

        {/* Legal Section */}
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
