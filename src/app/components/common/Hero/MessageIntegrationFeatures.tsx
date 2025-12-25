import React from "react";
import {
  MessageSquare,
  Zap,
  BarChart3,
  Shield,
  Globe,
  Bell,
} from "lucide-react";

const MessageIntegrationFeatures = () => {
  const features = [
    {
      icon: <MessageSquare className="w-8 h-8 text-teal-600" />,
      title: "Unified Inbox",
      description:
        "Manage all your messages from Instagram, Facebook, WhatsApp, TikTok, Telegram, and Viber in one place.",
      badge: "Real-time Sync",
      badgeColor: "bg-teal-600",
      visual: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg"></div>
          <div className="relative grid grid-cols-3 gap-2">
            {["📱", "💬", "📲", "🎵", "✈️", "📞"].map((emoji, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center text-xl"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Smart Automation",
      description:
        "Set up automated responses, routing rules, and workflows across all messaging platforms.",
      badge: "AI-Powered",
      badgeColor: "bg-blue-600",
      visual: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg"></div>
          <div className="relative space-y-2 w-full px-4">
            <div className="h-3 bg-blue-200 rounded-full w-3/4 animate-pulse"></div>
            <div className="h-3 bg-blue-300 rounded-full w-full"></div>
            <div
              className="h-3 bg-blue-200 rounded-full w-2/3 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="flex justify-end">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                ✓
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Multi-Channel Oversight",
      description:
        "Monitor conversations across Instagram, Facebook, WhatsApp, TikTok, Telegram, and Viber simultaneously.",
      badge: "6 Platforms",
      badgeColor: "bg-purple-600",
      visual: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg"></div>
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
              <Globe className="w-10 h-10 text-purple-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              3
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              5
            </div>
            <div className="absolute top-8 -right-4 w-6 h-6 bg-blue-500 rounded-full"></div>
            <div className="absolute top-8 -left-4 w-6 h-6 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
      title: "Analytics Dashboard",
      description:
        "Track response times, engagement rates, and team performance across all messaging channels.",
      badge: "View Dashboard",
      badgeColor: "bg-emerald-600",
      visual: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg"></div>
          <div className="relative space-y-2 w-full px-4">
            {[
              { width: "w-3/4", color: "bg-emerald-400", icon: "📊" },
              { width: "w-full", color: "bg-emerald-500", icon: "📈" },
              { width: "w-2/3", color: "bg-emerald-300", icon: "💹" },
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">{bar.icon}</span>
                <div
                  className={`h-4 ${bar.color} rounded-full ${bar.width}`}
                ></div>
                <span className="text-emerald-600 text-xs ml-auto">✓</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: <Bell className="w-8 h-8 text-orange-600" />,
      title: "Smart Notifications",
      description:
        "Get instant alerts for urgent messages, mentions, and priority conversations across platforms.",
      badge: "Priority Alert",
      badgeColor: "bg-orange-600",
      visual: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg"></div>
          <div className="relative space-y-3 w-full px-4">
            {[
              { icon: "📱", status: "error" },
              { icon: "🌐", status: "warning" },
              { icon: "💬", status: "success" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "error"
                      ? "bg-red-500"
                      : item.status === "warning"
                        ? "bg-orange-500"
                        : "bg-green-500"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Security & Compliance",
      description:
        "Enterprise-grade encryption and compliance tools to keep your customer conversations secure.",
      badge: "Encrypted",
      badgeColor: "bg-indigo-600",
      visual: (
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg"></div>
          <div className="relative">
            <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center rotate-6">
              <Shield className="w-12 h-12 text-indigo-600" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-indigo-300 rounded-lg animate-ping opacity-20"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold mb-2">Solutions</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unified Message Management
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect all your messaging platforms in one powerful dashboard.
            Manage Instagram, Facebook, WhatsApp, TikTok, Telegram, and Viber
            conversations seamlessly.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Visual Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span
                    className={`${feature.badgeColor} text-white text-xs px-3 py-1 rounded-full font-medium`}
                  >
                    {feature.badge}
                  </span>
                </div>
                {feature.visual}
              </div>

              {/* Content Section */}
              <div className="p-6 pt-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Icons Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Integrated with</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              "Instagram",
              "Facebook",
              "WhatsApp",
              "TikTok",
              "Telegram",
              "Viber",
            ].map((platform) => (
              <div
                key={platform}
                className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageIntegrationFeatures;
