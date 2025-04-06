import React from "react";
import Badge from "./Badge";
import { ReactComponent as TimerIcon } from "../assets/Timer.svg";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import "../styles/DirectionDescription.css";

const DirectionDescription = ({ routeData }) => {
  if (!routeData || !routeData.steps) return null;

  const steps = routeData.steps || [];

  // Generate icons array from steps
  const icons = steps.map((step) => {
    if (step.travelMode === "WALK") {
      return { type: "walk" };
    }

    if (step.travelMode === "BUS") {
      return { type: "bus", label: step.ServiceNumberOrLine };
    }

    if (step.travelMode === "SUBWAY") {
      return { type: "mrt", label: step.MRTStopLine };
    }

    return null;
  }).filter(Boolean);

  // Format duration from "1209s" → "20 mins"
  const rawDuration = routeData.duration || "0s";
  const durationMins = Math.round(parseInt(rawDuration.replace("s", "")) / 60);
  const duration = `${durationMins} mins`;

  // Extract instruction text for directions
  const directions = steps.map((step) => step.instructions).filter(Boolean);

  return (
    <div className="directionDescription-wrapper">
      <div className="directionDescription-header">
        <div className="directionDescription-title">Directions</div>
        <div className="directionDescription-timer">
          <TimerIcon />
        </div>
        <div className="directionDescription-duration">{duration}</div>
      </div>

      <div className="directionDescription-wrapper2">
        <div className="directionsIcon-container">
          {icons.map((icon, index) => (
            <div className="transportIconAndBadge-vertical" key={index}>
              {icon.type === "walk" && (
                <div className="walkingIconDD-icon">
                  <Walking />
                </div>
              )}

              {icon.type === "bus" && (
                <>
                  <div className="busIconDD-icon">
                    <Bus />
                  </div>
                  <div className="badgeDD-icon">
                    <Badge label={icon.label} isBus />
                  </div>
                </>
              )}

              {icon.type === "mrt" && (
                <>
                  <div className="trainIconDD-icon">
                    <Train />
                  </div>
                  <div className="badgeDD-icon">
                    <Badge label={icon.label} isBus={false} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="directionDescription-container">
          <div className="directionDescription-mainDirection">
            {directions.length > 0 ? (
              directions.map((text, index) => <p key={index}>{text}</p>)
            ) : (
              <p>No directions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionDescription;
