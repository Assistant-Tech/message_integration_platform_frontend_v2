import React from "react";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Phone,
  Music2,
} from "lucide-react";

const PhoneMockup = () => {
  return (
    <div className="relative flex flex-col items-center text-center max-w-md mx-auto">
      {/* Phone Mockup */}
      <div className="relative w-80 h-[600px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Status Bar */}
        <div className="bg-teal-500 text-white px-4 py-3 flex justify-between items-center text-sm font-medium">
          <span>12:06 PM</span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
              <div className="w-1 h-3 bg-white rounded-full"></div>
            </div>
            <span className="text-xs">📶 📶 🔋</span>
          </div>
        </div>

        {/* App Header */}
        <div className="bg-teal-500 text-white px-4 py-2 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">ASSISTANT TECH</span>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center">
            <span className="text-gray-400 text-sm">🔍 Search</span>
          </div>
        </div>

        {/* Chat List */}
        <div className="px-4 space-y-3">
          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              JH
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Jerry Helfer</span>
                <span className="text-xs text-gray-500">2:24 PM</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                Hey, What's the price of this?
              </p>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              PM
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Paula Mora</span>
                <span className="text-xs text-gray-500">22/06/2024</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                I loved the your product.
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              EL
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Eddie Lake</span>
                <span className="text-xs text-gray-500">22/06/2024</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                You: The price of the product you are
              </p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              KS
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Katie Sims</span>
                <span className="text-xs text-gray-500">2:24 PM</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                Hey, What's the price of this?
              </p>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              KM
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  Kimberly Mastrangelo
                </span>
                <span className="text-xs text-gray-500">2:24 PM</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                Hey, What's the price of this?
              </p>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              RS
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Rodger Struck</span>
                <span className="text-xs text-gray-500">22/06/2024</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                You: The price of the product you are
              </p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
              CG
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Chris Glasser</span>
                <span className="text-xs text-gray-500">22/06/2024</span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                I loved the your product.
              </p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
      </div>

      {/* Curved Dotted Line SVG */}
      <svg
        className="absolute top-16 left-full ml-2 w-32 h-96 pointer-events-none hidden lg:block"
        viewBox="0 0 120 400"
        fill="none"
      >
        <path
          d="M10 50 Q60 80 50 130 Q40 180 60 230 Q80 280 50 330 Q20 380 70 420"
          stroke="#e5e7eb"
          strokeWidth="2"
          strokeDasharray="4,4"
          fill="none"
        />
      </svg>

      {/* Floating Social Icons */}
      <div className="absolute top-12 left-full ml-8 space-y-6 hidden lg:flex flex-col items-center">
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <Facebook className="text-blue-600 w-6 h-6" />
        </div>
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <Instagram className="text-pink-500 w-6 h-6" />
        </div>
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <MessageCircle className="text-green-500 w-6 h-6" />
        </div>
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <Send className="text-sky-500 w-6 h-6" />
        </div>
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <Music2 className="text-black w-6 h-6" />
        </div>
        <div className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <Phone className="text-green-600 w-6 h-6" />
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-8 max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Seamless Experience, Anytime, Anywhere
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Stay synced across all devices, both mobile and desktop, and access
          your account anytime, anywhere. So no matter where you are, you'll
          always have a smooth and seamless experience.
        </p>
      </div>
    </div>
  );
};

export default PhoneMockup;
