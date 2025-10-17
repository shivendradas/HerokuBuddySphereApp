import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        {/* 1. Title and Meta Description */}
        <title>BuddySphere | Travel Buddies, Properties, Matchmaking, Shop Used & New</title>
        <meta 
          name="description" 
          content="BuddySphere connects you to travel buddies, property deals (buy/sell/rent/lease), matchmaking, and a platform to buy & sell used or new products. Find companions, homes, jobs, and meaningful connections—all in one free, easy-to-use platform." 
        />
        <meta 
          name="keywords" 
          content="travel buddy, India, companions, property buy sell rent, matchmaking, used products, new products, shop online, travel partners, home rentals, business spaces, relationship services, free platform" 
        />

        {/* 2. Open Graph & Twitter Meta Tags */}
        <meta property="og:title" content="BuddySphere | Travel Buddies, Properties, Matchmaking, Shop Used & New" />
        <meta property="og:description" content="Meet travel buddies, buy/sell/rent properties, explore matchmaking, and shop used or new products with BuddySphere's all-in-one free platform." />
        <meta property="og:image" content="https://communityaidhub.com/header.png" />
        <meta property="og:url" content="https://communityaidhub.com/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BuddySphere | Travel Buddies, Properties, Matchmaking, Shop Used & New" />
        <meta name="twitter:description" content="Find travel partners, property deals, matchmaking, and a vibrant market for used & new goods—free across India." />
        <meta name="twitter:image" content="https://communityaidhub.com/header.png" />

        {/* 3. Canonical URL */}
        <link rel="canonical" href="https://communityaidhub.com/" />

        {/* Optional Favicon and Theme */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e90ff" />
      </Helmet>
      <section>
        <h2><b>Welcome to BuddySphere</b></h2>
        <p>
          BuddySphere is your free all-in-one platform to connect with travel companions, discover property deals (buy, sell, rent or lease), find matchmaking options, and shop for used or new products across India. Start new journeys, find your next home or business space, meaningful connections, and great deals—all in one place.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              backgroundImage: 'url(/utilityAds.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '400px',
              height: '280px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1rem',
              color: '#60A5FA',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Shop Used or New Products
          </div>
          <div
            style={{
              backgroundImage: 'url(/buy_sell_rent.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '400px',
              height: '280px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1rem',
              color: '#60A5FA',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Buy, Sell, Rent & Lease Properties
          </div>
          <div
            style={{
              backgroundImage: 'url(/travelbuddy.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '400px',
              height: '280px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1rem',
              color: '#60A5FA',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Find Travel Buddies
          </div>
          <div
            style={{
              backgroundImage: 'url(/matchmaking.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '400px',
              height: '280px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '1rem',
              color: '#60A5FA',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            Matchmaking Services
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
