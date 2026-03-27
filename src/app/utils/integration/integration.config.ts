export const allIntegrations: Record<string, any[]> = {
  payment: [
    {
      id: "stripe",
      name: "Stripe",
      description: "Accept international payments and subscriptions.",
      logoSvg:
        '<svg viewBox="0 0 24 24" fill="white"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/></svg>',
      logoBackgroundColor: "bg-indigo-600",
      defaultEnabled: true,
    },
  ],
  shipping: [
    {
      id: "nepalcan",
      name: "Nepal Can",
      description: "Local courier and logistics services in Nepal.",
      logoSvg:
        '<svg viewBox="0 0 24 24" fill="white"><path d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 0 1 4.5 17 1.5 1.5 0 0 1 6 15.5 1.5 1.5 0 0 1 7.5 17 1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3 3 3 0 0 0 3-3h6a3 3 0 0 0 3 3 3 3 0 0 0 3-3h2v-5l-3-4Z"/></svg>',
      logoBackgroundColor: "bg-blue-700",
      defaultEnabled: true,
    },
    {
      id: "canadapost",
      name: "Canada Post",
      description: "International shipping to Canada.",
      logoSvg:
        '<svg viewBox="0 0 24 24" fill="white"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
      logoBackgroundColor: "bg-red-600",
      defaultEnabled: false,
    },
  ],
};
