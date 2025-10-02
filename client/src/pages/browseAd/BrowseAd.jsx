import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy'; // Import custom CSS
import BrowseAdDescription from './BrowseAdDescription';
import AddItemAd from './AddItemAd';
import SearchClassifiedAds from './SearchClassifiedAds';
import MyAd from './MyAd';

const BrowseAd = ({ toastRef }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loggedInEmail] = useState(localStorage.getItem('email'));

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="Properties">
            {<TabView 
                className="custom-tabview" 
                activeIndex={activeIndex} 
                onTabChange={handleTabChange}
            >
                <TabPanel header="Description">
                    <BrowseAdDescription />
                </TabPanel>
                <TabPanel header="Add New Ad">
                    <AddItemAd toastRef={toastRef} />
                </TabPanel>
                <TabPanel header="Search Ads">
                    <SearchClassifiedAds toastRef={toastRef} />
                </TabPanel>
                <TabPanel header="My Ad">
                    <MyAd toastRef={toastRef} />
                </TabPanel>
                
            </TabView>}
        </div>
    );
};

export default BrowseAd;