import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Building2 } from "lucide-react";
import { Input, Button } from "@/app/components/ui";
import { toast } from "sonner";
import { useTenantStore } from "@/app/store/tenant.store";
import { TenantDetailsResponse } from "@/app/types/tenant.types";

const CompanySettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // 🔹 Store hooks
  const {
    tenantDetails,
    loading,
    updateLoading,
    getTenantDetails,
    updateTenantDetails,
  } = useTenantStore();

  // 🔹 Local editable state
  const [companyData, setCompanyData] = useState<
    TenantDetailsResponse["data"] | null
  >(null);

  // Fetch tenant details on mount
  useEffect(() => {
    getTenantDetails().catch(() => {
      toast.error("Failed to fetch tenant details");
    });
  }, [getTenantDetails]);

  // Sync store → local state
  useEffect(() => {
    if (tenantDetails) {
      setCompanyData(tenantDetails);
    }
  }, [tenantDetails]);

  // 🔹 Handle input changes
  const handleInputChange = (
    field: keyof TenantDetailsResponse["data"],
    value: string,
  ) => {
    setCompanyData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  // 🔹 Handle nested settings update
  const handleSettingsChange = (
    field: "timezone" | "locale",
    value: string,
  ) => {
    setCompanyData((prev) =>
      prev ? { ...prev, settings: { ...prev.settings, [field]: value } } : prev,
    );
  };

  // 🔹 Save updates via store
  const handleSave = async () => {
    if (!companyData) return;
    try {
      await updateTenantDetails({
        organizationName: companyData.organizationName,
        website: companyData.website,
        contactNumber: companyData.contactNumber,
        industry: companyData.industry,
        description: companyData.description,
        settings: companyData.settings,
        address: companyData.address,
        panCardNumber: companyData.panCardNumber,
        panCardImageUri: companyData.panCardImageUri,
      });
      toast.success("Tenant details updated successfully!");
      setIsEditing(null);
    } catch (err: any) {
      toast.error("Failed to update tenant details");
    }
  };

  // 🔹 Handle PAN upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompanyData((prev) =>
          prev
            ? { ...prev, panCardImageUri: e.target?.result as string }
            : prev,
        );
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading || !companyData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading company details...</p>
      </div>
    );
  }

  return (
    <motion.section
      className="w-5xl flex flex-col h-full px-6 py-4 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <motion.article className="flex flex-col text-start mb-6">
        <h1 className="h4-bold-24 text-grey mb-2">Settings</h1>
        <h2 className="body-semi-bold-16 text-primary">Company Settings</h2>
      </motion.article>

      {/* Company Profile Card */}
      <motion.div className="flex items-center border border-grey-light rounded-xl p-4 bg-white mb-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <Building2 size={24} className="text-white" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-grey">
            {companyData.organizationName}
          </h3>
          <p className="text-sm text-grey-medium">{companyData.industry}</p>
        </div>
      </motion.div>

      {/* General Information */}
      <motion.div className="bg-white rounded-lg border border-grey-light mb-6">
        <div className="flex justify-between items-center px-6 py-4 border-b border-grey-light">
          <h2 className="text-lg font-semibold text-grey">
            General Information
          </h2>
          <Button
            label="Edit"
            variant="none"
            onClick={() => setIsEditing("general")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6 space-y-4">
          {isEditing === "general" ? (
            <>
              <Input
                placeholder="Organization Name"
                value={companyData.organizationName}
                onChange={(e) =>
                  handleInputChange("organizationName", e.target.value)
                }
              />
              <Input
                placeholder="Website"
                value={companyData.website || ""}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
              <Input
                placeholder="Contact Number"
                value={companyData.contactNumber || ""}
                onChange={(e) =>
                  handleInputChange("contactNumber", e.target.value)
                }
              />
              <Input
                placeholder="Industry"
                value={companyData.industry || ""}
                onChange={(e) => handleInputChange("industry", e.target.value)}
              />
              <Input
                placeholder="Description"
                value={companyData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <Input
                placeholder="Timezone"
                value={companyData.settings?.timezone || ""}
                onChange={(e) =>
                  handleSettingsChange("timezone", e.target.value)
                }
              />
              <Input
                placeholder="Locale"
                value={companyData.settings?.locale || ""}
                onChange={(e) => handleSettingsChange("locale", e.target.value)}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  label={updateLoading ? "Saving..." : "Save Changes"}
                  variant="primary"
                  disabled={updateLoading}
                  onClick={handleSave}
                />
                <Button
                  label="Cancel"
                  variant="outlined"
                  onClick={() => setIsEditing(null)}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Organization:</span>{" "}
                {companyData.organizationName}
              </p>
              <p>
                <span className="font-medium">Website:</span>{" "}
                {companyData.website}
              </p>
              <p>
                <span className="font-medium">Contact:</span>{" "}
                {companyData.contactNumber}
              </p>
              <p>
                <span className="font-medium">Industry:</span>{" "}
                {companyData.industry}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {companyData.description}
              </p>
              <p>
                <span className="font-medium">Timezone:</span>{" "}
                {companyData.settings?.timezone}
              </p>
              <p>
                <span className="font-medium">Locale:</span>{" "}
                {companyData.settings?.locale}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Location */}
      <motion.div className="bg-white rounded-lg border border-grey-light mb-6">
        <div className="flex justify-between items-center px-6 py-4 border-b border-grey-light">
          <h2 className="text-lg font-semibold text-grey">Company Location</h2>
          <Button
            label="Edit"
            variant="none"
            onClick={() => setIsEditing("location")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6 space-y-4">
          {isEditing === "location" ? (
            <>
              <Input
                placeholder="Address"
                value={companyData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
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
            </>
          ) : (
            <div className="space-y-2">
              <p>
                <span className="font-medium">Address:</span>{" "}
                {companyData.address}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Legal */}
      <motion.div className="bg-white rounded-lg border border-grey-light">
        <div className="flex justify-between items-center px-6 py-4 border-b border-grey-light">
          <h2 className="text-lg font-semibold text-grey">
            Legal Documentation
          </h2>
          <Button
            label="Edit"
            variant="none"
            onClick={() => setIsEditing("legal")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6 space-y-4">
          {isEditing === "legal" ? (
            <>
              <Input
                placeholder="PAN"
                value={companyData.panCardNumber || ""}
                onChange={(e) =>
                  handleInputChange("panCardNumber", e.target.value)
                }
              />
              <div className="space-y-2">
                <label className="block body-regular-16 text-grey">
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
                    <Button label="Upload Photo" variant="outlined" />
                  </label>
                </div>
                {companyData.panCardImageUri && (
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <img
                      src={companyData.panCardImageUri}
                      alt="PAN Card"
                      className="w-64 h-40 object-cover rounded-lg border border-grey-light"
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
            </>
          ) : (
            <div className="space-y-2">
              <p>
                <span className="font-medium">PAN:</span>{" "}
                {companyData.panCardNumber || "N/A"}
              </p>
              <div className="space-y-2">
                <span className="body-regular-16 text-grey-medium">
                  PAN Card Photo
                </span>
                <motion.div className="w-64 h-40 bg-grey-light rounded-lg flex items-center justify-center border border-grey-light">
                  {companyData.panCardImageUri ? (
                    <img
                      src={companyData.panCardImageUri}
                      alt="PAN Card"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-grey-medium body-regular-16">
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
