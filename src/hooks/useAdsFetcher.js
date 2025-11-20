import { useState, useEffect } from "react";
import { RoutePath } from "@routes/routes";

const useAdsFetcher = (categoryId) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchAds = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/${RoutePath.ADS}?categoryId=${categoryId}`
        );
        if (!res.ok) throw new Error("Failed to fetch Ads");
        const data = await res.json();
        setAds(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAds();
  }, [categoryId]);

  return ads;
};

export default useAdsFetcher;
