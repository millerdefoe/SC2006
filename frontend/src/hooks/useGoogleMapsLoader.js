import { useJsApiLoader } from "@react-google-maps/api";
const libraries = ["geometry"]; // ✅ not created on every render
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const useGoogleMapsLoader = () => {
  return useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries
  });
};
