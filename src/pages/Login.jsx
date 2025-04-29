import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const { setaToken, backEndUrl } = useContext(AdminContext);
  const { setdToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backEndUrl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setaToken(data.token);
          if (data.message) {
            toast.success(data.message);
          }
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post(backEndUrl + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setdToken(data.token);
          if (data.message) {
            toast.success(data.message);
          }
          navigate("/");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response);
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50 ">

      {/* Left side - Welcome */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-blue-300 to-blue-500 items-center justify-center p-8">
        <div className="text-center">
          <img
            src="https://res.cloudinary.com/dophfzeep/image/upload/v1745762836/momo-studio-iZZnEuE5R8A-unsplash_mqqzmx.jpg"
            alt="Doctor Appointment"
            className="rounded-lg shadow-lg mb-6 object-cover w-80 max-w-full mx-auto"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Admin Dashboard - DocCure
          </h1>
          <p className="text-base md:text-lg text-white/90">
            Streamline healthcare operations and keep everything organized.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}

      <div className="h-svh flex flex-col justify-center items-center w-full lg:w-1/2 bg-blue-200 px-4 sm:px-8 py-10 sm:py-16">

        {/* Title Box */}
        <div className=" flex  flex-col lg:hidden mb-6 sm:mb-8 text-center bg-white/60 p-4 sm:p-6 rounded-xl shadow">
          <p className="text-xl sm:text-2xl font-bold text-blue-700">Admin Dashboard - DocCure</p>
          <p className="text-sm sm:text-base text-gray-700 mt-2">
            Streamline healthcare operations and keep everything organized.
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md bg-white/65 rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-blue-700 text-center mb-6">
            {state} Login
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Switch Login Type */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            {state === 'Admin' ? (
              <>
                Doctor?{' '}
                <button
                  type="button"
                  onClick={() => setState('Doctor')}
                  className="text-blue-600 hover:underline"
                >
                  Switch to Doctor Login
                </button>
              </>
            ) : (
              <>
                Admin?{' '}
                <button
                  type="button"
                  onClick={() => setState('Admin')}
                  className="text-blue-600 hover:underline"
                >
                  Switch to Admin Login
                </button>
              </>
            )}
          </p>

        </div>
      </div>


    </div>
  );
};

export default Login;
