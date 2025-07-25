import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        {/* 1. Title and Meta Description */}
        <title>Find Travel Buddies | BuddySphere</title>
        <meta name="description" content="Connect with travel companions, explore job opportunities, and find matchmaking services across India. All on one free platform – BuddySphere." />
        <meta name="keywords" content="free, travel buddy, India travel, find partner, travel app, job search, matchmaking" />

        {/* 2. Open Graph & Twitter Meta Tags */}
        <meta property="og:title" content="Find Travel Buddies | BuddySphere" />
        <meta property="og:description" content="Join BuddySphere to connect with travel companions and discover jobs or matchmaking options across India." />
        <meta property="og:image" content="https://buddysphere-1lbl.onrender.com/header.png" />
        <meta property="og:url" content="https://buddysphere-1lbl.onrender.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find Travel Buddies | BuddySphere" />
        <meta name="twitter:description" content="free, Find travel partners, jobs, and matchmaking services across India on one free platform." />
        <meta name="twitter:image" content="https://buddysphere-1lbl.onrender.com/header.png" />

        {/* 3. Canonical URL */}
        <link rel="canonical" href="https://buddysphere-1lbl.onrender.com/" />

        
        {/* Optional Favicon and Theme */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e90ff" />
      </Helmet>
      <section>
        <h2><b>Welcome to Our Free Travel Buddy Platform</b></h2>
        <p>
          Discover a completely free platform to connect with travel companions for your journeys across India.
          In addition to finding travel buddies, you can also explore job opportunities and matchmaking services—all in one place.
        </p>
      </section>

    </div>
  );
};

export default Home;
