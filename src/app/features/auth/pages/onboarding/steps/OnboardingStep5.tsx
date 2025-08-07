import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StepSidebar } from "@/app/features/auth/pages/onboarding/components";
import { Button, Input, Logo } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { useAuth } from "@/app/hooks/useAuth";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CirclePlus,
  PartyPopper,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/app/utils/cn";
import {
  OnboardingStep5FormData,
  onboardingStep5Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";

interface MemberData {
  name: string;
  role: string;
  email: string;
}

interface AddMembersErrors {
  members?: string[];
}

const OnboardingStep5: React.FC = () => {
  const navigate = useNavigate();
  const { data, setStepData, setCompletedSteps, reset } = useOnboardingStore();
  const { completeOnboarding, isCompletingOnboarding } = useAuth();
  console.log("🚀 ~ data:", data);

  const currentStep = 5;

  const [formData, setFormData] = useState<OnboardingStep5FormData>(
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
    const result = onboardingStep5Schema.safeParse(formData);

    if (!result.success) {
      toast.error("Please check your member inputs.");
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const cleanedMembers = formData.members.filter(
        (m) => m.name?.trim() || m.role?.trim() || m.email?.trim(),
      );

      setStepData("step5", { members: cleanedMembers });
      setCompletedSteps(5);

      toast.success("Onboarding Complete!", {
        description: "Welcome sir/madam! Your setup is now complete.",
        icon: <PartyPopper className="text-primary" />,
      });
      
      // Use the completeOnboarding function instead of direct navigation
      completeOnboarding();

      setTimeout(() => {
        reset();
      }, 100);
    }
  };

  const handleSkip = () => {
    setStepData("step5", { members: [] });
    setCompletedSteps(5);
    completeOnboarding();
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
          {/* Step Sidebar */}
          <StepSidebar
            currentStep={currentStep}
            previousStep={currentStep - 1}
          />

          {/* Right Content */}
          <div className="w-full lg:flex-1">
            <h2 className="h4-bold-24 text-grey mb-8">Add Your Members</h2>

            {/* INPUT SECTION */}
            <div className="space-y-6">
              {/* Member Input Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="body-bold-16 text-grey">Name</div>
                  <div className="body-bold-16 text-grey">Role</div>
                  <div className="body-bold-16 text-grey">Email</div>
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
                      />
                      <div className="relative">
                        <select
                          className={cn(
                            "w-full px-3 py-2 border border-grey-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-base-white",
                            member.role
                              ? "text-grey-medium"
                              : "text-grey-light",
                          )}
                          value={member.role}
                          onChange={(e) =>
                            handleMemberChange(index, "role", e.target.value)
                          }
                        >
                          <option value="">Select Role</option>
                          <option value="Admin" className="text-grey">
                            Admin
                          </option>
                          <option value="Manager" className="text-grey">
                            Manager
                          </option>
                          <option value="Employee" className="text-grey">
                            Employee
                          </option>
                          <option value="Intern" className="text-grey">
                            Intern
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <ArrowDown size={20} color="grey" />
                        </div>
                      </div>

                      <Input
                        placeholder="Enter email address"
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
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
                onClick={addStaffMember}
                IconLeft={<CirclePlus size={24} />}
                variant="none"
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
                    label="Skip this step"
                    onClick={handleSkip}
                    className="bg-white text-primary hover:bg-white underline body-regular-underline-16"
                    disabled={isCompletingOnboarding}
                  />
                  <Button
                    label={isCompletingOnboarding ? "Completing..." : "Save and Finish"}
                    onClick={handleSubmit}
                    variant="primary"
                    IconRight={<ArrowRight size={24} />}
                    disabled={isCompletingOnboarding}
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
