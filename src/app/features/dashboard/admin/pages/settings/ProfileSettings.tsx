import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Camera,
  Check,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Globe,
  Hash,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User as UserIcon,
  Users,
  X,
} from "lucide-react";
import { Input, Button } from "@/app/components/ui";
import { Switch } from "../../component/ui";
import { useNotificationStore } from "@/app/store/notification.store";
import { useAuthStore } from "@/app/store/auth.store";
import { useTenantDetails } from "@/app/hooks/query/useTenantQuery";
import { getAvatarUrl } from "@/app/utils/avatar";

const getRoleBadgeStyle = (role: string) => {
  if (role === "TENANT_ADMIN")
    return "bg-purple-100 text-purple-700 border border-purple-200";
  return "bg-blue-100 text-blue-700 border border-blue-200";
};

const getRoleLabel = (role: string) => {
  if (role === "TENANT_ADMIN") return "Admin";
  if (role === "MEMBER") return "Member";
  return role;
};

const PasswordStrengthBar = ({ password }: { password: string }) => {
  const getStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
  ];
  const textColors = [
    "",
    "text-red-500",
    "text-yellow-500",
    "text-blue-500",
    "text-green-500",
  ];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= strength ? colors[strength] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${textColors[strength]}`}>
        {labels[strength]}
      </p>
    </div>
  );
};

const ProfileSettings = () => {
  const { user } = useAuthStore();
  const { showToasts, toggleToasts } = useNotificationStore();
  const { data: tenantResponse, isLoading: isTenantLoading } =
    useTenantDetails();
  const tenant = tenantResponse?.data;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [fullName, setFullName] = useState(
    user?.name || user?.email.split("@")[0] || "",
  );
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [personalErrors, setPersonalErrors] = useState<Record<string, string>>(
    {},
  );
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {},
  );
  const [saveSuccess, setSaveSuccess] = useState<
    "personal" | "password" | null
  >(null);

  if (!user) return null;

  const validatePersonal = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Invalid email address";
    setPersonalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePassword = () => {
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.currentPassword = "Current password is required";
    if (!newPassword) errs.newPassword = "New password is required";
    else if (newPassword.length < 8)
      errs.newPassword = "Must be at least 8 characters";
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setPasswordErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSavePersonal = async () => {
    if (!validatePersonal()) return;
    setIsSavingPersonal(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSavingPersonal(false);
    setIsEditingPersonal(false);
    setSaveSuccess("personal");
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleSavePassword = async () => {
    if (!validatePassword()) return;
    setIsSavingPassword(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSavingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
    setSaveSuccess("password");
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleCancelPersonal = () => {
    setFullName(user?.name || user?.email.split("@")[0] || "");
    setEmail(user?.email || "");
    setPersonalErrors({});
    setIsEditingPersonal(false);
  };

  const handleCancelPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordErrors({});
    setIsEditingPassword(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="max-w-full flex flex-col px-6 py-6 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-primary mt-0.5">My Profile</p>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 mb-6 text-sm font-medium"
          >
            <Check size={16} className="shrink-0" />
            {saveSuccess === "personal"
              ? "Profile details updated successfully."
              : "Password changed successfully."}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Hero Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.05 }}
        className="bg-gradient-to-r from-primary/5 via-white to-purple-50 border border-gray-200 rounded-2xl p-6 mb-6 flex items-center gap-5"
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-gray-200">
            <img
              src={getAvatarUrl(user.avatar)}
              alt="Profile avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 shadow-md hover:bg-primary/90 transition-colors"
            title="Change avatar"
          >
            <Camera size={13} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {fullName}
          </h3>
          <p className="text-sm text-gray-500 truncate mt-0.5">{user.email}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getRoleBadgeStyle(user.roleType)}`}
            >
              {getRoleLabel(user.roleType)}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                user.userStatus === "ACTIVE"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              }`}
            >
              {user.userStatus === "ACTIVE" ? "Active" : user.userStatus}
            </span>
            {user.isVerified && (
              <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                <Shield size={10} />
                Verified
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Notification Toggle */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 rounded-xl px-6 py-4 mb-6 flex items-center justify-between"
      >
        <div>
          <p className="text-sm font-semibold text-gray-700">
            Toast Notifications
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Show in-app toast alerts
          </p>
        </div>
        <Switch checked={showToasts} onCheckedChange={toggleToasts} />
      </motion.div>

      {/* 2-column grid: Personal/Password left, Company right */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          {/* Personal Details */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <UserIcon size={18} className="text-primary" />
                <h2 className="text-base font-semibold text-gray-800">
                  Personal Details
                </h2>
              </div>
              {!isEditingPersonal && (
                <Button
                  label="Edit"
                  variant="none"
                  size="sm"
                  onClick={() => setIsEditingPersonal(true)}
                  IconLeft={<Edit size={14} />}
                  className="text-primary hover:text-primary/80 font-medium"
                />
              )}
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Full Name */}
              <div className="grid grid-cols-[160px_1fr] items-start gap-3">
                <div className="flex items-center gap-2 pt-2">
                  <UserIcon size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-500">Full Name</span>
                </div>
                {isEditingPersonal ? (
                  <Input
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (personalErrors.fullName)
                        setPersonalErrors((p) => ({ ...p, fullName: "" }));
                    }}
                    error={personalErrors.fullName}
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-800 pt-2">
                    {fullName || "—"}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="grid grid-cols-[160px_1fr] items-start gap-3">
                <div className="flex items-center gap-2 pt-2">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-500">Email</span>
                </div>
                {isEditingPersonal ? (
                  <Input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (personalErrors.email)
                        setPersonalErrors((p) => ({ ...p, email: "" }));
                    }}
                    error={personalErrors.email}
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-800 pt-2 break-all">
                    {email || "—"}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="grid grid-cols-[160px_1fr] items-start gap-3">
                <div className="flex items-center gap-2 pt-2">
                  <Phone size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-500">Phone</span>
                </div>
                {isEditingPersonal ? (
                  <Input
                    placeholder="e.g. +1 555 000 0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                ) : (
                  <span className="text-sm text-gray-400 pt-2">
                    {phoneNumber || "Not provided"}
                  </span>
                )}
              </div>

              {/* Role */}
              <div className="grid grid-cols-[160px_1fr] items-start gap-3">
                <div className="flex items-center gap-2 pt-1">
                  <Shield size={14} className="text-gray-400 shrink-0" />
                  <span className="text-sm text-gray-500">Role</span>
                </div>
                <div className="pt-1">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getRoleBadgeStyle(user.roleType)}`}
                  >
                    {getRoleLabel(user.roleType)}
                  </span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isEditingPersonal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50"
                >
                  <Button
                    label="Save Changes"
                    variant="primary"
                    size="sm"
                    onClick={handleSavePersonal}
                    loading={isSavingPersonal}
                    IconLeft={<Save size={14} />}
                  />
                  <Button
                    label="Cancel"
                    variant="outlined"
                    size="sm"
                    onClick={handleCancelPersonal}
                    disabled={isSavingPersonal}
                    IconLeft={<X size={14} />}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Change Password */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Lock size={18} className="text-primary" />
                <h2 className="text-base font-semibold text-gray-800">
                  Change Password
                </h2>
              </div>
              {!isEditingPassword && (
                <Button
                  label="Edit"
                  variant="none"
                  size="sm"
                  onClick={() => setIsEditingPassword(true)}
                  IconLeft={<Edit size={14} />}
                  className="text-primary hover:text-primary/80 font-medium"
                />
              )}
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1.5">
                  Current Password
                </label>
                <Input
                  placeholder="Enter current password"
                  type={showCurrentPwd ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (passwordErrors.currentPassword)
                      setPasswordErrors((p) => ({
                        ...p,
                        currentPassword: "",
                      }));
                  }}
                  disabled={!isEditingPassword}
                  error={passwordErrors.currentPassword}
                  iconRight={
                    isEditingPassword ? (
                      <button
                        type="button"
                        onClick={() => setShowCurrentPwd((v) => !v)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showCurrentPwd ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    ) : null
                  }
                />
              </div>

              <AnimatePresence>
                {isEditingPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm text-gray-500 mb-1.5">
                        New Password
                      </label>
                      <Input
                        placeholder="At least 8 characters"
                        type={showNewPwd ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          if (passwordErrors.newPassword)
                            setPasswordErrors((p) => ({
                              ...p,
                              newPassword: "",
                            }));
                        }}
                        error={passwordErrors.newPassword}
                        iconRight={
                          <button
                            type="button"
                            onClick={() => setShowNewPwd((v) => !v)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showNewPwd ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        }
                      />
                      <PasswordStrengthBar password={newPassword} />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-500 mb-1.5">
                        Confirm New Password
                      </label>
                      <Input
                        placeholder="Re-enter new password"
                        type={showConfirmPwd ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (passwordErrors.confirmPassword)
                            setPasswordErrors((p) => ({
                              ...p,
                              confirmPassword: "",
                            }));
                        }}
                        error={passwordErrors.confirmPassword}
                        iconRight={
                          <button
                            type="button"
                            onClick={() => setShowConfirmPwd((v) => !v)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showConfirmPwd ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        }
                      />
                      {confirmPassword &&
                        newPassword &&
                        confirmPassword === newPassword && (
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-1.5">
                            <Check size={12} /> Passwords match
                          </p>
                        )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {isEditingPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50"
                >
                  <Button
                    label="Update Password"
                    variant="primary"
                    size="sm"
                    onClick={handleSavePassword}
                    loading={isSavingPassword}
                    IconLeft={<Lock size={14} />}
                  />
                  <Button
                    label="Cancel"
                    variant="outlined"
                    size="sm"
                    onClick={handleCancelPassword}
                    disabled={isSavingPassword}
                    IconLeft={<X size={14} />}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Company Details */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Company header with logo */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden shrink-0 flex items-center justify-center">
                {isTenantLoading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                ) : tenant?.logoUri || tenant?.logoUrl ? (
                  <img
                    src={(tenant.logoUri || tenant.logoUrl)!}
                    alt="Company logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 size={24} className="text-gray-400" />
                )}
              </div>
              <div className="min-w-0">
                {isTenantLoading ? (
                  <div className="space-y-2">
                    <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-base font-bold text-gray-800 truncate">
                      {tenant?.organizationName || "—"}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {tenant?.slug ? `@${tenant.slug}` : ""}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {tenant?.status && (
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            tenant.status === "ACTIVE"
                              ? "bg-green-100 text-green-700 border border-green-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {tenant.status}
                        </span>
                      )}
                      {tenant?.industry && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                          {tenant.industry}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Company fields */}
          <div className="px-6 py-5 space-y-4">
            {isTenantLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 flex-1 bg-gray-100 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {tenant?.email && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 w-32 shrink-0 pt-0.5">
                      <Mail size={13} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Email</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 break-all">
                      {tenant.email}
                    </span>
                  </div>
                )}

                {tenant?.contactNumber && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 w-32 shrink-0 pt-0.5">
                      <Phone size={13} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Phone</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {tenant.contactNumber}
                    </span>
                  </div>
                )}

                {tenant?.website && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 w-32 shrink-0 pt-0.5">
                      <Globe size={13} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Website</span>
                    </div>
                    <a
                      href={tenant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1 truncate"
                    >
                      {tenant.website.replace(/^https?:\/\//, "")}
                      <ExternalLink size={11} className="shrink-0" />
                    </a>
                  </div>
                )}

                {tenant?.address && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 w-32 shrink-0 pt-0.5">
                      <MapPin size={13} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Address</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {tenant.address}
                    </span>
                  </div>
                )}

                {tenant?.registrationNumber && (
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 w-32 shrink-0 pt-0.5">
                      <Hash size={13} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Reg. No.</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 font-mono">
                      {tenant.registrationNumber}
                    </span>
                  </div>
                )}

                {tenant?.description && (
                  <div className="pt-1 border-t border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">About</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {tenant.description}
                    </p>
                  </div>
                )}

                {/* Team members */}
                {tenant?.user && tenant.user.length > 0 && (
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-gray-400" />
                        <span className="text-xs font-semibold text-gray-500">
                          Team Members
                        </span>
                      </div>
                      {tenant._count && (
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {tenant._count.user} total
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {tenant.user.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <div
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              member.status === "ONLINE"
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-700 truncate">
                              {member.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {member.email}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-medium px-1.5 py-0.5 rounded shrink-0 ${
                              member.status === "ONLINE"
                                ? "text-green-600 bg-green-50"
                                : "text-gray-400 bg-gray-100"
                            }`}
                          >
                            {member.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProfileSettings;
