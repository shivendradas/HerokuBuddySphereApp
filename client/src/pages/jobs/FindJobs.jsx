import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const FindJobs = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    return (
        <div className="travelbuddy">
            Work is in progress for Jobs feature.
        </div>
    );
};

export default FindJobs;