import { useState, useEffect } from "react";
import { RoutePath } from "@routes/routes";
import { useParams } from "react-router";

const useGetAdById = () => {

    const { adId } = useParams();
    const [ad, setAd] = useState([]);



    useEffect(() => {
        if (!adId) return;

        const fetchAd = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${RoutePath.AD}/${Number(adId)}`, {
                    method: "GET"
                });
                if (!res.ok) throw new Error("Failed to fetch Ad");
                const data = await res.json();
                setAd(data);
                console
            } catch (err) {
                console.error(err);
            }
        };

        fetchAd();
    }, [adId]);

    return ad;
};

export default useGetAdById;
