import { useState } from "react";
import { Button } from "@/app/components/ui";
import { useMfaStore } from "@/app/store/mfa.store";

const MfaVerifySection = ({ onSuccess }: { onSuccess: () => void }) => {
  const { verifyMfa } = useMfaStore();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    const res = await verifyMfa(code);
    setLoading(false);

    if (res && res.success) {
      onSuccess();
    } else {
      setError(res?.message || "Verification failed");
    }
  };

  return (
    <div className="mt-6 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter 6-digit code
      </label>
      <input
        type="text"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        className="w-full border rounded-lg px-3 py-2 text-center tracking-widest text-lg"
        placeholder="123456"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button
        label={loading ? "Verifying..." : "Verify & Enable"}
        variant="primary"
        onClick={handleVerify}
        disabled={loading || code.length !== 6}
        className="mt-4 w-full"
      />
    </div>
  );
};

export default MfaVerifySection;
