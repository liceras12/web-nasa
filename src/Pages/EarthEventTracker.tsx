import React from "react";
import useEarthEvents from "../hooks/useEarthEvents"; // Ajusta la ruta según la ubicación del hook

const EarthEventTracker: React.FC = () => {
  const { events, currentPage, handleNextPage, handlePreviousPage } = useEarthEvents();

  const categoryImageMap: { [key: string]: string } = {
    Earthquake: "earthquake.jpg",
    Typhoon: "typhoon.jpg",
    SevereStorms: "severeStorm.jfif",
    Tornado: "tornado.jpg",
    Flood: "flood.jpg",
    Wildfires: "wildfire.jpg"
  };

  const getImageForCategory = (categories: EventCategory[]) => {
    for (const category of categories) {
      const normalizedCategory = category.title.replace(/\s+/g, '').replace(/\b\w/g, char => char.toUpperCase());
      
      const imageName = categoryImageMap[normalizedCategory];
      if (imageName) {
        return `/Images/${imageName}`;
      }
    }
    return `/Images/default.jpg`;
  };

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
                {event.geometry[0].magnitudeValue && (
                  <p>
                    <strong>Magnitude:</strong> {event.geometry[0].magnitudeValue}{" "}
                    {event.geometry[0].magnitudeUnit}
                  </p>
                )}
                <img
                src={getImageForCategory(event.categories)}
                alt={`Image for ${event.title}`}
                className="w-24 h-24 mr-4"
                width={200}
              />
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
            disabled={events.length === 0}
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
