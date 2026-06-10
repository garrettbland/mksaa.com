const https = require('https');

const urls = [
  'https://www.mksaa.com/post/wichita-s-littlest-heroes-receives-donation-of-over-10-500-from-mid-kansas-auto-auction',
  'https://www.mksaa.com/post/mksaa-holds-first-annual-corn-roast-promotional-sale',
  'https://www.mksaa.com/post/mid-kansas-auto-auction-hosts-first-big-annual-event',
  'https://www.mksaa.com/post/mksaa-holds-birthday-bash-promotional-sale-in-honor-of-founder-mark-ottley',
  'https://www.mksaa.com/post/mid-kansas-auto-auction-celebrates-2nd-anniversary'
];

urls.forEach((url, i) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/<meta property="og:image" content="([^"]+)"/);
      if (match) {
        console.log(`news-${i+8}: ${match[1]}`);
      } else {
        console.log(`news-${i+8}: not found`);
      }
    });
  });
});
