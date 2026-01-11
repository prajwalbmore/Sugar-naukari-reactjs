// ChatLayout.jsx
import React from "react";
import { useChat } from "./ChatProvider";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

const ChatLayout = () => {
  const { isChatOpen } = useChat();

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-20 bg-white md:relative md:flex md:w-1/3 lg:w-1/4 transition-transform duration-300 ${
          isChatOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        }`}
      >
        <ChatSidebar />
      </div>

      {/* Chat window */}
      <div
        className={`flex-1 h-full transition-all duration-300 bg-white ${
          isChatOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } fixed inset-0 md:relative md:ml-0 lg:ml-0`}
      >
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatLayout;
