import React from 'react';

const TimeLine = ({ segments }) => {
  return (
    <div className="relative flex flex-col gap-6 py-10 h-full">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2 z-0 animate-moveline"></div>

      {segments.map((segment, idx) => (
        <div
          key={idx}
          className={`relative z-10 container w-1/2 p-1.5 rounded-md text-white mx-8 ${
            idx % 2 === 0 ? "mr-auto" : "ml-auto"
          }`}
        >
          <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-md p-5">
            <h1 className="font-semibold">{segment.title}</h1>
            <p className="inline-block mb-3">{segment.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
