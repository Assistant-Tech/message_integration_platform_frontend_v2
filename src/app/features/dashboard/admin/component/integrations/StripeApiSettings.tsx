import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X, AlertCircle, Key } from "lucide-react";

const StripeApiSettings = () => {
  const [testPublishableKey, setTestPublishableKey] = useState("");
  const [testSecretKey, setTestSecretKey] = useState("");
  const [livePublishableKey, setLivePublishableKey] = useState("");
  const [liveSecretKey, setLiveSecretKey] = useState("");

  const [showTestSecret, setShowTestSecret] = useState(false);
  const [showLiveSecret, setShowLiveSecret] = useState(false);

  const [mode, setMode] = useState<"test" | "live">("test");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  const validateKey = (
    key: string,
    type: "publishable" | "secret",
    mode: "test" | "live",
  ) => {
    if (!key) return null;

    const prefix =
      type === "publishable"
        ? mode === "test"
          ? "pk_test_"
          : "pk_live_"
        : mode === "test"
          ? "sk_test_"
          : "sk_live_";

    return key.startsWith(prefix);
  };

  const handleSave = async () => {
    setSaveStatus("saving");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSaveStatus("success");
    setTimeout(() => setSaveStatus("idle"), 3000);
  };

  const isTestValid =
    validateKey(testPublishableKey, "publishable", "test") &&
    validateKey(testSecretKey, "secret", "test");
  const isLiveValid =
    validateKey(livePublishableKey, "publishable", "live") &&
    validateKey(liveSecretKey, "secret", "live");

  const KeyInput = ({
    label,
    value,
    onChange,
    isSecret,
    show,
    onToggleShow,
    type,
    mode: keyMode,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    isSecret: boolean;
    show?: boolean;
    onToggleShow?: () => void;
    type: "publishable" | "secret";
    mode: "test" | "live";
    placeholder: string;
  }) => {
    const isValid = validateKey(value, type, keyMode);

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Key className="w-4 h-4" />
          {label}
        </label>
        <div className="relative">
          <input
            type={isSecret && !show ? "password" : "text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-4 py-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              value && isValid === false
                ? "border-red-300 focus:ring-red-500 bg-red-50"
                : value && isValid === true
                  ? "border-green-300 focus:ring-primary-light bg-green-50"
                  : "border-gray-300 focus:ring-primary"
            }`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {value &&
              (isValid === true ? (
                <Check className="w-5 h-5 text-primary-light" />
              ) : isValid === false ? (
                <X className="w-5 h-5 text-red-500" />
              ) : null)}
            {isSecret && (
              <button
                type="button"
                onClick={onToggleShow}
                className="text-gray-500 hover:text-gray-700"
              >
                {show ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>
        {value && isValid === false && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Invalid {keyMode} {type} key format
          </p>
        )}
      </div>
    );
  };

  return (
    <motion.section
      className="w-full flex flex-col h-full px-2 py-4 min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-2">
        {/* Header */}
        <div className="flex flex-col text-start mb-6">
          <h1 className="text-2xl font-bold text-gray-700 mb-1">Settings</h1>
          <h2 className="text-base font-medium text-primary">
            Stripe API Keys
          </h2>
        </div>

        {/* Mode Toggle */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Active Mode
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {mode === "test"
                  ? "Test mode allows you to simulate transactions without real charges"
                  : "Live mode processes real transactions and charges"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-medium ${mode === "test" ? "text-blue-600" : "text-gray-500"}`}
              >
                Test
              </span>
              <button
                onClick={() => setMode(mode === "test" ? "live" : "test")}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  mode === "live" ? "bg-primary-light" : "bg-primary"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    mode === "live" ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${mode === "live" ? "text-green-600" : "text-gray-500"}`}
              >
                Live
              </span>
            </div>
          </div>

          {mode === "live" && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> You are in live mode. Real
                transactions will be processed.
              </p>
            </div>
          )}
        </div>

        {/* Test Keys Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Test API Keys
            </h3>
            {isTestValid && (
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Configured
              </span>
            )}
          </div>

          <div className="space-y-4">
            <KeyInput
              label="Publishable Key"
              value={testPublishableKey}
              onChange={setTestPublishableKey}
              isSecret={false}
              type="publishable"
              mode="test"
              placeholder="pk_test_..."
            />

            <KeyInput
              label="Secret Key"
              value={testSecretKey}
              onChange={setTestSecretKey}
              isSecret={true}
              show={showTestSecret}
              onToggleShow={() => setShowTestSecret(!showTestSecret)}
              type="secret"
              mode="test"
              placeholder="sk_test_..."
            />
          </div>
        </div>

        {/* Live Keys Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-primary-light rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-800">
              Live API Keys
            </h3>
            {isLiveValid && (
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Configured
              </span>
            )}
          </div>

          <div className="space-y-4">
            <KeyInput
              label="Publishable Key"
              value={livePublishableKey}
              onChange={setLivePublishableKey}
              isSecret={false}
              type="publishable"
              mode="live"
              placeholder="pk_live_..."
            />

            <KeyInput
              label="Secret Key"
              value={liveSecretKey}
              onChange={setLiveSecretKey}
              isSecret={true}
              show={showLiveSecret}
              onToggleShow={() => setShowLiveSecret(!showLiveSecret)}
              type="secret"
              mode="live"
              placeholder="sk_live_..."
            />
          </div>

          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-800">
              Keep your secret keys confidential. Never share them publicly or
              commit them to version control.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <a
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 underline"
          >
            Get your API keys from Stripe Dashboard →
          </a>

          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              saveStatus === "saving"
                ? "bg-gray-400 text-white cursor-not-allowed"
                : saveStatus === "success"
                  ? "bg-primary-light text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "success" && (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Saved Successfully
              </span>
            )}
            {saveStatus === "idle" && "Save API Keys"}
            {saveStatus === "error" && "Try Again"}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default StripeApiSettings;
