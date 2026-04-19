import { useState } from "react";
import { Button, Input } from "@/app/components/ui";
import { Plus, Search, X } from "lucide-react";
import {
  AssignDialog,
  TagDialog,
} from "@/app/features/dashboard/admin/component";

// Define staff type
interface Staff {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

// You might fetch this list from a backend or shared context
const allStaff: Staff[] = [
  {
    id: 1,
    name: "John Dukes",
    role: "Staff",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Sophia Lee",
    role: "Manager",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Alex Kim",
    role: "Staff",
    avatar: "https://i.pravatar.cc/150?img=18",
  },
];

const DetailsPanel = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [assignedStaff, setAssignedStaff] = useState<Staff[]>([]);

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const removeStaff = (id: number) => {
    setAssignedStaff((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <aside className="w-full bg-white">
      {/* Search */}
      <div className="border-b border-grey-light py-[6.5px] px-4">
        <Input
          type="text"
          iconLeft={<Search color="grey" size={20} />}
          placeholder="Search Product"
          className="w-full px-10 py-2 border border-grey-light rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* TAGS */}
        <div className="border border-grey-light py-3 px-3 rounded-lg">
          <div className="flex justify-between items-center border-b border-grey-light mb-3">
            <span className="body-bold-16 text-grey-medium">Tags</span>
            <TagDialog
              trigger={
                <Button label="Add Tag" IconLeft={<Plus />} variant="none" />
              }
              selected={selectedTags}
              setSelected={setSelectedTags}
            />
          </div>

          {selectedTags.length === 0 ? (
            <p className="text-grey-light label-regular-14 text-center">
              No tags available
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center bg-base-white text-grey-medium hover:bg-primary-light px-3 py-2 rounded-lg label-regular-14 cursor-pointer"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-grey hover:text-danger cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ASSIGNED TO */}
        <div className="border border-grey-light py-3 px-3 rounded-lg">
          <div className="flex justify-between items-center border-b border-grey-light mb-3">
            <span className="body-bold-16 text-grey-medium">Assigned To</span>
            <AssignDialog
              trigger={
                <Button label="Add Staff" IconLeft={<Plus />} variant="none" />
              }
              allStaff={allStaff}
              selectedStaff={assignedStaff}
              setSelectedStaff={setAssignedStaff}
            />
          </div>

          {assignedStaff.length === 0 ? (
            <p className="text-grey-light label-regular-14 text-center">
              No assigns available
            </p>
          ) : (
            <div className="space-y-3">
              {assignedStaff.map((staff) => (
                <div key={staff.id} className="flex items-center gap-3">
                  <img
                    src={staff.avatar}
                    alt={staff.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex justify-between items-center w-full">
                    <div className="text-base text-gray-800">{staff.name}</div>
                    <div className="text-sm text-grey-light flex items-center gap-2">
                      {staff.role}
                      <button
                        onClick={() => removeStaff(staff.id)}
                        className="text-grey hover:text-danger"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NOTES */}
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
