import { X } from "lucide-react";
import { useState } from "react";

interface Note {
  id: number;
  content: string;
  agent: string;
  time: string;
}

const ChatOrderNotesPanel = ({
  onClose,
}: {
  onClose: () => void;
  conversationId: string;
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      content:
        "Customer specifically asked for Model #X-500, but in the discontinued 'Ocean Blue' color. Check inventory.",
      agent: "Alice",
      time: "1:05 PM",
    },
    {
      id: 2,
      content: "Waived the $5 next-day shipping fee due to the long hold time.",
      agent: "Bob",
      time: "1:20 PM",
    },
  ]);

  const [newNote, setNewNote] = useState("");

  const handleSaveNote = () => {
    if (!newNote.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nextId = notes.length ? (notes[0]?.id ?? 0) + 3 : 1;

    const note: Note = {
      id: nextId,
      content: newNote,
      agent: "Current Agent",
      time,
    };

    setNotes((prev) => [note, ...prev]);
    setNewNote("");
  };

  return (
    <div className="w-[350px] flex-shrink-0 border-l border-grey-light bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-grey-light">
        <h3 className="text-lg font-semibold text-base-black">Order Notes</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-grey-light transition-colors"
        >
          <X size={20} color="grey" className="cursor-pointer" />
        </button>
      </div>

      {/* Note Input Area */}
      <div className="p-4 border-b border-grey-light text-grey">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write internal notes here..."
          rows={3}
          className="w-full p-2 border border-grey-light rounded-md resize-none focus:ring-primary focus:border-primary"
        />
        <button
          onClick={handleSaveNote}
          disabled={!newNote.trim()}
          className="mt-2 w-full bg-primary text-white py-2 rounded-md font-medium disabled:bg-grey-light disabled:text-grey-medium transition-colors"
        >
          Save Note
        </button>
      </div>

      {/* Existing Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h4 className="body-semi-bold-16 text-base-black">
          Existing Notes ({notes.length})
        </h4>

        {notes.length === 0 ? (
          <p className="text-sm text-grey-medium italic">
            No notes recorded yet.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-grey-light p-3 rounded-md body-regular-16"
            >
              <p className="font-medium text-grey">{note.content}</p>
              <p className="text-xs text-grey-medium mt-1">
                <strong>{note.agent}</strong> at {note.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatOrderNotesPanel;
