import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import AddProfile from './AddProfile';
import './MatchMaking.css'; // Import custom CSS
import SearchProfile from './SearchProfile';
import MyProfile from './MyProfile';
import MatchMakingDescription from './MatchMakingDescription';

const MatchMaking = ({toastRef}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="travelbuddy">
            <Helmet>
                <title>Matrimonial & Matchmaking Services | Find Your Partner | BuddySphere</title>
                <meta name="description" content="Explore profiles on BuddySphere's matchmaking service to find a life partner. Safe, secure, and easy to use platform for finding meaningful connections." />
            </Helmet>
            <TabView
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
                className="custom-tabview"
            >
                <TabPanel header="Description">
                    <MatchMakingDescription />
                </TabPanel>
                <TabPanel header="Add Profile">
                    <AddProfile  toastRef={toastRef}/>
                </TabPanel>
                <TabPanel header="Search Profiles">
                    <SearchProfile />
                </TabPanel>
                <TabPanel header="My Profiles">
                    <MyProfile toastRef={toastRef}/>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default MatchMaking;