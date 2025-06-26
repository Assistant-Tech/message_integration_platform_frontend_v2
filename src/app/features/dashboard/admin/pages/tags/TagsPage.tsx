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
    {
      name: "Out of Stock",
      color: "#dc3545",
      createdOn: "11/25/2025",
      visibility: false,
    },
    {
      name: "Refunded",
      color: "#6610f2",
      createdOn: "10/20/2025",
      visibility: true,
    },
    {
      name: "On Hold",
      color: "#6c757d",
      createdOn: "10/10/2025",
      visibility: false,
    },
    {
      name: "Processing",
      color: "#17a2b8",
      createdOn: "09/15/2025",
      visibility: true,
    },
    {
      name: "Shipped",
      color: "#20c997",
      createdOn: "09/01/2025",
      visibility: true,
    },
    {
      name: "Cancelled",
      color: "#fd7e14",
      createdOn: "08/22/2025",
      visibility: false,
    },
    {
      name: "Awaiting Payment",
      color: "#343a40",
      createdOn: "08/01/2025",
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
