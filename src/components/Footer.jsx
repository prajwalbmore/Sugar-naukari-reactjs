import React, { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/landingpage/Fastaff.png";
import {
  useGetWebsiteGeneralDataQuery,
  useNewsletterMutation,
} from "../services/faqApiSlice";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { data } = useGetWebsiteGeneralDataQuery();
  const [newsletter, { isLoading }] = useNewsletterMutation();
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleNewsletter = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email) {
      toast.error(t("Please enter your email address"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error(t("Please enter a valid email address"));
      return;
    }

    try {
      const response = await newsletter({ email }).unwrap();

      if (response?.status === "success") {
        toast.success(
          response?.message || "Successfully subscribed to newsletter!"
        );
        setEmail(""); // Clear the input field
      } else {
        toast.error(response?.message || "Failed to subscribe");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      const errorMessage =
        error?.data?.message || "Failed to subscribe. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <footer className="text-black py-10 bg-footer px-0 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter Section */}
        <div className="bg-dark text-white md:rounded-3xl lg:rounded-3xl py-10 px-6 sm:px-10 md:px-16 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">
                {t("Keep up with the latest")}
              </h1>
              <p className="text-sm text-gray-300 mt-2 max-w-sm">
                {t(
                  "Join our newsletter to stay up to date on features and releases."
                )}
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Newsletter Form */}
              <form
                onSubmit={handleNewsletter}
                className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <input
                  type="email"
                  placeholder={t("Enter your email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-full bg-[#FFFFFF1A] text-white placeholder-white focus:outline-none w-full sm:w-64"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-appcolor text-black font-semibold px-6 py-3 rounded-full w-full sm:w-auto hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("Subscribing...") : t("Subscribe")}
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-8 border-gray-300" />

          {/* Middle Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
            {/* Logo + Socials */}
            <div className="flex flex-col items-center lg:items-start">
              <Link to="/" className="text-2xl font-bold">
                <img src={logo} alt="Fastaff Logo" className="h-10" />
              </Link>
              <div className="flex space-x-3 mt-4 text-black">
                <button
                  className="p-2 rounded-full bg-primary hover:bg-appcolor hover:text-black transition"
                  onClick={() => window.open(data?.data?.insta_link, "_blank")}
                >
                  <Instagram size={18} />
                </button>
                <button
                  className="p-2 rounded-full bg-primary hover:bg-appcolor hover:text-black transition"
                  onClick={() => window.open(data?.data?.fb_link, "_blank")}
                >
                  <Facebook size={18} />
                </button>
                {/* <a
                  href="#"
                  className="p-2 rounded-full bg-primary hover:bg-appcolor hover:text-black transition"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-primary hover:bg-appcolor hover:text-black transition"
                >
                  <Linkedin size={18} />
                </a> */}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-center lg:text-left">
              <Link to="/" className="hover:text-[#FFDE59]">
                {t("Home")}
              </Link>
              <Link to="/about" className="hover:text-[#FFDE59]">
                {t("About us")}
              </Link>
              <Link to="/students" className="hover:text-[#FFDE59]">
                {t("How it works")}
              </Link>
              <Link to="/jobs" className="hover:text-[#FFDE59]">
                {t("Jobs")}
              </Link>
              <Link to="/contact" className="hover:text-[#FFDE59]">
                {t("Contact Us")}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-gray-600 gap-2">
          <p>
            © {new Date().getFullYear()} {t("Fastaff. All Rights Reserved")}
          </p>
          <div className="flex space-x-4">
            <Link to="/terms-condition">{t("Terms and Conditions")}</Link>
            <span>|</span>
            <Link to="/privacy-policy">{t("Privacy Policy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// import React from "react";
// import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react";
// import { Link } from "react-router-dom";
// import logo from "../assets/landingpage/Fastaff.png";

// export default function Footer() {
//   return (
//     <footer className="text-black py-10 bg-footer px-24">
//       <div className="max-w-9xl mx-auto">
//         {/* Top Newsletter Section */}
//         <div className="bg-dark text-white rounded-3xl py-10 px-20">
//           <div className=" flex flex-col md:flex-row justify-between items-start md:items-center ">
//             <div>
//               <h1 className="text-2xl font-semibold">
//                 Keep up with the latest
//               </h1>
//               <p className="text-sm text-gray-300 mt-2">
//                 Join our newsletter to stay upto date on features and releases.
//               </p>
//             </div>

//             {/* Newsletter Form */}
//             <div className="mt-6 md:mt-0 flex items-center space-x-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded-full bg-[#FFFFFF1A] text-white placeholder-white focus:outline-none w-64 py-3"
//               />
//               <button className="bg-appcolor text-black font-semibold px-5 py-2 rounded-full">
//                 Subscribe
//               </button>
//             </div>
//           </div>

//           {/* Divider */}
//           <hr className="my-6 border-gray-300" />

//           {/* Middle Section */}
//           <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
//             {/* Logo + Socials */}
//             <div className="flex flex-col items-center md:items-start">
//               <Link to="/" className="text-2xl font-bold">
//                 <img src={logo} alt="Fastaff Logo" className="h-10" />
//               </Link>
//               <div className="flex space-x-2 mt-3 text-black">
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-primary hover:bg:appcolor hover:text-black transition"
//                 >
//                   <Instagram size={18} />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-primary hover:bg:appcolor hover:text-black transition"
//                 >
//                   <Facebook size={18} />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-primary hover:bg:appcolor hover:text-black transition"
//                 >
//                   <Twitter size={18} />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-primary hover:bg:appcolor hover:text-black transition"
//                 >
//                   <Linkedin size={18} />
//                 </a>
//               </div>
//             </div>

//             {/* Links */}
//             <div className="flex flex-wrap justify-between space-x-24  mt-6 md:mt-2 mr-6">
//               <a href="#" className="hover:text-[#FFDE59]">
//                 Home
//               </a>
//               <a href="#" className="hover:text-[#FFDE59]">
//                 About us
//               </a>
//               <a href="#" className="hover:text-[#FFDE59]">
//                 How It Works
//               </a>
//               <a href="#" className="hover:text-[#FFDE59]">
//                 Jobs
//               </a>
//               <a href="#" className="hover:text-[#FFDE59]">
//                 Contact us
//               </a>
//               <a href="#" className="hover:text-[#FFDE59]">
//                 FAQs
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-600">
//           <p>© {new Date().getFullYear()} Fastaff. All Rights Reserved</p>
//           <div className="flex space-x-4 mt-2 md:mt-0">
//             <a href="#">Terms and Conditions</a>
//             <span>|</span>
//             <a href="#">Privacy Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
