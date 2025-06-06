import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { apiHelper } from '../lib/apiHelper'
import CustomLoader from '@/components/Loader'

const HomePage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleStartPlanning = async () => {
    try {
      setLoading(true)
      const res = await apiHelper.getProfile();
       await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false)

      if (!res.error) {
        navigate('/planner')
      } else {
        navigate('/login')
      }
    } catch (err) {
      setLoading(false)
      navigate('/login')
    }
  }

  return (
    <div className='h-screen w-full bg-[#0A1429] flex items-center justify-center'>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <CustomLoader />
        </div>
      ) : (
        <div className="max-w-4xl flex flex-col items-center justify-center p-6 text-center">
          <img className="h-50 mb-8" src={logo} alt="TripTactix Logo" />
          <h2 className="text-white text-2xl font-semibold mb-8">
            TripTactix is your smart AI powered itinerary planner.
            Just enter your destination and travel dates. TripTactix 
            personalizes itineraries based on your budget and interests. 
            Whether you're looking for luxury, mid-range, or 
            budget-friendly options, TripTactix makes trip planning seamless, fast, and fun.
          </h2>
          <button 
            onClick={handleStartPlanning}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors duration-300 cursor-pointer"
          >
            Start Planning
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
