import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "./firebase"; // adjust path to your firebase.js

/**
 * Get all messages where the user is either sender or recipient
 * @param {string} userId
 * @returns {Promise<Array>} Array of messages
 */
export const getAllMessagesByUser = async (userId) => {
  try {
    // Reference to chats collection
    const chatsSnapshot = await getDocs(collection(db, "chats"));
    const allMessages = [];

    // Loop through all chats
    for (const chatDoc of chatsSnapshot.docs) {
      const chatId = chatDoc.id;
      const messagesRef = collection(db, "chats", chatId, "messages");

      // Query messages where user is sender or recipient
      const messagesQuery = query(
        messagesRef,
        where("senderId", "==", String(userId)) // sent by user
      );
      const sentSnapshot = await getDocs(messagesQuery);
      sentSnapshot.forEach((doc) =>
        allMessages.push({ chatId, id: doc.id, ...doc.data() })
      );

      const receivedQuery = query(
        messagesRef,
        where("recipientId", "==", String(userId)) // received by user
      );
      const receivedSnapshot = await getDocs(receivedQuery);
      receivedSnapshot.forEach((doc) =>
        allMessages.push({ chatId, id: doc.id, ...doc.data() })
      );
    }

    // Optional: sort by timestamp
    allMessages.sort(
      (a, b) => a.timestamp?.toDate?.() - b.timestamp?.toDate?.()
    );

    return allMessages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
