import React, { useEffect, useState } from "react";
import MultipleMarkersMap from "../../../components/ui/MultipleMarkersMap";
import { useGetJobsbyLocationQuery } from "../../../services/jobApiSlice";
import { useAuthContext } from "../../../contexts/auth/context";
import Spinner from "../../../components/ui/Spinner";

const NearByJobs = () => {
  const [userLocation, setUserLocation] = useState(null);
  const { user } = useAuthContext();

  // Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setUserLocation({ lat: 18.5204, lng: 73.8567 }); // fallback Pune
        }
      );
    } else {
      setUserLocation({ lat: 18.5204, lng: 73.8567 }); // fallback Pune
    }
  }, []);

  const {
    data: jobsData,
    isLoading,
    isError,
  } = useGetJobsbyLocationQuery(
    userLocation
      ? {
          employee_id: user?.id, // pass actual employee_id here
          status: "all",
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        }
      : null,
    { skip: !userLocation } // skip query until location is available
  );

  if (!userLocation || isLoading) return <Spinner />;
  if (isError) return <>Error loading jobs</>;

  const markers = jobsData?.data?.map((job) => ({
    lat: Number(job.latitude),
    lng: Number(job.longitude),
    location: job.location,
    ...job,
  }));

  return (
    <div>
      <MultipleMarkersMap markers={markers} userLocation={userLocation} />
    </div>
  );
};

export default NearByJobs;

// import React, { useRef, useState } from "react";
// import MultipleMarkersMap from "../../../components/ui/MultipleMarkersMap";
// import RouteMap from "../../../components/ui/RouteMap";
// import { useGetJobsbyLocationQuery } from "../../../services/jobApiSlice";

// const NearByJobs = () => {
//   const userLocation = useRef(null);
//   if (!userLocation.current) {
//     return <>Loading</>;
//   }

//   const { lng: userLng, lat: userLat } = userLocation.current;

//   //   const { data } = useGetJobsbyLocationQuery();
//   const jobsData = [
//     {
//       job_id: 228,
//       title: "Developer",
//       employer_id: 26,
//       is_save: false,
//       company_name: "TCS",
//       company_logo:
//         "https://demo-compumatrixtechnologies.com/fastaff-laravel/storage/app/employer-company-logo/66715451-screenshot_20250226_085837_photos~2.jpg",
//       location: "Pune, Maharashtra, India, Maharashtra, India",
//       start_time: "12:00 PM",
//       end_time: "06:00 AM",
//       job_type: "Part-time",
//       latitude: "18.515669",
//       longitude: "73.856285",
//       no_of_vacancy: 4,
//       start_date: "30-09-2025",
//       salary: "4664/hr",
//       status: "active",
//     },
//   ];
//   const markers = jobsData.map((job, index) => ({
//     lat: job?.latitude,
//     lng: job?.longitude,
//     location: job?.location,
//     ...job,
//   }));
//   return (
//     <div>
//       <MultipleMarkersMap
//         jobs={jobsData}
//         markers={markers}
//         // markers={[
//         //   {
//         //     lat: 18.5919,
//         //     lng: 73.7389,
//         //     location: "Hinjewadi (Rajiv Gandhi Infotech Park)",
//         //   },
//         //   { lat: 18.5524, lng: 73.9442, location: "Kharadi (EON IT Park)" },
//         //   { lat: 18.5184, lng: 73.9346, location: "Magarpatta City, Hadapsar" },
//         //   { lat: 18.5679, lng: 73.9143, location: "Viman Nagar" },
//         //   { lat: 18.5637, lng: 73.7769, location: "Baner / Balewadi" },
//         //   { lat: 18.5526, lng: 73.904, location: "Kalyani Nagar" },
//         //   { lat: 18.5445, lng: 73.8899, location: "Yerwada" },
//         //   { lat: 18.683, lng: 73.7652, location: "Talawade IT Park" },
//         //   { lat: 18.4716, lng: 73.9412, location: "SP Infocity, Fursungi" },
//         // ]}
//       />
//     </div>
//   );
// };

// export default NearByJobs;
