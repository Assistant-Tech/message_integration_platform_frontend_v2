import React, { useState } from "react";
import { Input } from "@/app/components/ui";
import { ArrowLeft, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MemberData {
  name: string;
  role: string;
  email: string;
}

interface OnboardingStep5FormData {
  members: MemberData[];
}

interface AddMembersErrors {
  fieldErrors?: {
    members?: string[];
  };
}

interface OnboardingStep5Props {
  onNext: (stepData: OnboardingStep5FormData) => void;
  onPrevious: () => void;
  onSkip?: () => void;
  isSubmitting: boolean;
  isOptional?: boolean;
}

const roleOptions = [
  "CEO/Founder",
  "CTO",
  "Software Engineer",
  "Product Manager",
  "Designer",
  "Marketing Manager",
  "Sales Manager",
  "HR Manager",
  "Operations Manager",
  "Other",
];

const OnboardingStep5: React.FC<OnboardingStep5Props> = ({
  onNext,
  onPrevious,
  onSkip,
  isSubmitting,
  isOptional = true,
}) => {
  const [formData, setFormData] = useState<OnboardingStep5FormData>({
    members: [
      { name: "", role: "", email: "" },
      { name: "", role: "", email: "" },
    ],
  });
  const [errors, setErrors] = useState<AddMembersErrors>({});

  // Handle changes to a specific member's field
  const handleMemberChange = (
    index: number,
    field: keyof MemberData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index ? { ...member, [field]: value } : member,
      ),
    }));

    // Clear errors when user starts typing
    if (errors?.fieldErrors?.members?.[index]) {
      setErrors((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          members: prev.fieldErrors?.members?.map((error, i) =>
            i === index ? "" : error,
          ),
        },
      }));
    }
  };

  // Add a new empty member to the list
  const addStaffMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: "", role: "", email: "" }],
    }));
  };

  // Remove a member from the list
  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - you can replace with your Zod schema
    const hasErrors = formData.members.some(
      (member) =>
        !member.name.trim() || !member.role.trim() || !member.email.trim(),
    );

    if (hasErrors) {
      console.log("Please fill in all fields");
      return;
    }

    setErrors({});
    onNext(formData);
  };

  return (
    <div className="max-w-4xl mx-auto pt-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-sm font-medium text-gray-600">Name</div>
          <div className="text-sm font-medium text-gray-600">Role</div>
          <div className="text-sm font-medium text-gray-600">Email</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <AnimatePresence>
              {formData.members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {/* Name Field */}
                  <div>
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                  </div>

                  {/* Role Field - Dropdown */}
                  <div>
                    <select
                      value={member.role}
                      onChange={(e) =>
                        handleMemberChange(index, "role", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 bg-white appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 8px center",
                        backgroundSize: "16px",
                        paddingRight: "32px",
                      }}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select Role
                      </option>
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={member.email}
                      onChange={(e: any) =>
                        handleMemberChange(index, "email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                    {formData.members.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Add Staff Members Button */}
          <motion.button
            type="button"
            onClick={addStaffMember}
            className="flex items-center text-teal-600 hover:text-teal-700 mt-6 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-6 h-6 rounded-full border-2 border-teal-600 flex items-center justify-center mr-3 group-hover:border-teal-700 transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Staff Members</span>
          </motion.button>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <motion.button
              type="button"
              onClick={onPrevious}
              className="flex items-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </motion.button>

            <div className="flex items-center space-x-4">
              {isOptional && onSkip && (
                <motion.button
                  type="button"
                  onClick={onSkip}
                  className="text-teal-600 hover:text-teal-700 underline font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Skip this step
                </motion.button>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? "Saving..." : "Save and Finish"}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default OnboardingStep5;
