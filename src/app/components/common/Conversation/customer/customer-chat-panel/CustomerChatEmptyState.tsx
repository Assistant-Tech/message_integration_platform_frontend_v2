import { MessagesSquare } from "lucide-react";

const CustomerChatEmptyState = () => (
  <div className="flex h-full flex-col items-center justify-center gap-3 text-grey-medium">
    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-light/40">
      <MessagesSquare
        className="h-10 w-10 text-grey-medium"
        strokeWidth={1.5}
      />
    </div>
    <h3 className="text-xl font-semibold text-grey">Chat with Customers</h3>
    <p className="text-sm text-grey-medium">
      View and manage all your conversations here.
    </p>
  </div>
);

export default CustomerChatEmptyState;
