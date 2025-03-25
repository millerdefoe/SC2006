import React from "react";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import NavBar from "../components/NavigationBar";
import {ReactComponent as Car} from "../assets/Car.svg"; 
import "../styles/ViewDrivingRoute.css";  

const ViewDrivingRoute = () => {

    return (
      <div>
        <HomeButton />
        <SettingsButton />
        <NavBar />
        <div className="transport-container">
          <span className="transport-label">Mode of Transport:</span>
          <div className="car-icon-container">
            <Car className="car-icon" />
          </div>
        </div>
      </div>
    );
};

export default ViewDrivingRoute;
