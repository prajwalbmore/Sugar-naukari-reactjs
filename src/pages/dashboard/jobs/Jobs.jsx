import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../../jobs/SearchBar";
import FiltersSidebar from "../../jobs/FiltersSidebar";
import JobsListing from "../../jobs/JobsListing";
import Spinner from "../../../components/ui/Spinner";
import { useGetJobsdashboardEmployeeQuery, useGetJobsQuery } from "../../../services/jobApiSlice";
import { useTranslation } from "react-i18next";

const JobsDashbosrd = () => {
  // ✅ keep all filters here
  const [userLocation, setUserLocation] = useState(null);
  const [active, setActive] = useState(false);
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    salary_min: "",
    salary_max: "",
    experience_level: "",
    vacancy: 1,
    job_date_filter: "",
    rating: "",
    latitude: "",
    longitude: "",
    skill: "",
    radius: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (!filters.radius) return; // 👈 only run when radius is selected

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(coords);

          setFilters((prev) => ({
            ...prev,
            latitude: coords.lat,
            longitude: coords.lng,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          const fallback = { lat: 18.5204, lng: 73.8567 };

          setUserLocation(fallback);
          setFilters((prev) => ({
            ...prev,
            latitude: fallback.lat,
            longitude: fallback.lng,
          }));
        }
      );
    } else {
      const fallback = { lat: 18.5204, lng: 73.8567 };
      setUserLocation(fallback);
      setFilters((prev) => ({
        ...prev,
        latitude: fallback.lat,
        longitude: fallback.lng,
      }));
    }
  }, [filters.radius]); // 👈 runs only when radius is updated

  // ✅ pass filters to API
  const { data, isLoading, refetch } = useGetJobsdashboardEmployeeQuery(filters);
  // Refetch jobs when filters change (except on initial mount)
  useEffect(() => {
    // Avoid refetch on initial mount
    if (!data) return;
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  const handleSearch = ({ keyword, location }) => {
    const mLoc = location === "all" ? "" : location;
    setFilters((prev) => ({ ...prev, keyword, location: mLoc }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="space-y-5">
      {/* <SearchBar onSearch={handleSearch} jobData={data?.data} t={t} /> */}

      <div className="flex gap-10">
        {/* ✅ send callback to sidebar */}
        {/* <FiltersSidebar
          onFiltersChange={handleFiltersChange}
          setActive={setActive}
          active={active}
          t={t}
        /> */}
        <JobsListing
          keyword={filters.keyword}
          location={filters.location}
          jobs={data?.data}
          t={t}
          setActive={setActive}
          active={active}
          refetch={refetch}
        />
      </div>
    </section>
  );
};

export default JobsDashbosrd;
// import React, { useState } from "react";
// import SearchBar from "../../jobs/SearchBar";
// import FiltersSidebar from "../../jobs/FiltersSidebar";
// import JobsListing from "../../jobs/JobsListing";
// import Spinner from "../../../components/ui/Spinner";
// import { useGetJobsQuery } from "../../../services/jobApiSlice";

// const JobsDashbosrd = () => {
//   // Holds the filters applied when the user clicks Search
//   const [filters, setFilters] = useState({ keyword: "", location: "" });
//   const { data, isLoading } = useGetJobsQuery();
//   const handleSearch = ({ keyword, location }) => {
//     setFilters({ keyword, location });
//   };
//   if (isLoading) {
//     return <Spinner />;
//   }
//   return (
//     <section className="space-y-5">
//       {/* Pass the handleSearch callback to SearchBar */}
//       <SearchBar onSearch={handleSearch} jobData={data?.data} />

//       <div className="flex gap-10">
//         <FiltersSidebar />
//         {/* Pass the applied filters to JobsListing */}
//         <JobsListing
//           keyword={filters.keyword}
//           location={filters.location}
//           jobs={data?.data}
//         />
//       </div>
//     </section>
//   );
// };

// export default JobsDashbosrd;
