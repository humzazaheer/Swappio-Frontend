// src/views/DashboardView.js
import React from 'react';
import { DollarSign, ShoppingBag, Users, List, MapPinned } from 'lucide-react';
import useAds from "@hooks/useAds";
import useCategories from "@hooks/useCategories";
import useUsers from "@hooks/useUsers";
import useLocations from "@hooks/useLocations";

const DashboardView = () => {
const { ads } = useAds();
const { categories } = useCategories();
const { users } = useUsers();
const { locations } = useLocations();

const stats = [
  {label: 'Ads', value: ads.length, icon: ShoppingBag },
  {label: 'Categories', value: categories.length, icon: List },
  {label: 'Users', value: users.length, icon: Users },
  {label: 'Locations', value: locations.length, icon: MapPinned },
];

    return (
    
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border flex items-center justify-between">
            <div><p className="text-gray-500 text-sm text-2xl font-bold">{stat.label}</p><h3 className="text-2xl font-bold">{stat.value}</h3></div>
            <div className={`p-3 rounded-lg bg-violet-100 text-violet-700`}><stat.icon className="w-5 h-5"/></div>
          </div>
        ))}
        
    </div>
    
   
  </div>
)};

export default DashboardView;