import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TextDisplay from "./TextDisplay";
import TimeLine from "./TimeLine";

export function CarouselDays({ itineraryResult }) {
  if (!Array.isArray(itineraryResult)) {
    console.error("itineraryResult is not an array:", itineraryResult);
    return null;
  }

  return (
    <Carousel className="w-full border border-blue-500 bg-[#0A1429] rounded-lg shadow-lg">
      <CarouselContent>
        {itineraryResult.map((item, index) => {
          const isAdditionalTip = item.title === "Additional_Tip";

          return (
            <CarouselItem key={index}>
              <Card className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-lg flex flex-col justify-center items-center h-full">
                <CardContent className="p-6 text-white space-y-6 flex flex-col justify-center items-center w-full">

                  {/* Title and Buttons Row */}
                  <div className="flex items-center justify-between w-full">
                    <CarouselPrevious className="static relative top-0 left-0" />
                    <h2 className="text-2xl font-bold text-center flex-1">
                      {isAdditionalTip ? item.title.replace('_', ' ') : item.title}
                    </h2>
                    <CarouselNext className="static relative top-0 right-0" />
                  </div>

                  {isAdditionalTip ? (
                    // For Additional_Tip, use TextDisplay to show its single description
                    <TextDisplay
                      title={item.title.replace('_', ' ')} // Or a more generic "Tips"
                      content={item.description} // Direct access to description
                    />
                  ) : (
                    // For regular days, use TimeLine for segments
                    <TimeLine segments={item.segments} />
                  )}

                  {/* This TextDisplay appears to be for general fixed info.
                      Only show this fixed text for regular days, not the tip slide. */}
                  {!isAdditionalTip && (
                    <TextDisplay
                      title="General Trip Information"
                      content="The average temperature during your trip is expected to be 22°C with light showers on Day 2."
                    />
                  )}
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}