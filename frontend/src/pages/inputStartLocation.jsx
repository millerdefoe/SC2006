import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InputStartLocation.css";
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";
import HomeButton from "../components/HomeButton";
import EnterStartLocationButton from "../components/EnterStartLocationButton";
import "../styles/Common.css";

function InputStartLocation(){

    const [startLocation, setStartLocation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (startLocation.trim()) {
            localStorage.setItem("startLocation", startLocation);
            navigate("/view-driving-route");
        } else {
            alert("Invalid address!");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="main-container">
            <HomeButton/>
            <SettingsButton/>

            <div className="leftContainer">
                <div className="map-container">
                    <img src={mapImage} alt="Map" className="map-image"/>
                </div>
            </div>

            <div className="rightContainer">
                <div className="locationRetrieval-container">
                    <div className="locationRetrieval-header">Input Start Location</div>
                    <div className="separator"></div>
                    <div className="locationRetrieval-button">Retrieve from GPS</div>
                    <div className="separator"></div>
                    <input
                    type="text"
                    placeholder="Search"
                    className="locationRetrievalSearch-bar"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="locationRetrievalLocation-container">
                    <EnterStartLocationButton/>
                    XXX location
                </div>
  
            </div>

        </div>
    
      );
}

export default InputStartLocation; 