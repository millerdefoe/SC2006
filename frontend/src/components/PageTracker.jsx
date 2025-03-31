import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const excludedPages = ["/settings", "/profile", "/profile-log-in", "/feedback"];
        const lastPage = sessionStorage.getItem("lastValidPage");

        if (!excludedPages.includes(location.pathname)) {
            sessionStorage.setItem("lastValidPage", location.pathname);
        } else if (!lastPage) {
            sessionStorage.setItem("lastValidPage", "/end-location");
        }
    }, [location]);

    return null; 
};

export default PageTracker;
