import React, { useEffect, useState } from "react";
import Badge from "../../components/ui/Badge";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import JobsListing from "./JobsListing";
import {
  useGetJobsQuery,
  useGetJobswithoutloginQuery,
} from "../../services/jobApiSlice";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  // Holds the filters applied when the user clicks Search
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
  const { data, isLoading, refetch } = useGetJobswithoutloginQuery(filters);
  console.log("first", filters);

  const handleSearch = ({ keyword, location }) => {
    const mLoc = location === "all" ? "" : location;
    setFilters((prev) => ({ ...prev, keyword, location: mLoc }));
  };

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10">
      {/* <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="text-center">
          <Badge text="Jobs" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 sm:mt-5">
            {t("Your Next Job Starts Here")}
          </h2>
          <p className="text-gray-700 mt-3 sm:mt-4 md:mt-5 max-w-2xl mx-auto text-base sm:text-lg md:text-xl">
            {t(
              "Search and apply to thousands of opportunities across categories, locations, and time slots."
            )}
          </p>
        </div>
      </div> */}

      {/* Pass the handleSearch callback to SearchBar */}
      {/* <SearchBar onSearch={handleSearch} jobData={data?.data} /> */}

      <div className="px-6 md:px-12 lg:px-24 flex gap-10">
        {/* <FiltersSidebar
          onFiltersChange={handleFiltersChange}
          setActive={setActive}
          active={active}
        /> */}
        <JobsListing
          keyword={filters.keyword}
          location={filters.location}
          jobs={data?.data}
          setActive={setActive}
          active={active}
          refetch={refetch}
        />
      </div>
    </section>
  );
};

export default Jobs;
