import React from 'react';

const TimeLine = () => {
  return (
    <div className="relative flex flex-col gap-6 py-10 h-full">

      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 -translate-x-1/2 z-0 animate-moveline"></div>

      {/* Morning */}
      <div className="container relative z-10 w-1/2  p-1.5 rounded-md text-white mr-auto mx-8  opacity-100 ">
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-md p-5">
          <h1 className='font-semibold'>Morning</h1>
          <p className='inline-block mb-3'>Enyoufnsdk jsldn ksncm oksnxz bdaskdl bidskn . oskl</p>
        </div>
      </div>

      {/* Afternoon */}
      <div className="relative z-10 container w-1/2  p-1.5 rounded-md text-white ml-auto mx-8">
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-md p-5">
          <h1 className='font-semibold'>Afternoon</h1>
          <p className='inline-block mb-3'>Enyoufnsdk jsldn ksncm oksnxz bdaskdl bidskn . oskl</p>
        </div>
      </div>

      {/* Evening */}
      <div className="relative z-10 container w-1/2  p-1.5 rounded-md text-white mr-auto mx-8">
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-md p-5">
          <h1 className='font-semibold'>Evening</h1>
          <p className='inline-block mb-3'>Enyoufnsdk jsldn ksncm oksnxz bdaskdl bidskn . oskl</p>
        </div>
      </div>

      {/* Night */}
      <div className="relative z-10 container w-1/2  p-1.5 rounded-md text-white ml-auto mx-8">
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-md p-5">
          <h1 className='font-semibold'>Night</h1>
          <p className='inline-block mb-3'>
            Start your day early with a refreshing walk along <strong>Palolem Beach</strong> and catch the sunrise.
            Head to a beachside café like <strong>Café Del Mar</strong> for a relaxed breakfast of pancakes, eggs, and fresh juice.
            After breakfast, take a short ride to <strong>Cabo de Rama Fort</strong> to enjoy stunning views of the Arabian Sea.
            Return to your stay by 11 AM to freshen up for the afternoon.
          </p>
        </div>
      </div>

    </div>
  );
};

export default TimeLine;
