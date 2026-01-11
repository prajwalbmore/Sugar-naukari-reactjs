import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
  limit,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useGetChatHistoryQuery } from "../../services/faqApiSlice";
import { useAuthContext } from "../../contexts/auth/context";
import { useLocation } from "react-router-dom";

const ChatContext = createContext();

export const ChatProvider = ({ children, currentUser }) => {
  const { user, userType } = useAuthContext();
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [userSelectedChat, setUserSelectedChat] = useState(false);
  const { state } = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Fetch chat history from API
  const { data: apiResponse, isLoading } = useGetChatHistoryQuery(
    { user_id: user.id, login_as: userType },
    { pollingInterval: 500 }
  );
  const chatHistory = apiResponse?.data || [];

  // --- Debouncer for mark-as-read
  const debounceRef = useRef(null);

  // Initialize chats
  useEffect(() => {
    if (!chatHistory.length) return;
    setChats((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(chatHistory)) return prev;
      const enriched = chatHistory.map((chat) => ({
        ...chat,
        fullName: chat.full_name || chat.company_name,
        profileImage: chat.profile_image,
        lastMessage: null,
        unreadCount: 0,
      }));
      return enriched;
    });
  }, [chatHistory]);

  // Auto-select only once on navigation
  useEffect(() => {
    if (!state?.recipientId || !chats.length || userSelectedChat) return;
    const matchedChat = chats.find(
      (c) => String(c.recipientId) === String(state.recipientId)
    );
    if (matchedChat) setActiveChatId(matchedChat.chatId);
  }, [state?.recipientId, chats, userSelectedChat]);

  // Default active chat (if not manually selected)
  // useEffect(() => {
  //   if (!activeChatId && chats.length > 0 && !userSelectedChat) {
  //     setActiveChatId(chats[0].chatId);
  //   }
  // }, [chats, activeChatId, userSelectedChat]);

  // Listen to active chat messages
  useEffect(() => {
    if (!activeChatId) return;
    const messagesCol = collection(db, "chats", activeChatId, "messages");
    const q = query(messagesCol, orderBy("timestamp", "asc"), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);

      if (msgs.length) {
        setChats((prev) =>
          prev.map((chat) =>
            chat.chatId === activeChatId
              ? { ...chat, lastMessage: msgs[msgs.length - 1] }
              : chat
          )
        );
      }
    });

    return () => unsubscribe();
  }, [activeChatId]);

  // Listen for latest messages & unread count across chats
  useEffect(() => {
    if (!chats.length) return;

    const unsubscribers = chats.map((chat) => {
      const messagesCol = collection(db, "chats", chat.chatId, "messages");
      const latestMsgQuery = query(
        messagesCol,
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const unsubLastMsg = onSnapshot(latestMsgQuery, (snapshot) => {
        if (!snapshot.empty) {
          const latestMsg = {
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          };
          setChats((prev) =>
            prev.map((c) =>
              c.chatId === chat.chatId ? { ...c, lastMessage: latestMsg } : c
            )
          );
        }
      });

      const unreadQuery = query(
        messagesCol,
        where("isRead", "==", false),
        where("recipientId", "==", String(user.id))
      );
      const unsubUnread = onSnapshot(unreadQuery, (snapshot) => {
        const unreadCount = snapshot.size;
        setChats((prev) =>
          prev.map((c) =>
            c.chatId === chat.chatId ? { ...c, unreadCount } : c
          )
        );
      });

      return () => {
        unsubLastMsg();
        unsubUnread();
      };
    });

    return () => unsubscribers.forEach((unsub) => unsub());
  }, [chats.length, user.id]);

  // --- Mark unread messages as read when new messages loaded for active chat
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const markMessagesAsRead = async () => {
        if (!activeChatId || !user?.id || !messages.length) return;

        const unreadMsgs = messages.filter(
          (msg) => !msg.isRead && String(msg.recipientId) === String(user.id)
        );
        if (!unreadMsgs.length) return;

        // Batch update unread messages
        try {
          await Promise.all(
            unreadMsgs.map((msg) =>
              updateDoc(doc(db, "chats", activeChatId, "messages", msg.id), {
                isRead: true,
              })
            )
          );
          // Optionally: Log or additional UX update here
        } catch (err) {
          console.error("Mark as read error:", err);
        }
      };
      markMessagesAsRead();
    }, 300); // 300ms debounce

    return () => clearTimeout(debounceRef.current);
  }, [messages, activeChatId, user?.id]);
  // --- End mark-as-read

  // Manual chat click handler
  const handleSetActiveChatId = (id) => {
    setUserSelectedChat(true);
    setActiveChatId(id);
  };

  // Send message
  const sendMessage = async ({ chatId, text = "", documentUrl = null }) => {
    if (!text.trim() && !documentUrl) return;
    const chatInfo = chats.find((c) => c.chatId === chatId);
    if (!chatInfo || !currentUser) {
      console.error("Invalid chat info or user");
      return;
    }

    const msgData = {
      message: text || "",
      senderId: currentUser.id,
      recipientId: chatInfo?.recipientId || "",
      senderName: currentUser.name,
      recipientName: chatInfo?.fullName || chatInfo?.company_name,
      timestamp: serverTimestamp(),
      isRead: false,
      documentUrl: documentUrl || null,
    };

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), msgData);
      await setDoc(
        doc(db, "chats", chatId),
        {
          lastMessage: documentUrl || text,
          lastMessageTime: serverTimestamp(),
          senderId: currentUser.id,
          senderName: currentUser.name,
          recipientId: chatInfo?.recipientId || "",
          recipientName: chatInfo?.fullName || chatInfo?.company_name,
        },
        { merge: true }
      );
      setChats((prev) =>
        prev.map((chat) =>
          chat.chatId === chatId ? { ...chat, lastMessage: msgData } : chat
        )
      );
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        activeChatId,
        setActiveChatId: handleSetActiveChatId,
        setActiveChatIdfalse: setActiveChatId,
        sendMessage,
        isLoading,
        setIsChatOpen,
        isChatOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   doc,
