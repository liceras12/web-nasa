import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Asteroid {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
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

const NearEarthObjects: React.FC = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cachedData, setCachedData] = useState<Asteroid[]>([]);

  const fetchAsteroids = async () => {
    const apiKey = 'mS1gpSObMBiGi6sQHUJYYyGCdGEeV3Pwvwakq0lY';
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed`, {
        params: {
          start_date: startDate,
          end_date: endDate,
          api_key: apiKey,
        },
      });

      const neoData = Object.values(response.data.near_earth_objects).flat() as Asteroid[];
      setCachedData(neoData);
      setAsteroids(neoData.slice(0, 3));
      setCurrentIndex(3);

      localStorage.setItem('asteroidsData', JSON.stringify(neoData));
      localStorage.setItem('asteroidsFetchDate', startDate);
    } catch (error) {
      console.error('Error fetching asteroids:', error);
    }
  };

  const loadCachedData = () => {
    const cachedAsteroids = localStorage.getItem('asteroidsData');
    const cachedDate = localStorage.getItem('asteroidsFetchDate');
    const today = new Date().toISOString().split('T')[0];

    if (cachedAsteroids && cachedDate === today) {
      const neoData = JSON.parse(cachedAsteroids) as Asteroid[];
      setCachedData(neoData);
      setAsteroids(neoData.slice(0, 3));
      setCurrentIndex(3);
    } else {
      fetchAsteroids();
    }
  };

  const handleNext = () => {
    const nextAsteroids = cachedData.slice(currentIndex, currentIndex + 3);
    if (nextAsteroids.length > 0) {
      setAsteroids(nextAsteroids);
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = () => {
    const prevAsteroids = cachedData.slice(currentIndex - 6, currentIndex - 3);
    if (prevAsteroids.length > 0) {
      setAsteroids(prevAsteroids);
      setCurrentIndex(currentIndex - 3);
    }
  };

  useEffect(() => {
    loadCachedData();
  }, []);

  return (
    <div className="nasa-background">
      <h2 className='center'>Near-Earth Objects</h2>
      <ul>
        {asteroids.map(asteroid => (
          <li key={asteroid.id}>
            <h3 className='pFormat'>{asteroid.name}</h3>
            <p className='pFormat'>Magnitude: {asteroid.absolute_magnitude_h}</p>
            <p className='pFormat'>Diameter: {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
            <p className='pFormat'>Close Approach Date: {asteroid.close_approach_data[0].close_approach_date}</p>
            <p className='pFormat'>Velocity: {asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
            <p className='pFormat'>Miss Distance: {asteroid.close_approach_data[0].miss_distance.kilometers} km</p>
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentIndex <= 3}>Previous</button>
        <button onClick={handleNext} disabled={currentIndex >= cachedData.length}>Next</button>
      </div>
    </div>
  );
};

export default NearEarthObjects;
