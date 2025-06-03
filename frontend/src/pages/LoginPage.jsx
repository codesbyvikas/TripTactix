import React, { useState } from 'react';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { apiHelper } from '../lib/apiHelper';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError('');
      const result = await apiHelper.login({ email, password });

      if (result.error) {
        setError(result.error);
      } else {
        console.log('Login success:', result.data);
        // Navigate to dashboard or home
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className='w-full h-screen flex'>
      {/* Left half */}
      <div className='w-1/2 h-full flex flex-col bg-[#0A1429] items-center justify-center'>
        <img src={logo} alt='Logo' className='max-h-100 w-auto' />
      </div>

      {/* Right half */}
      <div className='w-1/2 h-full bg-[#0A65B3] flex flex-col p-20 justify-center'>
        <div className='w-full flex flex-col max-w-[450px] mx-auto'>
          <div className='w-full flex flex-col mb-10 text-white'>
            <h3 className='text-4xl font-bold mb-2'>Login</h3>
            <p className='text-lg mb-4'>Welcome! Please enter your information below to begin.</p>
          </div>

          <div className='w-full flex flex-col mb-6'>
            <input
              type='email'
              placeholder='Email'
              className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className='text-red-500 mb-4'>{error}</div>}

          <div className='w-full flex flex-col mb-4'>
            <button
              onClick={handleLogin}
              className='w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
            >
              Login
            </button>
          </div>

          <div className='w-full flex items-center justify-center relative py-4'>
            <div className='w-full h-[1px] bg-gray-500'></div>
            <p className='text-lg absolute text-white bg-[#1a1a1a] px-2'>OR</p>
          </div>
        </div>

        <div className='w-full flex items-center justify-center mt-10'>
          <p className='text-sm font-normal text-white'>
            Don't have an account?{' '}
            <span className='font-semibold text-white cursor-pointer underline'>
              <a href='/signup'>Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
