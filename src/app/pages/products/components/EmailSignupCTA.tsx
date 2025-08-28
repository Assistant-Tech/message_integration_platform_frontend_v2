import React, { useState } from "react";
import { Input, Button } from "@/app/components/ui";
import { Agreement } from "@/app/components/ui";

interface EmailSignupCTAProps {
  title?: string;
  placeholder?: string;
  buttonLabel?: string;
  onSubmit?: (email: string) => void;
  note?: string;
  showAgreement?: boolean;
}

const EmailSignupCTA: React.FC<EmailSignupCTAProps> = ({
  title = "Start your 14-days free trial today!",
  placeholder = "Enter your email",
  buttonLabel = "Get Started",
  onSubmit,
  note = "No credit card needed.",
  showAgreement = true,
}) => {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (onSubmit) onSubmit(email);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <p className="body-regular-16 text-grey-medium">{title}</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <div className="flex-1">
          <Input
            placeholder={placeholder}
            variant="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:border-primary focus:ring-1 focus:ring-primary w-full h-12 sm:h-14 text-base"
          />
        </div>
        <Button
          label={buttonLabel}
          variant="primary"
          onClick={handleClick}
          className="py-3"
        />
      </div>

      {note && (
        <div className="body-regular-16 text-grey-medium">
          {note}
          {showAgreement && <Agreement />}
        </div>
      )}
    </div>
  );
};

export default EmailSignupCTA;
