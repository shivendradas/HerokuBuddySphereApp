import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Travelbuddy.css'; // Import custom CSS
import AddRequest from './AddRequest';
import FindBuddy from './FindBuddy';
import TrabelBuddyDescription from './TravelBuddyDescription';
import MyRequest from './MyRequest';

const Travelbuddy = ({toastRef}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loggedInEmail] = useState(localStorage.getItem('email'));

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="travelbuddy">
            <Helmet>
                <title>Find a Travel Buddy for Your Next Adventure | BuddySphere</title>
                <meta name="description" content="Connect with fellow travelers, find a travel partner, and explore the world together. Search for travel buddies by destination and interests on BuddySphere." />
            </Helmet>
            <TabView 
                className="custom-tabview" 
                activeIndex={activeIndex} 
                onTabChange={handleTabChange}
            >
                <TabPanel header="Description">
                    <TrabelBuddyDescription />
                </TabPanel>
                <TabPanel header="Add New Request">
                    <AddRequest toastRef={toastRef}/>
                </TabPanel>
                <TabPanel header="Find Buddy">
                    <FindBuddy toastRef={toastRef}/>
                </TabPanel>
                {loggedInEmail && <TabPanel header="My Request">
                    <MyRequest toastRef={toastRef}/>
                </TabPanel>} 
            </TabView>
            {/* <div className="active-tab-info">
                <p>Active Tab: {activeIndex === 0 ? 'Add Buddy' : 'Find Buddy'}</p>
            </div> */}
        </div>
    );
};

export default Travelbuddy;