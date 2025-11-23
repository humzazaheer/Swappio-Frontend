import { useState, useEffect, useCallback } from "react";
import { RoutePath } from "@routes/routes";

const useAdsFetchByUser = (userId) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const fetchAds = useCallback(async () => {

    fetch(`${import.meta.env.VITE_API_BASE_URL}/${RoutePath.ADS}?userId=${userId}`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("No ads found for this user.");
        return res.json();
      })
      .then(data => setAds(data))
      .catch(() => setAds(null))
      .finally(() => setLoading(false));
  }, [refreshKey]);
  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const refreshAds = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };
  return { ads, refreshAds };

}

export default useAdsFetchByUser;



