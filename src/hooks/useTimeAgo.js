import { useState, useEffect } from "react";

function useTimeAgo(dateString) {
    const calcTimeAgo = () => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };

        for (let key in intervals) {
            const value = Math.floor(seconds / intervals[key]);
            if (value >= 1) {
                return value === 1 ? `1 ${key} ago` : `${value} ${key}s ago`;
            }
        }

        return "Just now";
    };

    const [timeAgo, setTimeAgo] = useState(calcTimeAgo());

    // auto-update every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeAgo(calcTimeAgo());
        }, 60000);

        return () => clearInterval(timer);
    }, [dateString]);

    return timeAgo;
}


export default useTimeAgo;