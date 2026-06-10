const fs = require('fs');
const https = require('https');

https.get('https://www.mksaa.com/events', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const matches = data.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~\.\-]+/g) || [];
    const unique = Array.from(new Set(matches));
    console.log(unique.join('\n'));
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
