import { useState, useEffect } from "react";

const useLocations = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/locations`, {
                    method: "GET"
                });
                if (!res.ok) throw new Error("Failed to fetch locations");
                const data = await res.json();
                setLocations(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLocations();
    }, []);

    return locations;
};

export default useLocations;
