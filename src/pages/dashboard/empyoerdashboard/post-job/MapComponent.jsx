import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function MapComponent({ setFieldValue, setTouched, values }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [lat, setLat] = useState(values?.latitude || 0);
  const [lng, setLng] = useState(values?.longitude || 0);

  const [locationName, setLocationName] = useState("");

  // 🔄 Reverse geocode for location name
  // const fetchLocationName = async (latitude, longitude) => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
  //     );
  //     if (res.data.features.length > 0) {
  //       const place = res.data.features[0].place_name;
  //       setLocationName(place);

  //       // ✅ Update Formik
  //       setFieldValue("location", place);
  //       setTouched({ location: true });
  //       setFieldValue("latitude", latitude);
  //       setFieldValue("longitude", longitude);
  //     }
  //   } catch (err) {
  //     console.error("❌ Reverse geocode failed:", err);
  //   }
  // };
  const fetchLocationName = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      if (res.data.features.length > 0) {
        const place = res.data.features[0].place_name;
        setLocationName(place);

        // ✅ Update Formik safely
        setFieldValue("location", place, true); // triggers validation
        setFieldValue("latitude", latitude);
        setFieldValue("longitude", longitude);

        // safer touched update
        if (typeof setTouched === "function") {
          setTouched((prev) => ({ ...prev, location: true }));
        }
      }
    } catch (err) {
      console.error("❌ Reverse geocode failed:", err);
    }
  };

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 16,
    });

    mapRef.current.on("load", () => {
      // Initial marker
      markerRef.current = new mapboxgl.Marker({ color: "red", draggable: true })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      fetchLocationName(lat, lng);

      // 📍 Drag event
      markerRef.current.on("dragend", () => {
        const pos = markerRef.current.getLngLat();
        setLat(pos.lat);
        setLng(pos.lng);
        fetchLocationName(pos.lat, pos.lng);
      });

      // 📍 Click event
      mapRef.current.on("click", (e) => {
        const { lat, lng } = e.lngLat;
        markerRef.current.setLngLat([lng, lat]);
        setLat(lat);
        setLng(lng);
        fetchLocationName(lat, lng);
      });

      // 🔍 Geocoder
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        mapboxgl,
        placeholder: "Search for places...",
      });

      mapRef.current.addControl(geocoder, "top-left");

      geocoder.on("result", (e) => {
        const [searchLng, searchLat] = e.result.geometry.coordinates;

        if (markerRef.current) markerRef.current.remove();

        markerRef.current = new mapboxgl.Marker({
          color: "red",
          draggable: true,
        })
          .setLngLat([searchLng, searchLat])
          .addTo(mapRef.current);

        setLat(searchLat);
        setLng(searchLng);
        fetchLocationName(searchLat, searchLng);

        markerRef.current.on("dragend", () => {
          const pos = markerRef.current.getLngLat();
          setLat(pos.lat);
          setLng(pos.lng);
          fetchLocationName(pos.lat, pos.lng);
        });
      });
    });
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "50vh" }}>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow text-sm">
        <div>
          <b>Location:</b> {locationName || "Fetching..."}
        </div>
        <div>Lat: {lat.toFixed(6)}</div>
        <div>Lng: {lng.toFixed(6)}</div>
      </div>
    </div>
  );
}
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function PinMap() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const geocoderRef = useRef(null);

//   const [lat, setLat] = useState(18.46006);
//   const [lng, setLng] = useState(73.787358);

//   useEffect(() => {
//     if (mapRef.current) return;

//     console.log("🗺️ Initializing map at:", { lat, lng });

//     // Initialize map
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: 16,
//     });

//     mapRef.current.on("load", () => {
//       console.log("✅ Map loaded");

//       // Add initial marker
//       markerRef.current = new mapboxgl.Marker({ color: "red", draggable: true })
//         .setLngLat([lng, lat])
//         .addTo(mapRef.current);

//       console.log("📌 Marker pinned at:", { lat, lng });

//       // Drag event
//       markerRef.current.on("dragend", () => {
//         const pos = markerRef.current.getLngLat();
//         setLat(pos.lat);
//         setLng(pos.lng);
//         console.log("🟠 Marker dragged →", pos);
//       });

