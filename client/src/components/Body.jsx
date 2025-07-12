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
        location.pathname === path ? 'bg-blue-100 font-bold rounded-md' : '';

    const menuItems = [
        {
            label: 'Find Travel Buddy',
            icon: 'pi pi-users',
            command: () => navigate('/travelbuddy'),
            className: getActiveClass('/travelbuddy')
        },
        {
            label: 'Match Making',
            icon: 'pi pi-heart',
            command: () => navigate('/matchmaking'),
            className: getActiveClass('/matchmaking')
        },
        {
            label: 'Find Jobs',
            icon: 'pi pi-briefcase',
            command: () => navigate('/findjobs'),
            className: getActiveClass('/findjobs')
        }
    ];

    return (
        <div className="flex-grow bg-white overflow-hidden">
            <div className="flex h-full mt-5">
                {/* Left panel - 20% */}
                <div className="w-1/5 border border-gray-300 p-4">
                    <PanelMenu model={menuItems} className="w-full" />
                </div>

                {/* Right panel - 80% */}
                <div className="w-4/5 border border-gray-300 p-4 overflow-auto max-h-full ml-4">
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
