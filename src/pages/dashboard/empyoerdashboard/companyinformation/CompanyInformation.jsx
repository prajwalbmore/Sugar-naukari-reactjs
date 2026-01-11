import React, { useMemo, useState } from "react";
import Tabs from "../../../../components/ui/Tabs";
import CompanyProfileOverview from "./CompanyProfileOverview";
import PersonalInfoCompany from "./PersonalInfoCompany";
import CompanyDetailTap from "./CompanyDetailTap";
import { useGetUserDetailsQuery } from "../../../../services/authApiSlice";
import { useAuthContext } from "../../../../contexts/auth/context";
import Spinner from "../../../../components/ui/Spinner";
import EmployerProfile from "./EmployerProfile";

const CompanyInformation = () => {
  const [active, setActive] = useState(0);
  const { user } = useAuthContext();
  const { data, isLoading, refetch } = useGetUserDetailsQuery(user?.id);

  // const tabs = useMemo(
  //   () => ["Profile Overview", "Company Name and Logo", "Profile Information"],
  //   []
  // );

  // // Function to render content based on active tab
  // const renderActiveTab = () => {
  //   switch (active) {
  //     case 0:
  //       return (
  //         <CompanyProfileOverview
  //           setActive={setActive}
  //           userData={data}
  //           refetch={refetch}
  //           user={user}
  //         />
  //       );
  //     case 1:
  //       return (
  //         <CompanyDetailTap userData={data} refetch={refetch} user={user} />
  //       );
  //     case 2:
  //       return (
  //         <PersonalInfoCompany userData={data} refetch={refetch} user={user} />
  //       );
  //     default:
  //       return <div>Unknown Tab</div>;
  //   }
  // };
  if (isLoading) {
    return <Spinner />;
  }
  console.log("data", data);
  return (
    <section className=" min-h-screen bg-gray-50">
      <div className="rounded shadow-md mb-6 bg-white">
        <EmployerProfile userData={data} refetch={refetch} />
      </div>
    </section>
  );
};
{
  /* <Tabs tabs={tabs} active={active} setActive={setActive} /> */
}
{
  /* <div className="rounded bg-white shadow-sm">{renderActiveTab()}</div> */
}

export default CompanyInformation;
