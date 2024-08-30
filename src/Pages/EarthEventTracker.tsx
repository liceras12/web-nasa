import React, { useEffect, useState } from "react";
import axios from "axios";
import useEarthEvents from "../hooks/useEarthEvents";
import LeafletMap from "../hooks/useLeafletMap";

interface EventCategory {
  id: string;
  title: string;
}

interface Event {
  id: string;
  title: string;
  categories: EventCategory[];
  geometry: {
    magnitudeValue?: number;
    magnitudeUnit?: string;
    date: string;
    type: string;
    coordinates: [number, number];
  }[];
}

const EarthEventTracker: React.FC = () => {
  const {
    events,
    currentPage,
    handleNextPage,
    handlePreviousPage,
    cachedEvents,
  } = useEarthEvents(); // Usa el hook personalizado


  return (
    <div className="frame">
      <div className="contentCard">
        <h1 className="grandTitle">Earth Natural Event Tracker</h1>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-4 p-4 border rounded bg-gray-100 flex items-center">
              <div>
                <h2 className="text-2xl font-semibold">{event.title}</h2>
                <p>
                  <strong>Category:</strong>{" "}
                  {event.categories.map((cat) => cat.title).join(", ")}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.geometry[0].date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Coordinates:</strong>{" "}
                  {event.geometry[0].coordinates.join(", ")}
                </p>
                {}
                <LeafletMap
                  latitude={event.geometry[0].coordinates[1]}
                  longitude={event.geometry[0].coordinates[0]}
                  width="400px"
                  height="300px"
                  name={event.title}
                  category={event.categories.map((cat) => cat.title).join(", ")}
                />
                <strong>_________________________________________________________________________________</strong>
              </div>
            </li>
          ))}
        </ul>

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
            disabled={currentPage === cachedEvents.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EarthEventTracker;
