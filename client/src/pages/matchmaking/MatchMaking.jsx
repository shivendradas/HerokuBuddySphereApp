import React, { useState } from 'react';
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

const MatchMaking = ({toastRef}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="travelbuddy">
            <TabView
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
                className="custom-tabview"
            >
                <TabPanel header="Add Profile">
                    <AddProfile  toastRef={toastRef}/>
                </TabPanel>
                <TabPanel header="Search Profiles">
                    <SearchProfile />
                </TabPanel>
                <TabPanel header="My Profiles">
                    <MyProfile />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default MatchMaking;