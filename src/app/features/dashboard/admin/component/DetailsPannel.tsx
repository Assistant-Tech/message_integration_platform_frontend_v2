import { Button, Input } from "@/app/components/ui";
import { Plus, Search } from "lucide-react";
import { TagDialog } from "@/app/features/dashboard/admin/component";

const DetailsPanel = () => {
  return (
    <aside className="w-full bg-white">
      {/* Search Product */}
      <div className="border-b border-grey-light py-[6.5px] px-4">
        <Input
          type="text"
          iconLeft={<Search color="grey" size={20} />}
          placeholder="Search Product"
          className="w-full px-10 py-2 border border-grey-light rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Tags */}
        <div className="border border-grey-light py-3 px-3 rounded-lg">
          <div className="flex justify-between items-center border-b border-grey-light mb-3">
            <span className="body-bold-16 text-grey-medium">Tags</span>
            <TagDialog
              trigger={
                <Button label="Add Tag" IconLeft={<Plus />} variant="none" />
              }
            />
          </div>
          <p className="text-grey-light label-regular-14 text-center">
            No tags available
          </p>
        </div>

        {/* Assigned To */}
        <div className="border border-grey-light py-3 px-3 rounded-lg">
          <div className="flex justify-between items-center border-b border-grey-light mb-3">
            <span className="body-bold-16 text-grey-medium">Assigned To</span>
            <Button label="Assigned To" IconLeft={<Plus />} variant="none" />
          </div>
          <p className="text-grey-light label-regular-14 text-center">
            No assigns available
          </p>
        </div>

        {/* Notes */}
        <div className="border border-grey-light py-3 px-3 rounded-lg">
          <div className="flex justify-between items-center border-b border-grey-light mb-3">
            <span className="body-bold-16 text-grey-medium">Notes</span>
            <Button label="Notes" IconLeft={<Plus />} variant="none" />
          </div>
          <p className="text-grey-light label-regular-14 text-center">
            No notes available
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DetailsPanel;
