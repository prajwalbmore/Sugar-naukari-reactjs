import React, { useState, useMemo } from "react";
import Tabs from "../../../components/ui/Tabs";
import ProfileOverview from "./ProfileOverview";
import EducationTab from "./EducationTab";
import PersonalInfoTab from "./PersonalInfoTab";
import MyProfileContent from "./MyProfileContent";
import { useAuthContext } from "../../../contexts/auth/context";
import { useGetUserDetailsQuery } from "../../../services/authApiSlice";
import Spinner from "../../../components/ui/Spinner";

const PersonalInfo = () => {
  const [active, setActive] = useState(0);
  const { user } = useAuthContext();

  // Fetch user details
  const { data, isLoading, refetch } = useGetUserDetailsQuery(user?.id);
  console.log("PresonalInfo",data)
  const tabs = useMemo(
    () => [
      // "Profile Overview",
      "My Profile",
      "Personal Information",
      "Education",
    ],
    []
  );
  if (isLoading) {
    return <Spinner />;
  }

  // Function to render content based on active tab
  const renderActiveTab = () => {
    switch (active) {
      // case 0:
      //   return <ProfileOverview setActive={setActive} />;
      case 0:
        return (
          <MyProfileContent
            userData={data}
            refetch={refetch}
            user={user}
            setActive={setActive}
          />
        );
      case 1:
        return (
          <PersonalInfoTab userData={data} refetch={refetch} user={user} />
        );
      case 2:
        return <EducationTab userData={data} refetch={refetch} user={user} />;
      default:
        return <div>Unknown Tab</div>;
    }
  };

  return (
    <section className="p-4 min-h-screen bg-gray-50">
      <div className="rounded shadow-md mb-6 bg-white">
        <Tabs tabs={tabs} active={active} setActive={setActive} />
      </div>
      <div className="rounded p-4 bg-white shadow-sm">{renderActiveTab()}</div>
    </section>
  );
};

export default PersonalInfo;
