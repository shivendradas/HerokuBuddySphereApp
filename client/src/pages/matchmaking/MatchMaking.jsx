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

const MatchMaking = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        gender: '',
        interests: '',
        location: ''
    });
    const [search, setSearch] = useState('');
    const [profiles, setProfiles] = useState([]);
    const toast = useRef(null);

    const handleTabChange = (e) => {
        setActiveIndex(e.index);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setProfiles(prev => [...prev, profile]);
        setProfile({
            name: '',
            age: '',
            gender: '',
            interests: '',
            location: ''
        });
    };

    const filteredProfiles = profiles.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.interests.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="travelbuddy">
            <TabView
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
                className="custom-tabview"
            >
                <TabPanel header="Add Profile">
                    <AddProfile onAddProfile={(newProfile) => setProfiles(prev => [...prev, newProfile])} />
                </TabPanel>
                <TabPanel header="Search Profiles">
                    <SearchProfile profiles={profiles} search={search} setSearch={setSearch} />
                </TabPanel>
                <TabPanel header="My Profiles">
                    <MyProfile profiles={profiles} />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default MatchMaking;