import React from 'react';

const TextDisplay = ({ title, content }) => {
  return (
    <div className="shadow-md max-w-xl w-full bg-[rgba(255,255,255,0.1)] backdrop-blur-sm rounded-md p-5 text-white">
      {title && (
        <h2 className="font-semibold">
          Additional Details
        </h2>
      )}
      <p className="inline-block mb-3">
        {content}
      </p>
    </div>
  );
};

export default TextDisplay;
