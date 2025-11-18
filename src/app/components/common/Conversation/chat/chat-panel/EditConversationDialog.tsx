import { GenericDialog } from "@/app/components/common/";
import { Button, Input } from "@/app/components/ui";

const EditConversationDialog = ({
  open,
  onClose,
  title,
  setTitle,
  priority,
  setPriority,
  onUpdate,
  isLoading,
}: any) => {
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      title="Edit Conversation"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter conversation title"
        />
        <div>
          <label className="block text-sm font-medium text-grey mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-grey-light rounded-lg px-3 py-2 focus:ring-2 focus:ring-information"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-grey-light">
          <Button label="Cancel" onClick={onClose} variant="outlined" />
          <Button
            label="Save"
            onClick={onUpdate}
            loading={isLoading}
            variant="primary"
          />
        </div>
      </div>
    </GenericDialog>
  );
};

export default EditConversationDialog;
