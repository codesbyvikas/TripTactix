import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import TextDisplay from "./textDisplay";
import TimeLine from "./timeLine";

const itinerary = [
  {
    title: "Day 1",
    segments: [
      { title: "Morning", description: "Great question — I removed TimeLine in the revised code only to demonstrate a fully dynamic rendering directly inside the carousel, since your original TimeLine had hardcoded dummy data.But to clarify: if you want to retain your TimeLine component, that's perfectly fine — just modify it to accept segments as props so it can display each day’s schedule dynamically." },
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

export function CarouselDays() {
  return (
    <Carousel className="w-full border border-blue-500 bg-[#0A1429] rounded-lg shadow-lg">
      <CarouselContent>
        {itinerary.map((day, index) => (
          <CarouselItem key={index}>
            <Card className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg flex flex-col justify-center items-center h-full">
              <CardContent className="p-6 text-white space-y-6 flex flex-col justify-center items-center w-full">
                
                {/* Title and Buttons Row */}
                <div className="flex items-center justify-between w-full">
                  <CarouselPrevious className="static relative top-0 left-0" />
                  <h2 className="text-2xl font-bold text-center flex-1"> {day.title} </h2>
                  <CarouselNext className="static relative top-0 right-0" />
                </div>

                <TimeLine segments={day.segments} />
                
                <TextDisplay
                  title="Additional Information"
                  content="The average temperature during your trip is expected to be 22°C with light showers on Day 2."
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}



