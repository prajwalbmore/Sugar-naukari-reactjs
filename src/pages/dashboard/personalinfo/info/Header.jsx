import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import { IMAGEBASEURL } from "../../../../constants/app.constant";

const Header = ({
  rating = "",
  isRatingVisible = false,
  userData = {},
  refetch = () => {},
  user = {},
}) => {
  return (
    <div className="shadow-sm border border-gray-300 rounded-b-2xl">
      {/* Banner */}
      <div className="bg-emerald-500 h-28 relative p-4 sm:p-6 flex items-center">
        <img
          src={`${IMAGEBASEURL}/${userData?.data?.profile_image}`}
          alt="Profile"
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white bg-blue-400 absolute top-[60px] sm:top-[45px] left-4 sm:left-6"
        />

        {isRatingVisible && (
          <div className="bg-white font-semibold text-xs sm:text-sm flex gap-1 rounded-lg px-2 py-1 absolute left-[110px] sm:left-[150px] top-[100px] sm:top-[70px]">
            {rating}
            <StarIcon className="h-4 sm:h-5 text-emerald-500" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="sm:ml-1  md:ml-28 lg:32 px-4 sm:px-6 md:px-10 py-5 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            {userData?.data?.fullName}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-2 md:mt-3 text-justify max-w-full md:max-w-2xl lg:max-w-3xl">
            {userData?.data?.about}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
// import { StarIcon } from "@heroicons/react/24/solid";
// import React from "react";

// const Header = ({
//   rating = "",
//   userData = {},
//   refetch = () => {},
//   user = {},
// }) => {
//   return (
//     <div className="shadow-sm border border-gray-300 rounded-b-2xl">
//       <div className="bg-appcolor h-28 relative p-6 flex items-center space-x-4">
//         <img
//           src={userData?.data?.profile_image}
//           alt="Profile"
//           className="w-32 h-32 rounded-full border-4 border-white bg-blue-400 absolute top-[45px]"
//         />
//         {rating && (
//           <div className="bg-white font-semibold text-sm flex gap-1 rounded-lg px-2 left-[150px] top-[70px] absolute py-1">
//             {rating}
//             <StarIcon className="h-5 text-appcolor" />
//           </div>
//         )}
//       </div>
//       <div className="px-5 py-5 flex justify-end">
//         <div>
//           <h2 className="text-xl font-bold">{userData?.data?.full_name}</h2>
//           <p className="text-gray-500 w-[620px] text-justify">
//             {userData?.data?.profile_summary}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
