import { useState } from "react";
import { Heading } from "@/app/features/dashboard/admin/component/ui/";
import { conversations } from "@/app/utils/admin/conversation";
import { ChatPannel } from "@/app/features/dashboard/admin/component/";
                                                                                                                         
import facebook from "@/app/assets/icons/fb.svg";
import instagram from "@/app/assets/icons/insta.svg";
import whatsapp from "@/app/assets/icons/whatsapp.svg";

const platformIcons: Record<string, string> = {
  facebook,
  instagram,
  whatsapp,
};

const ConversationPage = () => {
  const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(
    null,
  );
  const selectedChat =
    selectedChatIndex !== null ? conversations[selectedChatIndex] : null;

  return (
    <div className="flex h-full">
      <aside className="w-full max-w-sm border-r border-grey-light h-full overflow-y-auto">
        <article className="px-6 py-4  border-b border-grey-light">
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
              onClick={() => setSelectedChatIndex(index)}
              className={`flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-primary-light cursor-pointer ${
                selectedChatIndex === index ? "bg-primary-light" : ""
              }`}
            >
              <div className="flex flex-col items-end relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-10 rounded-full"
                />
                {platformIcons[chat.platform] && (
                  <img
                    src={platformIcons[chat.platform]}
                    alt={chat.platform}
                    className="w-6 h-6 absolute bottom-0 -right-2 rounded-3xl p-px bg-white"
                  />
                )}
              </div>

              <div className="flex justify-between w-full">
                <div>
                  <h4 className="body-bold-16 text-grey">{chat.name}</h4>
                  <p className="lable-semi-bold-14 text-grey-medium max-w-48 truncate">
                    {chat.message}
                  </p>
                </div>
                <div className="text-right">
                  <span className="caption-medium-12 text-grey-medium">
                    {chat.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Panel */}
      <ChatPannel chat={selectedChat || undefined} />
    </div>
  );
};

export default ConversationPage;
