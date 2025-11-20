import { useState, useEffect } from "react";
import { RoutePath } from "@routes/routes";

const useAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${RoutePath.ADS}`, {
          method: "GET"
        });
        if (!res.ok) throw new Error("Failed to fetch Ads");
        const data = await res.json();
        setAds(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAds();
  }, []); 

  return ads;
};

export default useAds;
