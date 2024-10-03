import { useState, useEffect } from "react";
import axios from "axios";

const useFetchContent = () => {
  const [videos, setVideos] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isMaterialsLoading, setIsMaterialsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideosAndMaterials = async () => {
      setIsMaterialsLoading(true);

      try {
        // Replace with your actual API endpoints for fetching videos and materials
        const videosResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/upload/video`
        );
        const materialsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/upload/pdf`
        );

        // Check for HTTP errors in the responses
        if (videosResponse.status !== 200 || materialsResponse.status !== 200) {
          throw new Error("Failed to fetch videos or materials");
        }

        const videosData = videosResponse.data;
        const materialsData = materialsResponse.data;

        setVideos(videosData.allVideos);
        setMaterials(materialsData.allMaterials);
        setIsMaterialsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsMaterialsLoading(false);
      }
    };

    fetchVideosAndMaterials();
  }, []);

  return { videos, materials, isMaterialsLoading, error };
};

export default useFetchContent;
