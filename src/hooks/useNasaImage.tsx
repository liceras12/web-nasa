import { useState, useEffect } from "react";
import axios from "axios";

const useNasaImage = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNasaImage = async (retries = 3, delay = 1000) => {
    const apiKey = "mS1gpSObMBiGi6sQHUJYYyGCdGEeV3Pwvwakq0lY";
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=true`
      );
      const imageUrl = response.data.url;
      const today = new Date().toISOString().split("T")[0];

      localStorage.setItem("nasaImage", imageUrl);
      localStorage.setItem("nasaImageDate", today);
      setBackgroundImage(imageUrl);
      setLoading(false);
    } catch (error: any) {
      if (retries > 0 && error.response?.status === 429) {
        console.warn(`Retrying in ${delay}ms...`);
        setTimeout(() => fetchNasaImage(retries - 1, delay * 2), delay);
      } else {
        setError("Error fetching NASA image of the day");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const cachedImage = localStorage.getItem("nasaImage");
    const cachedDate = localStorage.getItem("nasaImageDate");
    const today = new Date().toISOString().split("T")[0];

    if (cachedImage && cachedDate === today) {
      setBackgroundImage(cachedImage);
      setLoading(false);
    } else {
      fetchNasaImage();
    }
  }, []);

  return { backgroundImage, loading, error };
};

export default useNasaImage;
