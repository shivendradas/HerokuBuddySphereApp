import React from 'react';
import { Helmet } from 'react-helmet';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy';

const PropertiesDescription = () => {
  return (
    <div
      className="travelbuddy-scroll-container"
      style={{
        backgroundImage: 'url(/buy_sell_rent.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <Helmet>
        <title>Best Free Properties Portal - Buy, Sell & Rent with Ease</title>
        <meta
          name="description"
          content="Discover the best platform for buying, selling, and renting properties for free. Find verified listings, connect with trusted agents, and get expert support."
        />
      </Helmet>
      <section
        className="max-w-4xl mx-auto p-6 shadow-md rounded"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(10px)' // Added blur for modern effect
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Your Ultimate Properties Portal</h1>
        <p className="mb-4">
          Welcome to the most trusted and user-friendly platform for all your property needs.
          Whether you're buying, selling, or renting, we make the process simple, transparent, and free of charge.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Post your property listings easily without any fees or commissions.</li>
          <li>Access a wide range of verified properties with advanced filtering options.</li>
          <li>Directly communicate with verified owners and professional agents for faster deals.</li>
          <li>Stay updated with featured properties, latest market trends, and expert advice.</li>
        </ul>
        <p>
          Join thousands of satisfied users who trust us to find their perfect property. Start exploring or list your property today and experience hassle-free real estate transactions!
        </p>
         <div className="p-4 mb-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded" style={{background: 'rgba(255,255,204,0.5)'}}>
          <strong>Disclaimer:</strong> This platform is only a marketplace for connecting property owners, buyers, sellers, tenants, landlords, and agents. Property information, listings, prices, ownership details, and other content are provided by users or third parties and are not guaranteed to be accurate, complete, or legally valid. Users are responsible for independently verifying all property details, documents, ownership, approvals, and transaction terms and should exercise due diligence before making any payment or entering into an agreement. The platform is not responsible for any loss, dispute, fraud, or transaction between users.
        </div>
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

export default PropertiesDescription;
