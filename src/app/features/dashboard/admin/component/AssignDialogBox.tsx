import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "@/app/components/ui";

interface AssignDialogProps {
  trigger: React.ReactNode;
  allStaff: Staff[];
  selectedStaff: Staff[];
  setSelectedStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

const AssignDialog = ({
  trigger,
  allStaff,
  selectedStaff,
  setSelectedStaff,
}: AssignDialogProps) => {
  const [open, setOpen] = useState(false);

  const toggleStaff = (staff: Staff) => {
    const exists = selectedStaff.find((s) => s.id === staff.id);
    if (exists) {
      setSelectedStaff((prev) => prev.filter((s) => s.id !== staff.id));
    } else {
      setSelectedStaff((prev) => [...prev, staff]);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      {/* Background Overlay */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />

        {/* Centered Content */}
        <Dialog.Content asChild>
          <div className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-6 py-5 z-50 shadow-lg">
            <h2 className="h4-bold-24 mb-4">Select Staff</h2>
            <div className="grid gap-2 max-h-[300px] overflow-y-auto">
              {allStaff.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => toggleStaff(staff)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md border transition ${
                    selectedStaff.find((s) => s.id === staff.id)
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-grey border-grey-light hover:border-grey"
                  }`}
                >
                  <img
                    src={staff.avatar}
                    className="w-6 h-6 rounded-full object-cover"
                    alt={staff.name}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm">{staff.name}</span>
                    <span className="text-xs text-grey-light">
                      {staff.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <Dialog.Close asChild>
                <Button label="Done" className="mt-2" />
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AssignDialog;
