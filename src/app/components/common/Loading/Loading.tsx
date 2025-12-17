const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-base-white">
      {/* Animated CHATBLIX text */}
      <div className="relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 blur-3xl bg-[#2e5e99] opacity-30 animate-pulse"></div>

        {/* Main text with staggered letter animation */}
        <h1 className="relative text-7xl font-black tracking-wider">
          {["C", "H", "A", "T", "B", "L", "I", "X"].map((letter, index) => (
            <span
              key={index}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-[#2e5e99] via-[#7ba4f0] to-[#2e5e99] animate-pulse"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: "2s",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Orbiting circles around the text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-96 h-96">
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s" }}
          >
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-[#2e5e99] rounded-full -ml-2 shadow-lg "></div>
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{
              animationDuration: "4s",
              animationDelay: "1s",
              animationDirection: "reverse",
            }}
          >
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-[#7ba4f0] rounded-full -ml-1.5"></div>
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s", animationDelay: "2s" }}
          >
            <div className="absolute left-0 top-1/2 w-3 h-3 bg-[#2e5e99] rounded-full -mt-1.5 shadow-lg "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
