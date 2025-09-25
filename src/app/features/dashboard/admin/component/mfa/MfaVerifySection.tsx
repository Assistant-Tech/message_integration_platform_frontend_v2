import { useState, useRef } from "react";
import { Button } from "@/app/components/ui";
import { useMfaStore } from "@/app/store/mfa.store";

const MfaVerifySection = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel?: () => void;
}) => {
  const { verifyMfa } = useMfaStore();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // always take last typed digit
    setOtp(newOtp);

    // move focus to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pasted)) {
      const chars = pasted.split("").slice(0, 6);
      const newOtp = [...otp];
      chars.forEach((char, idx) => {
        if (index + idx < newOtp.length) {
          newOtp[index + idx] = char;
        }
      });
      setOtp(newOtp);
      // focus last filled input
      const lastIndex = Math.min(index + chars.length - 1, 5);
      inputsRef.current[lastIndex]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
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
      <div className="flex justify-center items-center">
        <div className="flex gap-[10px]">
          {otp.slice(0, 3).map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
              ref={(el: any) => (inputsRef.current[index] = el)}
              className="w-12 h-12 h3-medium-32 text-grey border bg-base-white border-primary rounded-[10px] text-center text-lg focus:outline-none focus:border-primary-dark focus:ring-0 focus:ring-primary shadow-[0_2px_4px_0_rgba(0,0,0,0.25)_inset]"
            />
          ))}
        </div>
        <span className="mx-2 h1-bold-48 text-grey">-</span>
        <div className="flex gap-[10px]">
          {otp.slice(3, 6).map((digit, index) => (
            <input
              key={index + 3}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index + 3, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index + 3, e)}
              onPaste={(e) => handlePaste(index + 3, e)}
              ref={(el: any) => (inputsRef.current[index + 3] = el)}
              className="w-12 h-12 h3-medium-32 text-grey border bg-base-white border-primary rounded-[10px] text-center text-lg focus:outline-none focus:border-primary-dark focus:ring-0 focus:ring-primary shadow-[0_2px_4px_0_rgba(0,0,0,0.25)_inset]"
            />
          ))}
        </div>
      </div>
      {error && <p className="text-danger h5-semi-bold-16 mt-2">{error}</p>}
      <div className="flex items-center gap-4">
        <Button
          label={loading ? "Verifying..." : "Verify"}
          variant="primary"
          onClick={handleVerify}
          disabled={loading || otp.some((d) => d === "")}
          className="mt-4 w-full"
        />
        <Button
          label="Cancel"
          variant="danger"
          onClick={onCancel}
          className="mt-4 w-full"
        />
      </div>
    </div>
  );
};

export default MfaVerifySection;
