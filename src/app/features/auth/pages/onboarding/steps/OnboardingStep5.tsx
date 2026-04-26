import React, { useState } from "react";
import { Button, Input } from "@/app/components/ui";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MemberData {
  name: string;
  role: string;
  email: string;
}

interface OnboardingStep5FormData {
  members: MemberData[];
}

interface OnboardingStep5Props {
  onNext: (stepData: OnboardingStep5FormData) => void;
  onPrevious: () => void;
  onSkip?: () => void;
  isSubmitting: boolean;
  isOptional?: boolean;
}

const ROLE_OPTIONS = [
  "CEO / Founder",
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OnboardingStep5: React.FC<OnboardingStep5Props> = ({
  onNext,
  onPrevious,
  onSkip,
  isSubmitting,
  isOptional = true,
}) => {
  const [members, setMembers] = useState<MemberData[]>([
    { name: "", role: "", email: "" },
  ]);
  const [rowErrors, setRowErrors] = useState<
    Record<number, Partial<Record<keyof MemberData, string>>>
  >({});

  const handleMemberChange = (
    index: number,
    field: keyof MemberData,
    value: string,
  ) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    );

    if (rowErrors[index]?.[field]) {
      setRowErrors((prev) => ({
        ...prev,
        [index]: { ...prev[index], [field]: undefined },
      }));
    }
  };

  const addMember = () =>
    setMembers((prev) => [...prev, { name: "", role: "", email: "" }]);

  const removeMember = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
    setRowErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const isEmptyRow = (m: MemberData) =>
    !m.name.trim() && !m.role.trim() && !m.email.trim();

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filled = members.filter((m) => !isEmptyRow(m));

    // No one added — allowed because step is optional. Send empty list.
    if (filled.length === 0) {
      setRowErrors({});
      onNext({ members: [] });
      return;
    }

    // For each non-empty row, every field is required + email format
    const errors: typeof rowErrors = {};
    members.forEach((m, i) => {
      if (isEmptyRow(m)) return;
      const rowErr: Partial<Record<keyof MemberData, string>> = {};
      if (!m.name.trim()) rowErr.name = "Required";
      if (!m.role.trim()) rowErr.role = "Pick a role";
      if (!m.email.trim()) rowErr.email = "Required";
      else if (!emailRegex.test(m.email.trim()))
        rowErr.email = "Enter a valid email";
      if (Object.keys(rowErr).length) errors[i] = rowErr;
    });

    if (Object.keys(errors).length) {
      setRowErrors(errors);
      return;
    }

    setRowErrors({});
    onNext({ members: filled });
  };

  return (
    <form onSubmit={validateAndSubmit} className="space-y-6" noValidate>
      <div className="flex items-start gap-3 p-4 rounded-xl bg-information-light/40 border border-information-light">
        <Users
          size={18}
          strokeWidth={1.8}
          className="text-information shrink-0 mt-0.5"
        />
        <p className="body-regular-16 text-grey-dark/80">
          Add teammates you'd like to bring in right away. They'll receive an
          invite by email. You can always invite more people later.
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {members.map((member, index) => {
            const rowErr = rowErrors[index] ?? {};
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl border border-grey-light/70 p-4 sm:p-5 bg-base-white"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="label-semi-bold-14 text-grey-dark">
                    Teammate {index + 1}
                  </p>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="inline-flex items-center gap-1 caption-medium-12 text-grey-medium hover:text-danger transition-colors"
                      aria-label={`Remove teammate ${index + 1}`}
                    >
                      <Trash2 size={14} strokeWidth={1.8} />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id={`name-${index}`}
                    label="Full name"
                    placeholder="Jane Doe"
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    error={rowErr.name}
                  />

                  <div className="flex flex-col gap-1 w-full">
                    <label
                      htmlFor={`role-${index}`}
                      className="body-bold-16 text-grey"
                    >
                      Role
                    </label>
                    <select
                      id={`role-${index}`}
                      value={member.role}
                      onChange={(e) =>
                        handleMemberChange(index, "role", e.target.value)
                      }
                      className={`w-full min-h-[48px] px-4 rounded-lg border body-regular-16 bg-white text-grey-dark outline-none transition-all focus:ring-2 focus:ring-primary/40 focus:border-primary/60 appearance-none cursor-pointer pr-10 ${
                        rowErr.role ? "border-danger" : "border-grey-light"
                      }`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239AA1AB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        backgroundSize: "16px",
                      }}
                    >
                      <option value="">Select a role</option>
                      {ROLE_OPTIONS.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {rowErr.role && (
                      <p className="text-sm text-danger mt-1">{rowErr.role}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Input
                    id={`email-${index}`}
                    type="email"
                    label="Work email"
                    placeholder="jane@acme.com"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    error={rowErr.email}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        <button
          type="button"
          onClick={addMember}
          className="group inline-flex items-center gap-2 label-semi-bold-14 text-primary hover:text-primary-dark transition-colors"
        >
          <span className="h-7 w-7 rounded-full border border-primary/50 flex items-center justify-center group-hover:bg-primary/10">
            <Plus size={14} strokeWidth={2} />
          </span>
          Add another teammate
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <Button
          label="Back"
          onClick={onPrevious}
          variant="outlined"
          IconLeft={<ArrowLeft size={18} />}
          disabled={isSubmitting}
        />

        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {isOptional && onSkip && (
            <Button
              label="Skip & finish"
              onClick={onSkip}
              variant="none"
              className="underline text-grey-dark"
              disabled={isSubmitting}
            />
          )}
          <Button
            label={isSubmitting ? "Finishing up…" : "Complete onboarding"}
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          />
        </div>
      </div>
    </form>
  );
};

export default OnboardingStep5;
