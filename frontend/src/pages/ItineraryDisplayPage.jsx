import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CarouselDays } from '@/components/carousel';
import {
  MapPinIcon,
  DollarSignIcon,
  CalendarIcon,
  UsersIcon,
  HeartIcon,
  Pencil,
  ActivityIcon,
  TagIcon,
  CloudIcon,
  PlaneTakeoffIcon,
  BookIcon
} from 'lucide-react';

const ItineraryDisplayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState(null);
  const [itineraryResult, setItineraryResult] = useState(null);

  useEffect(() => {
  if (location.state) {
    const { tripDetails, itineraryResult } = location.state;

    if (tripDetails && itineraryResult) {
      setTripDetails(tripDetails);
      setItineraryResult(itineraryResult); 
    } else {
      navigate('/planner'); 
    }
  } else {
    navigate('/planner'); 
  }
}, [location.state, navigate]);

  

  const formatIndianRupees = (amount) =>
    amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace("\u20B9", "");

  const renderDetailBadge = (icon, value, conditionalRender = true) => {
    if (!value || !conditionalRender) return null;

    let displayValue = value;
    if (Array.isArray(value)) {
      displayValue = value.join(', ');
    }

    return (
      <div className="flex  items-center bg-[#0A65B3] rounded-full px-3 py-1 m-1">
        {React.createElement(icon, { className: "h-4 w-4 mr-2" })}
        <span>{displayValue}</span>
      </div>
    );
  };

  const handEditTripDetails = () => {
    navigate('/planner', { state: { tripDetails } });
  };

  if (!tripDetails) {
    return (
      <div className="h-full w-full bg-[#0A1429] flex justify-center items-center text-white">
        Loading trip details...
      </div>
    );
  }

  return (
  <div className="min-h-screen w-full bg-[#0A1429] px-4 py-6 md:px-10 lg:px-20 xl:px-40">
    {/* Trip Summary Card */}
    <div className="w-full bg-gray-900 rounded-xl p-6 text-white shadow-lg flex flex-col items-center mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mb-4">
        <h3 className="font-medium text-xl mb-2 sm:mb-0">Trip Summary</h3>
        <button
          onClick={handEditTripDetails}
          className="text-white hover:text-blue-400 p-1 rounded cursor-pointer"
          aria-label="Edit"
        >
          <Pencil className="w-5 h-5 text-blue-400" />
        </button>
      </div>

      {/* Badges Grid */}
      <div className="flex flex-wrap justify-center gap-2">
        {renderDetailBadge(MapPinIcon, tripDetails.location)}
        {renderDetailBadge(CalendarIcon, `${tripDetails.tripDays || 0} ${(tripDetails.tripDays === 1) ? 'day' : 'days'}`, tripDetails.tripDays)}
        {renderDetailBadge(DollarSignIcon, formatIndianRupees(tripDetails.budget), tripDetails.budget > 0)}
        {renderDetailBadge(UsersIcon, `${tripDetails.tripType || 'Trip'} ${tripDetails.peopleCount ? `(${tripDetails.peopleCount})` : ''}`, tripDetails.tripType)}
        {renderDetailBadge(HeartIcon, tripDetails.interests, tripDetails.interests)}
        {renderDetailBadge(PlaneTakeoffIcon, tripDetails.travelMode, tripDetails.travelMode)}
        {renderDetailBadge(ActivityIcon, tripDetails.activities, tripDetails.activities)}
        {renderDetailBadge(TagIcon, tripDetails.travelStyle, tripDetails.travelStyle)}
        {renderDetailBadge(CloudIcon, tripDetails.weatherPreference, tripDetails.weatherPreference)}
        {renderDetailBadge(BookIcon, tripDetails.travelPurpose, tripDetails.travelPurpose)}
      </div>
    </div>

    {/* Carousel */}
    <CarouselDays itineraryResult={itineraryResult} />
  </div>
);

};

export default ItineraryDisplayPage;
