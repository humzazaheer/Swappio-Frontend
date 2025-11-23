import { useState, useEffect, useCallback } from "react";

const useAds = () => {
  const [ads, setAds] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); 

  const fetchAds = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ads`, {
        method: "GET",
        credentials: "include" 
      });
      
      if (!res.ok) throw new Error("Failed to fetch ads");
      const data = await res.json();
      setAds(data);
    } catch (err) {
      console.error("Error fetching ads:", err);
    }
  }, [refreshKey]); 
  useEffect(() => {
    fetchAds();
  }, [fetchAds]); 

  const refreshAds = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return { ads, refreshAds }; 
};

export default useAds;