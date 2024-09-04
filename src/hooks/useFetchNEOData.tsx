import { useState, useEffect } from "react";
import axios from "axios";

interface NEO {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: {
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }[];
}

export const useFetchNEOData = (page: number) => {
  const [neoData, setNeoData] = useState<NEO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNEOData = async () => {
      setLoading(true);
      setError("");
      const cacheKey = `neoDataPage${page}`;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData) {
        setNeoData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.nasa.gov/neo/rest/v1/feed`,
          {
            params: {
              start_date: getFormattedDate(page),
              end_date: getFormattedDate(page + 1),
              api_key: "mP9EzXqPqgVbFv67NhTO5dAjKxpdEbTiOU0UOWsJ",
            },
          }
        );

        const neoObjects = Object.values(response.data.near_earth_objects)
          .flat()
          .slice(0, 3) as NEO[];

        setNeoData(neoObjects);
        sessionStorage.setItem(cacheKey, JSON.stringify(neoObjects));
      } catch (err) {
        setError("Error fetching NEO data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNEOData();
  }, [page]);
  const getFormattedDate = (offset: number) => {
    const today = new Date();
    today.setDate(today.getDate() + offset);
    return today.toISOString().split("T")[0];
  };

  return { neoData, loading, error };
};
