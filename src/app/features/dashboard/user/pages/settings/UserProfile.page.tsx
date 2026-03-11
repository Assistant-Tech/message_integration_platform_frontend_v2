import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Eye, EyeOff, Save, X } from "lucide-react";
import { Input, Button } from "@/app/components/ui";
import { useAuthStore } from "@/app/store/auth.store";
import { getAvatarUrl } from "@/app/utils/avatar";

const UserProfileSettings = () => {
  const { user } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to manage edit mode for personal details
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Personal details state
  const [fullName, setFullName] = useState(user?.email.split("@")[0] || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState("Not Available");

  // Original values for cancel functionality
  const [originalValues, setOriginalValues] = useState({
    fullName: user?.email.split("@")[0] || "",
    email: user?.email || "",
    phoneNumber: "Not Available",
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEditPersonal = () => {
    setOriginalValues({ fullName, email, phoneNumber });
    setIsEditingPersonal(true);
  };

  const handleSavePersonal = () => {
    // API call would go here
    console.log("Saving personal changes:", { fullName, email, phoneNumber });
    setIsEditingPersonal(false);
  };

  const handleCancelPersonal = () => {
    setFullName(originalValues.fullName);
    setEmail(originalValues.email);
    setPhoneNumber(originalValues.phoneNumber);
    setIsEditingPersonal(false);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleSavePassword = () => {
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // API call would go here
    console.log("Saving password changes");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  const handleCancelPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  if (!user) return null;

  return (
    <motion.section
      className=" flex flex-col w-5xl justify-center h-full px-6 py-4 mb-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.article
        className="flex flex-col text-start mb-6"
        variants={itemVariants}
      >
        <h1 className="h4-bold-24 text-grey mb-2">Settings</h1>
        <h2 className="body-semi-bold-16 text-primary">My Profile</h2>
      </motion.article>

      {/* Profile Card */}
      <motion.div
        className="flex items-center border border-grey-light rounded-xl p-4 bg-white mb-6"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <figure className="flex-shrink-0">
          <motion.img
            src={getAvatarUrl(user.avatar)}
            alt="Profile Picture"
            className="w-20 h-20 rounded-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </figure>
        <div className="ml-4 flex-1">
          <span className="inline-block px-2 py-px label-regular-14 text-primary-dark bg-primary-light rounded-lg">
            {user?.userStatus ? "Active" : "Inactive"}
          </span>
          <h3 className="body-bold-16 text-grey">{user.email.split("@")[0]}</h3>
          <p className="label-regular-14 text-grey-medium">{user.roleType}</p>
        </div>
      </motion.div>

      {/* Personal Details Section */}
      <motion.div
        className="bg-white rounded-lg border border-grey-light mb-6"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center px-6 py-4 bg-base-white rounded-t-lg border-b border-grey-light">
          <h2 className="h5-bold-16 text-grey">Personal Details</h2>
          {!isEditingPersonal && (
            <button
              onClick={handleEditPersonal}
              className="text-primary flex items-center gap-2 hover:text-primary-dark transition-colors"
            >
              <Edit size={16} />
              <span className="body-medium-16">Edit</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-grey-light">
          <motion.div
            className="flex justify-between items-center px-6 py-4"
            layout
            transition={{ duration: 0.3 }}
          >
            <span className="body-regular-16 text-grey-medium">Full Name</span>
            {isEditingPersonal ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-1/2"
              >
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="body-bold-16 text-grey text-right border border-grey-light focus:ring-0"
                  placeholder=""
                />
              </motion.div>
            ) : (
              <span className="body-bold-16 text-grey">{fullName}</span>
            )}
          </motion.div>

          <motion.div
            className="flex justify-between items-center px-6 py-4"
            layout
            transition={{ duration: 0.3 }}
          >
            <span className="body-regular-16 text-grey-medium">Email</span>
            {isEditingPersonal ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-1/2"
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="body-bold-16 text-grey text-right border border-grey-light focus:ring-0"
                  placeholder=""
                />
              </motion.div>
            ) : (
              <span className="body-bold-16 text-grey">{email}</span>
            )}
          </motion.div>

          <motion.div
            className="flex justify-between items-center px-6 py-4"
            layout
            transition={{ duration: 0.3 }}
          >
            <span className="body-regular-16 text-grey-medium">
              Phone Number
            </span>
            {isEditingPersonal ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-1/2"
              >
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="body-bold-16 text-grey text-right border border-grey-light focus:ring-0"
                  placeholder=""
                />
              </motion.div>
            ) : (
              <span className="body-bold-16 text-grey">{phoneNumber}</span>
            )}
          </motion.div>

          <div className="flex justify-between items-center px-6 py-4">
            <span className="body-regular-16 text-grey-medium">Role</span>
            <span className="body-bold-16 text-grey">{user.roleType}</span>
          </div>

          <div className="flex justify-between items-center px-6 py-4">
            <span className="body-regular-16 text-grey-medium">
              Date Joined
            </span>
            <span className="body-bold-16 text-grey">{"N/A"}</span>
          </div>
        </div>

        {/* Save/Cancel buttons for Personal Details */}
        {isEditingPersonal && (
          <motion.div
            className="flex justify-end gap-3 px-6 py-4 border-t border-grey-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              label="Save Changes"
              variant="primary"
              onClick={handleSavePersonal}
              IconLeft={<Save size={16} />}
            />
            <Button
              label="Cancel"
              variant="outlined"
              onClick={handleCancelPersonal}
              IconLeft={<X size={16} />}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Change Password Section */}
      <motion.div
        className="bg-white rounded-lg border border-grey-light"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center px-6 py-4 bg-base-white rounded-t-lg border-b border-grey-light">
          <h2 className="text-lg font-semibold text-grey">Change Password</h2>
          {!isEditingPassword && (
            <button
              onClick={handleEditPassword}
              className="text-primary flex items-center gap-2 hover:text-primary-dark transition-colors"
            >
              <Edit size={16} />
              <span className="body-regular-16">Edit</span>
            </button>
          )}
        </div>

        <motion.div layout transition={{ duration: 0.3 }}>
          <div className="px-6 py-4">
            <label className="block body-regular-16 text-grey mb-2">
              Current Password <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-3 border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors pr-12"
                disabled={!isEditingPassword}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-medium hover:text-grey transition-colors"
                disabled={!isEditingPassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {isEditingPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4">
                <label className="block body-regular-16 text-grey mb-2">
                  New Password <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-medium hover:text-grey transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="px-6 py-4">
                <label className="block body-regular-16 text-grey mb-2">
                  Confirm New Password <span className="text-danger">*</span>
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3 border border-grey-light rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grey-medium hover:text-grey transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Save/Cancel buttons for Password */}
        {isEditingPassword && (
          <motion.div
            className="flex justify-end gap-3 px-6 py-4 border-t border-grey-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              label="Update Password"
              variant="primary"
              onClick={handleSavePassword}
              IconLeft={<Save size={16} />}
            />
            <Button
              label="Cancel"
              variant="outlined"
              onClick={handleCancelPassword}
              IconLeft={<X size={16} />}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};

export default UserProfileSettings;
