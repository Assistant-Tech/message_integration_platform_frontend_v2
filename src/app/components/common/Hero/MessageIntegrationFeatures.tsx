import { useState } from "react";
import { MapPin, Settings, Shield } from "lucide-react";
import { Badge, Button } from "@/app/components/ui";

const MessageIntegrationFeatures = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      id: 1,
      title: "Multi-Channel Inbox",
      description:
        "No more app switching, no more lost messages — centralize all your business conversations instantly",
      color: "from-primary-light to-primary",
      visual: (isHovered: any) => (
        <div className="relative h-48 bg-gradient-to-br from-base-white to-slate-200 rounded-xl p-6 overflow-hidden">
          <div
            className={`absolute inset-0 bg-white/50 transition-transform duration-700 ${
              isHovered ? "translate-x-0" : "-translate-x-full"
            }`}
          ></div>
          <div
            className={`relative transition-transform duration-500 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            {/* Brand mockup */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded"></div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            {/* Theme selector */}
            <div className="flex gap-2 justify-center">
              <div className="text-xs text-gray-500">Theme:</div>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 ring-2 ring-blue-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "All-in-One Platform",
      description:
        "Manage everything from campaigns to customer conversations, and social media in in one place, saving time and effort.",
      color: "from-purple-500 to-purple-600",
      visual: (isHovered: any) => (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center overflow-hidden">
          <div
            className={`transition-all duration-700 ${
              isHovered ? "scale-110 rotate-3" : "scale-100 rotate-0"
            }`}
          >
            {/* Device mockups */}
            <div className="relative flex items-end gap-2">
              {/* Mobile */}
              <div
                className={`w-16 h-24 bg-white rounded-lg shadow-lg border-2 border-gray-300 p-1 transition-transform duration-500 ${
                  isHovered ? "-translate-y-2" : ""
                }`}
              >
                <div className="w-full h-1 bg-gray-300 rounded-full mb-1"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-purple-200 rounded"></div>
                  <div className="h-1 bg-purple-300 rounded"></div>
                  <div className="h-1 bg-purple-200 rounded"></div>
                </div>
              </div>
              {/* Tablet */}
              <div
                className={`w-20 h-28 bg-white rounded-lg shadow-lg border-2 border-gray-300 p-2 transition-transform duration-500 delay-75 ${
                  isHovered ? "-translate-y-3" : ""
                }`}
              >
                <div className="space-y-1">
                  <div className="h-1 bg-purple-200 rounded"></div>
                  <div className="h-1 bg-purple-300 rounded"></div>
                  <div className="h-1 bg-purple-400 rounded"></div>
                  <div className="h-1 bg-purple-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="px-2 py-1 bg-white rounded text-xs font-medium shadow">
              📱 Portrait
            </div>
            <div className="px-2 py-1 bg-white rounded text-xs font-medium shadow">
              💻 Landscape
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Bulk Messaging",
      description:
        "Support for 50+ languages with automatic translation and localization capabilities.",
      color: "from-green-500 to-green-600",
      visual: (isHovered: any) => (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 overflow-hidden">
          <div
            className={`transition-all duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            {/* Language selector mockup */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm">
                  🌐
                </div>
                <div className="text-xs font-medium">REGIONS</div>
              </div>
              <div className="space-y-2">
                {[
                  { flag: "🇺🇸", name: "English", bar: "w-full" },
                  { flag: "🇫🇷", name: "French", bar: "w-4/5" },
                  { flag: "🇩🇪", name: "German", bar: "w-3/4" },
                  { flag: "🇦🇪", name: "Arabic", bar: "w-2/3" },
                ].map((lang, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 transition-all duration-500 ${
                      isHovered
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-4 opacity-70"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex-1">
                      <div
                        className={`h-1.5 bg-green-400 rounded-full ${lang.bar}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Localized Content",
      description:
        "Deliver personalized content based on user location, preferences, and local trends.",
      color: "from-orange-500 to-orange-600",
      visual: (isHovered: any) => (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 overflow-hidden">
          <div
            className={`absolute inset-0 opacity-10 transition-transform duration-1000 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.3),transparent_50%)]"></div>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="relative">
              {/* Center location pin */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              {/* Floating content cards */}
              {[
                { icon: "📰", label: "News", pos: "-top-8 -left-8" },
                { icon: "🌤️", label: "Weather", pos: "-top-8 -right-8" },
                { icon: "🚌", label: "Transit", pos: "-bottom-8 -left-8" },
                { icon: "🎭", label: "Events", pos: "-bottom-8 -right-8" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`absolute ${item.pos} transition-all duration-700 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-1">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "You are always in control",
      description:
        "Comprehensive admin panel with granular permissions and real-time monitoring.",
      color: "from-cyan-500 to-cyan-600",
      visual: (isHovered: any) => (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 overflow-hidden">
          <div
            className={`transition-all duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          >
            {/* Control panel mockup */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium text-gray-500">
                  DASHBOARD
                </div>
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                  <Settings
                    className="w-4 h-4 text-white animate-spin"
                    style={{ animationDuration: isHovered ? "3s" : "0s" }}
                  />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Approved", checked: true },
                  { label: "Pending", checked: false },
                  { label: "Declined", checked: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between transition-all duration-500 ${
                      isHovered ? "translate-x-0" : "-translate-x-2"
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span className="text-xs text-gray-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-cyan-500 rounded-full transition-all duration-1000 ${
                            item.checked ? "w-full" : "w-0"
                          }`}
                        ></div>
                      </div>
                      {item.checked && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                      {!item.checked && (
                        <span className="text-red-500 text-xs">✗</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Licence-cleared Infotainment Content",
      description:
        "Access premium, legally-cleared content from trusted partners like Reuters, AFP, and PA Media.",
      color: "from-indigo-500 to-indigo-600",
      visual: (isHovered: any) => (
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 overflow-hidden">
          <div className="relative h-full flex items-center justify-center">
            {/* Center shield */}
            <div
              className={`relative transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl rotate-3">
                <Shield className="w-10 h-10 text-white" />
              </div>
              {/* Orbiting logos */}
              {[
                { name: "REUTERS", angle: 0 },
                { name: "PA media", angle: 120 },
                { name: "belga", angle: 240 },
              ].map((partner, i) => {
                const radius = 60;
                const angleOffset = isHovered ? 360 : 0;
                const angle = ((partner.angle + angleOffset) * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 transition-all duration-1000"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-lg px-3 py-1.5 text-xs font-bold text-gray-700 whitespace-nowrap">
                      {partner.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-primary-light/40 py-10 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Badge
              title="FEATURES"
              className="body-italic-bold-16 capitalize"
            />
          </div>
          <h2 className="h2-bold-40 text-grey my-4">
            What{" "}
            <span className="text-primary p-2 rounded-2xl bg-white">
              Chatblix
            </span>{" "}
            actually provides?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to build, manage, and scale your business with
            confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Visual Section */}
              <div className="p-6">
                {feature.visual(hoveredCard === feature.id)}
              </div>

              {/* Content Section */}
              <div className="p-6 pt-0">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col justify-center items-center mt-24 text-center">
          <p className="h4-bold-24 text-grey-medium mb-4">
            Join and become one of companies already using our platform
          </p>
          <Button label="Get Started Free" />
        </div>
      </div>
    </div>
  );
};

export default MessageIntegrationFeatures;
