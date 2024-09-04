import React, { useState } from "react";
import useFetchSpaceWeather from "../hooks/useFetchSpaceWeather";

const eventTypes = [
  "CME",
  "GST",
  "IPS",
  "FLR",
  "SEP",
  "MPC",
  "RBE",
  "HSS",
] as const;

type EventType = (typeof eventTypes)[number];

const SpaceWeather: React.FC = () => {
  const [selectedEventType, setSelectedEventType] = useState<EventType>("CME");
  const {
    events,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePreviousPage,
  } = useFetchSpaceWeather(selectedEventType);

  const renderEventDetails = (event: any) => {
    switch (selectedEventType) {
      case "CME":
        return (
          <>
            <p>
              <strong>Activity ID:</strong> {event.activityID || "N/A"}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {event.startTime
                ? new Date(event.startTime).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Note:</strong> {event.note || "No details available"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
            <p>
              <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
                View more details
              </a>
            </p>
          </>
        );
      case "GST":
        return (
          <>
            <p>
              <strong>Storm ID:</strong> {event.gstID || "N/A"}
            </p>
            <p>
              <strong>Start Time:</strong>{" "}
              {event.startTime
                ? new Date(event.startTime).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>KP Index:</strong>{" "}
              {event.allKpIndex
                ? event.allKpIndex.map((inst: any) => inst.kpIndex).join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Source:</strong>{" "}
              {event.allKpIndex
                ? event.allKpIndex.map((inst: any) => inst.source).join(", ")
                : "N/A"}
            </p>
          </>
        );
      case "IPS":
        return (
          <>
            <p>
              <strong>Shock ID:</strong> {event.activityID || "N/A"}
            </p>
            <p>
              <strong>Catalog:</strong> {event.catalog || "N/A"}
            </p>
            <p>
              <strong>Event Time:</strong>{" "}
              {event.eventTime
                ? new Date(event.eventTime).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {event.location || "N/A"}
            </p>
            <p>
              <strong>Catalog:</strong> {event.catalog || "N/A"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        );

      case "FLR":
        return (
          <>
            <p>
              <strong>Flare ID:</strong> {event.flrID || "N/A"}
            </p>
            <p>
              <strong>Begin Time:</strong> {event.beginTime || "N/A"}
            </p>
            <p>
              <strong>Peak Time:</strong> {event.peakTime || "N/A"}
            </p>
            <p>
              <strong>End Time:</strong> {event.endTime || "N/A"}
            </p>
            <p>
              <strong>Class Type:</strong> {event.classType || "N/A"}
            </p>
            <p>
              <strong>Source Location:</strong> {event.sourceLocation || "N/A"}
            </p>
            <p>
              <strong>Note:</strong> {event.note || "N/A"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        );

      case "SEP":
        return (
          <>
            <p>
              <strong>SEP ID:</strong> {event.sepID || "N/A"}
            </p>
            <p>
              <strong>Event Time:</strong> {event.eventTime || "N/A"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        );

      case "MPC":
        return (
          <>
            <p>
              <strong>Crossing ID:</strong> {event.mpcID || "N/A"}
            </p>
            <p>
              <strong>Event Time:</strong> {event.eventTime || "N/A"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
            <p>
              <strong>Linked Events:</strong>{" "}
              {event.linkedEvents
                ? event.linkedEvents
                    .map((inst: any) => inst.activityID)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        );

      case "RBE":
        return (
          <>
            <p>
              <strong>RBE ID:</strong> {event.rbeID || "N/A"}
            </p>
            <p>
              <strong>Event Time:</strong> {event.eventTime || "N/A"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        );

      case "HSS":
        return (
          <>
            <p>
              <strong>HSS ID:</strong> {event.hssID || "N/A"}
            </p>
            <p>
              <strong>Event Time:</strong> {event.eventTime || "N/A"}
            </p>
            <p>
              <strong>Instruments:</strong>{" "}
              {event.instruments
                ? event.instruments
                    .map((inst: any) => inst.displayName)
                    .join(", ")
                : "N/A"}
            </p>
          </>
        );
      default:
        return <p>No specific details available for this event type.</p>;
    }
  };

  return (
    <div className="frame">
      <div className="contentCard">
        <h1 className="grandTitle">Space Weather Information</h1>

        <div>
          <ul>
            <li>
              <strong>Coronal Mass Ejection (CME)</strong>
            </li>
            <li>
              <strong>Geomagnetic Storm (GST)</strong>
            </li>
            <li>
              <strong>Interplanetary Shock (IPS)</strong>
            </li>
            <li>
              <strong>Solar Flare (FLR)</strong>
            </li>
            <li>
              <strong>Solar Energetic Particle (SEP)</strong>
            </li>
            <li>
              <strong>Magnetopause Crossing (MPC)</strong>
            </li>
            <li>
              <strong>Radiation Belt Enhancement (RBE)</strong>
            </li>
            <li>
              <strong>Hight Speed Stream (HSS)</strong>
            </li>
          </ul>
        </div>
        <div className="button-container flex flex-wrap gap-2">
  {eventTypes.map((type) => (
    <button
      key={type}
      onClick={() => setSelectedEventType(type)}
      disabled={selectedEventType === type}
      className={`button ${selectedEventType === type ? "selected" : ""}`}
    >
      {type}
    </button>
  ))}
</div>

        {loading ? (
          <p>Loading space weather data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : events.length === 0 ? (
          <p>No space weather events found.</p>
        ) : (
          <ul>
            {events.map((event, index) => (
              <li
                key={`${event.activityID || index}-${selectedEventType}`}
                className="mb-4 p-4 border rounded bg-gray-100 flex items-center"
              >
                <div>{renderEventDetails(event)}</div>
                <strong>
                  ____________________________________________________________________________________
                </strong>
              </li>
            ))}
          </ul>
        )}

        {}
        <div className="button-container">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === events.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceWeather;
