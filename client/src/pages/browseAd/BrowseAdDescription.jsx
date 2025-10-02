import React from 'react';
import { Helmet } from 'react-helmet';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const BrowseAdDescription = () => {
  return (
    <div
      className="free-ads-scroll-container"
      style={{
        backgroundImage: 'url(/utilityAds.png)', // Update image for free ads selling theme
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <Helmet>
        <title>Post Free Ads to Sell Your Products - TVs, Laptops, Appliances & More</title>
        <meta
          name="description"
          content="Sell your new or used products for free! Post ads for TVs, laptops, refrigerators, and other electronics. Reach thousands of potential buyers quickly and easily."
        />
      </Helmet>
      <section
        className="max-w-4xl mx-auto p-6 shadow-md rounded"
        style={{
          position: 'relative',
          zIndex: 2,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Sell Your Products for Free</h1>
        <p className="mb-4">
          Whether you're selling a brand new TV, a used laptop, or home appliances like refrigerators, our free classifieds platform makes it easy to reach interested buyers. Post your ad quickly with photos, descriptions, and pricing details.
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Advertise new or used products like TVs, laptops, refrigerators, and more.</li>
          <li>Upload images and detailed descriptions to attract serious buyers.</li>
          <li>Search and browse ads by category, location, brand, and price range.</li>
          <li>Connect safely with sellers or buyers through secure messaging.</li>
          <li>Post your ads for free with no hidden fees or subscriptions.</li>
        </ul>
        <p>
          Join thousands of users who are successfully buying and selling their products every day. Start posting your free ad now and find the right buyer in no time!
        </p>
      </section>
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

export default BrowseAdDescription;
