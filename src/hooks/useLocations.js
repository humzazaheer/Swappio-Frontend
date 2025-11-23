import { useState, useEffect, useCallback } from "react";

const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); 

  const fetchLocations = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/locations`, {
        method: "GET",
        credentials: "include" 
      });
      
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      setLocations(data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  }, [refreshKey]); 
  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]); 

  const refreshLocations = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return { locations, refreshLocations }; 
};

export default useLocations;