import React, { useEffect, useRef, useMemo } from "react";
import { useChat } from "./ChatProvider";
import ChatInput from "./ChatInput";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { ArrowLeft, CheckCheck } from "lucide-react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import Button from "../ui/Button";
import { useTranslation } from "react-i18next";

export default function ChatWindow({ sender }) {
  const {
    chats,
    messages = [],
    activeChatId,
    isChatOpen,
    setIsChatOpen,
    setActiveChatIdfalse,
  } = useChat();
  const chat = chats.find((c) => c.chatId === activeChatId);
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();

  // Format date labels
  const formatDate = (timestamp) => {
    const msgDate = new Date(timestamp);
    const today = new Date();
    const diffDays = Math.floor(
      (today.setHours(0, 0, 0, 0) - msgDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return msgDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Group messages safely (even if chat is null)
  const groupedMessages = useMemo(() => {
    if (!chat) return {};
    return messages.reduce((groups, msg) => {
      const msgDate = msg.timestamp?.toDate
        ? msg.timestamp.toDate()
        : new Date(msg.timestamp);
      const dateKey = formatDate(msgDate);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
      return groups;
    }, {});
  }, [messages, chat]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChatId]);

  // If no chat selected
  if (!chat) {
    return (
      <div className="flex-1 bg-white flex items-center justify-center text-gray-500 hidden sm:hidden md:hidden lg:flex">
        {t("Select a chat")}
      </div>
    );
  }

  const displayName = chat.fullName || "Unknown";
  const avatarUrl =
    chat.profileImage ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}`;

  return (
    <div
      className={clsx("flex-1 flex flex-col bg-white", {
        "w-full": isChatOpen || window.innerWidth >= 1024,
        "hidden sm:hidden md:hidden": !isChatOpen && window.innerWidth < 1024,
        "lg:w-[70%]": true,
      })}
    >
      {/* Header */}
      <div className="flex items-center border-b px-6 py-4 gap-2">
        <Button
          onClick={() => {
            setIsChatOpen(false);
            setActiveChatIdfalse(false);
          }}
          className="block lg:hidden"
        >
          <ArrowLeft />
        </Button>
        <img
          src={avatarUrl}
          alt={displayName}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="font-semibold">{displayName}</div>
          {chat.role && (
            <div className="text-xs text-gray-500">{chat.role}</div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex justify-center mb-3">
              <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                {date}
              </span>
            </div>

            {msgs.map((msg) => {
              const sentByMe = String(msg.senderId) === String(sender.id);
              const messageTime = msg.timestamp
                ? new Date(
                    msg.timestamp?.toDate
                      ? msg.timestamp.toDate()
                      : msg.timestamp
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <div
                  key={msg.id}
                  className={`flex ${
                    sentByMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-sm px-4 py-2 mt-3 rounded-lg text-sm break-words ${
                      sentByMe
                        ? "bg-indigo-100 text-right"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    {/* Message or Document */}
                    {msg.document ? (
                      <a
                        href={msg.document}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition text-blue-700 font-medium w-fit"
                      >
                        <DocumentIcon className="h-5 w-5 text-blue-600" />
                        <span className="truncate max-w-[200px]">
                          {msg.message || "📎 Attachment"}
                        </span>
                      </a>
                    ) : (
                      <span>{msg.message}</span>
                    )}

                    {/* Time + Read Status */}
                    <div className="mt-1 text-xs flex items-center justify-end gap-1 text-gray-400">
                      <span>{messageTime}</span>
                      {sentByMe && (
                        <CheckCheck
                          className={`h-4 w-4 ${
                            msg.isRead ? "text-blue-500" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput chatId={chat.chatId} sender={sender} recipient={chat} />
    </div>
  );
}
