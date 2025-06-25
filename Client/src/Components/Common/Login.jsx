import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useSaveUser from '../../Hooks/useSaveUser';
import Swal from 'sweetalert2';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { from } = location.state || { from: { pathname: '/' } };
  const { mutate: saveUser } = useSaveUser();

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

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoginLoading(true);
    login(email, password)
      .then(res => {
        const user = res.user;
        console.log('User logged in successfully', user);
        navigate(from.pathname, { replace: true });
        Swal.fire({
          title: 'Logged In!',
          text: 'You have successfully logged in.',
          icon: 'success',
          ...swalThemeProps,
        });
      })
      .catch(err => {
        toast.error('Login failed: ' + err.message);
      })
      .finally(() => setLoginLoading(false));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(res => {
        const user = res.user;
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
          role: 'user',
        };
        saveUser(userData, {
          onSuccess: () => {
            navigate(from.pathname, { replace: true });
            Swal.fire({
              title: 'Signed In!',
              text: 'Successfully logged in with Google.',
              icon: 'success',
              ...swalThemeProps,
            });
          },
          onError: error => {
            console.error('Error saving user after Google login', error);
            toast.error(
              error.response?.data?.message ||
                'Failed to save user data. Please try again.'
            );
          },
        });
      })
      .catch(err => {
        console.log(err.message);
        toast.error('Google login failed: ' + err.message);
      });
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  // --- Animation Variants ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    tap: { scale: 0.97 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        <AnimatePresence initial={false}>
          <motion.div
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-6"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} custom={0}>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">Sign in to your account</p>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <motion.div variants={fadeInUp} custom={1}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <FiMail />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="input input-bordered w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={fadeInUp} custom={2}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <FiLock />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full pl-10 pr-10 py-3 rounded-xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-black transition duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </motion.div>

              {/* Forgot Password Link */}
              <motion.div variants={fadeInUp} custom={3} className="text-right">
                <a
                  href="#"
                  className="text-xs font-medium text-black hover:text-gray-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </motion.div>

              {/* Sign In Button */}
              <motion.div variants={fadeInUp} custom={4}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-black hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors duration-300"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-white border-t-transparent"
                        role="status"
                      ></motion.div>
                    </AnimatePresence>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight />
                    </>
                  )}
                </motion.button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                custom={5}
                className="flex items-center"
              >
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-3 text-gray-400 text-xs">
                  OR CONTINUE WITH
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </motion.div>

              {/* Google Button */}
              <motion.div variants={fadeInUp} custom={6}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3 px-4 rounded-xl font-medium text-gray-700 bg-white border border-gray-200 shadow-sm flex items-center justify-center gap-3 hover:shadow-md transition"
                >
                  <FcGoogle className="text-xl" />
                  <span>Google</span>
                </motion.button>
              </motion.div>

              {/* Register Link */}
              <motion.div
                variants={fadeInUp}
                custom={7}
                className="text-center text-sm text-gray-600"
              >
                Don't have an account?
                <Link
                  to="/auth/register"
                  className="font-medium text-black underline hover:text-gray-700 ml-1"
                >
                  Register
                </Link>
              </motion.div>
            </form>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
