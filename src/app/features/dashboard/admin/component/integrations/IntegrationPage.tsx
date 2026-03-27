import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import IntegrationCard from "./IntgerationCard";
import {
  allIntegrations,
  Integration,
} from "@/app/utils/integration/integration.config";

const IntegrationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("communication");
  const [integrationStates, setIntegrationStates] = useState<
    Record<string, boolean>
  >({});

  // Check for provider parameter and set category to shipping
  useEffect(() => {
    const providerParam = searchParams.get("provider");
    if (providerParam) {
      // Switch to shipping category when provider parameter is present
      setActiveCategory("shipping");

      // Optional: Scroll to the specific provider integration card
      // You could add logic here to highlight or focus the specific provider
    }
  }, [searchParams]);

  // Filter integrations based on active tab
  const getFilteredIntegrations = (category: string): Integration[] => {
    const integrations = allIntegrations[category] || [];

    return integrations.filter((int) => {
      const isEnabled = integrationStates[int.id] ?? int.defaultEnabled;

      if (activeTab === "active") return isEnabled;
      if (activeTab === "inactive") return !isEnabled;

      return true;
    });
  };

  const handleToggle = (id: string, enabled: boolean) => {
    setIntegrationStates((prev) => ({
      ...prev,
      [id]: enabled,
    }));
  };

  const handleViewIntegration = (integrationId: string) => {
    if (integrationId === "stripe") {
      navigate("stripe");
    } else {
      console.log(`View ${integrationId}`);
    }
  };

  const categories = [
    { id: "communication", label: "Communication" },
    { id: "payment", label: "Payment" },
    { id: "shipping", label: "Shipping" },
  ];

  const statusTabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
  ];

  // Get provider from URL params for highlighting
  const providerParam = searchParams.get("provider");

  return (
    <motion.section
      className="flex flex-col h-full px-2 py-4 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full px-6 py-2">
        {/* Header */}
        <div className="flex flex-col text-start mb-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-1">Settings</h1>
          <h2 className="text-base font-medium text-primary">Integrations</h2>
        </div>

        {/* Category Tabs */}
        <div className="w-full flex items-center border-b border-grey-light mb-6 bg-base-white rounded-t-lg">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                index === 0 ? "rounded-tl-lg" : ""
              } ${
                activeCategory === category.id
                  ? "text-primary border-b-2 border-primary bg-primary-light"
                  : "text-gray-600 hover:text-grey"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Provider Info Banner (when coming from shipping settings) */}
        {providerParam && activeCategory === "shipping" && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Configure API key for{" "}
              <span className="font-semibold">{providerParam}</span> provider
            </p>
          </div>
        )}

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredIntegrations(activeCategory).map((integration) => {
            // Highlight the card if it matches the provider parameter
            const isHighlighted =
              providerParam && integration.id === providerParam;

            return (
              <div
                key={integration.id}
                className={`${isHighlighted ? "ring-2 ring-primary ring-offset-2 rounded-lg" : ""}`}
              >
                <IntegrationCard
                  name={integration.name}
                  description={integration.description}
                  logoSvg={integration.logoSvg}
                  logoBackgroundColor={integration.logoBackgroundColor}
                  defaultEnabled={
                    integrationStates[integration.id] !== undefined
                      ? integrationStates[integration.id]
                      : integration.defaultEnabled
                  }
                  onToggle={(enabled) => handleToggle(integration.id, enabled)}
                  onViewIntegration={() =>
                    handleViewIntegration(integration.id)
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {getFilteredIntegrations(activeCategory).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {activeTab === "all" ? "" : activeTab} integrations found in{" "}
              {activeCategory}.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default IntegrationPage;
