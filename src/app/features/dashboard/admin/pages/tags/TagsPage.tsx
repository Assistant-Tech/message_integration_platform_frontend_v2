import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/app/components/ui";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import {
  AddTag,
  OrderStats,
  TagTable,
} from "@/app/features/dashboard/admin/component/";

const TagsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [color, setColor] = useState("#cccccc");
  const [visibility, setVisibility] = useState(false);

  // Example dataset
  const tagData = [
    {
      name: "Purchased",
      color: "#007BFF",
      createdOn: "12/06/2025",
      visibility: true,
    },
    {
      name: "Deliver",
      color: "#28a745",
      createdOn: "12/06/2025",
      visibility: false,
    },
    {
      name: "Delayed",
      color: "#ffc107",
      createdOn: "11/30/2025",
      visibility: true,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading title="Tags" align="left" />
        <Button
          label="Add New Tag"
          IconLeft={<Plus size={20} />}
          variant="primary"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Stats */}
      <OrderStats />

      {/* Table */}
      <TagTable data={tagData} />

      {/* Add Tag Dialog */}
      <AddTag
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddTag={() => {
          console.log({ tagName, color, visibility });
          setIsOpen(false);
        }}
        tagName={tagName}
        setTagName={setTagName}
        color={color}
        setColor={setColor}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  );
};

export default TagsPage;