//   setDoc,
//   serverTimestamp,
//   limit,
//   where,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";
// import { useGetChatHistoryQuery } from "../../services/faqApiSlice";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useLocation } from "react-router-dom";

// const ChatContext = createContext();

// export const ChatProvider = ({ children, currentUser }) => {
//   const { user, userType } = useAuthContext();
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [userSelectedChat, setUserSelectedChat] = useState(false);
//   const { state } = useLocation();
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   // Fetch chat history from API
//   const { data: apiResponse, isLoading } = useGetChatHistoryQuery(
//     { user_id: user.id, login_as: userType },
//     { pollingInterval: 0 }
//   );
//   const chatHistory = apiResponse?.data || [];

//   // Initialize chats
//   useEffect(() => {
//     if (!chatHistory.length) return;
//     setChats((prev) => {
//       if (JSON.stringify(prev) === JSON.stringify(chatHistory)) return prev;
//       const enriched = chatHistory.map((chat) => ({
//         ...chat,
//         fullName: chat.full_name || chat.company_name,
//         profileImage: chat.profile_image,
//         lastMessage: null,
//         unreadCount: 0, // ✅ new field
//       }));
//       return enriched;
//     });
//   }, [chatHistory]);

//   // 🧠 Auto-select only once on navigation
//   useEffect(() => {
//     if (!state?.recipientId || !chats.length || userSelectedChat) return;
//     const matchedChat = chats.find(
//       (c) => String(c.recipientId) === String(state.recipientId)
//     );
//     if (matchedChat) setActiveChatId(matchedChat.chatId);
//   }, [state?.recipientId, chats, userSelectedChat]);

//   // 🧩 Default active chat (only if not manually selected)
//   useEffect(() => {
//     if (!activeChatId && chats.length > 0 && !userSelectedChat) {
//       setActiveChatId(chats[0].chatId);
//     }
//   }, [chats, activeChatId, userSelectedChat]);

//   // Listen to active chat messages
//   useEffect(() => {
//     if (!activeChatId) return;
//     const messagesCol = collection(db, "chats", activeChatId, "messages");
//     const q = query(messagesCol, orderBy("timestamp", "asc"), limit(100));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMessages(msgs);

//       if (msgs.length) {
//         setChats((prev) =>
//           prev.map((chat) =>
//             chat.chatId === activeChatId
//               ? { ...chat, lastMessage: msgs[msgs.length - 1] }
//               : chat
//           )
//         );
//       }
//     });

//     return () => unsubscribe();
//   }, [activeChatId]);

//   // Listen for latest messages + unread count across chats
//   useEffect(() => {
//     if (!chats.length) return;

//     const unsubscribes = chats.map((chat) => {
//       const messagesCol = collection(db, "chats", chat.chatId, "messages");
//       const latestMsgQuery = query(
//         messagesCol,
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       // 🔹 Listen to last message
//       const unsubLastMsg = onSnapshot(latestMsgQuery, (snapshot) => {
//         if (!snapshot.empty) {
//           const latestMsg = {
//             id: snapshot.docs[0].id,
//             ...snapshot.docs[0].data(),
//           };
//           setChats((prev) =>
//             prev.map((c) =>
//               c.chatId === chat.chatId ? { ...c, lastMessage: latestMsg } : c
//             )
//           );
//         }
//       });

