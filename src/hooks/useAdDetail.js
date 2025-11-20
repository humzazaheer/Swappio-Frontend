import { useState, useEffect } from "react";
import { RoutePath } from "@routes/routes";
import { useParams } from "react-router";

const useAdDetail = () => {
    const { adId } = useParams();

    const [ad, setAd] = useState([]);

    useEffect(() => {
        if (!adId) return;

        const fetchAds = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${RoutePath.AD}/${adId}`, {
                    method: "GET"
                });
                if (!res.ok) throw new Error("Failed to fetch Ads");
                const data = await res.json();
                setAd(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchAds();
    }, [adId]);

    return ad;
};

export default useAdDetail;
