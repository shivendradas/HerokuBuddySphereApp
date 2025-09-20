import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy'; // Import custom CSS
import PropertiesDescription from './PropertiesDescription';
import AddRequest from './AddRequest';

const Properties = () => {
    const [activeIndex, setActiveIndex] = useState(0);

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
                    <PropertiesDescription />
                </TabPanel>
                <TabPanel header="Add Property Aid">
                    <AddRequest />
                </TabPanel>
            </TabView>}
        </div>
    );
};

export default Properties;