//       // 🔹 Listen for unread messages for this user
//       const unreadQuery = query(
//         messagesCol,
//         where("isRead", "==", false),
//         where("recipientId", "==", String(user.id))
//       );
//       const unsubUnread = onSnapshot(unreadQuery, (snapshot) => {
//         const unreadCount = snapshot.size;
//         setChats((prev) =>
//           prev.map((c) =>
//             c.chatId === chat.chatId ? { ...c, unreadCount } : c
//           )
//         );
//       });

//       return () => {
//         unsubLastMsg();
//         unsubUnread();
//       };
//     });

//     return () => unsubscribes.forEach((unsub) => unsub());
//   }, [chats.length, user.id]);

//   // ✅ Mark all unread messages as read when chat becomes active
//   useEffect(() => {
//     const markMessagesAsRead = async () => {
//       if (!activeChatId || !user?.id) return;

//       const messagesCol = collection(db, "chats", activeChatId, "messages");
//       const unreadQuery = query(
//         messagesCol,
//         where("isRead", "==", false),
//         where("recipientId", "==", String(user.id))
//       );

//       const snapshot = await getDocs(unreadQuery);

//       // 🔹 Update all unread messages
//       const updates = snapshot.docs.map((docSnap) =>
//         updateDoc(docSnap.ref, { isRead: true })
//       );

//       await Promise.all(updates);
//       console.log(
//         `✅ Marked ${snapshot.size} messages as read in ${activeChatId}`
//       );
//     };

//     markMessagesAsRead();
//   }, [activeChatId, currentUser?.id]);

//   // ✅ Wrapper for manual chat click
//   const handleSetActiveChatId = (id) => {
//     setUserSelectedChat(true);
//     setActiveChatId(id);
//   };

//   // Send message
//   const sendMessage = async ({ chatId, text = "", documentUrl = null }) => {
//     if (!text.trim() && !documentUrl) return;
//     const chatInfo = chats.find((c) => c.chatId === chatId);
//     if (!chatInfo || !currentUser) {
//       console.error("Invalid chat info or user");
//       return;
//     }

//     const msgData = {
//       message: text || "",
//       senderId: currentUser.id,
//       recipientId: chatInfo?.recipientId || "",
//       senderName: currentUser.name,
//       recipientName: chatInfo?.fullName || chatInfo?.company_name,
//       timestamp: serverTimestamp(),
//       isRead: false,
//       documentUrl: documentUrl || null,
//     };

//     try {
//       await addDoc(collection(db, "chats", chatId, "messages"), msgData);
//       await setDoc(
//         doc(db, "chats", chatId),
//         {
//           lastMessage: documentUrl || text,
//           lastMessageTime: serverTimestamp(),
//           senderId: currentUser.id,
//           senderName: currentUser.name,
//           recipientId: chatInfo?.recipientId || "",
//           recipientName: chatInfo?.fullName || chatInfo?.company_name,
//         },
//         { merge: true }
//       );
//       setChats((prev) =>
//         prev.map((chat) =>
//           chat.chatId === chatId ? { ...chat, lastMessage: msgData } : chat
//         )
//       );
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         chats,
//         messages,
//         activeChatId,
//         setActiveChatId: handleSetActiveChatId,
//         sendMessage,
//         isLoading,
//         setIsChatOpen,
//         isChatOpen,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { db } from "./firebase";
// import {
//   collection,
//   query,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   doc,
//   setDoc,
//   serverTimestamp,
//   limit,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { useGetChatHistoryQuery } from "../../services/faqApiSlice";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useLocation } from "react-router-dom";

// const ChatContext = createContext();

// export const ChatProvider = ({ children, currentUser }) => {
//   const { user, userType } = useAuthContext();
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [userSelectedChat, setUserSelectedChat] = useState(false);
//   const { state } = useLocation();

//   // Fetch chat history from API
//   const { data: apiResponse, isLoading } = useGetChatHistoryQuery(
//     { user_id: user.id, login_as: userType },
//     { pollingInterval: 0 }
//   );
//   const chatHistory = apiResponse?.data || [];

//   // Initialize chats
//   useEffect(() => {
//     if (!chatHistory.length) return;
//     setChats((prev) => {
//       if (JSON.stringify(prev) === JSON.stringify(chatHistory)) return prev;
//       const enriched = chatHistory.map((chat) => ({
//         ...chat,
//         fullName: chat.full_name || chat.company_name,
//         profileImage: chat.profile_image,
//         lastMessage: null,
//         unreadCount: 0, // ✅ new field
//       }));
//       return enriched;
//     });
//   }, [chatHistory]);

