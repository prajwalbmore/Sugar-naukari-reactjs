import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiZmFzdGFmZiIsImEiOiJjbTJlbXB6dDMxNmZyMmpzZjVrOGwxeDRpIn0.v2QF9_An4h4BEBL9ZFLnVg";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

export default function RouteMap({
  waypoints = [],
  onWaypointsChange,
  routingProfile = "mapbox/driving",
  enableManualWaypoints = true,
}) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const [currentWaypoints, setCurrentWaypoints] = useState(waypoints);
  const [routeData, setRouteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  // Fetch route using Directions API [web:7][web:10][web:13]
  const fetchRoute = async (points) => {
    if (points.length < 2) {
      clearRoute();
      return;
    }

    setIsLoading(true);
    try {
      const coordinates = points
        .map((point) => `${point.lng},${point.lat}`)
        .join(";");
      const url = `https://api.mapbox.com/directions/v5/${routingProfile}/${coordinates}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}&steps=true&overview=full`;

      const response = await axios.get(url);

      if (response.data.routes && response.data.routes.length > 0) {
        const route = response.data.routes[0];
        setRouteData(route);

        // Calculate route info
        const durationMinutes = Math.round(route.duration / 60);
        const distanceKm = (route.distance / 1000).toFixed(2);

        setRouteInfo({
          duration: durationMinutes,
          distance: distanceKm,
          profile: routingProfile.split("/")[1],
        });

        displayRoute(route);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      clearRoute();
    } finally {
      setIsLoading(false);
    }
  };

  // Display route on map [web:13][web:16]
  const displayRoute = (route) => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Remove existing route
    if (map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    // Add route source and layer
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: route.geometry,
      },
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });

    // Fit map to route bounds
    const coordinates = route.geometry.coordinates;
    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds, { padding: 50 });
  };

  // Clear route from map
  const clearRoute = () => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    setRouteData(null);
    setRouteInfo(null);
  };

  // Add waypoint marker [web:3][web:5]
  const addWaypointMarker = (waypoint, index) => {
    const isStart = index === 0;
    const isEnd = index === currentWaypoints.length - 1;

    let color = "#3887be"; // Default blue for intermediate points
    if (isStart) color = "#00d2ff"; // Light blue for start
    if (isEnd) color = "#ff6b6b"; // Red for end

    const marker = new mapboxgl.Marker({
      color: color,
      draggable: enableManualWaypoints,
    })
      .setLngLat([waypoint.lng, waypoint.lat])
      .addTo(mapRef.current);

    // Add popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div>
          <strong>${
            isStart ? "Start" : isEnd ? "End" : `Waypoint ${index}`
          }</strong><br/>
          ${waypoint.name || "Unknown location"}<br/>
          <small>Lat: ${waypoint.lat.toFixed(6)}, Lng: ${waypoint.lng.toFixed(
      6
    )}</small>
          ${
            enableManualWaypoints && !isStart && !isEnd
              ? `<br/><button onclick="removeWaypoint(${index})" style="margin-top: 5px; padding: 2px 8px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>`
              : ""
          }
        </div>
      `);

    marker.setPopup(popup);

    // Handle marker drag
    if (enableManualWaypoints) {
      marker.on("dragend", async () => {
        const pos = marker.getLngLat();
        const locationName = await fetchLocationName(pos.lat, pos.lng);

        const updatedWaypoints = [...currentWaypoints];
        updatedWaypoints[index] = {
          ...updatedWaypoints[index],
          lat: pos.lat,
          lng: pos.lng,
          name: locationName,
        };

        setCurrentWaypoints(updatedWaypoints);
        onWaypointsChange?.(updatedWaypoints);

        // Update popup
        popup.setHTML(`
          <div>
            <strong>${
              isStart ? "Start" : isEnd ? "End" : `Waypoint ${index}`
            }</strong><br/>
            ${locationName}<br/>
            <small>Lat: ${pos.lat.toFixed(6)}, Lng: ${pos.lng.toFixed(
          6
        )}</small>
            ${
              enableManualWaypoints && !isStart && !isEnd
                ? `<br/><button onclick="removeWaypoint(${index})" style="margin-top: 5px; padding: 2px 8px; background: #ff4444; color: white; border: none; border-radius: 3px; cursor: pointer;">Remove</button>`
                : ""
            }
          </div>
        `);
      });
    }

    return marker;
  };

  // Remove waypoint
  window.removeWaypoint = (index) => {
    const updatedWaypoints = currentWaypoints.filter((_, i) => i !== index);
    setCurrentWaypoints(updatedWaypoints);
    onWaypointsChange?.(updatedWaypoints);
  };

  // Fetch location name
  const fetchLocationName = async (latitude, longitude) => {
    try {
      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
      );
      if (res.data.features.length > 0) {
        return res.data.features[0].place_name;
      }
      return "Unknown location";
    } catch (err) {
      console.error("❌ Reverse geocode failed:", err);
      return "Unknown location";
    }
  };

  // Clear all markers
  const clearAllMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  // Render all waypoint markers
  const renderWaypointMarkers = () => {
    clearAllMarkers();
    currentWaypoints.forEach((waypoint, index) => {
      const marker = addWaypointMarker(waypoint, index);
      markersRef.current.push(marker);
    });
  };

  // Add new waypoint
  const addWaypoint = async (lat, lng) => {
    if (!enableManualWaypoints) return;

    const locationName = await fetchLocationName(lat, lng);
    const newWaypoint = { lat, lng, name: locationName };
    const updatedWaypoints = [...currentWaypoints, newWaypoint];
    setCurrentWaypoints(updatedWaypoints);
    onWaypointsChange?.(updatedWaypoints);
  };

  useEffect(() => {
    if (mapRef.current) return;

    // Initialize map [web:12]
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center:
        currentWaypoints.length > 0
          ? [currentWaypoints[0].lng, currentWaypoints[0].lat]
          : [0, 0],
      zoom: currentWaypoints.length > 0 ? 10 : 2,
    });

    mapRef.current.on("load", () => {
      // Render initial waypoints
      renderWaypointMarkers();

      if (currentWaypoints.length >= 2) {
        fetchRoute(currentWaypoints);
      }

      // Add click event to add waypoints
      if (enableManualWaypoints) {
        mapRef.current.on("click", async (e) => {
          const { lat, lng } = e.lngLat;
          await addWaypoint(lat, lng);
        });
      }

      // Add geocoder
      const geocoder = new MapboxGeocoder({
        accessToken: MAPBOX_ACCESS_TOKEN,
        mapboxgl,
        placeholder: "Search and add waypoint...",
      });

      mapRef.current.addControl(geocoder, "top-left");

      geocoder.on("result", async (e) => {
        if (enableManualWaypoints) {
          const [searchLng, searchLat] = e.result.geometry.coordinates;
          await addWaypoint(searchLat, searchLng);
        }
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Update route when waypoints change
  useEffect(() => {
    if (mapRef.current && mapRef.current.loaded()) {
      renderWaypointMarkers();
      if (currentWaypoints.length >= 2) {
        fetchRoute(currentWaypoints);
      } else {
        clearRoute();
      }
    }
  }, [currentWaypoints, routingProfile]);

  // Clear all waypoints
  const clearAllWaypoints = () => {
    setCurrentWaypoints([]);
    onWaypointsChange?.([]);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "50vh" }}>
      <div
        ref={mapContainer}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />

      {/* Route controls */}
      <div className="absolute top-2 right-2 bg-white p-3 rounded shadow-lg text-sm">
        <div className="mb-2">
          <strong>Route Planning</strong>
        </div>
        <div className="mb-2">
          <select
            value={routingProfile}
            onChange={(e) => {
              // This would need to be passed as a prop or callback
              // setRoutingProfile(e.target.value);
            }}
            className="w-full p-1 border border-gray-300 rounded text-xs"
          >
            <option value="mapbox/driving">Driving</option>
            <option value="mapbox/driving-traffic">Driving (Traffic)</option>
            <option value="mapbox/walking">Walking</option>
            <option value="mapbox/cycling">Cycling</option>
          </select>
        </div>
        <div className="mb-2 text-xs text-gray-600">
          Waypoints: {currentWaypoints.length}
        </div>
        {enableManualWaypoints && (
          <>
            <div className="mb-2 text-xs text-gray-500">
              Click map to add waypoints
            </div>
            {currentWaypoints.length > 0 && (
              <button
                onClick={clearAllWaypoints}
                className="w-full px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                Clear All
              </button>
            )}
          </>
        )}
      </div>

      {/* Route info */}
      {isLoading && (
        <div className="absolute bottom-2 left-2 bg-white p-3 rounded shadow-lg text-sm">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            Calculating route...
          </div>
        </div>
      )}

      {routeInfo && !isLoading && (
        <div className="absolute bottom-2 left-2 bg-white p-3 rounded shadow-lg text-sm">
          <div className="font-semibold mb-1">Route Information</div>
          <div className="text-xs text-gray-600">
            <div>Distance: {routeInfo.distance} km</div>
            <div>Duration: {routeInfo.duration} minutes</div>
            <div>Mode: {routeInfo.profile}</div>
          </div>
        </div>
      )}

      {/* Waypoints list */}
      {currentWaypoints.length > 0 && (
        <div className="absolute bottom-2 right-2 bg-white p-3 rounded shadow-lg text-sm max-w-xs max-h-40 overflow-y-auto">
          <div className="font-semibold mb-2">Waypoints:</div>
          {currentWaypoints.map((waypoint, index) => (
            <div
              key={index}
              className="mb-1 pb-1 border-b border-gray-200 last:border-b-0"
            >
              <div className="font-medium text-xs">
                {index === 0
                  ? "🟢 Start"
                  : index === currentWaypoints.length - 1
                  ? "🔴 End"
                  : `${index}. Stop`}
              </div>
              <div className="text-xs text-gray-600 truncate">
                {waypoint.name || `Waypoint ${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
