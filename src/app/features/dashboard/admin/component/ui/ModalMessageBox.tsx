import Delete_icon_large from "@/app/assets/icons/warning_fill.svg";
import { Button } from "@/app/components/ui";

type ModalType = "delete" | "success" | "change";

interface ModalMessageBoxProps {
  type?: ModalType;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
}

const ModalMessageBox: React.FC<ModalMessageBoxProps> = ({
  type = "delete",
  title,
  description,
  onCancel,
  onConfirm,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
}) => {
  const getConfirmVariant = () => {
    switch (type) {
      case "delete":
        return "danger";
      case "success":
        return "primary";
      case "change":
        return "warning";
      default:
        return "neutral";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg text-center shadow-lg p-6 max-w-md w-full mx-4">
        {/* Icon only for delete */}
        {type === "delete" && (
          <figure className="flex justify-center items-center pb-4">
            <img
              src={Delete_icon_large}
              alt="delete_icon"
              width="48"
              height="48"
            />
          </figure>
        )}

        <h2 className="h5-bold-16 text-base-black mb-4">{title}</h2>

        <p className="h5-regular-16 text-grey-medium mb-6">{description}</p>

        <div className="flex justify-center gap-4 w-full">
          <Button
            label={cancelLabel}
            onClick={onCancel}
            variant="neutral"
            className="w-full bg-grey text-white hover:bg-base-black"
          />
          <Button
            label={confirmLabel}
            onClick={onConfirm}
            variant={getConfirmVariant()}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalMessageBox;
