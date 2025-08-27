import React from "react";
import { Button } from "@/app/components/ui/";

interface ActionButtonsProps {
  isSubmitting: boolean;
  onClear: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSubmitting,
  onClear,
}) => {
  return (
    <div className="flex w-96 gap-2">
      <Button
        label="Clear All"
        type="button"
        variant="outlined"
        onClick={onClear}
        className="w-full"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
        label={isSubmitting ? "Saving..." : "Save Product"}
      />
    </div>
  );
};

export default ActionButtons;
