import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import NearByJobCard from "../../pages/dashboard/locations/NearByJobCard";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function MultipleMarkersMap({ markers = [], userLocation }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [selectedJob, setSelectedJob] = useState(null);
  console.log(selectedJob,"selectedJobselectedJobselectedJobselectedJobselectedJob")

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [userLocation.lng, userLocation.lat],
      zoom: markers.length > 0 ? 10 : 12,
    });

    // Add user marker
    new mapboxgl.Marker({ color: "green" })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup().setText("You are here"))
      .addTo(mapRef.current);

    // Add job markers
    markers.forEach((m) => {
      const marker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([m.lng, m.lat])
        .addTo(mapRef.current);

      marker.getElement().addEventListener("click", async () => {
        setSelectedJob(m);

        try {
          const res = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${m.lng},${m.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
          );
          const data = await res.json();

          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].geometry.coordinates;

            if (mapRef.current.getSource("route")) {
              mapRef.current.removeLayer("route");
              mapRef.current.removeSource("route");
            }

            mapRef.current.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: { type: "LineString", coordinates: route },
                properties: {},
              },
            });

            mapRef.current.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: { "line-join": "round", "line-cap": "round" },
              paint: { "line-color": "#3b82f6", "line-width": 5 },
            });
          }
        } catch (err) {
          console.error("Error fetching route:", err);
        }
      });
    });

    // Fit map to markers
    if (markers.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((m) => bounds.extend([m.lng, m.lat]));
      mapRef.current.fitBounds(bounds, { padding: 50 });
    }

    return () => mapRef.current && mapRef.current.remove();
  }, [markers, userLocation]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "80vh", borderRadius: "8px" }}
      />
  
      {selectedJob && (
        <div className="absolute bottom-4 right-4 z-10 w-[80vh]">
          <NearByJobCard
            job={{
              title: selectedJob.title,
              companyName: selectedJob.company_name,
              logo: selectedJob.company_logo,
              location: selectedJob.location,
              salary: selectedJob.salary,
              rating: selectedJob.employer_rating ,
              duration: selectedJob.start_time + " - " + selectedJob.end_time,
              views: selectedJob.no_of_view || 100,
              validTill: selectedJob.start_date,
              time: `${selectedJob.end_time} - ${selectedJob.start_time}`,
              pay: selectedJob.salary,
              verified: selectedJob.is_verified || false,
              ...selectedJob,
            }}
            userLocation={userLocation}
          />
        </div>
      )}
    </div>
  );
}
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import NearByJobCard from "../../pages/dashboard/locations/NearByJobCard";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function MultipleMarkersMap({ markers = [] }) {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const userLocation = useRef(null);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     if (!mapContainer.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: markers.length > 0 ? [markers[0].lng, markers[0].lat] : [0, 0],
//       zoom: markers.length > 0 ? 10 : 2,
//     });

//     const addMarkers = () => {
//       markers.forEach((m) => {
//         const marker = new mapboxgl.Marker({ color: "red" })
//           .setLngLat([m.lng, m.lat])
//           .addTo(mapRef.current);

//         marker.getElement().addEventListener("click", async () => {
//           if (!userLocation.current) {
//             alert("Fetching your location, please wait...");
//             return;
//           }

//           setSelectedJob(m);

//           const { lng: userLng, lat: userLat } = userLocation.current;

//           try {
//             const query = await fetch(
//               `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${m.lng},${m.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
//             );
//             const data = await query.json();

//             if (data.routes && data.routes.length > 0) {
//               const route = data.routes[0].geometry.coordinates;

//               if (mapRef.current.getSource("route")) {
//                 mapRef.current.removeLayer("route");
//                 mapRef.current.removeSource("route");
//               }

//               mapRef.current.addSource("route", {
//                 type: "geojson",
//                 data: {
//                   type: "Feature",
//                   properties: {},
//                   geometry: {
//                     type: "LineString",
//                     coordinates: route,
//                   },
//                 },
//               });

//               mapRef.current.addLayer({
//                 id: "route",
//                 type: "line",
//                 source: "route",
//                 layout: { "line-join": "round", "line-cap": "round" },
//                 paint: { "line-color": "#3b82f6", "line-width": 5 },
//               });
//             }
//           } catch (error) {
//             console.error("Error fetching route:", error);
//           }
//         });
//       });
//     };

//     const fitMapToMarkers = () => {
//       if (markers.length > 1) {
//         const bounds = new mapboxgl.LngLatBounds();
//         markers.forEach((m) => bounds.extend([m.lng, m.lat]));
//         mapRef.current.fitBounds(bounds, { padding: 50 });
//       }
//     };

//     mapRef.current.on("load", () => {
//       // Add user location
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (pos) => {
//             const userLng = pos.coords.longitude;
//             const userLat = pos.coords.latitude;
//             userLocation.current = { lng: userLng, lat: userLat };
//             console.log("Fetched userLocation", userLocation.current);

//             new mapboxgl.Marker({ color: "green" })
//               .setLngLat([userLng, userLat])
//               .setPopup(new mapboxgl.Popup().setText("You are here"))
//               .addTo(mapRef.current);

//             // Center map on user if no markers
//             if (markers.length === 0) {
//               mapRef.current.setCenter([userLng, userLat]);
//               mapRef.current.setZoom(12);
//             }

//             // Now add job markers
//             addMarkers();
//             fitMapToMarkers();
//           },
//           (err) => {
//             console.error("Error fetching user location:", err);
//             alert(
//               "Unable to fetch your location. Please allow location access."
//             );

//             // Even if location fails, show markers
//             addMarkers();
//             fitMapToMarkers();
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//         );
//       } else {
//         alert("Geolocation is not supported by your browser");
//         addMarkers();
//         fitMapToMarkers();
//       }
//     });

//     return () => {
//       mapRef.current && mapRef.current.remove();
//     };
//   }, [markers]);

//   return (
//     <div style={{ position: "relative" }}>
//       <div
//         ref={mapContainer}
//         style={{ width: "100%", height: "80vh", borderRadius: "8px" }}
//       />

//       {/* Top-left Color Index */}
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           background: "white",
//           padding: "10px",
//           borderRadius: "6px",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//           fontSize: "14px",
//           zIndex: 20,
//         }}
//       >
//         <table>
//           <tbody>
//             <tr>
//               <td>
//                 <div
//                   style={{
//                     display: "inline-block",
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     backgroundColor: "green",
//                     marginRight: "6px",
//                   }}
//                 ></div>
//                 <strong>User</strong>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <div
//                   style={{
//                     display: "inline-block",
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     backgroundColor: "red",
//                     marginRight: "6px",
//                   }}
//                 ></div>
//                 <strong>Job</strong>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* JobCard Panel */}
//       {selectedJob && (
//         <div className="absolute bottom-4 right-4 z-10 w-[80vh]">
// <NearByJobCard
//   job={{
//     title: selectedJob.title,
//     companyName: selectedJob.company_name,
//     logo: selectedJob.company_logo,
//     location: selectedJob.location,
//     salary: selectedJob.salary,
//     rating: selectedJob.rating || 4.5,
//     duration: selectedJob.start_time + " - " + selectedJob.end_time,
//     views: selectedJob.views || 100,
//     validTill: selectedJob.start_date,
//     time: selectedJob.job_type,
//     pay: selectedJob.salary,
//     verified: true,
//     ...selectedJob,
//   }}
//   userLocation={userLocation.current}
// />
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import NearByJobCard from "../../pages/dashboard/locations/NearByJobCard";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function MultipleMarkersMap({ markers = [] }) {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const userLocation = useRef(null);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     if (!mapContainer.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: markers.length > 0 ? [markers[0].lng, markers[0].lat] : [0, 0],
//       zoom: markers.length > 0 ? 10 : 2,
//     });

//     mapRef.current.on("load", () => {
//       markers.forEach((m) => {
//         const marker = new mapboxgl.Marker({ color: "red" })
//           .setLngLat([m.lng, m.lat])
//           .addTo(mapRef.current);

//         marker.getElement().addEventListener("click", async () => {
//           setSelectedJob(m);

//           if (!userLocation.current) {
//             alert("Fetching your location...");
//             return;
//           }

//           const { lng: userLng, lat: userLat } = userLocation.current;

//           const query = await fetch(
//             `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${m.lng},${m.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
//           );
//           const data = await query.json();

//           if (data.routes && data.routes.length > 0) {
//             const route = data.routes[0].geometry.coordinates;

//             if (mapRef.current.getSource("route")) {
//               mapRef.current.removeLayer("route");
//               mapRef.current.removeSource("route");
//             }

//             mapRef.current.addSource("route", {
//               type: "geojson",
//               data: {
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                   type: "LineString",
//                   coordinates: route,
//                 },
//               },
//             });

//             mapRef.current.addLayer({
//               id: "route",
//               type: "line",
//               source: "route",
//               layout: { "line-join": "round", "line-cap": "round" },
//               paint: { "line-color": "#3b82f6", "line-width": 5 },
//             });
//           }
//         });
//       });

//       if (markers.length > 1) {
//         const bounds = new mapboxgl.LngLatBounds();
//         markers.forEach((m) => bounds.extend([m.lng, m.lat]));
//         mapRef.current.fitBounds(bounds, { padding: 50 });
//       }

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((pos) => {
//           const userLng = pos.coords.longitude;
//           const userLat = pos.coords.latitude;
//           userLocation.current = { lng: userLng, lat: userLat };
//           console.log("Fetched userLocation", userLocation.current); // ✅ now not null

//           new mapboxgl.Marker({ color: "green" })
//             .setLngLat([userLng, userLat])
//             .setPopup(new mapboxgl.Popup().setText("You are here"))
//             .addTo(mapRef.current);
//         });
//       }
//     });

//     return () => {
//       mapRef.current && mapRef.current.remove();
//     };
//   }, [markers]);
//   // console.log("userLocation", userLocation.current);
//   return (
//     <div style={{ position: "relative" }}>
//       <div
//         ref={mapContainer}
//         style={{ width: "100%", height: "80vh", borderRadius: "8px" }}
//       />

//       {/* Top-left Color Index */}
//       <div
//         style={{
//           position: "absolute",
//           top: 10,
//           left: 10,
//           background: "white",
//           padding: "10px",
//           borderRadius: "6px",
//           boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//           fontSize: "14px",
//           zIndex: 20,
//         }}
//       >
//         <table>
//           <tbody>
//             <tr>
//               <td>
//                 <div
//                   style={{
//                     display: "inline-block",
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     backgroundColor: "green",
//                     marginRight: "6px",
//                   }}
//                 ></div>
//                 <strong>User</strong>
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <div
//                   style={{
//                     display: "inline-block",
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     backgroundColor: "red",
//                     marginRight: "6px",
//                   }}
//                 ></div>
//                 <strong>Job</strong>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* JobCard Panel */}
//       {selectedJob && (
//         <div className="absolute bottom-4 right-4 z-10 w-[80vh]">
//           <NearByJobCard
//             job={{
//               title: selectedJob.title,
//               companyName: selectedJob.company_name,
//               logo: selectedJob.company_logo,
//               location: selectedJob.location,
//               salary: selectedJob.salary,
//               rating: selectedJob.rating || 4.5,
//               duration: selectedJob.start_time + " - " + selectedJob.end_time,
//               views: selectedJob.views || 100,
//               validTill: selectedJob.start_date,
//               time: selectedJob.job_type,
//               pay: selectedJob.salary,
//               verified: true,
//               ...selectedJob,
//             }}
//             userLocation={userLocation.current}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import NearByJobCard from "../../pages/dashboard/locations/NearByJobCard";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function MultipleMarkersMap({ markers = [] }) {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const userLocation = useRef(null);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     if (!mapContainer.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: markers.length > 0 ? [markers[0].lng, markers[0].lat] : [0, 0],
//       zoom: markers.length > 0 ? 10 : 2,
//     });

//     mapRef.current.on("load", () => {
//       markers.forEach((m) => {
//         const marker = new mapboxgl.Marker({ color: "red" })
//           .setLngLat([m.lng, m.lat])
//           .addTo(mapRef.current);

//         marker.getElement().addEventListener("click", async () => {
//           setSelectedJob(m);

//           if (!userLocation.current) {
//             alert("Fetching your location...");
//             return;
//           }

//           const { lng: userLng, lat: userLat } = userLocation.current;

//           const query = await fetch(
//             `https://api.mapbox.com/directions/v5/mapbox/driving/${userLng},${userLat};${m.lng},${m.lat}?steps=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`
//           );
//           const data = await query.json();

//           if (data.routes && data.routes.length > 0) {
//             const route = data.routes[0].geometry.coordinates;

//             if (mapRef.current.getSource("route")) {
//               mapRef.current.removeLayer("route");
//               mapRef.current.removeSource("route");
//             }

//             mapRef.current.addSource("route", {
//               type: "geojson",
//               data: {
//                 type: "Feature",
//                 properties: {},
//                 geometry: {
//                   type: "LineString",
//                   coordinates: route,
//                 },
//               },
//             });

//             mapRef.current.addLayer({
//               id: "route",
//               type: "line",
//               source: "route",
//               layout: { "line-join": "round", "line-cap": "round" },
//               paint: { "line-color": "#3b82f6", "line-width": 5 },
//             });
//           }
//         });
//       });

//       if (markers.length > 1) {
//         const bounds = new mapboxgl.LngLatBounds();
//         markers.forEach((m) => bounds.extend([m.lng, m.lat]));
//         mapRef.current.fitBounds(bounds, { padding: 50 });
//       }

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((pos) => {
//           const userLng = pos.coords.longitude;
//           const userLat = pos.coords.latitude;
//           userLocation.current = { lng: userLng, lat: userLat };

//           new mapboxgl.Marker({ color: "green" })
//             .setLngLat([userLng, userLat])
//             .setPopup(new mapboxgl.Popup().setText("You are here"))
//             .addTo(mapRef.current);
//         });
//       }
//     });

//     return () => {
//       mapRef.current && mapRef.current.remove();
//     };
//   }, [markers]);

//   return (
//     <div style={{ position: "relative" }}>
//       <div
//         ref={mapContainer}
//         style={{ width: "100%", height: "80vh", borderRadius: "8px" }}
//       />

//       {/* JobCard Panel */}
//       {selectedJob && (
//         <div className="absolute bottom-4 right-4 z-10 w-[80vh]">
//           <NearByJobCard
//             job={{
//               title: selectedJob.title,
//               companyName: selectedJob.company_name,
//               logo: selectedJob.company_logo,
//               location: selectedJob.location,
//               salary: selectedJob.salary,
//               // optional fields you can add if available:
//               rating: selectedJob.rating || 4.5,
//               duration: selectedJob.start_time + " - " + selectedJob.end_time,
//               views: selectedJob.views || 100,
//               validTill: selectedJob.start_date,
//               time: selectedJob.job_type,
//               pay: selectedJob.salary,
//               verified: true, // or from your data
//             }}
//             userLocation={userLocation.current} // Pass user location here
//           />
//         </div>
//       )}
//     </div>
//   );
// }
