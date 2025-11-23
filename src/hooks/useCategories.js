import { useState, useEffect, useCallback } from "react";

export const useCategories = (id = null) => {
  
  const [categories, setCategories] = useState([]);
  
  const [category, setCategory] = useState(null); 
  
  const [refreshKey, setRefreshKey] = useState(0); 

  const fetchData = useCallback(async () => {
    
    const isFetchingSingle = id !== null;
    
    const endpoint = isFetchingSingle
      ? `${import.meta.env.VITE_API_BASE_URL}/category/${id}`
      : `${import.meta.env.VITE_API_BASE_URL}/categories`;

    if (isFetchingSingle && !id) return;

    try {
      const res = await fetch(endpoint, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch ${isFetchingSingle ? 'category' : 'categories'}`);
      }
      
      const data = await res.json();
      
      if (isFetchingSingle) {
        setCategory(data);
      } else {
        setCategories(data);
      }
      
    } catch (err) {
      console.error(`Error fetching data:`, err);
      if (isFetchingSingle) setCategory(null);
      else setCategories([]);
    }
  }, [id, refreshKey]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshCategories = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return { categories, category, refreshCategories };
};

export default useCategories;