//       // Click event
//       mapRef.current.on("click", (e) => {
//         const { lat, lng } = e.lngLat;
//         markerRef.current.setLngLat([lng, lat]);
//         setLat(lat);
//         setLng(lng);
//         console.log("🖱️ Clicked → pinned at:", { lat, lng });
//       });

//       // Add geocoder control
//       const geocoder = new MapboxGeocoder({
//         accessToken: MAPBOX_ACCESS_TOKEN,
//         mapboxgl: mapboxgl,
//         placeholder: "Search for places...",
//         proximity: {
//           longitude: lng,
//           latitude: lat,
//         },
//       });

//       geocoderRef.current = geocoder;
//       mapRef.current.addControl(geocoder, "top-left");

//       // Handle geocoder result
//       geocoder.on("result", (e) => {
//         const coordinates = e.result.geometry.coordinates;
//         const [searchLng, searchLat] = coordinates;

//         // Remove existing marker and add new one
//         if (markerRef.current) {
//           markerRef.current.remove();
//         }

//         markerRef.current = new mapboxgl.Marker({
//           color: "red",
//           draggable: true,
//         })
//           .setLngLat([searchLng, searchLat])
//           .addTo(mapRef.current);

//         // Update state
//         setLat(searchLat);
//         setLng(searchLng);

//         // Re-add drag event to new marker
//         markerRef.current.on("dragend", () => {
//           const pos = markerRef.current.getLngLat();
//           setLat(pos.lat);
//           setLng(pos.lng);
//           console.log("🟠 Marker dragged →", pos);
//         });

//         console.log("🔍 Search result pinned at:", {
//           lat: searchLat,
//           lng: searchLng,
//         });
//       });
//     });
//   }, [lat, lng]);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "50vh" }}>
//       {/* Map container */}
//       <div
//         ref={mapContainer}
//         style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
//       />

//       {/* Coordinates display */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 10,
//           left: 10,
//           background: "white",
//           padding: "6px 10px",
//           borderRadius: "6px",
//           fontSize: "14px",
//           boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
//         }}
//       >
//         <div>Latitude: {lat.toFixed(6)}</div>
//         <div>Longitude: {lng.toFixed(6)}</div>
//       </div>
//     </div>
//   );
// }

// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css"; // ✅ must import CSS

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function PinMap() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   // 👉 your coordinates
//   const [lat, setLat] = useState(18.460060);
//   const [lng, setLng] = useState(73.787358);

//   useEffect(() => {
//     if (mapRef.current) return;

//     console.log("🗺️ Initializing map at:", { lat, lng });

//     // ✅ map must have container with fixed height
//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat], // always [lng, lat]
//       zoom: 16,
//     });

//     mapRef.current.on("load", () => {
//       console.log("✅ Map loaded");

//       // Add marker
//       markerRef.current = new mapboxgl.Marker({ color: "red", draggable: true })
//         .setLngLat([lng, lat])
//         .addTo(mapRef.current);

//       console.log("📌 Marker pinned at:", { lat, lng });

//       // Drag event
//       markerRef.current.on("dragend", () => {
//         const pos = markerRef.current.getLngLat();
//         setLat(pos.lat);
//         setLng(pos.lng);
//         console.log("🟠 Marker dragged →", pos);
//       });

//       // Click event
//       mapRef.current.on("click", (e) => {
//         const { lat, lng } = e.lngLat;
//         markerRef.current.setLngLat([lng, lat]);
//         setLat(lat);
//         setLng(lng);
//         console.log("🖱️ Clicked → pinned at:", { lat, lng });
//       });
//     });
//   }, [lat, lng]);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100vh" }}>
//       {/* Map container with fixed height */}
//       <div
//         ref={mapContainer}
//         style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
//       />

