import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit, Building2 } from "lucide-react";
import { Input, Button } from "@/app/components/ui";
import { toast } from "sonner";
import { useTenantStore } from "@/app/store/tenant.store";
import { TenantDetailsResponse } from "@/app/types/tenant.types";

const CompanySettings: React.FC = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const {
    tenantDetails,
    loading,
    updateLoading,
    getTenantDetails,
    updateTenantDetails,
  } = useTenantStore();

  const [companyData, setCompanyData] = useState<
    TenantDetailsResponse["data"] | null
  >(null); // fetch details

  useEffect(() => {
    getTenantDetails().catch(() =>
      toast.error("Failed to fetch tenant details"),
    );
  }, [getTenantDetails]);

  useEffect(() => {
    if (tenantDetails) setCompanyData(tenantDetails);
  }, [tenantDetails]);

  const handleInputChange = (
    field: keyof TenantDetailsResponse["data"],
    value: string,
  ) => {
    setCompanyData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSettingsChange = (
    field: "timezone" | "locale",
    value: string,
  ) => {
    setCompanyData((prev) =>
      prev ? { ...prev, settings: { ...prev.settings, [field]: value } } : prev,
    );
  };

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
    } catch {
      toast.error("Failed to update tenant details");
    }
  };

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
      className="max-w-5xl flex flex-col h-full px-6 py-4 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <motion.article className="flex flex-col text-start mb-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-1">Settings</h1>

        <h2 className="text-base font-medium text-primary">Company Settings</h2>
      </motion.article>
      {/* Company Profile Card */}
      <motion.div className="flex items-center border border-gray-200 rounded-xl p-4 bg-white mb-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
            <Building2 size={24} className="text-white" />
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-gray-700">
            {companyData.organizationName}
          </h3>

          <p className="text-sm text-gray-500">{companyData.industry}</p>
        </div>
      </motion.div>
      {/* General Information */}
      <motion.div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
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

        <div className="p-6">
          {isEditing === "general" ? (
            <div className="space-y-4">
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
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">Company Name</span>

                <span className="font-medium text-gray-700">
                  {companyData.organizationName}
                </span>
              </div>

              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">Company Email</span>

                <span className="font-medium text-gray-700">
                  {companyData.email}
                </span>
              </div>

              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">Company Phone</span>

                <span className="font-medium text-gray-700">
                  {companyData.contactNumber}
                </span>
              </div>

              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">Company Website</span>

                <span className="font-medium text-gray-700">
                  {companyData.website}
                </span>
              </div>

              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">Industry</span>

                <span className="font-medium text-gray-700">
                  {companyData.industry}
                </span>
              </div>

              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">Date Joined</span>

                <span className="font-medium text-gray-700">
                  {new Date(companyData.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      {/* Location */}
      <motion.div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Company Location
          </h2>

          <Button
            label="Edit"
            variant="none"
            onClick={() => setIsEditing("location")}
            IconLeft={<Edit size={16} />}
            className="text-primary hover:text-primary-dark"
          />
        </div>

        <div className="p-6">
          {isEditing === "location" ? (
            <>
              <Input
                placeholder="Address"
                value={companyData.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
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
            <div className="divide-y divide-gray-200">
              {(() => {
                const [city, state, country] = (companyData.address || "")
                  .split(",")
                  .map((part) => part.trim());

                return (
                  <>
                    <div className="flex justify-start py-4">
                      <span className="w-72 text-gray-500">City</span>
                      <span className="font-medium text-gray-700">
                        {city || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-start py-4">
                      <span className="w-72 text-gray-500">State</span>
                      <span className="font-medium text-gray-700">
                        {state || "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-start py-4">
                      <span className="w-72 text-gray-500">Country</span>
                      <span className="font-medium text-gray-700">
                        {country || "N/A"}
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </motion.div>

      {/* Legal */}
      <motion.div className="bg-white rounded-lg border border-gray-200">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
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

        <div className="p-6">
          {isEditing === "legal" ? (
            <div className="space-y-4">
              <Input
                placeholder="PAN"
                value={companyData.panCardNumber || ""}
                onChange={(e) =>
                  handleInputChange("panCardNumber", e.target.value)
                }
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">
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
                      className="w-64 h-40 object-cover rounded-lg border border-gray-200"
                    />
                  </motion.div>
                )}
              </div>

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
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">PAN</span>

                <span className="font-medium text-gray-700">
                  {companyData.panCardNumber || "N/A"}
                </span>
              </div>

              <div className="flex justify-start py-4">
                <span className="w-72 text-gray-500">PAN Card Photo</span>

                <motion.div className="w-64 h-40 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  {companyData.panCardImageUri &&
                  companyData.panCardImageUri.length > 0 ? (
                    <img
                      src={companyData.panCardImageUri}
                      alt="PAN Card"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
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
