import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center size-24 gap-1.5">
      <span className="size-5 bg-teal-600 rounded-full opacity-0 animate-fade"></span>
      <span className="size-5 bg-teal-600 rounded-full opacity-0 animate-fade animation-delay-300"></span>
      <span className="size-5 bg-teal-600 rounded-full opacity-0 animate-fade animation-delay-600"></span>
    </div>
  );
};

export default Loading;
