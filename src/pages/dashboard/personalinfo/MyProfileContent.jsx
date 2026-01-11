import React from "react";
import Header from "./info/Header";
import Experiences from "./info/Experiences";
import Education from "./info/Education";
import AdditionalDetails from "./info/AdditionalDetails";
import { Documents } from "./info/Documents";
import { useTranslation } from "react-i18next";

const MyProfileContent = ({ userData, refetch, user, setActive }) => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col lg:flex-row w-full gap-5">
      {/* Left column */}
      <div className="w-full lg:w-[70%] space-y-6">
        <Header userData={userData} refetch={refetch} user={user} />
        <Experiences userData={userData} refetch={refetch} user={user} t={t} />
        <Education
          userData={userData}
          refetch={refetch}
          user={user}
          setActive={setActive}
          t={t}
        />
      </div>

      {/* Right column */}
      <div className="w-full lg:w-[30%] space-y-6">
        <AdditionalDetails
          userData={userData}
          refetch={refetch}
          user={user}
          setActive={setActive}
          t={t}
        />
        <Documents userData={userData} refetch={refetch} user={user} t={t} />
      </div>
    </section>
  );
};

export default MyProfileContent;
// import React from "react";
// import Header from "./info/Header";
// import Experiences from "./info/Experiences";
// import Education from "./info/Education";
// import AdditionalDetails from "./info/AdditionalDetails";
// import { Documents } from "./info/Documents";

// const MyProfileContent = ({ userData, refetch, user, setActive }) => {
//   return (
//     <section className="flex w-full gap-5">
//       <div className="w-[70%] space-y-6">
//         <Header userData={userData} refetch={refetch} user={user} />
//         <Experiences userData={userData} refetch={refetch} user={user} />
//         <Education
//           userData={userData}
//           refetch={refetch}
//           user={user}
//           setActive={setActive}
//         />
//       </div>
//       <div className="w-[30%] ">
//         <AdditionalDetails
//           userData={userData}
//           refetch={refetch}
//           user={user}
//           setActive={setActive}
//         />
//         <Documents userData={userData} refetch={refetch} user={user} />
//       </div>
//     </section>
//   );
// };

// export default MyProfileContent;
