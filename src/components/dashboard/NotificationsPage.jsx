import React, { useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useUpdateNotificationStatusMutation } from "../../services/faqApiSlice";
import { useAuthContext } from "../../contexts/auth/context";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../../utils/useHandleSubmit";
import { useTranslation } from "react-i18next";

const NotificationsPage = ({
  data,
  isLoading,
  activeFilter,
  setActiveFilter,
  refetch,
  close,
}) => {
  const { user } = useAuthContext();
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
  const { t } = useTranslation();

  const notificationsData = data?.data || {};

  const filterNotifications = (notifications) => {
    if (activeFilter === "all") return notifications;
    return notifications.filter((n) =>
      activeFilter === "read"
        ? n.read_status === "read"
        : n.read_status === "unread"
    );
  };

  if (isLoading) return <Spinner />;

  const handleNotificationClick = async (n) => {
    handleSubmit({
      apiCall: updateNotificationStatus,
      values: { notification_id: n.notification_id },
      showToast: false,
      refetch: refetch,
    });
  };

  // Mark all unread notifications as read on component mount
  useEffect(() => {
    const markAllRead = async () => {
      const allNotifications = Object.values(notificationsData).flat();
      const unreadNotifications = allNotifications.filter(
        (n) => n.read_status === "unread"
      );

      if (unreadNotifications.length > 0) {
        const notification_ids = unreadNotifications.map(
          (n) => n.notification_id
        );

        await handleSubmit({
          apiCall: updateNotificationStatus,
          values: { notification_ids }, // send array
          showToast: false,
          refetch: refetch,
        });
        refetch();
      }
    };

    markAllRead();
  }, [notificationsData, updateNotificationStatus, refetch]);

  return (
    <div className="mx-auto rounded-2xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-[500px] z-50">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          {t("Notifications")}
        </h1>
        <BellIcon className="h-5 w-5 text-gray-500" />
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex bg-gray-200 rounded-full p-1">
          {["all", "read", "unread"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-black text-white"
                  : "text-gray-600"
              }`}
            >
              {t(filter.charAt(0).toUpperCase() + filter.slice(1))}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[380px] overflow-y-auto px-1 sm:px-2 md:px-4">
        {Object.keys(notificationsData).length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-400">
            {t("No notifications available")}
          </div>
        ) : (
          Object.entries(notificationsData).map(
            ([dateGroup, notifications]) => {
              const filtered = filterNotifications(notifications);
              if (filtered.length === 0) return null;

              return (
                <div key={dateGroup} className="rounded-2xl">
                  {/* Date Group */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    {dateGroup}
                  </div>
                  <div className="rounded-2xl bg-blue-200">
                    {filtered.map((n) => (
                      <div
                        key={n.notification_id}
                        className={`flex items-start gap-2 sm:gap-3 px-2 py-2 sm:px-4 sm:py-3 cursor-pointer border-b border-gray-100 transition ${
                          n.read_status === "unread"
                            ? "bg-appcolor"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          refetch();
                          close();
                          // handleNotificationClick(n);

                          if (n.type === "job-application") {
                            if (userType === "employee") {
                              navigate("/dashboard/applications", {
                                state: { index: n.tab_index },
                              });
                            } else {
                              navigate("/dashboard/applicants");
                            }
                          } else if (n.type === "review") {
                            if (userType === "employee") {
                              navigate("/dashboard/work-history");
                            } else {
                              navigate("/dashboard/job-history");
                            }
                          }
                        }}
                      >
                        {/* Left Icon / Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src="/assets/Frame 1171275601.png"
                            alt="icon"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 break-words whitespace-normal">
                            <span className="font-medium">{n.title}</span> –
                            <span className="text-sm">{n.message}</span>
                          </p>
                        </div>

                        {/* Time + Unread Dot */}
                        <div className="flex flex-col items-end gap-1 whitespace-nowrap">
                          <span className="text-xs">{n.timestamp}</span>
                          {n.read_status === "unread" && (
                            <span className="w-2 h-2 bg-black rounded-full"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
// import React from "react";
// import { BellIcon } from "@heroicons/react/24/outline";
// import { useUpdateNotificationStatusMutation } from "../../services/faqApiSlice";
// import { useAuthContext } from "../../contexts/auth/context";
// import Spinner from "../ui/Spinner";
// import { useNavigate } from "react-router-dom";
// import { handleSubmit } from "../../utils/useHandleSubmit";
// import { useTranslation } from "react-i18next";

// const NotificationsPage = ({
//   data,
//   isLoading,
//   activeFilter,
//   setActiveFilter,
//   refetch,
//   close,
// }) => {
//   const { user } = useAuthContext();
//   const userType = localStorage.getItem("userType");
//   const navigate = useNavigate();
//   const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
//   const { t } = useTranslation();

//   const notificationsData = data?.data || {};

//   const filterNotifications = (notifications) => {
//     if (activeFilter === "all") return notifications;
//     return notifications.filter((n) =>
//       activeFilter === "read"
//         ? n.read_status === "read"
//         : n.read_status === "unread"
//     );
//   };

//   if (isLoading) return <Spinner />;

//   const handleNotificationClick = async (n) => {
//     handleSubmit({
//       apiCall: updateNotificationStatus,
//       values: { notification_id: n.notification_id },
//       showToast: false,
//       refetch: refetch,
//     });
//   };

//   return (
//     <div className="mx-auto rounded-2xl shadow-lg overflow-hidden w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl h-[500px] z-50">
//       {/* Header */}
//       <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
//         <h1 className="text-lg font-semibold text-gray-900">
//           {t("Notifications")}
//         </h1>
//         <BellIcon className="h-5 w-5 text-gray-500" />
//       </div>

//       {/* Filter Tabs */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         <div className="flex bg-gray-200 rounded-full p-1">
//           {["all", "read", "unread"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`flex-1 px-4 py-1.5 rounded-full text-sm font-medium transition ${
//                 activeFilter === filter
//                   ? "bg-black text-white"
//                   : "text-gray-600"
//               }`}
//             >
//               {t(filter.charAt(0).toUpperCase() + filter.slice(1))}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div className="max-h-[380px] overflow-y-auto px-1 sm:px-2 md:px-4">
//         {Object.keys(notificationsData).length === 0 ? (
//           <div className="px-4 py-8 text-center text-gray-400">
//             {t("No notifications available")}
//           </div>
//         ) : (
//           Object.entries(notificationsData).map(
//             ([dateGroup, notifications]) => {
//               const filtered = filterNotifications(notifications);
//               if (filtered.length === 0) return null;

//               return (
//                 <div key={dateGroup} className="rounded-2xl">
//                   {/* Date Group */}
//                   <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
//                     {dateGroup}
//                   </div>
//                   <div className="rounded-2xl bg-blue-200">
//                     {filtered.map((n) => (
//                       <div
//                         key={n.notification_id}
//                         className={`flex items-start gap-2 sm:gap-3 px-2 py-2 sm:px-4 sm:py-3 cursor-pointer border-b border-gray-100 transition ${
//                           n.read_status === "unread"
//                             ? "bg-appcolor"
//                             : "bg-white hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           refetch();
//                           close();
//                           handleNotificationClick(n);

//                           if (n.type === "job-application") {
//                             if (userType === "employee") {
//                               navigate("/dashboard/applications", {
//                                 state: { index: n.tab_index },
//                               });
//                             } else {
//                               navigate("/dashboard/applicants");
//                             }
//                           } else if (n.type === "review") {
//                             if (userType === "employee") {
//                               navigate("/dashboard/work-history");
//                             } else {
//                               navigate("/dashboard/job-history");
//                             }
//                           }
//                         }}
//                       >
//                         {/* Left Icon / Avatar */}
//                         <div className="flex-shrink-0">
//                           <img
//                             src="/assets/Frame 1171275601.png"
//                             alt="icon"
//                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//                           />
//                         </div>

//                         {/* Content */}
//                         <div className="flex-1 min-w-0">
//                           <p className="text-gray-800 break-words whitespace-normal">
//                             <span className="font-medium">{n.title}</span> –
//                             <span className="text-sm">{n.message}</span>
//                           </p>
//                         </div>

//                         {/* Time + Unread Dot */}
//                         <div className="flex flex-col items-end gap-1 whitespace-nowrap">
//                           <span className="text-xs">{n.timestamp}</span>
//                           {n.read_status === "unread" && (
//                             <span className="w-2 h-2 bg-black rounded-full"></span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             }
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;
// import React, { use, useState } from "react";
// import { BellIcon } from "@heroicons/react/24/outline";
// import {
//   useGetEmployeeNotificationsQuery,
//   useGetEmployerNotificationsQuery,
// } from "../../services/authApiSlice";
// import { useAuthContext } from "../../contexts/auth/context";
// import Spinner from "../ui/Spinner";
// import { useNavigate } from "react-router-dom";
// import { useUpdateNotificationStatusMutation } from "../../services/faqApiSlice";
// import { handleSubmit } from "../../utils/useHandleSubmit";

// const NotificationsPage = ({
//   data,
//   isLoading,
//   activeFilter,
//   setActiveFilter,
//   refetch,
//   close,
// }) => {
//   const { user } = useAuthContext();
//   const userType = localStorage.getItem("userType");
//   console.log("userType", userType, user);
//   const navigate = useNavigate();
//   const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
//   // ✅ Decide which hook to call based on userType

//   // const { data, isLoading } =
//   //   userType === "employee"
//   //     ? useGetEmployeeNotificationsQuery({
//   //         employee_id: user?.id,
//   //         status: activeFilter,
//   //       })
//   //     : useGetEmployerNotificationsQuery({
//   //         employer_id: user?.id,
//   //         status: activeFilter,
//   //       });

//   // ✅ Extract notifications safely
//   const notificationsData = data?.data || {};

//   // ✅ Filter by Read/Unread
//   const filterNotifications = (notifications) => {
//     if (activeFilter === "all") return notifications;
//     return notifications.filter((n) =>
//       activeFilter === "read"
//         ? n.read_status === "read"
//         : n.read_status === "unread"
//     );
//   };
//   if (isLoading) return <Spinner />;
//   const handleNotificationClick = async (n) => {
//     handleSubmit({
//       apiCall: updateNotificationStatus,
//       values: { notification_id: n.notification_id },
//       showToast: false,
//       refetch: refetch,
//     });
//   };
//   return (
//     <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden w-[450px] h-[500px] z-50">
//       {/* Header */}
//       <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
//         <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
//         <BellIcon className="h-5 w-5 text-gray-500" />
//       </div>

//       {/* Filter Tabs */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         <div className="flex bg-gray-200 rounded-full p-1">
//           {["all", "read", "unread"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`flex-1 px-4 py-1.5 rounded-full text-sm font-medium transition ${
//                 activeFilter === filter
//                   ? "bg-black text-white"
//                   : "text-gray-600"
//               }`}
//             >
//               {filter.charAt(0).toUpperCase() + filter.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div className="max-h-[380px] overflow-y-auto px-2 ">
//         {Object.keys(notificationsData).length === 0 ? (
//           <div className="px-4 py-8 text-center text-gray-400">
//             No notifications available
//           </div>
//         ) : (
//           Object.entries(notificationsData).map(
//             ([dateGroup, notifications]) => {
//               const filtered = filterNotifications(notifications);
//               if (filtered.length === 0) return null;

//               return (
//                 <div key={dateGroup} className="rounded-2xl">
//                   {/* Date Group */}
//                   <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 ">
//                     {dateGroup}
//                   </div>
//                   <div className="rounded-2xl ">
//                     {filtered.map((n) => (
//                       <div
//                         key={n.notification_id}
//                         className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b  border-gray-100 transition ${
//                           n.read_status === "unread"
//                             ? "bg-appcolor"
//                             : "bg-white hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           refetch();
//                           close();
//                           handleNotificationClick(n);
//                           // tab_index
//                           if (n.type === "job-application") {
//                             if (userType === "employee") {
//                               navigate("/dashboard/applications", {
//                                 state: { index: n.tab_index },
//                               });
//                             } else {
//                               navigate("/dashboard/applicants");
//                             }
//                           } else if (n.type === "review") {
//                             if (userType === "employee") {
//                               navigate("/dashboard/work-history");
//                             } else {
//                               navigate("/dashboard/job-history");
//                             }
//                           }
//                         }}
//                       >
//                         {/* Left Icon / Avatar */}
//                         <div className="flex-shrink-0">
//                           <img
//                             src="/assets/Frame 1171275601.png"
//                             alt="icon"
//                             className="w-10 h-10 rounded-full object-cover"
//                           />
//                         </div>

//                         {/* Content */}
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm text-gray-800">
//                             <span className="font-medium">{n.title}</span> –{" "}
//                             {n.message}
//                           </p>
//                         </div>

//                         {/* Time + Unread Dot */}
//                         <div className="flex flex-col items-end gap-1 whitespace-nowrap">
//                           <span className="text-xs ">{n.timestamp}</span>
//                           {n.read_status === "unread" && (
//                             <span className="w-2 h-2 bg-black rounded-full"></span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             }
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;
// import React, { useState } from "react";
// import { BellIcon } from "@heroicons/react/24/outline";
// import { useGetEmployeeNotificationsQuery } from "../../services/authApiSlice";
// import { useAuthContext } from "../../contexts/auth/context";

// const NotificationsPage = () => {
//   const [activeFilter, setActiveFilter] = useState("all");
//   const { user } = useAuthContext();

//   // ✅ Fetch notifications
//   const { data, isLoading } = useGetEmployeeNotificationsQuery({
//     employee_id: user?.id,
//     status: activeFilter,
//   });

//   // ✅ Extract notifications safely
//   const notificationsData = data?.data || {};

//   // ✅ Filter notifications by read/unread
//   const filterNotifications = (notifications) => {
//     if (activeFilter.toLowerCase() === "all") return notifications;
//     return notifications.filter((n) =>
//       activeFilter.toLowerCase() === "read"
//         ? n.read_status === "read"
//         : n.read_status === "unread"
//     );
//   };

//   const handleNotificationClick = (id) => {
//     console.log("Clicked notification:", id);
//     // TODO: Mark notification as read (API call if needed)
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
//         <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
//         <BellIcon className="h-5 w-5 text-gray-500" />
//       </div>

//       {/* Filter Tabs */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         <div className="flex bg-gray-200 rounded-full p-1">
//           {["all", "read", "unread"].map((filter) => (
//             <button
//               key={filter}
//               onClick={() => setActiveFilter(filter)}
//               className={`flex-1 px-4 py-1.5 rounded-full text-sm font-medium transition ${
//                 activeFilter === filter
//                   ? "bg-black text-white"
//                   : "text-gray-600"
//               }`}
//             >
//               {filter.charAt(0).toUpperCase() + filter.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div className="max-h-[420px] overflow-y-auto p-3">
//         {isLoading ? (
//           <div className="px-4 py-8 text-center text-gray-500">
//             Loading notifications...
//           </div>
//         ) : Object.keys(notificationsData).length === 0 ? (
//           <div className="px-4 py-8 text-center text-gray-400">
//             No notifications available
//           </div>
//         ) : (
//           Object.entries(notificationsData).map(
//             ([dateGroup, notifications]) => {
//               const filtered = filterNotifications(notifications);
//               if (filtered.length === 0) return null;

//               return (
//                 <div key={dateGroup}>
//                   {/* Date Group Header */}
//                   <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
//                     {dateGroup}
//                   </div>

//                   {filtered.map((n) => (
//                     <div
//                       key={n.notification_id}
//                       onClick={() => handleNotificationClick(n.notification_id)}
//                       className={`flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 transition ${
//                         n.read_status === "unread"
//                           ? "bg-appcolor"
//                           : "bg-white hover:bg-gray-50"
//                       }`}
//                     >
//                       {/* Left Icon / Avatar */}
//                       <div className="flex-shrink-0">
//                         <img
//                           src="/assets/Frame 1171275601.png"
//                           alt="avatar"
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                       </div>

//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm text-gray-800">
//                           {/* Bold some keywords */}
//                           <span
//                             dangerouslySetInnerHTML={{ __html: n.message }}
//                           />
//                         </p>
//                       </div>

//                       {/* Time + Unread Dot */}
//                       <div className="flex flex-col items-end gap-1 whitespace-nowrap">
//                         <span className="text-xs text-gray-500">
//                           {n.timestamp}
//                         </span>
//                         {n.read_status === "unread" && (
//                           <span className="w-2 h-2 bg-black rounded-full"></span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               );
//             }
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;
