import { Button } from "@/app/components/ui";
import { useMfaStore } from "@/app/store/mfa.store";

const RecoveryCodesModal = ({ onClose }: { onClose: () => void }) => {
  const { recoveryPhrases } = useMfaStore();

  const handleDownload = () => {
    const blob = new Blob([recoveryPhrases.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recovery-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(recoveryPhrases.join("\n"));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <h3 className="text-lg font-bold mb-4">Your Recovery Codes</h3>
        <p className="text-sm text-gray-600 mb-2">
          Save these codes securely. You will <strong>not</strong> see them
          again.
        </p>
        <div className="bg-gray-100 rounded-lg p-4 mb-4 space-y-1 font-mono text-sm">
          {recoveryPhrases.map((code, i) => (
            <div key={i}>{code}</div>
          ))}
        </div>
        <div className="flex justify-end items-center gap-2">
          <Button label="Copy All" variant="outlined" onClick={handleCopyAll} />
          <Button
            label="Download"
            variant="secondary"
            onClick={handleDownload}
          />
          <Button label="Close" variant="primary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default RecoveryCodesModal;