//   // 🧠 Auto-select only once on navigation
//   useEffect(() => {
//     if (!state?.recipientId || !chats.length || userSelectedChat) return;
//     const matchedChat = chats.find(
//       (c) => String(c.recipientId) === String(state.recipientId)
//     );
//     if (matchedChat) setActiveChatId(matchedChat.chatId);
//   }, [state?.recipientId, chats, userSelectedChat]);

//   // 🧩 Default active chat (only if not manually selected)
//   useEffect(() => {
//     if (!activeChatId && chats.length > 0 && !userSelectedChat) {
//       setActiveChatId(chats[0].chatId);
//     }
//   }, [chats, activeChatId, userSelectedChat]);

//   // Listen to active chat messages
//   useEffect(() => {
//     if (!activeChatId) return;
//     const messagesCol = collection(db, "chats", activeChatId, "messages");
//     const q = query(messagesCol, orderBy("timestamp", "asc"), limit(100));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMessages(msgs);

//       if (msgs.length) {
//         setChats((prev) =>
//           prev.map((chat) =>
//             chat.chatId === activeChatId
//               ? { ...chat, lastMessage: msgs[msgs.length - 1] }
//               : chat
//           )
//         );
//       }
//     });

//     return () => unsubscribe();
//   }, [activeChatId]);

//   // Listen for latest messages + unread count across chats
//   useEffect(() => {
//     if (!chats.length) return;

//     const unsubscribes = chats.map((chat) => {
//       const messagesCol = collection(db, "chats", chat.chatId, "messages");
//       const latestMsgQuery = query(
//         messagesCol,
//         orderBy("timestamp", "desc"),
//         limit(1)
//       );

//       // 🔹 Listen to last message
//       const unsubLastMsg = onSnapshot(latestMsgQuery, (snapshot) => {
//         if (!snapshot.empty) {
//           const latestMsg = {
//             id: snapshot.docs[0].id,
//             ...snapshot.docs[0].data(),
//           };
//           setChats((prev) =>
//             prev.map((c) =>
//               c.chatId === chat.chatId ? { ...c, lastMessage: latestMsg } : c
//             )
//           );
//         }
//       });

//       // 🔹 Listen for unread messages for this user
//       const unreadQuery = query(
//         messagesCol,
//         where("isRead", "==", false),
//         where("recipientId", "==", String(user.id))
//       );
//       const unsubUnread = onSnapshot(unreadQuery, (snapshot) => {
//         const unreadCount = snapshot.size;
//         setChats((prev) =>
//           prev.map((c) =>
//             c.chatId === chat.chatId ? { ...c, unreadCount } : c
//           )
//         );
//       });

//       return () => {
//         unsubLastMsg();
//         unsubUnread();
//       };
//     });

//     return () => unsubscribes.forEach((unsub) => unsub());
//   }, [chats.length, user.id]);

//   // ✅ Wrapper for manual chat click
//   const handleSetActiveChatId = (id) => {
//     setUserSelectedChat(true);
//     setActiveChatId(id);
//   };

//   // Send message
//   const sendMessage = async ({ chatId, text = "", documentUrl = null }) => {
//     if (!text.trim() && !documentUrl) return;
//     const chatInfo = chats.find((c) => c.chatId === chatId);
//     if (!chatInfo || !currentUser) {
//       console.error("Invalid chat info or user");
//       return;
//     }

//     const msgData = {
//       message: text || "",
//       senderId: currentUser.id,
//       recipientId: chatInfo?.recipientId || "",
//       senderName: currentUser.name,
//       recipientName: chatInfo?.fullName || chatInfo?.company_name,
//       timestamp: serverTimestamp(),
//       isRead: false,
//       documentUrl: documentUrl || null,
//     };

//     try {
//       await addDoc(collection(db, "chats", chatId, "messages"), msgData);
//       await setDoc(
//         doc(db, "chats", chatId),
//         {
//           lastMessage: documentUrl || text,
//           lastMessageTime: serverTimestamp(),
//           senderId: currentUser.id,
//           senderName: currentUser.name,
//           recipientId: chatInfo?.recipientId || "",
//           recipientName: chatInfo?.fullName || chatInfo?.company_name,
//         },
//         { merge: true }
//       );
//       setChats((prev) =>
//         prev.map((chat) =>
//           chat.chatId === chatId ? { ...chat, lastMessage: msgData } : chat
//         )
//       );
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };
//   console.log("chats", chats);
//   return (
//     <ChatContext.Provider
//       value={{
//         chats,
//         messages,
//         activeChatId,
//         setActiveChatId: handleSetActiveChatId,
//         sendMessage,
//         isLoading,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChat = () => useContext(ChatContext);
