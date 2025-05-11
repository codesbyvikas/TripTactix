import React from 'react'
import TimeLine from '../components/timeLine';
import TextDisplay from '@/components/textDisplay';
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


const IternaryDisplayPage = () => {
  return (
    <div className="h-full w-full bg-[#0A1429] relative max-w-1200px mx-100px my-auto flex flex-col justify-center items-center">
      <TimeLine />
       <TextDisplay
  title="Weather Forecast"
  content="The average temperature during your trip is expected to be 22°C with light showers on Day 2."
/>
    </div>
  );


}



export default IternaryDisplayPage;
