import { useState, useEffect } from "react";
import axios from "axios";

const NASA_API_KEY = "mP9EzXqPqgVbFv67NhTO5dAjKxpdEbTiOU0UOWsJ";
const API_URLS = {
  CME: `https://api.nasa.gov/DONKI/CME?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
  GST: `https://api.nasa.gov/DONKI/GST?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
  IPS: `https://api.nasa.gov/DONKI/IPS?startDate=2023-01-01&endDate=2023-12-31&location=Earth&catalog=ALL&api_key=${NASA_API_KEY}`,
  FLR: `https://api.nasa.gov/DONKI/FLR?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
  SEP: `https://api.nasa.gov/DONKI/SEP?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
  MPC: `https://api.nasa.gov/DONKI/MPC?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
  RBE: `https://api.nasa.gov/DONKI/RBE?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
  HSS: `https://api.nasa.gov/DONKI/HSS?startDate=2023-01-01&endDate=2023-12-31&api_key=${NASA_API_KEY}`,
};

const useFetchSpaceWeather = (eventType: keyof typeof API_URLS) => {
  const [events, setEvents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [cachedEvents, setCachedEvents] = useState<any[][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URLS[eventType]);
        const fetchedEvents = response.data;
        const pages: any[][] = [];
        for (let i = 0; i < fetchedEvents.length; i += 5) {
          pages.push(fetchedEvents.slice(i, i + 5));
        }
        setCachedEvents(pages);
        setEvents(pages[0] || []);
        setCurrentPage(0);
      } catch (error) {
        setError("Failed to fetch space weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventType]);

  const handleNextPage = () => {
    if (currentPage < cachedEvents.length - 1) {
      setCurrentPage(currentPage + 1);
      setEvents(cachedEvents[currentPage + 1]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setEvents(cachedEvents[currentPage - 1]);
    }
  };

  return {
    events,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useFetchSpaceWeather;
