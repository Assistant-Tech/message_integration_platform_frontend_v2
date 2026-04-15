import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Mail, Phone, Save, Shield, User as UserIcon, X } from "lucide-react";
import { Button, Input } from "@/app/components/ui";

interface PersonalDetailsCardProps {
  initialName: string;
  initialEmail: string;
  roleType: string;
}

const getRoleLabel = (role: string) => {
  if (role === "TENANT_ADMIN") return "Admin";
  if (role === "MEMBER") return "Member";
  return role;
};

const getRoleBadgeStyle = (role: string) =>
  role === "TENANT_ADMIN"
    ? "bg-primary-light text-primary border border-primary/20"
    : "bg-information-light text-information border border-information/20";

const PersonalDetailsCard = ({
  initialName,
  initialEmail,
  roleType,
}: PersonalDetailsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    // TODO: replace with actual API call
    await new Promise((r) => setTimeout(r, 600));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFullName(initialName);
    setEmail(initialEmail);
    setErrors({});
    setIsEditing(false);
  };

  const clearError = (field: string) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const fields = [
    {
      icon: UserIcon,
      label: "Full Name",
      value: fullName,
      placeholder: "Enter your full name",
      onChange: (v: string) => { setFullName(v); clearError("fullName"); },
      error: errors.fullName,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      placeholder: "Enter your email",
      onChange: (v: string) => { setEmail(v); clearError("email"); },
      error: errors.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      placeholder: "e.g. +1 555 000 0000",
      onChange: (v: string) => setPhone(v),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-xl border border-grey-light overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 sm:px-6 border-b border-grey-light bg-base-white">
        <div className="flex items-center gap-2">
          <UserIcon size={18} className="text-primary" />
          <h2 className="body-bold-16 text-grey">Personal Details</h2>
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
      <div className="px-5 py-5 sm:px-6 space-y-5">
        {fields.map(({ icon: Icon, label, value, placeholder, onChange, error }) => (
          <div
            key={label}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-1 sm:gap-3"
          >
            <div className="flex items-center gap-2 sm:pt-2">
              <Icon size={14} className="text-grey-medium shrink-0" />
              <span className="label-regular-14 text-grey-medium">{label}</span>
            </div>
            {isEditing ? (
              <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={error}
              />
            ) : (
              <span
                className={`label-semi-bold-14 pt-0 sm:pt-2 break-all ${
                  value ? "text-grey" : "text-grey-medium"
                }`}
              >
                {value || "Not provided"}
              </span>
            )}
          </div>
        ))}

        {/* Role (read-only) */}
        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-start gap-1 sm:gap-3">
          <div className="flex items-center gap-2 sm:pt-1">
            <Shield size={14} className="text-grey-medium shrink-0" />
            <span className="label-regular-14 text-grey-medium">Role</span>
          </div>
          <div className="pt-0 sm:pt-1">
            <span
              className={`caption-bold-12 px-2.5 py-1 rounded-full ${getRoleBadgeStyle(roleType)}`}
            >
              {getRoleLabel(roleType)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-3 px-5 py-4 sm:px-6 border-t border-grey-light bg-base-white"
          >
            <Button
              label="Save Changes"
              variant="primary"
              size="sm"
              onClick={handleSave}
              loading={isSaving}
              IconLeft={<Save size={14} />}
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

export default PersonalDetailsCard;
