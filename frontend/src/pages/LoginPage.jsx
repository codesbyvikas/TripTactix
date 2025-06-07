import React, { useState } from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { apiHelper } from '../lib/apiHelper';

const CustomLoader = () => (
  <div className="loader">Loading...</div> // Replace with your actual loader component or spinner
);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      setIsLoading(true);
      const result = await apiHelper.login({ email, password });
      setIsLoading(false);

      if (result.error) {
        setError(result.error);
      } else {
        console.log('Login success:', result.data);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Left half - Logo section */}
      <div className="w-full md:w-1/2 h-32 md:h-screen flex flex-col bg-[#0A1429] items-center justify-center py-4 md:py-0">
        <img src={logo} alt="Logo" className="max-h-16 md:max-h-100 w-auto" />
      </div>

      {/* Right half - Login form */}
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-full bg-[#0A65B3]">
          <CustomLoader />
        </div>
      ) : (
        <div className="w-full md:w-1/2 min-h-screen md:h-screen bg-[#0A65B3] flex flex-col p-6 md:p-20 justify-center">
          <div className="w-full flex flex-col max-w-[450px] mx-auto">
            <div className="w-full flex flex-col mb-6 md:mb-10 text-white">
              <h3 className="text-2xl md:text-4xl font-bold mb-2">Login</h3>
              <p className="text-base md:text-lg mb-4">
                Welcome! Please enter your information below to begin.
              </p>
            </div>

            <div className="w-full flex flex-col mb-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="w-full flex flex-col mb-4">
              <button
                onClick={handleLogin}
                className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#0A65B3] transition-colors duration-200"
              >
                Login
              </button>
            </div>

            <div className="w-full flex items-center justify-center relative py-4">
              <div className="w-full h-[1px] bg-gray-500"></div>
              <p className="text-lg absolute text-white bg-[#0A65B3] px-2">OR</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center mt-6 md:mt-10 ">
            <p className="text-sm font-normal text-white text-center flex items-center gap-1">
              Don't have an account?
              <button
                onClick={() => navigate('/signup')}
                className="text-sm font-semibold text-white hover:underline cursor-pointer"
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
