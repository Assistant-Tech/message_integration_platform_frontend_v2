import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return <div className="flex flex-1 h-full">{children}</div>;
};

export default ChatLayout;
