const Loading = () => {
  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-screen bg-base-white overflow-hidden">
      {/* Animated CHATBLIX text */}
      <div className="relative">
        {/* Glowing background */}
        <div className="absolute inset-0 blur-2xl sm:blur-3xl bg-[#2e5e99] opacity-30 animate-pulse" />

        {/* Text */}
        <h1
          className="
          relative 
          font-black tracking-wider
          text-4xl sm:text-6xl lg:text-7xl
        "
        >
          {["C", "H", "A", "T", "B", "L", "I", "X"].map((letter, index) => (
            <span
              key={index}
              className="
                inline-block 
                text-transparent bg-clip-text 
                bg-gradient-to-br from-[#2e5e99] via-[#7ba4f0] to-[#2e5e99]
                animate-pulse
              "
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

      {/* Orbiting circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="
            relative 
            w-56 h-56 
            sm:w-80 sm:h-80 
            lg:w-96 lg:h-96
          "
        >
          {/* Orbit 1 */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s" }}
          >
            <div
              className="
                absolute top-0 left-1/2 
                w-3 h-3 sm:w-4 sm:h-4 
                bg-[#2e5e99] rounded-full 
                -ml-1.5 sm:-ml-2 
                shadow-lg
              "
            />
          </div>

          {/* Orbit 2 */}
          <div
            className="absolute inset-0 animate-spin"
            style={{
              animationDuration: "4s",
              animationDelay: "1s",
              animationDirection: "reverse",
            }}
          >
            <div
              className="
                absolute bottom-0 left-1/2 
                w-2.5 h-2.5 sm:w-3 sm:h-3 
                bg-[#7ba4f0] rounded-full 
                -ml-1.25 sm:-ml-1.5
              "
            />
          </div>

          {/* Orbit 3 */}
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s", animationDelay: "2s" }}
          >
            <div
              className="
                absolute left-0 top-1/2 
                w-2.5 h-2.5 sm:w-3 sm:h-3 
                bg-[#2e5e99] rounded-full 
                -mt-1.25 sm:-mt-1.5 
                shadow-lg
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
