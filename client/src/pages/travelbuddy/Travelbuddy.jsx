import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Travelbuddy.css'; // Import custom CSS
import AddRequest from './AddRequest';
import FindBuddy from './FindBuddy';

const Travelbuddy = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="travelbuddy">
            <TabView 
                className="custom-tabview" 
                activeIndex={activeIndex} 
                onTabChange={handleTabChange}
            >
                <TabPanel header="Add">
                    <AddRequest/>
                </TabPanel>
                <TabPanel header="Find Buddy">
                    <FindBuddy/>
                </TabPanel>
            </TabView>
            {/* <div className="active-tab-info">
                <p>Active Tab: {activeIndex === 0 ? 'Add Buddy' : 'Find Buddy'}</p>
            </div> */}
        </div>
    );
};

export default Travelbuddy;