import React from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';

import TravelBuddy from '../pages/travelbuddy/Travelbuddy';
import MatchMaking from '../pages/matchmaking/MatchMaking';
import FindJobs from '../pages/jobs/FindJobs';
import Home from '../pages/Home';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const MainBody = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveClass = (path) =>
        location.pathname === path
            ? 'bg-blue-100 text-blue-700 font-semibold rounded-lg'
            : '';

    const menuItems = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/'),
            className: getActiveClass('/'),
        },
        {
            label: 'Find Travel Buddy',
            icon: 'pi pi-users',
            command: () => navigate('/travelbuddy'),
            className: getActiveClass('/travelbuddy'),
        },
        {
            label: 'Match Making',
            icon: 'pi pi-heart',
            command: () => navigate('/matchmaking'),
            className: getActiveClass('/matchmaking'),
        },
        {
            label: 'Find Jobs',
            icon: 'pi pi-briefcase',
            command: () => navigate('/findjobs'),
            className: getActiveClass('/findjobs'),
        },
    ];

    return (
        <div className="flex-grow bg-gradient-to-tr from-[#f0f8ff] via-[#d6eaff] to-[#f7fbff] min-h-[calc(100vh-80px)] p-4">

            <div className="flex h-full gap-6">
                {/* Left panel */}
                <div className="w-1/5 bg-white shadow-md rounded-xl p-4 border border-gray-200">
                    <h2 className="text-xl font-semibold text-blue-800 mb-4">Navigation</h2>
                    <PanelMenu model={menuItems} className="w-full" />
                </div>

                {/* Right panel */}
                <div className="w-4/5 bg-white shadow-md rounded-xl p-6 border border-gray-200 overflow-auto max-h-[calc(100vh-120px)]">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/travelbuddy" element={<TravelBuddy />} />
                        <Route path="/matchmaking" element={<MatchMaking />} />
                        <Route path="/findjobs" element={<FindJobs />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default MainBody;
