import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { conversations } from "@/app/utils/admin/conversation";
import { MessagesSquare } from "lucide-react";

const ConversationPage = () => {
  return (
    <div className="flex h-full">
      {/* Left: Conversations Sidebar */}
      <aside className="w-full max-w-sm border-r border-grey-light h-full overflow-y-auto">
        <article className="px-6 py-4 border-b border-grey-light">
          <Heading
            title="Conversation"
            align="left"
            className="text-base-black"
          />
        </article>

        <div className="px-4 py-2 space-y-2">
          {conversations.map((chat, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-grey-light cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="body-bold-16 text-grey">{chat.name}</h4>
                  <p className="lable-semi-bold-14 text-grey-medium max-w-48">
                    {chat.message}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="caption-medium-12 text-grey-medium">
                  {chat.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right: Empty Chat Panel */}
      <main className="flex-1 flex items-center justify-center text-center">
        <div className="space-y-1">
          <MessagesSquare className="mx-auto h-48 w-48 text-grey-medium" />
          <h3 className="h4-semi-bold-24 text-grey">Chat with Customers</h3>
          <p className="body-regular-16 text-grey-medium">
            View and manage all your conversations here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ConversationPage;
