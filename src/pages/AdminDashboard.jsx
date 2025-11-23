// src/AdminDashboard.js
import { useState } from 'react';
import { 
  LayoutDashboard, Users, MapPin, ShoppingBag, Tags, Menu, Save 
} from 'lucide-react';
import DashboardView from '@features/admin/Dashboard';
import AdsManager from '@features/admin/AdsManager';
import CategoriesManager from '@features/admin/CategoriesManager';
import LocationsManager from '@features/admin/LocationsManager';
import UsersManager from '@features/admin/UsersManager';
import logo from "@assets/swappio-logo.png";
import tinyLogo from "@assets/tiny-logo.png";
import { Dropdown, DropdownItem } from '@components/Dropdown';
import { RoutePath } from '@routes/routes';
import { useAuth } from '@context/AuthContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();



  // --- Render Current View ---
  const renderManager = () => {
    

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView/>;
      case 'ads':
        return <AdsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'locations':
        return <LocationsManager />;
      case 'users':
        return <UsersManager />;
      default:
        return <DashboardView />;
    }
  };


  // --- Main Layout ---
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-800">
      {/* Sidebar */}
      <aside className={`bg-linear-to-r from-violet-600 to-violet-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col fixed h-full z-20 shadow-xl`}>
        <div className="h-16 flex items-center justify-center ">
           <h1 className="font-bold text-2xl cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
             
             <a href="/" target='_blank'>
                                 { sidebarOpen ? <img src={logo} className="w-[150px]" /> : <img src={tinyLogo} className="w-[40px]" /> }
                             </a>
                             
           </h1>
        </div>
        <nav className="flex-1 py-6 px-2 space-y-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'ads', label: 'Ads', icon: ShoppingBag },
            { id: 'categories', label: 'Categories', icon: Tags },
            { id: 'locations', label: 'Locations', icon: MapPin },
            { id: 'users', label: 'Users', icon: Users },
          ].map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-white ${activeTab === item.id ? 'bg-violet-500 font-bold' : ' hover:bg-violet-400/30'}`}>
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded"><Menu size={20} /></button>
          <Dropdown label={user ? user.firstName + ' ' + user.lastName : 'Account'}>
                                  
                                          <DropdownItem href={RoutePath.USER + '/' + RoutePath.LOGOUT}>
                                              Logout
                                          </DropdownItem>
                                   
          
                              </Dropdown>
        </header>

        <main className="p-6 max-w-7xl mx-auto w-full animate-fade-in pb-20">
          {renderManager()}
        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;