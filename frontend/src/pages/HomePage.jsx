import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import CustomDatePicker from '../components/datePicker'
import { MapPinIcon, CalendarIcon, SearchIcon, HeartIcon } from "lucide-react"
import { differenceInDays } from 'date-fns'

const HomePage = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [location, setLocation] = useState('')
  const [interests, setInterests] = useState('')
  const [customInterest, setCustomInterest] = useState('')
  const [tripDays, setTripDays] = useState(0)

  // Calculate trip duration whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInDays(new Date(endDate), new Date(startDate))
      setTripDays(days > 0 ? days : 0)
    } else {
      setTripDays(0)
    }
  }, [startDate, endDate])

  // Handle adding custom interests
  const handleAddInterest = () => {
    if (customInterest.trim()) {
      setInterests(interests ? `${interests}, ${customInterest.trim()}` : customInterest.trim())
      setCustomInterest('')
    }
  }

  // Handle key press for custom interest
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddInterest()
    }
  }

  // Popular interests suggestions
  const popularInterests = [
    "Beaches", "Mountains", "Historical Sites", "Museums", 
    "Food Tours", "Adventure Sports", "Wildlife", "Shopping"
  ]

  return (
    <div className='min-h-screen w-full bg-[#0A1429]'>
      <NavBar />
      
      <div className="w-full flex flex-col items-center justify-center p-6">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Plan Your Perfect Trip
        </h2>
        
        {/* Trip Summary Section */}
        {(location || tripDays > 0 || interests) && (
          <div className="w-full md:w-[650px] bg-gray-900 rounded-xl p-4 mb-6 text-white shadow-lg">
            <h3 className="font-medium text-lg mb-2">Trip Summary</h3>
            <div className="flex flex-wrap gap-2">
              {location && (
                <div className="flex items-center bg-[#0A65B3] rounded-full px-3 py-1">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{location}</span>
                </div>
              )}
              {tripDays > 0 && (
                <div className="flex items-center bg-[#0A65B3] rounded-full px-3 py-1">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{tripDays} {tripDays === 1 ? 'day' : 'days'}</span>
                </div>
              )}
              {interests && interests.split(',').map((interest, index) => (
                <div key={index} className="flex items-center bg-[#0A65B3] rounded-full px-3 py-1">
                  <HeartIcon className="h-4 w-4 mr-1" />
                  <span>{interest.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Main Planning Form */}
        <div className="w-full md:w-[650px] bg-gray-900 rounded-xl p-6 shadow-lg">
          {/* Location Input */}
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-2">Where do you want to go?</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter destination"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A65B3]"
              />
              <MapPinIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Date Range Pickers */}
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-2">When are you traveling?</label>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-white mb-1">Start Date</p>
                <CustomDatePicker onDateChange={setStartDate} />
              </div>
              <div className="flex-1">
                <p className="text-white mb-1">End Date</p>
                <CustomDatePicker onDateChange={setEndDate} />
              </div>
            </div>
          </div>
          
          {/* Custom Interests Input */}
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-2">What are you interested in?</label>
            <div className="relative flex">
              <input
                type="text"
                placeholder="Enter your interests"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 pl-10 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0A65B3]"
              />
              <HeartIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button 
                onClick={handleAddInterest}
                className="px-4 py-2 bg-[#0A65B3] text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            {/* Added Interests */}
            {interests && (
              <div className="mt-3">
                <p className="text-white text-sm mb-1">Your interests:</p>
                <div className="flex flex-wrap gap-2">
                  {interests.split(',').map((interest, index) => (
                    <div key={index} className="px-3 py-1 bg-[#0A65B3] text-white text-sm rounded-full flex items-center gap-1">
                      {interest.trim()}
                      <button 
                        onClick={() => {
                          const updatedInterests = interests
                            .split(',')
                            .filter((_, i) => i !== index)
                            .join(', ');
                          setInterests(updatedInterests);
                        }}
                        className="ml-1 text-white hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Popular Interests Tags */}
            <div className="mt-3">
              <p className="text-white text-sm mb-1">Popular interests:</p>
              <div className="flex flex-wrap gap-2">
                {popularInterests.map((interest, index) => (
                  <button
                    key={index}
                    onClick={() => setInterests(interests ? `${interests}, ${interest}` : interest)}
                    className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full hover:bg-[#0A65B3] transition-colors"
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Search Button */}
          <button className="w-full bg-[#0A65B3] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
            <SearchIcon className="h-5 w-5" />
            Find Perfect Activities
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage