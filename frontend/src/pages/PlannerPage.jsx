import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate,  // Import useNavigate hook
  useLocation   // Import useLocation hook (for receiving data)
} from 'react-router-dom'
import NavBar from '../components/navBar'
import CustomDatePicker from '../components/datePicker'
import { MapPinIcon, CalendarIcon, SearchIcon, HeartIcon, DollarSignIcon, UsersIcon, AlertCircleIcon } from "lucide-react"
import { differenceInDays } from 'date-fns'

const PlannerPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [location, setLocation] = useState('')
  const [interests, setInterests] = useState('')
  const [customInterest, setCustomInterest] = useState('')
  const [tripDays, setTripDays] = useState(0)
  const [budget, setBudget] = useState(5000)  
  const [tripType, setTripType] = useState('individual')
  const [peopleCount, setPeopleCount] = useState(1)
  const [dateError, setDateError] = useState('')
  const [locationError, setLocationError] = useState('');
  const [datesError, setDatesError] = useState('');
  const [interestError, setInterestError] = useState('');


  
  const formatIndianRupees = (amount) => {
    return amount.toLocaleString('en-IN')
  }

  // Calculate trip duration whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInDays(new Date(endDate), new Date(startDate))
      
      if (days < 0) {
        setDateError('Please select an end date that comes after the start date.')
        setTripDays(0)
      } else {
        setDateError('')
        setTripDays(days)
      }
    } else {
      setDateError('')
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
  ];

  //
  const handlePlanIternary = () => {
  let valid = true;

  if (!location.trim()) {
    setLocationError("Please enter a destination.");
    valid = false;
  } else {
    setLocationError('');
  }

  if (!startDate || !endDate || tripDays <= 0) {
    setDatesError("Please select a valid start and end date.");
    valid = false;
  } else {
    setDatesError('');
  }

  if (!interests.trim()) {
    setInterestError("Please select or add at least one interest.");
    valid = false;
  } else {
    setInterestError('');
  }

  if (!valid) return;

  const tripData = {
    location,
    startDate,
    endDate,
    tripDays,
    budget,
    tripType,
    peopleCount,
    interests: interests.split(',').map(i => i.trim())
  };

  navigate('/iternary-result', { state: { tripDetails: tripData } });
};

 

  return (
    <div className='min-h-screen w-full bg-[#0A1429]'>
      <div className="w-full flex flex-col items-center justify-center p-6">
        <h2 className="text-white text-2xl font-semibold mb-6">
          Plan Your Perfect Trip
        </h2>
        
        {/* Trip Summary Section */}
        {(location || tripDays > 0 || interests || budget > 0 || tripType) && (
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
              {budget > 0 && (
                <div className="flex items-center bg-[#0A65B3] rounded-full px-3 py-1">
                  <DollarSignIcon className="h-4 w-4 mr-1" />
                  <span>₹{formatIndianRupees(budget)}</span>
                </div>
              )}
              {tripType && (
                <div className="flex items-center bg-[#0A65B3] rounded-full px-3 py-1">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  <span>
                    {tripType === 'individual' ? 'Individual' : 
                     tripType === 'family' ? 'Family' : 'Group'} 
                    {(tripType !== 'individual' && peopleCount > 1) && ` (${peopleCount})`}
                  </span>
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
          {locationError && (
            <div className="mt-3 text-red-400 text-sm flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {locationError}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-2">Who's traveling?</label>
            
            {/* Trip Type Selection */}
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={() => setTripType('individual')}
                className={`px-4 py-2 rounded-lg ${
                  tripType === 'individual' 
                    ? 'bg-[#0A65B3] text-white' 
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setTripType('family')}
                className={`px-4 py-2 rounded-lg ${
                  tripType === 'family' 
                    ? 'bg-[#0A65B3] text-white' 
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Family
              </button>
              <button
                onClick={() => setTripType('group')}
                className={`px-4 py-2 rounded-lg ${
                  tripType === 'group' 
                    ? 'bg-[#0A65B3] text-white' 
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Group
              </button>
            </div>

            {/* People Count Input - Only show if family or group */}
            {tripType !== 'individual' && (
              <div className="relative">
                <label className="block text-white text-sm mb-2">
                  How many people (excluding small children)?
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setPeopleCount(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1 bg-gray-800 text-white rounded-l-lg"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-3 py-1 bg-gray-800 text-white text-center border-l border-r border-gray-700"
                  />
                  <button
                    onClick={() => setPeopleCount(prev => prev + 1)}
                    className="px-3 py-1 bg-gray-800 text-white rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {!tripType && formError && (
            <div className="mt-3 text-red-400 text-sm flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {formError}
            </div>
          )}
          
          
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
            
            {/* Date Error Message */}
            {datesError && (
              <div className="mt-2 flex items-center text-red-400">
                <AlertCircleIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">{datesError}</span>
              </div>
            )}
          </div>


          {/* Budget Selector - Updated for Indian Rupees */}
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-2">What's your budget?</label>
            <div className="relative">
              <div className="flex items-center mb-2">
                <DollarSignIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-white font-medium">₹{formatIndianRupees(budget)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹5,000</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>
          </div>

          {/* Trip Type and People Count */}
          
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
            {interestError && (
              <div className="mt-3 text-red-400 text-sm flex items-center">
                <AlertCircleIcon className="h-4 w-4 mr-1" />
                {interestError}
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
          <button 
          onClick={handlePlanIternary}
            className={`w-full ${
              dateError ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0A65B3] hover:bg-blue-700 cursor-pointer'
            } text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2`}
            disabled={!!dateError}
          >
            <SearchIcon className="h-5 w-5" />
            Plan Perfect Iternary
            
          </button>

          {/* {formError && (
          <div className="mt-3 text-red-400 text-sm flex items-center">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            {formError}
          </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default PlannerPage