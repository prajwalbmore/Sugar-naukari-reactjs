import React, { useState } from "react";
import { useChat } from "./ChatProvider";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default function ChatSidebar() {
  const { chats, activeChatId, setActiveChatId, isChatOpen, setIsChatOpen } =
    useChat();
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const filteredChats = chats.filter((chat) => {
    const name = chat.fullName || "Unknown";
    const lastMsg = chat.lastMessage?.message || "";
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastMsg.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const displayName = (chat) => chat.fullName || "Unknown";

  const displayMessage = (msg = "") => {
    if (!msg) return "No messages yet";
    if (msg.startsWith("http")) return "📎 File";

    // Trim message if longer than 20 chars
    return msg.length > 20 ? msg.slice(0, 20) + "..." : msg;
  };

  return (
    <div
      className={clsx(
        "w-full md:w-full lg:w-1/4 bg-white border-r flex flex-col px-2 ",
        {
          "hidden lg:block": isChatOpen, // hide on sm/md when chat is open
        }
      )}
    >
      {/* Search */}
      <div className="py-4 px-2">
        <div className="flex items-center w-full border border-gray-200 rounded-xl px-3 py-2 gap-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm focus:outline-none"
            placeholder={t("Search messages")}
          />
        </div>
      </div>

      {/* Chat list */}
      <ul className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <li className="text-center text-gray-400 py-4 text-sm">
            {t("No chats found")}
          </li>
        ) : (
          filteredChats.map((chat) => (
            <li
              key={chat.chatId}
              className={`flex items-center cursor-pointer px-2 py-2 hover:bg-gray-100 transition-colors ${
                chat.chatId === activeChatId ? "" : ""
              }`}
              onClick={() => {
                setActiveChatId(chat.chatId);
                setIsChatOpen(true);
              }}
            >
              <img
                src={
                  chat.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName(chat)
                  )}`
                }
                alt={displayName(chat)}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{displayName(chat)}</span>
                  <span className="text-xs text-gray-400">
                    {chat.lastMessage?.timestamp
                      ? new Date(
                          chat.lastMessage.timestamp?.toDate?.() ||
                            chat.lastMessage.timestamp * 1000 // handle Firestore Timestamp or Unix seconds
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 truncate">
                    {displayMessage(chat.lastMessage?.message)}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="bg-appcolor  text-xs px-2 py-0.5 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
