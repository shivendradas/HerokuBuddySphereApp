import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './Travelbuddy.css'; // Add scroll style here

const TrabelBuddyDescription = () => {
  return (
    <div
      className="travelbuddy-scroll-container"
      style={{
        backgroundImage: 'url(/travelbuddy.png)',
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
        <h1 className="text-2xl font-semibold mb-4">Travel Buddy - How It Works</h1>

        <p className="mb-4">
          Welcome to the <strong>Travel Buddy</strong> feature! This tool helps you connect with others who share similar travel plans or interests. Whether you're looking for a ride or offering one, this platform enables seamless coordination.
        </p>

        <h2 className="text-xl font-medium mb-2">How to Use</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Add a Request:</strong> Users can submit their travel details using the <em>Add Request</em> tab. Simply select your origin, destination, travel date, and user type.
          </li>
          <li>
            <strong>User Types:</strong>
            <ul className="list-disc ml-5">
              <li><strong>Driver:</strong> If you have your own vehicle and are willing to offer a ride, choose the "Driver" option.</li>
              <li><strong>Passenger:</strong> If you're looking for a ride, select the "Passenger" option.</li>
            </ul>
          </li>
          <li>
            <strong>Find a Buddy:</strong> Head over to the <em>Find Buddy</em> tab to search for available ride options. You can filter by user type, cities, and travel date range.
          </li>
        </ul>

        <h2 className="text-xl font-medium mb-2">Search and Match</h2>
        <p className="mb-4">
          Use the search filters to narrow down results based on your preferences. Select a date range, origin and destination cities, and the user type you're interested in (Driver or Passenger) to find the most relevant matches for your journey.
        </p>

        <div className="p-4 mb-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded" style={{background: 'rgba(255,255,204,0.5)'}}>
          <strong>Disclaimer:</strong> Travel Buddy only facilitates the connection between drivers and passengers. It is solely your responsibility to verify the authenticity and reliability of the individuals you choose to connect with. We do not guarantee the legitimacy or safety of any listed driver or passenger. Always perform your own checks and exercise caution before proceeding with any ride.
        </div>

        <p className="text-gray-600">
          Start your journey smarter with Travel Buddy – where travel meets connection.
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

export default TrabelBuddyDescription;
