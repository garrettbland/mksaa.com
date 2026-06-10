const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'images', 'news');

const downloads = [
  { url: 'https://static.wixstatic.com/media/866064_6ccd00dd8cd34d0a98904a126cac9d14~mv2.jpg', name: 'news-8.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_24c30e52d01944a7a8b51f0307987938~mv2.jpg', name: 'news-9.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_00f3872f51d944158e4eedfe7416624d~mv2.jpg', name: 'news-10.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_f5944c05384746a89938e79cc9fd883d~mv2.jpg', name: 'news-11.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_1289dc8fd7f640f894b0a67ab45c79e0~mv2.jpg', name: 'news-12.jpg' }
];

downloads.forEach(({url, name}) => {
  const file = fs.createWriteStream(path.join(dir, name));
  https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();  // close() is async, call cb after close completes.
      console.log('Downloaded', name);
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(path.join(dir, name)); // Delete the file async. (But we don't check the result)
    console.error('Error downloading', name, err);
  });
});
