import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const HomePage = () => {
  const navigate = useNavigate()

  const handleStartPlanning = () => {
    navigate('/planner')
  }

  return (
    <div className='h-screen'>
    <div className=" h-full w-full bg-[#0A1429] flex flex-col items-center justify-start">
      <div className="max-w-4xl flex flex-col items-center justify-center p-6 text-center">
        <img className="h-50 mb-8" src={logo} alt="TripTactix Logo" />
        
        <h2 className="text-white text-2xl font-semibold mb-8">
          TripTactix is your smart AI powered itinerary planner.
          Just enter your destination and travel dates. TripTactix 
          personalized itineraries based on your budget and interests. 
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
    </div>
    </div>
  )
}

export default HomePage