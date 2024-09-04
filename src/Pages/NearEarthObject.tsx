import React, { useState } from "react";
import { useFetchNEOData } from "../hooks/useFetchNEOData";

const NearEarthObject = () => {
  const [page, setPage] = useState(1);
  const { neoData, loading, error } = useFetchNEOData(page);

  return (
    <div className="contentCard">
      <h1 className="grandTitle">Near-Earth Objects</h1>

      {}
      {error && <p className="text-red-500">{error}</p>}

      {}
      {loading && <p>Loading...</p>}

      {}
      {!loading && neoData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {neoData.map((neo) => (
            <div key={neo.id} className="border rounded p-2">
              <h2 className="text-lg font-semibold">{neo.name}</h2>
              <p>
                <strong>Magnitude:</strong> {neo.absolute_magnitude_h}
              </p>
              <p>
                <strong>Hazardous:</strong>{" "}
                {neo.is_potentially_hazardous_asteroid ? "Yes" : "No"}
              </p>
              <p>
                <strong>Close Approach Date:</strong>{" "}
                {neo.close_approach_data[0]?.close_approach_date}
              </p>
              <p>
                <strong>Velocity (km/h):</strong>{" "}
                {neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour}
              </p>
              <p>
                <strong>Miss Distance (km):</strong>{" "}
                {neo.close_approach_data[0]?.miss_distance.kilometers}
              </p>
              <a
                href={neo.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white' }}
              >
                More Info
              </a>
            </div>
          ))}
        </div>
      )}

      {}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NearEarthObject;
