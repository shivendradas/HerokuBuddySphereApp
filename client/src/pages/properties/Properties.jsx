import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy'; // Import custom CSS
import PropertiesDescription from './PropertiesDescription';
import AddRequest from './AddRequest';
import SearchProperties from './SearchProperties';
import MyAd from './MyAd';

const Properties = ({ toastRef }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loggedInEmail] = useState(localStorage.getItem('email'));

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="Properties">
            <Helmet>
                <title>Buy, Sell & Rent Properties | Free Property Listings | BuddySphere</title>
                <meta name="description" content="Search for residential and commercial properties. Post free listings to buy, sell, or rent homes, apartments, and business spaces on BuddySphere." />
            </Helmet>
            {<TabView 
                className="custom-tabview" 
                activeIndex={activeIndex} 
                onTabChange={handleTabChange}
            >
                <TabPanel header="Description">
                    <PropertiesDescription />
                </TabPanel>
                <TabPanel header="Add Property Aid">
                    <AddRequest toastRef={toastRef}/>
                </TabPanel>
                <TabPanel header="Search Properties">
                    <SearchProperties />
                </TabPanel>
                {loggedInEmail && <TabPanel header="My Ad">
                    <MyAd toastRef={toastRef}/>
                </TabPanel>} 
                
            </TabView>}
        </div>
    );
};

export default Properties;