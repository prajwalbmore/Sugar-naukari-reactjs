import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import logo from "/assets/landingpage/BrandLogo.png";
import { menuItems, permissions } from "../../constants/menuItems";
import { useAuthContext } from "../../contexts/auth/context";
import { useTranslation } from "react-i18next";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../chats/firebase";

const Sidebar = ({ active, setActive }) => {
  const { user, userType, logout } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [unreadCount, setUnreadCount] = useState(0);

  // guard access to permissions when user may be undefined
  const allowedItems = menuItems.filter((item) =>
    permissions[user?.role]?.includes(item.name)
  );

  /**
   * Real-time unread message listener
   */
  const listenForUnreadMessages = () => {
    if (!user?.id) return null;

    // 1️⃣ Listen for chats where this user is the recipient
    const chatsQuery = query(
      collection(db, "chats"),
      where(
        // userType === "employee" ? "recipientId" : "recipientId",
        "recipientId",
        "==",
        String(user.id)
      )
    );

    // Outer listener for chat documents
    const unsubscribeChats = onSnapshot(chatsQuery, (chatsSnapshot) => {
      if (chatsSnapshot.empty) {
        setUnreadCount(0);
        return;
      }

      // Hold all message listeners for cleanup
      const messageUnsubscribers = [];

      // We'll store all counts locally to avoid state race conditions
      let totalUnread = 0;

      chatsSnapshot.docs.forEach((chatDoc) => {
        const messagesCol = collection(db, "chats", chatDoc.id, "messages");
        const unreadMessagesQuery = query(
          messagesCol,
          where("isRead", "==", false),
          where("recipientId", "==", String(user.id))
        );

        // 2️⃣ Listen to unread messages in each chat (real-time)
        const unsubscribeMessages = onSnapshot(
          unreadMessagesQuery,
          (messagesSnapshot) => {
            // Each sub-listener reports its unread count
            const currentUnreadCount = messagesSnapshot.size;

            // Recalculate total unread dynamically
            // We do this by summing all messageSnapshots sizes
            let sum = 0;
            chatsSnapshot.docs.forEach((doc) => {
              const msgQuery = query(
                collection(db, "chats", doc.id, "messages"),
                where("isRead", "==", false),
                where("recipientId", "==", String(user.id))
              );
              onSnapshot(msgQuery, (snap) => {
                sum += snap.size;
                setUnreadCount(sum);
              });
            });
          }
        );

        messageUnsubscribers.push(unsubscribeMessages);
      });

      // 3️⃣ Cleanup all message listeners when chats change
      return () => messageUnsubscribers.forEach((u) => u());
    });

    return unsubscribeChats;
  };

  // Start listening when user.id becomes available; cleanup on unmount / user change
  useEffect(() => {
    const unsubscribe = listenForUnreadMessages();
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-emerald-500 text-black p-4 transform transition-transform duration-300
      ${active ? "translate-x-0" : "-translate-x-full"}
      sm:translate-x-0 sm:relative sm:w-48 md:w-56 lg:w-1/6 z-50`}
    >
      {/* Close button (only mobile) */}
      <button
        onClick={() => setActive(false)}
        className="absolute top-4 right-4 sm:hidden rounded-full p-1 shadow"
        aria-label="close sidebar"
      >
        <XMarkIcon className="h-5" />
      </button>

      {/* Logo Section */}
      <div className="flex items-center justify-center mb-4 text-lg font-bold">
        {/* <img
          src={logo}
          alt="Fastaff Logo"
          className="h-12 sm:h-20 md:h-28 lg:h-28 object-contain cursor-pointer"
          onClick={() => navigate("/")}
          title="Go to Home"
        /> */}
        SugarNaukri
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {allowedItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end || false}
              className={({ isActive }) =>
                `flex items-center justify-between p-2 rounded-lg font-semibold transition-colors ${
                  isActive ? "bg-dark text-emerald-500" : "hover:bg-emerald-300"
                }`
              }
              onClick={() => setActive(false)}
            >
              <div className="flex items-center">
                <Icon className="h-6 w-6" strokeWidth={2} />
                <span className="ml-3">{t(item.name)}</span>
              </div>

              {/* Unread badge on Messages tab */}
              {item.name === "Messages" && unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 w-[calc(100%-2rem)]">
        <button
          className="flex items-center p-2 rounded-lg hover:bg-emerald-500 w-full"
          onClick={logout}
        >
          <ArrowLeftOnRectangleIcon className="h-6 w-6" strokeWidth={2} />
          <span className="ml-3 font-semibold">{t("Log Out")}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
