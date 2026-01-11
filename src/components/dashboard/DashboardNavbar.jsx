import {
  BellIcon,
  EnvelopeIcon,
  MapPinIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../../constants/menuItems";
import Button from "../ui/Button";
import { useAuthContext } from "../../contexts/auth/context";
import { useDisclosure } from "../../hooks/useDisclosure";
import { motion, AnimatePresence } from "framer-motion";
import NotificationsPage from "./NotificationsPage";
import {
  useGetEmployeeNotificationsQuery,
  useGetEmployerNotificationsQuery,
} from "../../services/authApiSlice";
import Spinner from "../ui/Spinner";
import { useTranslation } from "react-i18next";
import Modal from "../ui/Modal";
import CreateJobModal from "../../pages/dashboard/empyoerdashboard/post-job/CreateJobModal";
import { IMAGEBASEURL } from "../../constants/app.constant";

const DashboardNavbar = ({ active, setActive }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value); // automatically updates localStorage
  };
  const userType = localStorage.getItem("userType");
  const { user } = useAuthContext();
  // console.log("user", user);
  const [isOpen, { open, close, toggle }] = useDisclosure(false);
  const [isOpenform, { open: openform, close: closeform }] =
    useDisclosure(false);
  const dropdownRef = useRef(null);
  const { data, isLoading, refetch } =
    userType === "employee"
      ? useGetEmployeeNotificationsQuery({
          employee_id: user?.id,
          status: activeFilter,
        })
      : useGetEmployerNotificationsQuery({
          employer_id: user?.id,
          status: activeFilter,
        });
  const activeItem = menuItems.find((item) =>
    item.end
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path)
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);
  if (isLoading) {
    return <Spinner />;
  }
  const unreadCount = Object.values(data?.data || {})
    .flat()
    .filter((n) => n.read_status === "unread").length;
  console.log("user", user);
  return (
    <>
      <div className="bg-white shadow px-2 sm:px-4 md:px-6 lg:px-14 py-3 sm:py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setActive(!active)}
            className="sm:hidden p-2 rounded-md border border-gray-300"
          >
            <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {user?.raw?.role === "employee" ? (
            <h2 className="font-bold text-lg sm:text-xl md:text-xl lg:text-2xl">
              {t(activeItem?.name) ||
                (location.pathname === "/dashboard/nearby-jobs" && t("Map")) ||
                t("Dashboard")}
            </h2>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <img
                src={
                  `${IMAGEBASEURL}/${user?.raw?.companyLogo}` ||
                  "/assets/landingpage/logo/Company Logo.png"
                }
                alt="Company Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-contain rounded-full"
              />

              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-800">
                  {user?.raw?.companyName || t("Company Name")}
                </h1>
                {user?.raw?.is_verified && (
                  <img
                    src="/assets/landingpage/Icons/CloudCheck.png"
                    alt="Verified"
                    className="h-4 w-4"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
          {/* Post a Job */}
          {/* {user.role === "employer" && (
            <Button
              className="bg-dark px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm md:text-sm lg:text-base"
              onClick={() => {
                openform();
                // if (user?.is_subscription_active) {
                // navigate("/dashboard/post-job");
                // } else {
                //   navigate("/dashboard/subscription");
                // }
              }}
            >
              {t("Post a job")}
            </Button>
          )} */}

          {/* Language Selector */}
          <select
            value={i18n.language}
            onChange={handleChange}
            className="border rounded-lg px-2 py-1"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>

          {/* MapPin for employee */}
          {user?.raw.role === "employee" && (
            <Button
              className="p-1 sm:p-2 border-2 border-gray-300 rounded-full"
              onClick={() => navigate("/dashboard/nearby-jobs")}
            >
              <MapPinIcon
                className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6"
                strokeWidth={2}
              />
            </Button>
          )}

          {/* Notifications */}
          {/* <Button
            className="relative p-1 sm:p-2 border-2 border-gray-300 rounded-full flex items-center justify-center"
            onClick={toggle}
          >
            <BellIcon
              className="h-4 w-4 sm:h-5 md:h-5 lg:h-6 lg:w-6"
              strokeWidth={2}
            />

            {/* Unread count badge 
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button> */}

          {/* Profile */}
          <img
            src={`${IMAGEBASEURL}/${user?.raw.profile_photo}`}
            alt={user?.raw.name}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer"
            onClick={() => {
              if (userType === "employee") {
                navigate("/dashboard/personal-info");
              } else {
                navigate("/dashboard/company-information");
              }
            }}
          />
          <h1 className="hidden sm:block text-sm sm:text-base md:text-base lg:text-lg font-bold">
            {user?.raw.fullName}
          </h1>
        </div>
      </div>

      {/* Notifications dropdown */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
        absolute 
        right-5 sm:right-8 md:right-10 lg:right-20
        top-[60px] sm:top-[65px] lg:top-[70px]
        w-[300px] sm:w-[400px] lg:w-[450px]
        h-[450px] sm:h-[480px] lg:h-[500px]
        bg-white shadow-lg rounded-xl border border-gray-200 z-50
      "
          >
            <NotificationsPage
              data={data}
              isLoading={isLoading}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              refetch={refetch}
              close={close}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNavbar;
// import {
//   BellIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";
// import React, { useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { menuItems } from "../../constants/menuItems";
// import Button from "../ui/Button";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useDisclosure } from "../../hooks/useDisclosure";
// import { motion, AnimatePresence } from "framer-motion";
// import NotificationsPage from "./NotificationsPage";

// const DashboardNavbar = ({ active, setActive }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuthContext();
//   const [isOpen, { open, close }] = useDisclosure(false);
//   const dropdownRef = useRef(null);

//   const activeItem = menuItems.find((item) =>
//     item.end
//       ? location.pathname === item.path
//       : location.pathname.startsWith(item.path)
//   );

//   // Close when clicking outside notifications
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         close();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [close]);

//   return (
//     <>
//       <div className="bg-white shadow px-4 sm:px-14 py-4 flex justify-between items-center">
//         {/* Left Section */}
//         <div className="flex items-center gap-3">
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setActive(!active)}
//             className="sm:hidden p-2 rounded-md border border-gray-300"
//           >
//             <Bars3Icon className="h-6 w-6" />
//           </button>

//           {user.user_type === "employee" ? (
//             <h2 className="font-bold text-xl sm:text-2xl">
//               {activeItem?.name || "Dashboard"}
//             </h2>
//           ) : (
//             <div className="flex items-center gap-3">
//               <img
//                 src="/assets/landingpage/logo/Company Logo.png"
//                 alt="Company Logo"
//                 className="h-12 object-contain"
//               />
//               <div>
//                 <p className="text-gray-500 text-sm">Company</p>
//                 <h1 className="text-lg font-semibold">Nomad</h1>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center space-x-2 sm:space-x-4">
//           {user.user_type === "employer" && (
//             <Button
//               className="bg-dark px-6 py-2 rounded-full text-white"
//               onClick={() => navigate("/dashboard/post-job")}
//             >
//               Post a job
//             </Button>
//           )}

//           <select className="border rounded-lg px-2 py-1 text-sm sm:text-base">
//             <option>EN</option>
//             <option>FR</option>
//           </select>

//           <Button className="p-2 border-2 border-gray-300 rounded-full hidden sm:inline-flex">
//             <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
//           </Button>

//           {user.user_type === "employee" && (
//             <Button
//               className="p-2 border-2 border-gray-300 rounded-full hidden md:inline-flex"
//               onClick={() => navigate("/dashboard/nearby-jobs")}
//             >
//               <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
//             </Button>
//           )}

//           <Button
//             className="p-2 border-2 border-gray-300 rounded-full hidden lg:inline-flex"
//             onClick={isOpen ? close : open}
//           >
//             <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
//           </Button>

//           <img
//             src={user.profile_image}
//             alt={user.name}
//             className="w-12 h-12 rounded-full"
//           />
//           <h1 className="text-lg sm:text-lg font-bold hidden sm:block">
//             {user.name}
//           </h1>
//         </div>
//       </div>

//       {/* Notifications dropdown */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             ref={dropdownRef}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute right-[20px] top-[70px] w-[350px] sm:w-[450px] h-[500px] bg-white shadow-lg rounded-xl border border-gray-200 z-10"
//           >
//             <NotificationsPage />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default DashboardNavbar;
// import {
//   BellIcon,
//   EnvelopeIcon,
//   MapPinIcon,
// } from "@heroicons/react/24/outline";
// import React, { useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { menuItems } from "../../constants/menuItems";
// import Button from "../ui/Button";
// import { useAuthContext } from "../../contexts/auth/context";
// import { useDisclosure } from "../../hooks/useDisclosure";
// import { motion, AnimatePresence } from "framer-motion";
// import NotificationsPage from "./NotificationsPage";

// const DashboardNavbar = ({ active, setActive }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuthContext();
//   const [isOpen, { open, close }] = useDisclosure(false);
//   const activeItem = menuItems.find((item) =>
//     item.end
//       ? location.pathname === item.path
//       : location.pathname.startsWith(item.path)
//   );
//   const dropdownRef = useRef(null);

//   // Close when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         close();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [close]);
//   return (
//     <>
//       <div className="bg-white shadow px-14 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
//         <div className=" flex items-center space-x-2 sm:space-x-4">
//           {user.user_type === "employee" ? (
//             <h2 className="font-bold text-xl sm:text-2xl">
//               {activeItem?.name || "Dashboard"}
//             </h2>
//           ) : (
//             <div className="flex items-center gap-3">
//               <img
//                 src="/assets/landingpage/logo/Company Logo.png"
//                 alt="Company Logo"
//                 className="h-12 object-contain"
//               />
//               <div>
//                 <p className="text-gray-500 text-sm">Company</p>
//                 <h1 className="text-lg font-semibold">Nomad</h1>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex items-center space-x-2 sm:space-x-4">
//           {user.user_type === "employer" && (
//             <Button
//               className="bg-dark px-6 py-2 rounded-full text-white"
//               onClick={() => navigate("/dashboard/post-job")}
//             >
//               Post a job
//             </Button>
//           )}
//           <select className="border rounded-lg px-2 py-1 text-sm sm:text-base">
//             <option>EN</option>
//             <option>FR</option>
//           </select>

//           <Button className="p-2 border-2 border-gray-300 rounded-full hidden sm:inline-flex">
//             <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
//           </Button>
//           {user.user_type === "employee" && (
//             <Button
//               className="p-2 border-2 border-gray-300 rounded-full hidden md:inline-flex"
//               onClick={() => navigate("/dashboard/nearby-jobs")}
//             >
//               <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
//             </Button>
//           )}

//           <Button
//             className="p-2 border-2 border-gray-300 rounded-full hidden lg:inline-flex"
//             onClick={isOpen ? close : open} // toggle
//           >
//             <BellIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
//           </Button>

//           <img
//             src={user.profile_image}
//             alt={user.name}
//             className="w-12 h-12  rounded-full"
//           />
//           <h1 className="text-lg sm:text-lg font-bold hidden sm:block">
//             {user.name}
//           </h1>
//         </div>
//       </div>
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             ref={dropdownRef}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute right-[240px] top-[70px] w-[450px] h-[500px] bg-white shadow-lg rounded-xl border border-gray-200 z-10"
//           >
//             <NotificationsPage />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default DashboardNavbar;
