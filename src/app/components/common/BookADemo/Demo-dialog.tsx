import { useDemoDialogStore } from "@/app/store/demo-dialog.store";
import DemoFormContent from "./DemoFormContent";
import { GenericDialog } from "@/app/components/common";

const DemoDialog = () => {
  const { isOpen, close } = useDemoDialogStore();

  return (
    <GenericDialog
      open={isOpen}
      maxWidth="max-w-6xl"
      width="w-[95vw]"
      noPadding
    >
      <DemoFormContent
        onClose={close}
        showCloseButton={true}
        isFullPage
        className="w-full"
      />
    </GenericDialog>
  );
};

export default DemoDialog;
