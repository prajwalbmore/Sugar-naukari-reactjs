import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/landingpage/Fastaff.png";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../contexts/auth/context";
import Button from "./ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuthContext();
  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("i18nextLng", e.target.value); // 👈 explicitly save if needed
  };
  const navLinks = [
    { to: "/", label: "Home" },
    // { to: "/about", label: "About" },
    // {
    //   label: "How it works",
    //   dropdown: [
    //     { to: "/students", label: "Students" },
    //     { to: "/enterprises", label: "Enterprises" },
    //   ],
    // },
    { to: "/jobs", label: "Jobs" },
    // { to: "/pricing", label: "Pricing" },
    { to: "/contact", label: "Contact Us" },
    // { to: "/faq", label: "FAQ" },
  ];
  console.log("demo", i18n.language);
  return (
    <header className="bg-primary sticky top-0 z-50 ">
      <nav className="bg-dark text-white shadow-md ">
        <div className="flex justify-between items-center py-3 px-6 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* <img src={logo} alt="Fastaff Logo" className="h-8" /> */}
            SugarNaukri
          </Link>

          {/* lg screens → menu */}
          <div className="hidden lg:flex space-x-10 relative">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  <button className="flex items-center hover:text-emerald-500">
                    {t(link.label)}
                    {/* <ChevronDown size={16} className="ml-1" /> */}
                  </button>

                  {/* dropdown menu */}
                  <div className="absolute top-full left-0 mt-2 bg-white text-dark rounded-lg shadow-md w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.dropdown.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                          `block px-4 py-2 rounded-md ${
                            isActive ? "bg-emerald-500" : ""
                          }`
                        }
                      >
                        {t(label)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    isActive ? "text-emerald-500" : "hover:text-emerald-500"
                  }
                >
                  {t(link.label)}
                </NavLink>
              )
            )}
          </div>
          {/* Language Selector */}
          <div className="hidden lg:flex space-x-4">
            <select
              value={i18n.language}
              onChange={handleChange}
              className="rounded-lg px-2 py-1 bg-transparent "
            >
              <option value="en" className="text-black">
                EN
              </option>
              <option value="fr" className="text-black">
                FR
              </option>
            </select>
            {/* lg screens → auth */}
            {!user ? (
              <>
                <Link
                  to="/login"
                  state={"/login"}
                  className="text-emerald-500 px-4 py-2 rounded-lg shadow font-bold"
                >
                  {t("Login")}
                </Link>
                <Link
                  to="/register"
                  state={"/register"}
                  className=" bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black px-6 lg:px-10 py-2 rounded-full shadow hover:opacity-90"
                >
                  {t("Register Now")}
                </Link>
              </>
            ) : (
              <>
                <Button
                  onClick={logout}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-black px-6 lg:px-10 py-2 rounded-full shadow hover:opacity-90"
                >
                  {t("Log Out")}
                </Button>
                <Link
                  to="/join-as"
                  state={"/login"}
                  className="text-emerald-500 px-4 py-2 rounded-lg shadow"
                >
                  {t("My Account")}
                </Link>
              </>
            )}
          </div>

          {/* mobile toggle */}
          <button
            className="block lg:hidden text-white relative z-50"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Drawer (mobile) */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-dark text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-10 space-y-6">
          {/* Logo inside drawer */}
          <Link to="/" onClick={() => setIsOpen(false)} className="mb-6">
            <img src={logo} alt="Fastaff Logo" className="h-10" />
          </Link>

          {/* Nav Links */}
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col space-y-2">
                  <span className="font-semibold">{link.label}</span>
                  <div className="ml-4 flex flex-col space-y-2">
                    {link.dropdown.map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          isActive
                            ? "text-appcolor font-semibold"
                            : "hover:text-appcolor"
                        }
                      >
                        {t(label)}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-appcolor font-semibold"
                      : "hover:text-appcolor"
                  }
                >
                  {t(link.label)}
                </NavLink>
              )
            )}
          </div>

          {/* Auth Buttons */}
          <div className="mt-auto flex justify-between space-y-3 pt-6 border-t border-gray-700">
            <select
              value={i18n.language}
              onChange={handleChange}
              className="rounded-lg px-2 py-1 bg-transparent "
            >
              <option value="en" className="text-black">
                EN
              </option>
              <option value="fr" className="text-black">
                FR
              </option>
            </select>
            {!user ? (
              <>
                <Link
                  to="/join-as"
                  state={"/login"}
                  className="text-appcolor px-4 py-2 rounded-lg shadow"
                >
                  {t("Login")}
                </Link>
                <Link
                  to="/join-as"
                  state={"/register"}
                  className="font-semibold bg-appcolor text-black px-6 lg:px-10 py-2 rounded-full shadow hover:opacity-90"
                >
                  {t("Register Now")}
                </Link>
              </>
            ) : (
              <>
                <Button
                  onClick={logout}
                  className="font-semibold bg-appcolor text-black px-6 lg:px-10 py-2 rounded-full shadow hover:opacity-90"
                >
                  {t("Log Out")}
                </Button>
                <Link
                  to="/join-as"
                  state={"/login"}
                  className="text-appcolor px-4 py-2 rounded-lg shadow"
                >
                  {t("My Account")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import logo from "../assets/landingpage/Fastaff.png";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/how-it-works", label: "How it works" },
//     { to: "/jobs", label: "Jobs" },
//     { to: "/pricing", label: "Pricing" },
//     { to: "/contact", label: "Contact" },
//     { to: "/faq", label: "FAQ" },
//   ];

//   return (
//     <header className="bg-primary sticky top-0 z-50 px-4 md:px-8 lg:px-24">
//       <nav className="bg-dark text-white shadow-md rounded-full mt-4 md:mt-6">
//         <div className="flex justify-between items-center py-3 px-6 md:px-8">
//           {/* Logo */}
//           <Link to="/" className="flex items-center">
//             <img src={logo} alt="Fastaff Logo" className="h-8" />
//           </Link>

//           {/* lg screens → show menu normally */}
//           <div className="hidden lg:flex space-x-6">
//             {navLinks.map(({ to, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 className={({ isActive }) =>
//                   isActive ? "text-appcolor" : "hover:text-appcolor"
//                 }
//               >
//                 {label}
//               </NavLink>
//             ))}
//           </div>

//           {/* lg screens → show auth buttons */}
//           <div className="hidden lg:flex space-x-4">
//             <Link
//               to="/login"
//               className="text-appcolor px-4 py-2 rounded-lg shadow"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="font-semibold bg-appcolor text-black px-6 lg:px-10 py-2 rounded-full shadow hover:opacity-90"
//             >
//               Register Now
//             </Link>
//           </div>

//           {/* md & sm → show toggle button */}
//           <button
//             className="block lg:hidden text-white relative z-50"
//             onClick={() => setIsOpen((prev) => !prev)}
//             aria-label="Toggle Menu"
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </nav>

//       {/* Drawer menu (only sm & md) */}
//       <div
//         className={`lg:hidden fixed top-0 left-0 w-full h-full bg-dark text-white z-40 transform transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col h-full px-6 py-10 space-y-6">
//           {/* Logo inside drawer */}
//           <Link to="/" onClick={() => setIsOpen(false)} className="mb-6">
//             <img src={logo} alt="Fastaff Logo" className="h-10" />
//           </Link>

//           {/* Nav Links */}
//           <div className="flex flex-col space-y-4">
//             {navLinks.map(({ to, label }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 onClick={() => setIsOpen(false)}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-appcolor font-semibold"
//                     : "hover:text-appcolor"
//                 }
//               >
//                 {label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Auth Buttons */}
//           <div className="mt-auto flex flex-col space-y-3 pt-6 border-t border-gray-700">
//             <Link
//               to="/login"
//               onClick={() => setIsOpen(false)}
//               className="text-appcolor px-4 py-2 rounded-lg shadow text-center"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               onClick={() => setIsOpen(false)}
//               className="font-semibold bg-appcolor text-black px-6 py-2 rounded-full shadow hover:opacity-90 text-center"
//             >
//               Register Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
