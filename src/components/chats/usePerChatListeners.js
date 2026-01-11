import { useEffect } from "react";
import { listenPerChatMessages } from "./firestoreChatHelpers";
import { db } from "../chats/firebase";

/**
 * React hook to attach per-chat listeners for latest message and unread counts.
 * handlers: { onLatestForChat(chatId, msg), onUnreadForChat(chatId, count) }
 */
export function usePerChatListeners(chats, recipientId, handlers = {}) {
  useEffect(() => {
    if (!recipientId || !Array.isArray(chats) || chats.length === 0) return;

    const unsubs = chats.map((c) =>
      listenPerChatMessages(db, c.chatId, String(recipientId), {
        onLatest: (msg) => handlers.onLatestForChat && handlers.onLatestForChat(c.chatId, msg),
        onUnreadCount: (n) =>
          handlers.onUnreadForChat && handlers.onUnreadForChat(c.chatId, n),
      })
    );

    return () => unsubs.forEach((u) => u());
  }, [recipientId, Array.isArray(chats) ? chats.map((c) => c.chatId).join("|") : ""]);
}
