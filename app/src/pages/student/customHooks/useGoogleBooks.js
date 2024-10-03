import { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS; 

function useGoogleBooks(query) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&key=${API_KEY}`;
        
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    }

    if (query) {
      fetchData();
    } else {
      setData(null);
      setIsLoading(false);
    }
  }, [query]);

  return { data, isLoading };
}

export default useGoogleBooks;
