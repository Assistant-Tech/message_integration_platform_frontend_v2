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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTagName, setCurrentTagName] = useState("");
  const [currentColor, setCurrentColor] = useState("#0000FF");
  const [currentVisibility, setCurrentVisibility] = useState(true);
  const [tags, setTags] = useState([
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
  ]);

  const handleAddNewTagField = () => {
    if (currentTagName.trim() === "") {
      return;
    }
    const newTag = {
      name: currentTagName,
      color: currentColor,
      createdOn: new Date().toLocaleDateString("en-US"),
      visibility: currentVisibility,
    };
    setTags((prevTags) => [...prevTags, newTag]);
    setCurrentTagName("");
    setCurrentColor("#0000FF");
    setCurrentVisibility(true);
  };

  const handleSaveTags = () => {
    if (currentTagName.trim() !== "") {
      handleAddNewTagField();
    }
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="p-6 space-y-6 font-inter">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading title="Tags" align="left" />
        <Button
          label="Add New Tag"
          IconLeft={<Plus size={20} />}
          variant="primary"
          onClick={() => {
            setIsModalOpen(true);
            // Reset form fields when opening the modal
            setCurrentTagName("");
            setCurrentColor("#0000FF");
            setCurrentVisibility(true);
          }}
        />
      </div>

      {/* Stats */}
      <OrderStats />

      {/* Table */}
      <TagTable data={tags} />

      {/* Add Tag Dialog */}
      <AddTag
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTags}
        tagName={currentTagName}
        setTagName={setCurrentTagName}
        color={currentColor}
        setColor={setCurrentColor}
        visibility={currentVisibility}
        setVisibility={setCurrentVisibility}
        onAddNewTagField={handleAddNewTagField}
      />
    </div>
  );
};

export default TagsPage;
