import { useState, useEffect, useCallback } from "react";

export const useUsers = () => {
  
  const [users, setUsers] = useState([]);
  
  const [refreshKey, setRefreshKey] = useState(0); 

  const fetchData = useCallback(async () => {
    
    const endpoint = `${import.meta.env.VITE_API_BASE_URL}/users`;

    
    try {
      const res = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch users`);
      }
      
      const data = await res.json();
      
      setUsers(data);
      
    } catch (err) {
      console.error(`Error fetching data:`, err);
      setUsers([]);
    }
  }, [refreshKey]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshUsers = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return { users, refreshUsers };
};

export default useUsers;