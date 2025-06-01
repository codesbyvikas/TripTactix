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

const IternaryDisplayPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    if (location.state && location.state.tripDetails) {
      setTripDetails(location.state.tripDetails);
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
      <div className="flex items-center bg-[#0A65B3] rounded-full px-3 py-1 m-1">
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
    <div className="h-full w-full bg-[#0A1429] relative max-w-1200px mx-100px my-auto flex flex-col justify-center items-center p-40">
      <div className="w-full bg-gray-900 rounded-xl p-6 text-white shadow-lg flex items-center flex-col mb-6">
        <div className='flex flex-row items-center mb-4'>
          <h3 className="font-medium text-xl mr-4">Trip Summary</h3>
          <button 
            onClick={handEditTripDetails} 
            className="text-white hover:text-blue-400 p-1 rounded cursor-pointer"
            aria-label="Edit"
          >
            <Pencil className="w-5 h-5 text-blue-400" />
          </button>
        </div>

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

      <CarouselDays />
    </div>
  );
};

export default IternaryDisplayPage;
