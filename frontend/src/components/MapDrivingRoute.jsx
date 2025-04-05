import React, { useMemo, useRef, useEffect } from "react";
 import {
   GoogleMap,
   Polyline,
   Marker
} from "@react-google-maps/api";

import { useGoogleMapsLoader } from "../hooks/useGoogleMapsLoader";



const containerStyle = {
  width: "80%",
  height: "400px"
};

const defaultCenter = {
  lat: 1.3521,
  lng: 103.8198
};

function MapWithRoute({ encodedPolyline, mapContainerClassName }) {
  const { isLoaded } = useGoogleMapsLoader();

  const mapRef = useRef(null);

  const decodedPath = useMemo(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.geometry
    ) {
      try {
        return window.google.maps.geometry.encoding
          .decodePath(encodedPolyline)
          .map((latLng) => ({
            lat: latLng.lat(),
            lng: latLng.lng()
          }));
      } catch (err) {
        console.error("Error decoding polyline:", err);
        return [];
      }
    }
    return [];
  }, [isLoaded, encodedPolyline]);

  // Auto-fit bounds to route
  useEffect(() => {
    if (mapRef.current && decodedPath.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      decodedPath.forEach((coord) => bounds.extend(coord));
      mapRef.current.fitBounds(bounds);
    }
  }, [decodedPath]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerClassName={mapContainerClassName || "map-container"}
      center={defaultCenter}
      zoom={12}
      onLoad={(map) => (mapRef.current = map)}
    >
      {decodedPath.length > 0 && (
        <>
          <Polyline
            path={decodedPath}
            options={{
              strokeColor: "#00BFFF",
              strokeOpacity: 0.8,
              strokeWeight: 4
            }}
          />
          {/* Start Marker */}
          <Marker position={decodedPath[0]} label="A" />

          {/* End Marker */}
          <Marker position={decodedPath[decodedPath.length - 1]} label="B" />
        </>
      )}
    </GoogleMap>
  );
}

export default MapWithRoute;
