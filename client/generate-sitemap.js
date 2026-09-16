// generate-sitemap.js

const fs = require('fs');
const path = require('path');

// Replace with your actual domain
const BASE_URL = 'https://communityaidhub.com';

// Define your routes that actually exist in the application
// NOTE: Add subcategory routes here as you implement them in your routing structure
const routes = [
    // Main pages (these routes exist)
    '/',
    '/login',
    '/registeruser',
    '/travelbuddy',
    '/properties',
    '/matchmaking',
    '/browseads',
    
    // FUTURE: Add subcategory routes here as you implement nested routing:
    // Travel Buddy subcategories
    // '/travelbuddy/domestic',
    // '/travelbuddy/international',
    
    // Properties subcategories
    // '/properties/buy',
    // '/properties/sell',
    // '/properties/rent',
    // '/properties/lease',
    // '/properties/commercial',
    // '/properties/residential',
    
    // Matchmaking subcategories
    // '/matchmaking/profiles',
    
    // Marketplace/Ads subcategories
    // '/browseads/electronics',
    // '/browseads/furniture',
    // '/browseads/jobs',
    // '/browseads/services',
    // '/browseads/vehicles',
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
console.log(`Total routes: ${routes.length}`);
