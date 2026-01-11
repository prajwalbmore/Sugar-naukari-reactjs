import { Sparkle } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const Badge = ({
  text = "Badge",
  icon = <Sparkle fill="#594E1F" size={20} />,
  bgColor = "bg-[#FFF5CC]",
  textColor = "text-[#594E1F]",
  rounded = "rounded-full",
  padding = "px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-3",
  className = "",
  isHome = false,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${bgColor} ${textColor} ${rounded} ${padding} inline-flex items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-md font-medium mb-3 ${className}`}
    >
      {icon && (
        <span
          className={`${isHome ? "bg-white rounded-full p-1.5 sm:p-2" : ""}`}
        >
          {React.cloneElement(icon, {
            size:
              window.innerWidth < 640 ? 16 : window.innerWidth < 768 ? 18 : 20,
          })}
        </span>
      )}
      <span>{t(text)}</span>
    </div>
  );
};

export default Badge;
// import { Sparkle } from "lucide-react";
// import React from "react";
// import { useTranslation } from "react-i18next";

// const Badge = ({
//   text = "Badge",
//   icon = <Sparkle fill="#594E1F" size={20} />,
//   bgColor = "bg-[#FFF5CC]",
//   textColor = "text-[#594E1F]",
//   rounded = "rounded-full",
//   padding = "px-5 py-3",
//   className = "",
//   isHome = false,
// }) => {
//   const { t } = useTranslation();
//   return (
//     <div
//       className={`${bgColor} ${textColor} ${rounded} ${padding} inline-flex items-center gap-2 text-md font-medium mb-3 ${className}`}
//     >
//       {icon && (
//         <span className={`${isHome ? "bg-white rounded-full p-2" : ""}`}>
//           {icon}
//         </span>
//       )}
//       <span>{t(text)}</span>
//     </div>
//   );
// };

// export default Badge;
