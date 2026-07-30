import { useRef } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';

import TravelBuddy from '../pages/travelbuddy/Travelbuddy';
import MatchMaking from '../pages/matchmaking/MatchMaking';
import Home from '../pages/Home';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Properties from '../pages/properties/Properties';
import Login from '../pages/login/Login';
import RegisterUser from '../pages/login/RegisterUser';
import ToastMessage from './ToastMessage';
import BrowseAd from '../pages/browseAd/BrowseAd';

const MainBody = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const toastRef = useRef(null);
    const menuItemsConfig = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            path: '/',
        },
        {
            label: 'Find Travel Buddy',
            icon: 'pi pi-users',
            path: '/travelbuddy',
        },
        {
            label: 'Properties',
            icon: 'pi pi-building',
            path: '/properties',
        },
        {
            label: 'Match Making',
            icon: 'pi pi-heart',
            activeIcon: 'pi pi-heart-fill',
            path: '/matchmaking',
        },
        {
            label: 'Shop Used & New',
            icon: 'pi pi-briefcase',
            path: '/browseads',
        },
    ];

    const menuItems = menuItemsConfig.map((item) => {
        const isActive = location.pathname === item.path;
        return {
            label: item.label,
            icon: `${(isActive && item.activeIcon) ? item.activeIcon : item.icon}`,
            command: () => navigate(item.path),
            className: `rounded-lg transition-all duration-300 ease-in-out text-base font-medium ${
                isActive
                    ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg'
                    : 'text-blue-900 hover:bg-blue-100 hover:text-blue-700'
            }`,
            style: isActive ? {
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              } : {},
        };
    });


    return (
        <div className="flex-grow bg-slate-100 p-4" style={{ height: '80vh' }}>
            <div className="flex h-full gap-6">
                {/* Left panel */}
                <div className="w-1/5 bg-white shadow-xl rounded-xl p-4 border border-slate-200">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4">Navigation</h2>
                    <PanelMenu model={menuItems} className="w-full" />
                </div>

                {/* Right panel */}
                <div className="w-4/5 bg-white shadow-xl rounded-xl p-6 border border-slate-200 overflow-auto max-h-[calc(100vh-19vh)]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registeruser" element={<RegisterUser />} />
                        <Route path="/travelbuddy" element={<TravelBuddy toastRef={toastRef}/>} />
                        <Route path="/properties" element={<Properties toastRef={toastRef} />} />
                        <Route path="/matchmaking" element={<MatchMaking toastRef={toastRef}/>} />
                        <Route path="/browseads" element={<BrowseAd toastRef={toastRef}/>} />
                    </Routes>
                    <ToastMessage ref={toastRef} />
                </div>
            </div>
        </div>
    );
};

export default MainBody;
