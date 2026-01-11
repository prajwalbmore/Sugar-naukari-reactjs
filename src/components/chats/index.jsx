// App.js
import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

export default function ChatIndex() {
  // Simulated state: select "chat" by id, and data for chats/messages
  const [activeChatId, setActiveChatId] = useState("1");

  // Simulated chats data (replace with Firestore in production)
  // In App.js or a separate file

  const chats = [
    {
      id: "1",
      name: "Jan Mayer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      preview: "We want to invite you for a qui...",
      time: "12 mins ago",
      role: "Recruiter at Nomad",
    },
    {
      id: "2",
      name: "Joe Bartmann",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      preview: "Hey thanks for your interview...",
      time: "3:40 PM",
      role: "Product Manager",
    },
    // ... other users
  ];

  const messages = [
    {
      id: "m1",
      chatId: "1",
      sentByMe: false,
      text: "Hey Jake, I wanted to reach out because we saw your work contributions and were impressed by your work.",
      time: "12 mins ago",
    },
    {
      id: "m2",
      chatId: "1",
      sentByMe: false,
      text: "We want to invite you for a quick interview",
      time: "12 mins ago",
    },
    {
      id: "m3",
      chatId: "1",
      sentByMe: true,
      text: "Hi Jan, sure I would love to. Thanks for taking the time to see my work!",
      time: "12 mins ago",
    },
    // ... more messages
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
      <ChatWindow
        chat={chats.find((chat) => chat.id === activeChatId)}
        messages={messages.filter((msg) => msg.chatId === activeChatId)}
      />
    </div>
  );
}
