import React from "react";
import { ChatProvider } from "./ChatProvider";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useAuthContext } from "../../contexts/auth/context";

export default function ChatIndex() {
  const { user } = useAuthContext();
  return (
    <ChatProvider>
      <div className="flex h-screen lg:h-full md:h-full  bg-gray-50">
        <ChatSidebar />
        <ChatWindow sender={user} />
      </div>
    </ChatProvider>
  );
}
