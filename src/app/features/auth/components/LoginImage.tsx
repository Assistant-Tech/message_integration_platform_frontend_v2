import {
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Phone,
  Music2,
  Search,
} from "lucide-react";

// Icons positioned along a smooth arc that flows from top-right to bottom-right of the phone
const arcIcons = [
  {
    icon: <Facebook className="text-blue-600 w-6 h-6" />,
    style: "top-[50px] right-[-100px]", // Top of arc
  },
  {
    icon: <Instagram className="text-pink-500 w-6 h-6" />,
    style: "top-[120px] right-[-140px]", // Moving outward
  },
  {
    icon: <MessageCircle className="text-purple-500 w-6 h-6" />,
    style: "top-[200px] right-[-160px]", // Peak of arc
  },
  {
    icon: <Send className="text-sky-500 w-6 h-6" />,
    style: "top-[280px] right-[-160px]", // Peak of arc
  },
  {
    icon: <Music2 className="text-black w-6 h-6" />,
    style: "top-[360px] right-[-140px]", // Moving inward
  },
  {
    icon: <Phone className="text-green-600 w-6 h-6" />,
    style: "top-[430px] right-[-100px]", // Bottom of arc
  },
];

const LoginImage = () => {
  return (
    <div className="relative flex flex-col items-center text-center max-w-2xl px-14 py-20">
      {/* Phone UI Container */}
      <div className="relative">
        {/* Phone UI Image */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-[280px] h-[500px] z-10 relative">
          {/* Phone Header */}
          <div className="bg-gradient-to-r from-teal-400 to-teal-600 rounded-t-xl px-4 py-3 text-white text-sm font-medium">
            <div className="flex items-center justify-between">
              <span>12:06 PM</span>
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-xs">100%</span>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">ASSISTANT TECH</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 border-b">
            <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500">
              <Search size={20} /> <span> Search</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="px-4 py-2 space-y-3 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Facebook className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Jerry Helfer</span>
                  <span className="text-xs text-gray-500">2:24 PM</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Hey. What's the price of this?
                </p>
              </div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Paula Mora</span>
                  <span className="text-xs text-gray-500">22/05/2024</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  I loved the your product.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Eddie Lake</span>
                  <span className="text-xs text-gray-500">22/05/2024</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  You: The price of the product you are...
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">Katie Sims</span>
                  <span className="text-xs text-gray-500">2:24 PM</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Hey. What's the price of this?
                </p>
              </div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Arc SVG and Icons - positioned relative to phone */}
        <div className="absolute top-0 left-0 w-full h-full hidden lg:block pointer-events-none">
          {/* Curved arc path */}
          <svg
            viewBox="0 0 400 500"
            fill="none"
            className="absolute top-0 left-0 w-full h-full"
          >
            <path
              d="M300 50 C400 150, 400 350, 300 450"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeDasharray="6,8"
              fill="none"
            />
          </svg>

          {/* Icons positioned along the arc */}
          {arcIcons.map((item, index) => (
            <div
              key={index}
              className={`absolute ${item.style} bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 transition-all duration-300 pointer-events-auto`}
              style={{
                animation: `float ${2 + index * 0.5}s ease-in-out infinite alternate`,
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Seamless Experience, Anytime, Anywhere
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Stay synced across all devices, both mobile and desktop. No matter
          where you are, enjoy a smooth and seamless experience.
        </p>
      </div>
    </div>
  );
};

export default LoginImage;
