import React, { useState } from "react";
import { Button, Input } from "@/app/components/ui/";
import { useOnboardingStore } from "@/app/features/auth/pages/onboarding/hooks/useOnboardingStore";
import { ArrowDown, ArrowLeft, ArrowRight, CirclePlus } from "lucide-react";
import {
  OnboardingStep5FormData,
  onboardingStep5Schema,
} from "@/app/features/auth/pages/onboarding/schemas/Onboarding.schema";

interface MemberData {
  name: string;
  role: string;
  email: string;
}

// Updated error interface to match the Zod flatten output
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

const OnboardingStep5: React.FC<OnboardingStep5Props> = ({
  onNext,
  onPrevious,
  onSkip,
  isSubmitting,
  isOptional,
}) => {
  const { data } = useOnboardingStore();
  const [formData, setFormData] = useState<OnboardingStep5FormData>(
    data.step5 || {
      members: [
        { name: "", role: "", email: "" },
        { name: "", role: "", email: "" },
      ],
    },
  );
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
    // Clear the specific error for the changed field
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

  // Handle form submission and validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onboardingStep5Schema.safeParse(formData);
    if (!result.success) {
      // Use Zod's flatten to get a clean error object
      setErrors(result.error.flatten());
      return;
    }
    setErrors({});
    onNext(result.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Add Team Members</h2>
      <p className="text-gray-600 mb-6">
        Let's add your team members to the platform.
      </p>

      <div className="space-y-6">
        {/* Map over the members array to create a group of inputs for each */}
        {formData.members.map((member, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border"
          >
            <div className="flex-grow">
              <Input
                label="Name"
                placeholder="John Doe"
                type="text"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
                error={errors?.fieldErrors?.members?.[index]}
                className="w-full"
              />
            </div>
            <div className="flex-grow">
              <Input
                label="Role"
                placeholder="Software Engineer"
                type="text"
                value={member.role}
                onChange={(e) =>
                  handleMemberChange(index, "role", e.target.value)
                }
                error={errors?.fieldErrors?.members?.[index]}
                className="w-full"
              />
            </div>
            <div className="flex-grow">
              <Input
                label="Email"
                placeholder="john.doe@example.com"
                type="email"
                value={member.email}
                onChange={(e) =>
                  handleMemberChange(index, "email", e.target.value)
                }
                error={errors?.fieldErrors?.members?.[index]}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Button to add another member */}
      <Button
        label="Add another team member"
        type="button"
        variant="none"
        onClick={addStaffMember}
        className="mt-4 w-full justify-center text-blue-600 hover:bg-blue-50"
        IconRight={<CirclePlus className="h-4 w-4 mr-2" />}
      />

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          label="Previous"
          type="button"
          variant="outlined"
          onClick={onPrevious}
          IconRight={<ArrowLeft className="h-4 w-4 mr-2" />}
        />

        <div className="flex space-x-2">
          {isOptional && onSkip && (
            <Button
              label="Skip"
              type="button"
              variant="primary"
              onClick={onSkip}
              IconRight={<ArrowRight className="h-4 w-4 ml-2" />}
            />
          )}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <ArrowDown className="h-4 w-4 mr-2 animate-bounce" />
                Submitting...
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default OnboardingStep5;
