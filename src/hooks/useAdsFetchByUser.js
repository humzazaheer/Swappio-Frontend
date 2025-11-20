import { useState, useEffect } from "react";
import { RoutePath } from "@routes/routes";

const useAdsFetchByUser = (userId) => {
  const [adsByUser, setAdsByUser] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetchAds = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/${RoutePath.ADS}?userId=${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch Ads");
        const data = await res.json();
        setAdsByUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAds();
  }, []);

  return adsByUser;
};

export default useAdsFetchByUser;
