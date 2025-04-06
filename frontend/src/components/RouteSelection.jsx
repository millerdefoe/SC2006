import React from "react";
import Badge from "./Badge";
import "../styles/RouteSelection.css";
import { ReactComponent as Bus } from "../assets/Bus.svg";
import { ReactComponent as Train } from "../assets/Train.svg";
import { ReactComponent as Walking } from "../assets/Walking.svg";
import { ReactComponent as TransportArrow } from "../assets/TransportArrow.svg";

const RouteSelection = ({ routeData, onSelect, isSelected }) => {
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

  // Optional: fallback if title doesn't exist
  const title = routeData.routeType === "leastCongested" ? "Least Congested" :
                routeData.routeType === "fastest" ? "Fastest Route" : "Route Option";

  const polyline = routeData.polyline?.encodedPolyline || "";

  return (
    <div className="routeSelection-container">
      <div className="routeSelection-title">{title}</div>

      <div
        className="routeSelection-content"
        style={{ backgroundColor: isSelected ? "#D9D9D9" : "#ECE9E9" }}
      >
        <div className="transportIcon-container">
          {icons.map((icon, index) => {
            const isLast = index === icons.length - 1;

            return (
              <div className="transportIconAndBadge-wrapper" key={index}>
                {icon.type === "walk" && (
                  <div className="walkingIcon-icon">
                    <Walking />
                  </div>
                )}

                {icon.type === "bus" && (
                  <>
                    <div className="busIcon-icon">
                      <Bus />
                    </div>
                    <div className="badge-icon">
                      <Badge label={icon.label} isBus />
                    </div>
                  </>
                )}

                {icon.type === "mrt" && (
                  <>
                    <div className="trainIcon-icon">
                      <Train />
                    </div>
                    <div className="badge-icon">
                      <Badge label={icon.label} isBus={false} />
                    </div>
                  </>
                )}

                {!isLast && (
                  <div className="transportArrow-icon">
                    <TransportArrow />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="duration-text">{duration}</div>
        <button
          className="view-button"
          onClick={() => onSelect(polyline)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default RouteSelection;
