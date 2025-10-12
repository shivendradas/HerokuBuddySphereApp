// generate-sitemap.js

const fs = require('fs');
const path = require('path');

// Replace with your actual domain
const BASE_URL = 'https://communityaidhub.com';

// Define your routes here
const routes = [
    '/',
    '/login',
    '/registeruser',
    '/travelbuddy',
    '/properties',
    '/matchmaking',
    '/browseads',
];

// Optional: Set priorities and changefreqs
const defaultChangeFreq = 'weekly';
const defaultPriority = '0.8';

const sitemapEntries = routes.map((route) => {
    const fullUrl = `${BASE_URL}${route}`;
    const priority = route === '/' ? '1.0' : defaultPriority;

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
