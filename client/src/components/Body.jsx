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

    const getActiveClass = (path) =>
        location.pathname === path
            ? 'bg-blue-100 text-blue-700 font-semibold rounded-lg'
            : '';

    const menuItems = [
        {
            label: 'Home',
            icon: location.pathname === '/' ? 'pi pi-home text-blue-700' : 'pi pi-home',
            command: () => navigate('/'),
            className: getActiveClass('/'),
        },
        {
            label: 'Find Travel Buddy',
            icon: location.pathname === '/travelbuddy' ? 'pi pi-users text-blue-700' : 'pi pi-users',
            command: () => navigate('/travelbuddy'),
            className: getActiveClass('/travelbuddy'),
        },
        {
            label: 'Properties',
            icon: location.pathname === '/properties' ? 'pi pi-building text-purple-600' : 'pi pi-building',
            command: () => navigate('/properties'),
            className: getActiveClass('/properties'),
        },
        {
            label: 'Match Making',
            icon: location.pathname === '/matchmaking' ? 'pi pi-heart-fill text-pink-500' : 'pi pi-heart',
            command: () => navigate('/matchmaking'),
            className: getActiveClass('/matchmaking'),
        },
        {
            label: 'Shop Used & New',
            icon: location.pathname === '/browseads' ? 'pi pi-briefcase text-green-600' : 'pi pi-briefcase',
            command: () => navigate('/browseads'),
            className: getActiveClass('/browseads'),
        },
    ];


    return (
        <div className="flex-grow bg-gradient-to-tr from-[#f0f8ff] via-[#d6eaff] to-[#f7fbff] p-4" style={{ height: '80vh' }}>
            <div className="flex h-full gap-6">
                {/* Left panel */}
                <div className="w-1/5 bg-white shadow-md rounded-xl p-4 border border-gray-200">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4">Navigation</h2>
                    <PanelMenu model={menuItems} className="w-full" />
                </div>

                {/* Right panel */}
                <div className="w-4/5 bg-white shadow-md rounded-xl p-6 border border-gray-200 overflow-auto max-h-[calc(100vh-19vh)]">
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
