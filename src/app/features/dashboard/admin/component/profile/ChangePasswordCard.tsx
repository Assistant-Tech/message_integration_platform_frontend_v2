import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Edit, Eye, EyeOff, Lock, X } from "lucide-react";
import { Button, Input } from "@/app/components/ui";
import PasswordStrengthBar from "@/app/features/dashboard/admin/component/profile/helper";
import { changePassword } from "@/app/services/auth.services";
import { toast } from "sonner";

const ChangePasswordCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    // 1. Basic Required Checks
    if (!currentPassword) errs.currentPassword = "Current password is required";
    if (!newPassword) errs.newPassword = "New password is required";

    // 2. Complexity Check (Matches your API: Upper, Lower, Number, Special)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (newPassword && !passwordRegex.test(newPassword)) {
      errs.newPassword =
        "Must include uppercase, lowercase, number, and special character";
    }

    // 3. Match Check
    if (!confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      const res = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword,
      );
      toast.success(res.message || "Password Changed successfully!");
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to change password!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setErrors({});
    setIsEditing(false);
  };

  const clearError = (field: string) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const EyeToggle = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="text-grey-medium hover:text-grey transition-colors"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl border border-grey-light overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 sm:px-6 border-b border-grey-light bg-base-white">
        <div className="flex items-center gap-2">
          <Lock size={18} className="text-primary" />
          <h2 className="body-bold-16 text-grey">Change Password</h2>
        </div>
        {!isEditing && (
          <Button
            label="Edit"
            variant="none"
            size="sm"
            onClick={() => setIsEditing(true)}
            IconLeft={<Edit size={14} />}
            className="text-primary hover:text-primary-dark font-medium"
          />
        )}
      </div>

      {/* Fields */}
      <div className="px-5 py-5 sm:px-6 space-y-4">
        <div>
          <label className="block label-regular-14 text-grey-medium mb-1.5">
            Current Password
          </label>
          <Input
            placeholder="Enter current password"
            type={showCurrent ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              clearError("currentPassword");
            }}
            disabled={!isEditing}
            error={errors.currentPassword}
            iconRight={
              isEditing ? (
                <EyeToggle
                  show={showCurrent}
                  onToggle={() => setShowCurrent((v) => !v)}
                />
              ) : null
            }
          />
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label className="block label-regular-14 text-grey-medium mb-1.5">
                  New Password
                </label>
                <Input
                  placeholder="At least 8 characters"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    clearError("newPassword");
                  }}
                  error={errors.newPassword}
                  iconRight={
                    <EyeToggle
                      show={showNew}
                      onToggle={() => setShowNew((v) => !v)}
                    />
                  }
                />
                <PasswordStrengthBar password={newPassword} />
              </div>

              <div>
                <label className="block label-regular-14 text-grey-medium mb-1.5">
                  Confirm New Password
                </label>
                <Input
                  placeholder="Re-enter new password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearError("confirmPassword");
                  }}
                  error={errors.confirmPassword}
                  iconRight={
                    <EyeToggle
                      show={showConfirm}
                      onToggle={() => setShowConfirm((v) => !v)}
                    />
                  }
                />
                {confirmPassword &&
                  newPassword &&
                  confirmPassword === newPassword && (
                    <p className="text-xs text-success flex items-center gap-1 mt-1.5">
                      <Check size={12} /> Passwords match
                    </p>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-3 px-5 py-4 sm:px-6 border-t border-grey-light bg-base-white"
          >
            <Button
              label="Update Password"
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={isSaving}
              IconLeft={<Lock size={14} />}
            />
            <Button
              label="Cancel"
              variant="outlined"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
              IconLeft={<X size={14} />}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChangePasswordCard;
