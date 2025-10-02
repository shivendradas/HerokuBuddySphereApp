import React from 'react';
import { Helmet } from 'react-helmet';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy';

const MatchMakingDescription = () => {
  return (
    <div
      className="travelbuddy-scroll-container"
      style={{
        backgroundImage: 'url(/matchmaking.png)', // Update image for matchmaking theme
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <Helmet>
        <title>Find Your Perfect Match - Bride & Groom Profiles</title>
        <meta
          name="description"
          content="Discover and connect with compatible brides and grooms. Create your profile and start your journey to find the perfect life partner today!"
        />
      </Helmet>
      <section
        className="max-w-4xl mx-auto p-6 shadow-md rounded"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Matchmaking Portal</h1>
        <p className="mb-4">
          Looking for your life partner? Our trusted matchmaking platform helps you find compatible brides and grooms from diverse backgrounds.
          Create your profile, specify your preferences, and explore verified profiles tailored to your ideal match.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Add your detailed profile to be discovered by potential matches.</li>
          <li>Search and filter profiles based on age, location, religion, and more.</li>
          <li>Connect directly with matches through secure messaging.</li>
          <li>Enjoy a safe, private, and respectful community focused on meaningful relationships.</li>
        </ul>
        <p>
          Join thousands who have found their perfect match through our platform. Start your journey today by creating your profile or browsing groom and bride profiles now!
        </p>
      </section>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.4)',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default MatchMakingDescription;
