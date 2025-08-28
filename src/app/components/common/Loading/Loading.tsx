import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-2 w-screen h-screen">
      <span className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:0s]"></span>
      <span className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
      <span className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
      <span className="w-4 h-4 bg-primary rounded-full animate-bounce [animation-delay:0.6s]"></span>
    </div>
  );
};

export default Loading;
