import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StepsIndicator } from "@/app/features/auth/components/ui";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/store/useOnboardingStore";
import onboardingSteps from "@/app/utils/onboarding/onboarding";
import { ArrowLeft, ArrowRight, PartyPopper, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface MemberData {
  name: string;
  role: string;
  email: string;
}

interface AddMembersData {
  members: MemberData[];
}

interface AddMembersErrors {
  members?: string[];
}

const OnboardingStep5: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps, completedSteps, reset } =
    useOnboardingStore();
  const [formData, setFormData] = useState<AddMembersData>(
    data.step5 || {
      members: [
        { name: "", role: "", email: "" },
        { name: "", role: "", email: "" },
      ],
    },
  );
  const [errors, setErrors] = useState<AddMembersErrors>({});

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
    // Clear errors for this field
    if (errors.members?.[index]) {
      setErrors((prev) => ({
        ...prev,
        members: prev.members?.map((error, i) => (i === index ? "" : error)),
      }));
    }
  };

  const addStaffMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: "", role: "", email: "" }],
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    formData.members.forEach((member, index) => {
      if (!member.name.trim() && !member.role.trim() && !member.email.trim()) {
        newErrors[index] = "";
      } else if (
        !member.name.trim() ||
        !member.role.trim() ||
        !member.email.trim()
      ) {
        newErrors[index] = "All fields are required for this member.";
      } else if (!/\S+@\S+\.\S+/.test(member.email)) {
        newErrors[index] = "Please enter a valid email address.";
      } else {
        newErrors[index] = "";
      }
    });

    setErrors({ members: newErrors });
    return newErrors.every((error) => error === "");
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStepData("step5", formData);
      setCompletedSteps(5);
      navigate("/admin/dashboard");

      // Toast Message
      toast.success("Onboarding Complete!", {
        description: "Welcome sir/madam! Your setup is now complete.",
        icon: <PartyPopper className="text-primary" />,
      });
      // Pachi Hataune (REMOVE)
      reset();
    }
  };

  const handleReset = () => {
    reset();
    navigate("/onboardingform/step-1");
  };

  const handleSkip = () => {
    setStepData("step5", { members: [] });
    setCompletedSteps(5);
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col justify-center">
        <article className="pb-12">
          <Logo />
        </article>

        <div className="mb-10">
          <h1 className="h2-bold-40 text-black mb-2">
            Welcome to Chatblix, Jane!
          </h1>
          <p className="text-grey-medium body-regular-16 max-w-2xl">
            Complete your onboarding process by setting up your workplace. The
            next few steps will contain all the necessary information you will
            need to enter to personalize your Chatblix account.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Stepper */}
          <div className="w-full lg:max-w-md space-y-4">
            {onboardingSteps.map(({ stepNumber, title, description }: any) => (
              <StepsIndicator
                key={stepNumber}
                stepNumber={stepNumber}
                title={title}
                description={description}
                isActive={stepNumber === 5}
                isCompleted={completedSteps >= stepNumber}
              />
            ))}
          </div>

          {/* Right Content */}
          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-8">Add Your Members</h2>

            {/* INPUT SECTION */}
            <div className="space-y-6">
              {/* Member Input Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="font-semibold text-grey">Name</div>
                  <div className="font-semibold text-grey">Role</div>
                  <div className="font-semibold text-grey">Email</div>
                </div>

                {formData.members.map((member, index) => (
                  <div key={index} className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        placeholder="Enter full name"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        error={
                          errors.members?.[index] && !member.name.trim()
                            ? "Name is required"
                            : ""
                        }
                      />
                      <div className="relative">
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                          value={member.role}
                          onChange={(e) =>
                            handleMemberChange(index, "role", e.target.value)
                          }
                        >
                          <option value="">Select Role</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Employee">Employee</option>
                          <option value="Intern">Intern</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-4 h-4 fill-current text-gray-400"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                      <Input
                        placeholder="Enter email address"
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        error={
                          errors.members?.[index] &&
                          (!member.email.trim() ||
                            !/\S+@\S+\.\S+/.test(member.email))
                            ? "Valid email is required"
                            : ""
                        }
                      />
                    </div>
                    {errors.members?.[index] && (
                      <p className="text-danger text-sm">
                        {errors.members[index]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Staff Members Button */}
              <Button
                label="Add Staff Members"
                type="button"
                onClick={addStaffMember}
                IconRight={<ArrowRight size={24} />}
              />

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <Button
                  label="Go Back"
                  onClick={() => navigate("/onboardingform/step-4")}
                  variant="outlined"
                  IconLeft={<ArrowLeft size={24} />}
                />
                <div className="flex items-center gap-4">
                  <Button
                    label="Reset All"
                    onClick={handleReset}
                    variant="outlined"
                    IconLeft={<RotateCcw size={24} />}
                    className="border-red-400 text-red-600 hover:bg-red-50"
                  />
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-primary hover:text-primary font-medium"
                  >
                    Skip this step
                  </button>
                  <Button
                    label="Save and Finish"
                    onClick={handleSubmit}
                    variant="primary"
                    IconRight={<ArrowRight size={24} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep5;
