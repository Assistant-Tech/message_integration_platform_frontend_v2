/**
 * Extracts and formats features from a plan's features object into a readable array
 */
export const extractFeatures = (
  features: Record<string, any> | string[],
): string[] => {
  const featuresList: string[] = [];

  // Case 1: When features are an array of strings
  if (Array.isArray(features)) {
    return features.map((feature: string) =>
      feature
        .split(" ")
        .map((word: string, index: number) =>
          index === 0
            ? word.charAt(0).toUpperCase() + word.slice(1)
            : word.toLowerCase(),
        )
        .join(" "),
    );
  }

  // Case 2: When features are an object with keys and values
  Object.entries(features).forEach(([key, value]) => {
    if (key === "includes") {
      featuresList.push(`Includes all ${value} features`);
    } else if (key === "channels" && Array.isArray(value)) {
      featuresList.push(
        `${value.length} Channels: ${value.map((ch) => ch.charAt(0).toUpperCase() + ch.slice(1)).join(", ")}`,
      );
    } else if (key === "chatAgents") {
      featuresList.push(`${value} Chat Agent${value > 1 ? "s" : ""}`);
    } else if (key === "integrations") {
      featuresList.push(`${value} Integration${value > 1 ? "s" : ""}`);
    } else if (typeof value === "boolean" && value) {
      // Convert camelCase to readable format
      const readableKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/Api/g, "API")
        .replace(/Ai/g, "AI");
      featuresList.push(readableKey);
    } else if (typeof value === "number" && value > 0) {
      const readableKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      featuresList.push(`${readableKey}: ${value}`);
    }
  });

  return featuresList;
};

/**
 * Format secret code into suitable double liner
 */
export const formatSecret = (secret: string) => {
  return (
    secret
      .toUpperCase()
      .match(/.{1,4}/g)
      ?.join(" ") ?? ""
  );
};

// utils/currency.ts
export const formatCurrency = (amount: number, currency: "NPR" | "USD") => {
  const normalized = amount / 100; // convert paisa → rupee/dollar
  return currency === "NPR"
    ? `रु${normalized.toFixed(2)}`
    : `$${normalized.toFixed(2)}`;
};

