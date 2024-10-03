import { useState, useEffect } from "react";
import axios from "axios";

const useFetchByCategory = () => {
  const [videos, setVideos] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [uploaderName, setUploaderName] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderName(item?._id);
    setCourseName(item?.schoolOf);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const videosResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/upload/video/`
        );

        const materialsResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}api/upload/pdf/`
        );

        if (videosResponse.status !== 200 || materialsResponse.status !== 200) {
          throw new Error("Failed to fetch videos or materials");
        }

        setVideos(videosResponse.data.allVideos);
        setMaterials(materialsResponse.data.allMaterials);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uploaderName, courseName]);

  return { videos, materials, isLoading, error };
};

export default useFetchByCategory;
