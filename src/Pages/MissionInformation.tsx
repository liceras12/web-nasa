import React, { useState, useEffect } from "react";
import axios from "axios";

interface Photo {
  id: number;
  img_src: string;
  camera: {
    full_name: string;
  };
  earth_date: string;
  rover: {
    id: number;
    landing_date: string;
    launch_date: string;
    status: string;
    total_photos: number;
    cameras: {
      full_name: string;
    };
  };
}

const rovers = ["Curiosity", "Opportunity", "Spirit"];

const MissionInformation = () => {
  const [selectedRover, setSelectedRover] = useState("Curiosity");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roverInfo, setRoverInfo] = useState<{
    landing_date: string;
    launch_date: string;
    status: string;
    total_photos: number;
  } | null>(null);

  useEffect(() => {
    const fetchRoverInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/manifests/${selectedRover.toLowerCase()}`,
          {
            params: {
              api_key: "5BWBVkkvcjGzJTy7M0IiWltbddqJ2Vu8gnJ2p3eh",
            },
          }
        );

        const roverData = response.data.photo_manifest;
        setRoverInfo({
          landing_date: roverData.landing_date,
          launch_date: roverData.launch_date,
          status: roverData.status,
          total_photos: roverData.total_photos,
        });
      } catch (err) {
        setError("Error fetching rover information.");
      }
    };

    fetchRoverInfo();
  }, [selectedRover]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover.toLowerCase()}/photos`,
          {
            params: {
              sol: 1000,
              page: page,
              api_key: "5BWBVkkvcjGzJTy7M0IiWltbddqJ2Vu8gnJ2p3eh",
            },
          }
        );
        setPhotos(response.data.photos.slice(0, 5));
      } catch (err) {
        setError("Error fetching photos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [selectedRover, page]);

  const handleRoverChange = (rover: string) => {
    setSelectedRover(rover);
    setPage(1);
  };

  return (
    <div className="frame">
      <div className="contentCard">
        <h1 className="grandTitle">Mars Rover Photos</h1>
        {}
        <div className="button-container flex gap-2 mb-4">
          {rovers.map((rover) => (
            <button
              key={rover}
              onClick={() => handleRoverChange(rover)}
              className={`px-4 py-2 border rounded ${
                selectedRover === rover
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              disabled={selectedRover === rover}
            >
              {rover}
            </button>
          ))}
        </div>

        {}
        {roverInfo && (
          <div className="mb-4 p-4 border rounded">
            <h2 className="text-lg font-semibold">Rover Information</h2>
            <p>
              <strong>Landing Date:</strong> {roverInfo.landing_date}
            </p>
            <p>
              <strong>Launch Date:</strong> {roverInfo.launch_date}
            </p>
            <p>
              <strong>Status:</strong> {roverInfo.status}
            </p>
            <p>
              <strong>Total Photos:</strong> {roverInfo.total_photos}
            </p>
          </div>
        )}

        {}
        {error && <p className="text-red-500">{error}</p>}

        {}
        {loading && <p>Loading...</p>}

        {}
        {!loading && photos.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="border rounded p-2">
                  <p className="mt-2 text-sm text-center">
                    {photo.camera.full_name} | {photo.earth_date}
                  </p>
                  <img
                    src={photo.img_src}
                    alt={`Mars Rover ${selectedRover}`}
                    className="image"
                  />
                  <strong>
                    _______________________________________________________________________________________________
                  </strong>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default MissionInformation;
