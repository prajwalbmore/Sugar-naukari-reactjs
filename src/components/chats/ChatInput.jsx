import React, { useRef, useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { db, storage } from "./firebase";
import { useAuthContext } from "../../contexts/auth/context";

export default function ChatInput({ chatId, sender, recipient }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null); // ✅ reference to reset file input

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF and DOCX files are allowed!");
      e.target.value = ""; // ✅ reset file input immediately
      return;
    }

    setFile(selectedFile);
    setInput(selectedFile.name);
    uploadFile(selectedFile);
  };

  // ✅ Upload file to Firebase Storage
  const uploadFile = (file) => {
    const storageRef = ref(storage, `chat_attachments/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        alert("File upload failed.");
        handleRemoveFile();
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setFileUrl(url);
      }
    );
  };

  // ✅ Remove selected file
  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileUrl(null);
    setInput("");
    if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ reset input so re-upload works
  };

  // ✅ Send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !fileUrl) return;

    try {
      const recipientId =
        user?.user_type === "employee"
          ? String(recipient?.senderId || "")
          : String(recipient?.recipientId || "");

      const recipientName =
        recipient?.full_name || recipient?.company_name || recipient?.name || "";

      const messageData = {
        message: input.trim() || "",
        senderId: String(user?.id),
        recipientId,
        senderName: sender?.name || "",
        recipientName,
        recipientProfile: recipient?.profile_image || "",
        timestamp: new Date(),
        isRead: false,
        document: fileUrl || null,
      };

      // Add message
      await addDoc(collection(db, "chats", chatId, "messages"), messageData);

      // Update chat overview
      await setDoc(
        doc(db, "chats", chatId),
        {
          lastMessage: input.trim() || "📎 Attachment",
          lastMessageTime: new Date(),
          senderId: String(user?.id),
          recipientId,
          senderName: sender?.name || "",
          recipientName,
        },
        { merge: true }
      );

      // ✅ Reset after send
      handleRemoveFile();
      setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border-t px-4 py-2 relative"
    >
      {/* Upload progress bar */}
      {file && (
        <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
          <div
            className="bg-appcolor h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* File upload */}
        <label className="p-2 rounded-xl hover:bg-gray-200 cursor-pointer flex items-center">
          <PaperClipIcon className="h-5 w-5 text-gray-600" />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.docx"
          />
        </label>

        {/* Message input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!!file && !fileUrl}
            className={`w-full rounded-xl bg-gray-100 px-3 py-2 text-sm focus:outline-none pr-10 ${
              file && !fileUrl ? "cursor-not-allowed opacity-70" : ""
            }`}
            placeholder={
              file
                ? fileUrl
                  ? "Ready to send..."
                  : "Uploading..."
                : "Type a message..."
            }
          />

          {file && (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-300 rounded-full"
            >
              <XMarkIcon className="h-4 w-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Send */}
        <button
          type="submit"
          disabled={!input.trim() && !fileUrl}
          className="w-10 h-10 flex items-center justify-center bg-dark hover:bg-appcolor text-white rounded-xl transition disabled:opacity-50"
        >
          <PaperAirplaneIcon className="h-5" />
        </button>
      </div>
    </form>
  );
}
// import React, { useState } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { collection, doc, addDoc, setDoc } from "firebase/firestore";
// import {
//   PaperAirplaneIcon,
//   PaperClipIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { db, storage } from "./firebase";
// import { useAuthContext } from "../../contexts/auth/context";

// export default function ChatInput({ chatId, sender, recipient }) {
//   const [input, setInput] = useState("");
//   const [file, setFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [fileUrl, setFileUrl] = useState(null);
//   const { user } = useAuthContext();
//   const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   // ✅ Handle file select
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     if (!allowedTypes.includes(selectedFile.type)) {
//       alert("Only PDF and DOCX files are allowed!");
//       return;
//     }

//     setFile(selectedFile);
//     setInput(selectedFile.name);
//     uploadFile(selectedFile);
//   };

//   // ✅ Upload file to Firebase Storage
//   const uploadFile = (file) => {
//     const storageRef = ref(
//       storage,
//       `chat_attachments/${Date.now()}_${file.name}`
//     );
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Upload error:", error);
//         alert("Upload failed!");
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => setFileUrl(url));
//       }
//     );
//   };

//   const handleRemoveFile = () => {
//     setFile(null);
//     setUploadProgress(0);
//     setFileUrl(null);
//     setInput("");
//   };

//   // ✅ Send message
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim() && !fileUrl) return;

//     try {
//       const messageData = {
//         message: input.trim() || "",
//         senderId: String(user?.id),
//         recipientId:
//           user?.user_type === "employee"
//             ? String(recipient?.senderId || "")
//             : String(recipient?.recipientId || ""),
//         senderName: sender?.name || "",
//         recipientName: recipient?.full_name || recipient?.company_name,
//         recipientProfile: recipient?.profile_image || "",
//         timestamp: new Date(),
//         isRead: false,
//         document: fileUrl || null, // ✅ consistent with ChatWindow
//       };

//       // Add message
//       await addDoc(collection(db, "chats", chatId, "messages"), messageData);
//       setInput("");
//       handleRemoveFile();

//       // Update chat overview
//       await setDoc(
//         doc(db, "chats", chatId),
//         {
//           lastMessage: input.trim() || "📎 Attachment",
//           lastMessageTime: new Date(),
//           senderId: String(user?.id),
//           recipientId:
//             user?.user_type === "employee"
//               ? String(recipient?.senderId || "")
//               : String(recipient?.recipientId || ""),
//           senderName: sender?.name || "",
//           recipientName: recipient?.name || recipient?.company_name,
//         },
//         { merge: true }
//       );

//       // Reset after send
//     } catch (err) {
//       console.error("Error sending message:", err);
//       //   alert("Failed to send message.");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col border-t px-4 py-2 relative"
//     >
//       {/* Upload progress bar */}
//       {file && (
//         <div className="w-full bg-gray-200 h-2 rounded-full mb-2 overflow-hidden">
//           <div
//             className="bg-appcolor h-2 rounded-full transition-all duration-300 ease-out"
//             style={{ width: `${uploadProgress}%` }}
//           />
//         </div>
//       )}

//       <div className="flex items-center gap-2">
//         {/* File upload button */}
//         <label className="p-2 rounded-xl hover:bg-gray-200 cursor-pointer flex items-center gap-1">
//           <PaperClipIcon className="h-5 w-5 text-gray-600" />
//           {/* <span>Attach file</span> */}
//           <input
//             type="file"
//             className="hidden"
//             onChange={handleFileChange}
//             accept=".pdf,.docx"
//           />
//         </label>

//         {/* Message input */}
//         <div className="relative flex-1">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             disabled={!!file} // disable only if file is selected
//             className={`w-full rounded-xl bg-gray-100 px-3 py-2 text-sm focus:outline-none pr-10 ${
//               file ? "cursor-not-allowed opacity-70" : ""
//             }`}
//             placeholder={file ? "" : "Type a message..."}
//           />

//           {file && (
//             <button
//               type="button"
//               onClick={handleRemoveFile}
//               className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-300 rounded-full"
//             >
//               <XMarkIcon className="h-4 w-4 text-gray-600" />
//             </button>
//           )}
//         </div>

//         {/* Send button */}
//         <button
//           type="submit"
//           className="w-10 h-10 flex items-center justify-center bg-dark hover:bg-appcolor text-white rounded-xl transition hover:text-dark"
//         >
//           <PaperAirplaneIcon className="h-5" />
//         </button>
//       </div>
//     </form>
//   );
// }
