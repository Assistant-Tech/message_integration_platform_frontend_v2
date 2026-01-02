import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Save, X, CircleUser } from "lucide-react";
import { Input, Button } from "@/app/components/ui";
import { Switch } from "../../component/ui";
import { useNotificationStore } from "@/app/store/notification.store";
import { User } from "@/app/types/auth.types";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/app/constants/queryKeys";

const ProfileSettings = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(QUERY_KEYS.CURRENT_USER);
  console.log(useQueryClient().getQueryCache().getAll());

  const [showPassword, setShowPassword] = useState(false);

  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [fullName, setFullName] = useState(user?.email.split("@")[0] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("Not Available");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!user) return null;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSavePersonal = () => {
    setIsEditingPersonal(false);
  };

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  return (
    <motion.section
      className="max-w-5xl flex flex-col h-full px-6 py-4 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <motion.article className="flex flex-col text-start mb-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-1">Settings</h1>
        <h2 className="text-base font-medium text-primary">My Profile</h2>
      </motion.article>

      {/* Notification Preferences */}
      <div className="flex justify-start py-4 items-center">
        <span className="w-72 text-gray-500">Show Toast Notifications</span>
        <Switch
          checked={useNotificationStore.getState().showToasts}
          onCheckedChange={() => useNotificationStore.getState().toggleToasts()}
        />
      </div>

      {/* Profile Card */}
      <motion.div className="flex items-center border border-gray-200 rounded-xl p-4 bg-white mb-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <CircleUser size={24} className="text-white" />
            )}
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-gray-700">{fullName}</h3>
          <p className="text-sm text-gray-500">{user.roleType}</p>
        </div>
      </motion.div>

      {/* Personal Details */}
      <motion.div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex justify-between items-center px-6 py-4 border-b border-grey-light bg-base-white">
          <h2 className="text-lg font-semibold text-gray-700">
            Personal Details
          </h2>

          {!isEditingPersonal && (
            <Button
              label="Edit"
              variant="none"
              onClick={() => setIsEditingPersonal(true)}
              IconLeft={<Edit size={16} />}
              className="text-primary hover:text-primary-dark"
            />
          )}
        </div>

        <div className="p-6 divide-y divide-gray-200">
          {/* Full Name */}
          <div className="flex justify-start py-4">
            <span className="w-72 text-gray-500">Full Name</span>
            {isEditingPersonal ? (
              <Input
                placeholder="Enter new name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            ) : (
              <span className="font-medium text-gray-700">{fullName}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-start py-4">
            <span className="w-72 text-gray-500">Email</span>
            {isEditingPersonal ? (
              <Input
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <span className="font-medium text-gray-700">{email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex justify-start py-4">
            <span className="w-72 text-gray-500">Phone Number</span>
            {isEditingPersonal ? (
              <Input
                placeholder="Enter new phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <span className="font-medium text-gray-700">{phoneNumber}</span>
            )}
          </div>

          {/* Role */}
          <div className="flex justify-start py-4">
            <span className="w-72 text-gray-500">Role</span>
            <span className="font-medium text-gray-700">{user.roleType}</span>
          </div>
        </div>

        {isEditingPersonal && (
          <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
            <Button
              label="Save Changes"
              variant="primary"
              onClick={handleSavePersonal}
              IconLeft={<Save size={16} />}
            />
            <Button
              label="Cancel"
              variant="outlined"
              onClick={() => setIsEditingPersonal(false)}
              IconLeft={<X size={16} />}
            />
          </div>
        )}
      </motion.div>

      {/* Change Password */}
      <motion.div className="bg-white rounded-lg border border-gray-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-grey-light bg-base-white">
          <h2 className="text-lg font-semibold text-gray-700">
            Change Password
          </h2>

          {!isEditingPassword && (
            <Button
              label="Edit"
              variant="none"
              onClick={() => setIsEditingPassword(true)}
              IconLeft={<Edit size={16} />}
              className="text-primary hover:text-primary-dark"
            />
          )}
        </div>

        <div className="p-6 space-y-4">
          {/* Current Password */}
          <div>
            <span className="block text-gray-500 mb-2">Current Password</span>
            <div className="relative">
              <Input
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={!isEditingPassword}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={!isEditingPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {isEditingPassword && (
            <>
              <div>
                <span className="block text-gray-500 mb-2">New Password</span>
                <Input
                  placeholder="Enter re enter password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <span className="block text-gray-500 mb-2">
                  Confirm New Password
                </span>
                <Input
                  placeholder=""
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        {isEditingPassword && (
          <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
            <Button
              label="Update Password"
              variant="primary"
              onClick={handleSavePassword}
              IconLeft={<Save size={16} />}
            />
            <Button
              label="Cancel"
              variant="outlined"
              onClick={() => setIsEditingPassword(false)}
              IconLeft={<X size={16} />}
            />
          </div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default ProfileSettings;