//       {/* Coordinates display */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 10,
//           left: 10,
//           background: "white",
//           padding: "6px 10px",
//           borderRadius: "6px",
//           fontSize: "14px",
//           boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
//         }}
//       >
//         <div>Latitude: {lat.toFixed(6)}</div>
//         <div>Longitude: {lng.toFixed(6)}</div>
//       </div>
//     </div>
//   );
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function MapComponent() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   const [lng, setLng] = useState(78.9629);
//   const [lat, setLat] = useState(20.5937);
//   const [zoom] = useState(4);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (mapRef.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     // Default pin
//     markerRef.current = new mapboxgl.Marker({ color: "red" })
//       .setLngLat([lng, lat])
//       .addTo(mapRef.current);

//     mapRef.current.on("load", () => {
//       mapRef.current.resize();
//     });

//     // ✅ Option 2: Click to drop pin & select location
//     mapRef.current.on("click", (e) => {
//       const clickedLng = e.lngLat.lng;
//       const clickedLat = e.lngLat.lat;

//       console.log("🖱️ Map Clicked → Lat:", clickedLat, "Lng:", clickedLng);

//       if (markerRef.current) {
//         markerRef.current.setLngLat([clickedLng, clickedLat]);
//       } else {
//         markerRef.current = new mapboxgl.Marker({ color: "red" })
//           .setLngLat([clickedLng, clickedLat])
//           .addTo(mapRef.current);
//       }

//       setLat(clickedLat);
//       setLng(clickedLng);
//     });
//   }, []);

//   // Search city
//   const searchCity = async (query) => {
//     if (!query) {
//       setSearchResults([]);
//       return;
//     }
//     try {
//       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         query
//       )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const res = await axios.get(url);
//       setSearchResults(res.data.features);
//     } catch (err) {
//       console.error("Search error:", err);
//     }
//   };

//   // On select city
//   const onCitySelected = (place) => {
//     const coords = place?.geometry?.coordinates || [0, 0];
//     const [lng, lat] = coords;

//     console.log("📍 Selected Place:", place);
//     console.log("➡️ Latitude:", lat, " | Longitude:", lng);

//     if (mapRef.current) {
//       mapRef.current.flyTo({ center: coords, zoom: 12 });

//       if (markerRef.current) {
//         markerRef.current.setLngLat(coords);
//       } else {
//         markerRef.current = new mapboxgl.Marker({ color: "red" })
//           .setLngLat(coords)
//           .addTo(mapRef.current);
//       }
//     }

//     setLat(lat);
//     setLng(lng);
//     setSearchQuery(place.place_name);
//     setSearchResults([]);
//   };

//   return (
//     <div className="w-full h-screen relative overflow-hidden">
//       {/* Search box */}
//       <div className="absolute top-2 left-2 z-10 w-80 bg-white p-2 rounded shadow">
//         <input
//           type="text"
//           value={searchQuery}
//           placeholder="Search city..."
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             searchCity(e.target.value);
//           }}
//           className="w-full p-2 border rounded"
//         />
//         {searchResults.length > 0 && (
//           <ul className="bg-white border rounded mt-2 max-h-60 overflow-y-auto">
//             {searchResults.map((place) => (
//               <li
//                 key={place.id}
//                 onClick={() => onCitySelected(place)}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//               >
//                 {place.place_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Show Lat/Lng */}
//       <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow z-10">
//         <p className="text-sm font-medium">Latitude: {lat}</p>
//         <p className="text-sm font-medium">Longitude: {lng}</p>
//       </div>

//       {/* Map */}
//       <div ref={mapContainer} className="w-full h-full" />
//     </div>
//   );
// }

// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function MapComponent() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   const [lng, setLng] = useState(78.9629);
//   const [lat, setLat] = useState(20.5937);
//   const [zoom] = useState(4);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (mapRef.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     // ✅ Add a default marker at initial position
//     markerRef.current = new mapboxgl.Marker({ color: "red" })
//       .setLngLat([lng, lat])
//       .addTo(mapRef.current);

//     // resize to fit container
//     mapRef.current.on("load", () => {
//       mapRef.current.resize();
//     });
//   }, []);

//   const searchCity = async (query) => {
//     if (!query) {
//       setSearchResults([]);
//       return;
//     }
//     try {
//       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         query
//       )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const res = await axios.get(url);
//       setSearchResults(res.data.features);
//     } catch (err) {
//       console.error("Search error:", err);
//     }
//   };

