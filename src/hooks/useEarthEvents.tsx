import { useState, useEffect } from "react";
import axios from "axios";

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

const useEarthEvents = (eventsPerPage: number = 5) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [cachedEvents, setCachedEvents] = useState<Event[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://eonet.gsfc.nasa.gov/api/v3/events"
        );
        const fetchedEvents: Event[] = response.data.events;

        const pages: Event[][] = [];
        for (let i = 0; i < fetchedEvents.length; i += eventsPerPage) {
          pages.push(fetchedEvents.slice(i, i + eventsPerPage));
        }

        setCachedEvents(pages);
        setEvents(pages[0] || []);
      } catch (error) {
        console.error("Error fetching EONET events:", error);
      }
    };

    fetchEvents();
  }, [eventsPerPage]);

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

  return { events, currentPage, handleNextPage, handlePreviousPage };
};

export default useEarthEvents;