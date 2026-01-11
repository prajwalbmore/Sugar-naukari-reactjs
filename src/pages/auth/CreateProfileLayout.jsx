import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ringLogo from "/assets/ringLogo.png";
import logo from "/assets/blackFastaff.png";
import ProfileFormIndex from "./ProfileFormIndex";
import EmployerProfileIndex from "./EmployerProfileIndex";
import { useTranslation } from "react-i18next";

const CreateProfileLayout = () => {
  const location = useLocation();
  const { t } = useTranslation();
    const { type } = useParams();

  // const renderForm = () => {
  //   switch (location?.pathname) {
  //     case "/create-profile/employee":
  //       return <ProfileFormIndex />;
  //     case "/create-profile/employer":
  //       return <EmployerProfileIndex />;
  //     default:
  //       return null;
  //   }
  // };
  const renderForm = () => {
    switch (type) {
      case "employee":
        return <ProfileFormIndex />;
      case "employer":
        return <EmployerProfileIndex />;
      default:
        return (
          <div className="text-center text-gray-500">Invalid profile type</div>
        );
    }
  };
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Image & Description */}
      <div
        className="
    relative 
    w-full 
    bg-appcolor 
    lg:w-1/4 lg:bg-createProfilebg lg:bg-cover lg:bg-no-repeat 
    p-8 flex flex-col justify-between lg:min-h-screen
  "
      >
        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <img
            src={ringLogo}
            alt="Fastaff Logo"
            className="hidden lg:block lg:h-[250px] md:h-[250px]"
          />
          <img src={logo} alt="Fastaff Logo" className="block lg:hidden h-36" />
        </div>

        {/* Text */}
        <div className="mt-6 lg:mt-auto text-center lg:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
            {t("Complete Your Profile")}
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-lg max-w-md mx-auto lg:mx-0">
            {t(`Fill in your details to unlock better job matches and build trust
            with employers`)}
            .
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full flex items-center justify-center p-2">
        {renderForm()}
      </div>
    </div>
  );
};

export default CreateProfileLayout;

// import React from "react";
// import ringLogo from "/assets/ringLogo.png";
// import { useLocation } from "react-router-dom";
// import logo from "/assets/blackFastaff.png";
// import ProfileFormIndex from "./ProfileFormIndex";
// import EmployerProfileIndex from "./EmployerProfileIndex";

// const CreateProfileLayout = () => {
//   const location = useLocation();
//   //   const { selectedOption } = location?.state;
//   const renderForm = () => {
//     switch (location?.pathname) {
//       case "/create-profile/employee":
//         return <ProfileFormIndex />;
//       case "/create-profile/employer":
//         return <EmployerProfileIndex />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side - Image & Description */}
//       <div className=" bg-createProfilebg bg-contain bg-no-repeat w-full md:w-screen lg:w-1/3 sm:w-full p-8 min-h-screen">
//         <div className="hidden sm:block lg:-mt-10 lg:-ml-10 md:-mt-16 md:-ml-1">
//           <img
//             src={ringLogo}
//             alt="Fastaff Logo"
//             className="lg:h-[380px] md:h-[300px]"
//           />
//         </div>
//         {/* for mobile view */}
//         <div className=" md:hidden -mt-10 flex justify-center">
//           <img src={logo} alt="Fastaff Logo" className="h-36" />
//         </div>

//         <div className=" hidden sm:block lg:mt-40 md:mt-[630px] lg:mx-14 md:mx-5">
//           <div>
//             <h1 className="font-bold lg:text-3xl md:text-4xl mb-4 w-80">
//               Complete Your Profile
//             </h1>

//             <p className="text-gray-700  text-base md:text-lg w-80">
//               Fill in your details to unlock better job matches and build trust
//               with employers.
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="hidden lg:flex w-full lg:w-2/3 items-center justify-center p-8">
//         {renderForm()}
//       </div>
//     </div>
//   );
// };

// export default CreateProfileLayout;

{
  /* <div
         className={`absolute 
      lg:right-[0px] lg:left-[620px] lg:top-[100px] 
      md:right-[30px] md:left-[30px] md:top-[250px]
      left-0 right-0 top-28  
      `}
      >
        {" "}
        {renderForm()}
      </div> */
}