//   const onCitySelected = (place) => {
//     const coords = place?.geometry?.coordinates || [0, 0];

//     // update map center and zoom
//     if (mapRef.current) {
//       mapRef.current.flyTo({ center: coords, zoom: 12 });

//       // ✅ move existing marker to new coords
//       if (markerRef.current) {
//         markerRef.current.setLngLat(coords);
//       } else {
//         markerRef.current = new mapboxgl.Marker({ color: "red" })
//           .setLngLat(coords)
//           .addTo(mapRef.current);
//       }
//     }

//     setSearchQuery(place.place_name);
//     setSearchResults([]);
//   };

//   return (
//     <div className="w-full h-[50vh] relative overflow-hidden">
//       {/* Search box */}
//       <div className="absolute top-2 left-2 z-10 w-80 bg-white p-2 rounded shadow">
//         <input
//           type="text"
//           value={searchQuery}
//           placeholder="Search city..."
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             searchCity(e.target.value);
//           }}
//           className="w-full p-2 border rounded"
//         />
//         {searchResults.length > 0 && (
//           <ul className="bg-white border rounded mt-2 max-h-60 overflow-y-auto">
//             {searchResults.map((place) => (
//               <li
//                 key={place.id}
//                 onClick={() => onCitySelected(place)}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//               >
//                 {place.place_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Map */}
//       <div ref={mapContainer} className="w-full h-full" />
//     </div>
//   );
// }

// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";

// const MAPBOX_ACCESS_TOKEN =
//   "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

// mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// export default function MapComponent() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null); // ✅ keep only one marker

//   const [lng, setLng] = useState(78.9629);
//   const [lat, setLat] = useState(20.5937);
//   const [zoom] = useState(4);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (mapRef.current) return;

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     // add a single marker initially
//     markerRef.current = new mapboxgl.Marker()
//       .setLngLat([lng, lat])
//       .addTo(mapRef.current);

//     // resize map to fit container
//     mapRef.current.on("load", () => {
//       mapRef.current.resize();
//     });
//   }, []);

//   const searchCity = async (query) => {
//     if (!query) {
//       setSearchResults([]);
//       return;
//     }
//     try {
//       const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//         query
//       )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const res = await axios.get(url);
//       setSearchResults(res.data.features);
//     } catch (err) {
//       console.error("Search error:", err);
//     }
//   };

//   const onCitySelected = (place) => {
//     const coords = place?.geometry?.coordinates || [0, 0];
//     const contexts = place?.context || [];
//     const state =
//       contexts.find((c) => c.id.includes("region"))?.text || "Unknown State";
//     const country =
//       contexts.find((c) => c.id.includes("country"))?.text || "Unknown Country";

//     console.log("Selected:", {
//       name: place.place_name,
//       latitude: coords[1],
//       longitude: coords[0],
//       state,
//       country,
//     });

//     setLng(coords[0]);
//     setLat(coords[1]);

//     if (mapRef.current) {
//       // fly to location
//       mapRef.current.flyTo({ center: coords, zoom: 12 });

//       // update marker position instead of creating new
//       if (markerRef.current) {
//         markerRef.current.setLngLat(coords);
//       } else {
//         markerRef.current = new mapboxgl.Marker()
//           .setLngLat(coords)
//           .addTo(mapRef.current);
//       }
//     }

//     setSearchQuery(place.place_name);
//     setSearchResults([]);
//   };

//   return (
//     <div className="w-full h-screen relative overflow-hidden">
//       {/* Search box */}
//       <div className="absolute top-2 left-2 z-10 w-80 bg-white p-2 rounded shadow">
//         <input
//           type="text"
//           value={searchQuery}
//           placeholder="Search city..."
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             searchCity(e.target.value);
//           }}
//           className="w-full p-2 border rounded"
//         />
//         {searchResults.length > 0 && (
//           <ul className="bg-white border rounded mt-2 max-h-60 overflow-y-auto">
//             {searchResults.map((place) => (
//               <li
//                 key={place.id}
//                 onClick={() => onCitySelected(place)}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//               >
//                 {place.place_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Map */}
//       <div ref={mapContainer} className="w-full h-full" />
//     </div>
//   );
// }
