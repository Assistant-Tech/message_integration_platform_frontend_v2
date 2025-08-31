import { useDemoDialogStore } from "@/app/store/demo-dialog.store";
import DemoFormContent from "./DemoFormContent";
import { GenericDialog } from "@/app/components/common";

const DemoDialog = () => {
  const { isOpen, close } = useDemoDialogStore();

  return (
    <GenericDialog open={isOpen} maxWidth="7xl">
      <DemoFormContent onClose={close} showCloseButton={true} />
    </GenericDialog>
  );
};

export default DemoDialog;
