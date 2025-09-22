import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/app/components/ui";
import { Download } from "lucide-react";

interface RecoveryPhrasesModalProps {
  codes: string[];
  onClose: () => void;
}

const RecoveryPhrasesModal: React.FC<RecoveryPhrasesModalProps> = ({
  codes,
  onClose,
}) => {
  const [phraseInputs, setPhraseInputs] = useState<string[]>(
    codes.length ? codes : Array(12).fill(""),
  );
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow letters and move to next input
    const sanitizedValue = value.replace(/[^a-zA-Z]/g, "").toLowerCase();

    if (sanitizedValue.length <= 1) {
      const newInputs = [...phraseInputs];
      newInputs[index] = sanitizedValue;
      setPhraseInputs(newInputs);

      // Move to next input if value entered
      if (sanitizedValue && index < 11) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !phraseInputs[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 11) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleDownload = () => {
    const content = phraseInputs.join(" ");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-phrases.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    const content = phraseInputs.join(" ");
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="h4-bold-24 text-base-black mb-4 text-center">
          Your 12 words recovery phrases
        </h2>

        <p className="body-regular-16 text-grey mb-2 ">
          This is the only way to recover your account if you lose access to
          your device. Please write down these 12 words in the exact order shown
          below and store them in a safe place.
        </p>

        <div className="mb-4 px-4">
          <ul className="body-regular-16 text-grey space-y-1">
            <li>• Do not share this phrase with anyone.</li>
            <li>• Do not store this phrase as a screenshot or digital file.</li>
          </ul>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 px-12">
          {phraseInputs.map((phrase, index) => (
            <div key={index} className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 caption-regular-12 text-gray-light">
                {index + 1}
              </span>
              <input
                type="text"
                inputMode="text"
                maxLength={10}
                value={phrase}
                placeholder="ABCDE"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el: any) => (inputsRef.current[index] = el)}
                className="w-full h-12 body-regular-16 text-grey border bg-base-white border-primary rounded-[10px] text-center text-lg focus:outline-none focus:border-primary-dark focus:ring-0 focus:ring-primary shadow-[0_2px_4px_0_rgba(0,0,0,0.25)_inset]"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 w-full">
          <Button
            label="Copy 🔗"
            variant="none"
            onClick={handleCopyAll}
            className="w-1/2 bg-base-black text-white px-4 py-2 hover:bg-grey"
          />
          <Button
            label="Download"
            variant="primary"
            onClick={handleDownload}
            IconRight={<Download />}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default RecoveryPhrasesModal;
