import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  Key,
  CheckCircle2,
  RefreshCw,
  Edit,
} from "lucide-react";
import {
  saveStripeKeys,
  fetchStripeIntegrationStatus,
  fetchStripeKeys,
} from "@/app/services/stripe.services";
import { toast } from "sonner";

interface StripeIntegration {
  id: string;
  provider: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const StripeApiSettings = () => {
  const [testSecretKey, setTestSecretKey] = useState("");
  const [liveSecretKey, setLiveSecretKey] = useState("");

  const [showTestSecret, setShowTestSecret] = useState(false);
  const [showLiveSecret, setShowLiveSecret] = useState(false);

  const [mode, setMode] = useState<"test" | "live">("test");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Status check states
  const [stripeConfigured, setStripeConfigured] = useState<boolean>(false);
  const [stripeIntegration, setStripeIntegration] =
    useState<StripeIntegration | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(true);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  useEffect(() => {
    checkStripeStatus();
  }, []);

  const checkStripeStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const data = await fetchStripeIntegrationStatus();

      if (data.success && data.data.configured) {
        setStripeConfigured(true);
        setStripeIntegration(data.data.integration);
        setShowEditForm(false);
      } else {
        setStripeConfigured(false);
        setStripeIntegration(null);
        setShowEditForm(true);
      }
    } catch (error) {
      console.error("Error checking Stripe status:", error);
      setStripeConfigured(false);
      setStripeIntegration(null);
      setShowEditForm(true);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const loadExistingKeys = async () => {
    try {
      const data = await fetchStripeKeys();
      if (data?.testSecretKey) setTestSecretKey(data.testSecretKey);
      if (data?.liveSecretKey) setLiveSecretKey(data.liveSecretKey);
    } catch {
      console.log("No existing keys found");
    }
  };

  const validateSecret = (key: string, mode: "test" | "live") => {
    if (!key) return null;
    return mode === "test"
      ? key.startsWith("sk_test_")
      : key.startsWith("sk_live_");
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    setErrorMessage("");

    try {
      const secretKey = mode === "test" ? testSecretKey : liveSecretKey;

      const isValidSecret = validateSecret(secretKey, mode);

      if (!isValidSecret) {
        setSaveStatus("error");
        setErrorMessage("Please enter a valid Stripe secret key");
        return;
      }

      const response = await saveStripeKeys({
        provider: "stripe",
        type: "api_key",
        secret: secretKey,
      });

      if (!response.success) {
        throw new Error("Failed to save key");
      }

      toast.success("Stripe secret key saved successfully");

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);

      // Recheck status after saving
      await checkStripeStatus();
    } catch (err: any) {
      setSaveStatus("error");
      setErrorMessage(err.message || "Saving failed");
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
    loadExistingKeys();
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setTestSecretKey("");
    setLiveSecretKey("");
    setErrorMessage("");
    setSaveStatus("idle");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const KeyInput = ({
    label,
    value,
    onChange,
    show,
    onToggleShow,
    mode,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    show: boolean;
    onToggleShow: () => void;
    mode: "test" | "live";
  }) => {
    const isValid = validateSecret(value, mode);

    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Key className="w-4 h-4" />
          {label}
        </label>

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={mode === "test" ? "sk_test_..." : "sk_live_..."}
            className={`w-full px-4 py-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              value && isValid === false
                ? "border-red-300 focus:ring-red-500 bg-red-50"
                : value && isValid === true
                  ? "border-green-300 focus:ring-green-500 bg-green-50"
                  : "border-gray-300 focus:ring-blue-500"
            }`}
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {value &&
              (isValid ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              ))}

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
          </div>
        </div>

        {value && isValid === false && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Invalid secret key format
          </p>
        )}
      </div>
    );
  };

  const isTestValid = validateSecret(testSecretKey, "test");
  const isLiveValid = validateSecret(liveSecretKey, "live");

  const maskValue = (
    value: string,
    options?: {
      start?: number;
      end?: number;
      maskChar?: string;
    },
  ) => {
    if (!value) return "";

    const start = options?.start ?? 6;
    const end = options?.end ?? 4;
    const maskChar = options?.maskChar ?? "*";

    if (value.length <= start + end) {
      return maskChar.repeat(value.length);
    }

    return (
      value.slice(0, start) +
      maskChar.repeat(value.length - (start + end)) +
      value.slice(-end)
    );
  };

  return (
    <motion.section
      className="w-full flex flex-col h-full px-2 py-4 min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-700 mb-1">Settings</h1>
            <h2 className="text-base font-medium text-blue-600">
              Stripe Secret Keys
            </h2>
          </div>

          {stripeConfigured && !showEditForm && (
            <button
              onClick={checkStripeStatus}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Status
            </button>
          )}
        </div>

        {/* Loading State */}
        {isCheckingStatus && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-600">
                Checking Stripe configuration...
              </p>
            </div>
          </div>
        )}

        {/* Configuration Status Card */}
        {!isCheckingStatus &&
          stripeConfigured &&
          stripeIntegration &&
          !showEditForm && (
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        Stripe Integration Active
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your Stripe payment gateway is configured and ready to
                        process payments.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Keys
                  </button>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Integration Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Provider
                        </span>
                        <span className="text-sm text-gray-800 capitalize">
                          {stripeIntegration.provider}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Type
                        </span>
                        <span className="text-sm text-gray-800 capitalize">
                          {stripeIntegration.type}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Integration Key
                        </span>
                        <span className="text-sm text-gray-800 font-mono break-all">
                          {maskValue(stripeIntegration.id, {
                            start: 6,
                            end: 4,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Created
                        </span>
                        <span className="text-sm text-gray-800">
                          {formatDate(stripeIntegration.createdAt)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">
                          Last Updated
                        </span>
                        <span className="text-sm text-gray-800">
                          {formatDate(stripeIntegration.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Edit Form */}
        {!isCheckingStatus && (!stripeConfigured || showEditForm) && (
          <>
            {saveStatus === "error" && errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            )}

            {/* Mode Toggle */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Active Mode
                </h3>

                <div className="flex items-center gap-3">
                  <span
                    className={
                      mode === "test"
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }
                  >
                    Test
                  </span>
                  <button
                    onClick={() => setMode(mode === "test" ? "live" : "test")}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      mode === "live" ? "bg-green-600" : "bg-blue-600"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        mode === "live" ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span
                    className={
                      mode === "live"
                        ? "text-green-600 font-medium"
                        : "text-gray-500"
                    }
                  >
                    Live
                  </span>
                </div>
              </div>
            </div>

            {/* Secret Keys */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {mode === "test" ? "Test Secret Key" : "Live Secret Key"}
                </h3>

                {(mode === "test" ? isTestValid : isLiveValid) && (
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Configured
                  </span>
                )}
              </div>

              {mode === "test" ? (
                <KeyInput
                  label="Test Secret Key"
                  value={testSecretKey}
                  onChange={setTestSecretKey}
                  show={showTestSecret}
                  onToggleShow={() => setShowTestSecret(!showTestSecret)}
                  mode="test"
                />
              ) : (
                <KeyInput
                  label="Live Secret Key"
                  value={liveSecretKey}
                  onChange={setLiveSecretKey}
                  show={showLiveSecret}
                  onToggleShow={() => setShowLiveSecret(!showLiveSecret)}
                  mode="live"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {showEditForm && stripeConfigured && (
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  saveStatus === "saving"
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {saveStatus === "saving" ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Secret Key"
                )}
              </button>
            </div>
          </>
        )}

        {/* Info Box */}
        {!isCheckingStatus && (!stripeConfigured || showEditForm) && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-800 mb-1">
                  How to get your Stripe API Keys
                </h4>
                <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                  <li>Log in to your Stripe Dashboard</li>
                  <li>Go to Developers → API keys</li>
                  <li>
                    Copy your Secret key (starts with sk_test_ or sk_live_)
                  </li>
                  <li>Paste it here and save</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default StripeApiSettings;
