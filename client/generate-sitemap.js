// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://buddysphere-1lbl.onrender.com' });

  const routes = [
    '/', '/travelbuddy', '/matchmaking', '/findjobs' // Add all your app routes here
  ];

  routes.forEach((url) => sitemap.write({ url }));
  sitemap.end();

  const data = await streamToPromise(sitemap);
  createWriteStream('./public/sitemap.xml').write(data);
})();
