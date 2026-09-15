// generate-sitemap.js

const fs = require('fs');
const path = require('path');

// Replace with your actual domain
const BASE_URL = 'https://communityaidhub.com';

// Define your routes with categories for better SEO
const routes = [
    // Main pages
    '/',
    '/login',
    '/registeruser',
    
    // Travel Buddy section
    '/travelbuddy',
    '/travelbuddy/domestic',
    '/travelbuddy/international',
    
    // Properties section
    '/properties',
    '/properties/buy',
    '/properties/sell',
    '/properties/rent',
    '/properties/lease',
    '/properties/commercial',
    '/properties/residential',
    
    // Matchmaking
    '/matchmaking',
    '/matchmaking/profiles',
    
    // Marketplace/Ads
    '/browseads',
    '/browseads/electronics',
    '/browseads/furniture',
    '/browseads/jobs',
    '/browseads/services',
    '/browseads/vehicles',
];

// Optional: Set priorities and changefreqs
const defaultChangeFreq = 'weekly';
const defaultPriority = '0.8';

const sitemapEntries = routes.map((route) => {
    const fullUrl = `${BASE_URL}${route}`;
    
    // Higher priority for main feature pages
    let priority = defaultPriority;
    if (route === '/') priority = '1.0';
    else if (['/travelbuddy', '/properties', '/matchmaking', '/browseads'].includes(route)) priority = '0.9';

    return `
    <url>
        <loc>${fullUrl}</loc>
        <changefreq>${defaultChangeFreq}</changefreq>
        <priority>${priority}</priority>
    </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, 'public', 'sitemap.xml');

// Ensure public directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Write to sitemap.xml
fs.writeFileSync(outputPath, sitemap.trim());

console.log(`Sitemap successfully generated at: ${outputPath}`);
