import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [eventImages, setEventImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://eonet.gsfc.nasa.gov/api/v3/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching EONET events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchEventImages = async () => {
      const images: { [key: string]: string } = {};

      for (const event of events) {
        const { coordinates, date } = event.geometry[0];
        const lon = coordinates[0];
        const lat = coordinates[1];
        const dateStr = new Date(date).toISOString().split('T')[0];

        try {
          const imageUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${dateStr}&dim=0.10&api_key=mP9EzXqPqgVbFv67NhTO5dAjKxpdEbTiOU0UOWsJ`;
          const response = await axios.get(imageUrl);
          images[event.id] = response.data.url;
        } catch (error) {
          console.error('Error fetching image for event:', event.id, error);
        }
      }

      setEventImages(images);
    };

    if (events.length > 0) {
      fetchEventImages();
    }
  }, [events]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredEvents = selectedCategory === 'All' 
    ? events 
    : events.filter(event => event.categories.some(cat => cat.title === selectedCategory));

  const categories = Array.from(new Set(events.flatMap(event => event.categories.map(cat => cat.title))));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Earth Natural Event Tracker</h1>

      <div className="mb-4">
        <label htmlFor="category" className="mr-2 font-semibold">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id} className="mb-4 p-4 border rounded bg-gray-100">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p><strong>Category:</strong> {event.categories.map(cat => cat.title).join(', ')}</p>
            <p><strong>Date:</strong> {new Date(event.geometry[0].date).toLocaleDateString()}</p>
            <p><strong>Coordinates:</strong> {event.geometry[0].coordinates.join(', ')}</p>
            {event.geometry[0].magnitudeValue && (
              <p>
                <strong>Magnitude:</strong> {event.geometry[0].magnitudeValue} {event.geometry[0].magnitudeUnit}
              </p>
            )}
            {eventImages[event.id] ? (
              <img src={eventImages[event.id]} alt={`Event at ${event.geometry[0].coordinates.join(', ')}`} className="mt-4" />
            ) : (
              <p>Loading image...</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarthEventTracker;
