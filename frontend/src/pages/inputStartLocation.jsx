import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InputStartLocation.css";
import mapImage from "../assets/inputStartLocationMap.png";
import SettingsButton from "../components/SettingsButton";
import HomeButton1 from "../components/HomeButton1";
import EnterStartLocationButton from "../components/EnterStartLocationButton";
import NewAutocompleteInput from "../components/NewAutocompleteInput";
import "../styles/common.css";

function InputStartLocation(){

    const [startLocation, setStartLocation] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (startLocation.trim()) {
            localStorage.setItem("startLocation", startLocation);
            navigate("/input-TPT-mode");
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
            <HomeButton1/>
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
                    <NewAutocompleteInput
                        onPlaceSelect={(place) => {
                        setStartLocation(place.formattedAddress);
                        localStorage.setItem("startLocation", place.formattedAddress);
                        console.log("Selected place:", place);
                        navigate("/input-TPT-mode");
                        }}
                    />
                </div>

  
            </div>

        </div>
    
      );
}

export default InputStartLocation; 