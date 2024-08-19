import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface NasaApodData {
  title: string;
  explanation: string;
}

const HomePage: React.FC = () => {
  const [apodData, setApodData] = useState<NasaApodData | null>(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        //const apiKey = '5BWBVkkvcjGzJTy7M0IiWltbddqJ2Vu8gnJ2p3eh';
        const apiKey = 'mS1gpSObMBiGi6sQHUJYYyGCdGEeV3Pwvwakq0lY';
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        setApodData({
          title: response.data.title,
          explanation: response.data.explanation,
        });
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };

    fetchApodData();
  }, []);

  return (
    <div className='infoCapsule'>
      {apodData ? (
        <>
          <h1  className="subTitle">{apodData.title}</h1>
          <p className="textContent">{apodData.explanation}</p>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default HomePage;
