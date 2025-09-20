import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../travelbuddy/Travelbuddy'; // Add scroll style here

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
      <section
        className="max-w-4xl mx-auto p-6 shadow-md rounded"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.4)' // Transparent background
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Properties Portal</h1>
        <p className="mb-4">
          Welcome to our Properties Portal, your one-stop destination for buying, selling, and renting properties. Whether you are looking for your dream home, a commercial space, or an investment opportunity, our platform makes it easy to find the right property.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Advertise your own property for sale, rent, or lease.</li>
          <li>Search and filter properties by location, price, type, and more.</li>
          <li>Connect directly with property owners and agents.</li>
          <li>Explore featured listings and new opportunities.</li>
        </ul>
        <p>
          Start your property journey today by browsing listings or posting your own property to reach potential buyers and renters!
        </p>
      </section>
      {/* Optional: Add a semi-transparent overlay for better text readability */}
      <div
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default PropertiesDescription;
