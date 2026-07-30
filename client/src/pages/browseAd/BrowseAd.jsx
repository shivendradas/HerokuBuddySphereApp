import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
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

    const headerTemplate = (icon, title) => (
        <div className="flex align-items-center">
            <i className={`${icon} mr-2`}></i>
            <span>{title}</span>
        </div>
    );

    return (
        <div className="Properties">
            <Helmet>
                <title>Shop Used & New Products | Online Marketplace | BuddySphere</title>
                <meta name="description" content="Discover deals on a wide range of new and used products. Buy and sell electronics, furniture, vehicles, and more in our online marketplace." />
            </Helmet>
            {<TabView 
                className="custom-tabview" 
                activeIndex={activeIndex} 
                onTabChange={handleTabChange}
            >
                <TabPanel header={headerTemplate('pi pi-info-circle', 'Description')}>
                    <BrowseAdDescription />
                </TabPanel>
                <TabPanel header={headerTemplate('pi pi-plus-circle', 'Add New Ad')}>
                    <AddItemAd toastRef={toastRef} />
                </TabPanel>
                <TabPanel header={headerTemplate('pi pi-search', 'Search Ads')}>
                    <SearchClassifiedAds toastRef={toastRef} />
                </TabPanel>
                <TabPanel header={headerTemplate('pi pi-user', 'My Ad')}>
                    <MyAd toastRef={toastRef} />
                </TabPanel>
                
            </TabView>}
        </div>
    );
};

export default BrowseAd;