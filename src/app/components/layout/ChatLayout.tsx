import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return <div className="flex h-screen w-full">{children}</div>;
};

export default ChatLayout;
