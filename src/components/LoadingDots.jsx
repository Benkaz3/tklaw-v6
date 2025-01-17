import React from 'react';

const LoadingDots = () => {
  const delays = ['-0.3s', '-0.15s', '0s'];

  return (
    <div className="flex space-x-2 justify-center items-center h-screen bg-transparent dark:invert">
      <span className="sr-only">Loading...</span>
      {delays.map((delay, index) => (
        <div
          key={index}
          className="h-8 w-8 bg-buttonBg rounded-full animate-bounce"
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
};

export default LoadingDots;