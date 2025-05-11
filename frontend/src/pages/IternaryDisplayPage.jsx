import React from 'react'
import TimeLine from '../components/timeLine';
import TextDisplay from '@/components/textDisplay';
import { CarouselDays } from '@/components/carousel';
const itinerary = [
  {
    title: "Day 1",
    segments: [
      { title: "Morning", description: "Explore local markets and have breakfast." },
      { title: "Afternoon", description: "Visit historical places and museums." },
      { title: "Evening", description: "Relax at the beachside café." },
      { title: "Night", description: "Enjoy Goan seafood at Fisherman’s Wharf." }
    ]
  },
  {
    title: "Day 2",
    segments: [
      { title: "Morning", description: "Sunrise yoga and healthy breakfast." },
      { title: "Afternoon", description: "Scuba diving adventure." },
      { title: "Evening", description: "Chill at beach shack with live music." },
      { title: "Night", description: "Walk along the moonlit shoreline." }
    ]
  }
  // Add more days as needed
];

import {
  MapPinIcon,
  DollarSignIcon,
  CalendarIcon,
  UsersIcon,
  HeartIcon,
  Pencil
} from 'lucide-react';

// Dummy data (replace with actual props/context later)
const location = "Goa";
const tripDays = 2;
const budget = 15000;
const tripType = "group";
const peopleCount = 4;
const interests = "beaches, nightlife";

const formatIndianRupees = (amount) =>
  amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace("₹", "");


const IternaryDisplayPage = () => {
  return (
    <div className="h-full w-full bg-[#0A1429] relative max-w-1200px mx-100px my-auto flex flex-col justify-center items-center p-40">
      {/* <TimeLine />
       <TextDisplay
  title="Additional Information"
  content="The average temperature during your trip is expected to be 22°C with light showers on Day 2."
/> */}

       {/* Trip Summary Section */}
              {(location || tripDays > 0 || interests || budget > 0 || tripType) && (
                <div className="w-full bg-gray-900 rounded-xl p-4 text-white shadow-lg flex items-center flex-col mb-4" >
                  <div className='flex flex-row '>
                     <h3 className="font-medium text-lg mb-2 mr-4">Trip Summary</h3>
                    <button 
                      onClick={() => console.log("Edit clicked")} 
                      className="text-white hover:text-blue-400 p-1 rounded cursor-pointer"
                      aria-label="Edit"
                    >
                      <Pencil className="w-3 h-3 color-blue" />
                    </button>
                  </div>
                 
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
        
    <CarouselDays></CarouselDays>

    </div>
  );


}



export default IternaryDisplayPage;
