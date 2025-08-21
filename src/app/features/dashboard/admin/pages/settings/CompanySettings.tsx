import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Upload, Building2 } from "lucide-react";
import { Input, Button } from "@/app/components/ui";

const CompanySettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState({
    name: "Seamans Furniture",
    email: "seamansfurniture@gmail.com",
    phone: "+977-9800000000",
    website: "www.seamansfurniture.com",
    industry: "Furniture",
    dateJoined: "June 22, 2025",
    country: "Nepal",
    state: "Bagmati",
    city: "",
    pan: "123456789",
    panCardPhoto: null as string | null,
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

  const handleEdit = (section: string) => {
    setIsEditing(section);
  };

  const handleSave = () => {
    setIsEditing(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setCompanyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyData((prev) => ({
          ...prev,
          panCardPhoto: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.section
      className="flex flex-col h-full px-6 py-4 bg-gray-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.article
        className="flex flex-col text-start mb-6"
        variants={itemVariants}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <h2 className="text-lg font-semibold text-primary">Company Settings</h2>
      </motion.article>

      {/* Company Profile Card */}
      <motion.div
        className="flex items-center border border-gray-200 rounded-xl p-4 bg-white mb-6 shadow-sm"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <Building2 size={24} className="text-white" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-gray-700">Seamans Furniture</h3>
          <p className="text-sm text-gray-500">Furniture</p>
        </div>
      </motion.div>

      {/* General Information Section */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 mb-6 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            General Information
          </h2>
          <Button
            label="Edit"
            variant="none"
            onClick={() => handleEdit("general")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6 space-y-4">
          {isEditing === "general" ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                label="Company Name"
                placeholder="Enter company name"
                value={companyData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <Input
                label="Company Email"
                placeholder="Enter company email"
                variant="email"
                value={companyData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              <Input
                label="Company Phone Number"
                placeholder="Enter phone number"
                variant="phone"
                value={companyData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              <Input
                label="Company Website"
                placeholder="Enter website URL"
                value={companyData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
              <Input
                label="Industry"
                placeholder="Enter industry"
                value={companyData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
              />
              <div className="flex gap-3 pt-4">
                <Button
                  label="Save Changes"
                  variant="primary"
                  onClick={handleSave}
                />
                <Button
                  label="Cancel"
                  variant="outlined"
                  onClick={() => setIsEditing(null)}
                />
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {[
                { label: "Company Name", value: companyData.name },
                { label: "Company Email", value: companyData.email },
                { label: "Company Phone Number", value: companyData.phone },
                { label: "Company Website", value: companyData.website },
                { label: "Industry", value: companyData.industry },
                { label: "Date Joined", value: companyData.dateJoined },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex justify-between items-center py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-800">{item.value}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Company Location Section */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 mb-6 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Company Location
          </h2>
          <Button
            label="Edit"
            variant="none"
            onClick={() => handleEdit("location")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6 space-y-4">
          {isEditing === "location" ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                label="Country"
                placeholder="Enter country"
                value={companyData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
              <Input
                label="State/Province"
                placeholder="Enter state or province"
                value={companyData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
              <Input
                label="City"
                placeholder="Enter city"
                value={companyData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
              <div className="flex gap-3 pt-4">
                <Button
                  label="Save Changes"
                  variant="primary"
                  onClick={handleSave}
                />
                <Button
                  label="Cancel"
                  variant="outlined"
                  onClick={() => setIsEditing(null)}
                />
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {[
                { label: "Country", value: companyData.country },
                { label: "State/Province", value: companyData.state },
                { label: "City", value: companyData.city || "Not specified" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex justify-between items-center py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-sm font-medium text-gray-600">
                    {item.label}
                  </span>
                  <span className="text-sm text-gray-800">{item.value}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Legal Documentation Section */}
      <motion.div
        className="bg-white rounded-lg border border-gray-200 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Legal Documentation
          </h2>
          <Button
            label="Edit"
            variant="none"
            onClick={() => handleEdit("legal")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6 space-y-4">
          {isEditing === "legal" ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Input
                label="PAN"
                placeholder="Enter PAN number"
                value={companyData.pan}
                onChange={(e) => handleInputChange("pan", e.target.value)}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  PAN Card Photo
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pan-upload"
                  />
                  <label htmlFor="pan-upload">
                    <Button
                      label="Upload Photo"
                      variant="outlined"
                      IconLeft={<Upload size={16} />}
                      onClick={() =>
                        document.getElementById("pan-upload")?.click()
                      }
                    />
                  </label>
                </div>
                {companyData.panCardPhoto && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={companyData.panCardPhoto}
                      alt="PAN Card"
                      className="w-64 h-40 object-cover rounded-lg border border-gray-200"
                    />
                  </motion.div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  label="Save Changes"
                  variant="primary"
                  onClick={handleSave}
                />
                <Button
                  label="Cancel"
                  variant="outlined"
                  onClick={() => setIsEditing(null)}
                />
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <motion.div
                className="flex justify-between items-center py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="text-sm font-medium text-gray-600">PAN</span>
                <span className="text-sm text-gray-800">{companyData.pan}</span>
              </motion.div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-600">
                  PAN Card Photo
                </span>
                <motion.div
                  className="w-64 h-40 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {companyData.panCardPhoto ? (
                    <img
                      src={companyData.panCardPhoto}
                      alt="PAN Card"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">
                      No image uploaded
                    </span>
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CompanySettings;
