import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TextDisplay from "./textDisplay";
import TimeLine from "./timeLine";

export function CarouselDays({ itineraryResult }) {
  if (!Array.isArray(itineraryResult)) {
    console.error("itineraryResult is not an array:", itineraryResult);
    return null;
  }

  const tipItem = itineraryResult.find((item) => item.title === "Additional_Tip");
  const days = itineraryResult.filter((item) => item.title !== "Additional_Tip");

  return (
    <Carousel className="w-full border border-blue-500 bg-[#0A1429] rounded-lg shadow-lg">
      <CarouselContent>
        {/* Render all day-wise cards */}
        {days.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg flex flex-col justify-center items-center h-full">
              <CardContent className="p-6 text-white space-y-6 flex flex-col justify-center items-center w-full">
                {/* Title and Navigation */}
                <div className="flex items-center justify-between w-full">
                  <CarouselPrevious className="static relative top-0 left-0" />
                  <h2 className="text-2xl font-bold text-center flex-1">
                    {item.title}
                  </h2>
                  <CarouselNext className="static relative top-0 right-0" />
                </div>

                {/* Segments */}
                <TimeLine segments={item.segments} />

                {/* Tip Section (if present) */}
                {tipItem && (
                  <TextDisplay
                    title="💡 Travel Tip"
                    content={tipItem.description}
                  />
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}

        {/* Standalone Tip Slide */}
        {tipItem && (
          <CarouselItem key="tip">
            <Card className="bg-[rgba(255,255,255,0.05)] border border-yellow-500 rounded-lg flex flex-col justify-center items-center h-full">
              <CardContent className="p-6 text-white space-y-6 flex flex-col justify-center items-center w-full">
                <div className="flex items-center justify-between w-full">
                  <CarouselPrevious className="static relative top-0 left-0" />
                  <h2 className="text-2xl font-bold text-center flex-1 text-yellow-400">
                    Travel Tip
                  </h2>
                  <CarouselNext className="static relative top-0 right-0" />
                </div>

                <p className="text-base leading-relaxed text-white text-left">
                  {tipItem.description}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        )}
      </CarouselContent>
    </Carousel>
  );
}
