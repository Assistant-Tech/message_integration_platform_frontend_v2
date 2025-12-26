import { Loader2 } from "lucide-react";
import { Input } from "@/app/components/ui";
import type { UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import type { CreateInternalConversationPayload } from "@/app/types/internal-conversation.types";

interface Props {
  register: UseFormRegister<CreateInternalConversationPayload>;
  handleSubmit: UseFormHandleSubmit<CreateInternalConversationPayload>;
  onSubmit: (data: CreateInternalConversationPayload) => Promise<void>;
  isSubmitting: boolean;
}

const ChatSidebarCreateForm = ({
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
}: Props) => (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-4 px-6 py-4"
  >
    <h3 className="text-lg font-semibold text-grey">
      New Internal Conversation
    </h3>

    <div>
      <label className="block text-sm font-medium text-grey-medium mb-1">
        Title
      </label>
      <Input
        placeholder="Enter conversation title"
        {...register("title", { required: true })}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-grey-medium mb-1">
        Status
      </label>
      <select
        {...register("status")}
        className="border border-grey-light text-grey-medium rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-grey-medium mb-1">
        Priority
      </label>
      <select
        {...register("priority")}
        className="border border-grey-light text-grey-medium rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="normal">Normal</option>
        <option value="high">High</option>
        <option value="urgent">Urgent</option>
      </select>
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-primary text-white font-medium rounded-lg py-2 mt-2 hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
      {isSubmitting ? "Creating..." : "Create Conversation"}
    </button>
  </form>
);

export default ChatSidebarCreateForm;
