const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'images', 'news');

const downloads = [
  { url: 'https://static.wixstatic.com/media/11062b_b5690303a8ff470e9b1c03a24aff140b~mv2.png', name: 'news-8.png' },
  { url: 'https://static.wixstatic.com/media/091105_01421c304aeb4626b362a92edab1bc45~mv2.png', name: 'news-9.png' },
  { url: 'https://static.wixstatic.com/media/091105_7cfb52c6652146729e461ad52fcb091b~mv2.png', name: 'news-10.png' },
  { url: 'https://static.wixstatic.com/media/091105_e52c24ea8a0442ef9d0e2f39ad8f6b61~mv2.png', name: 'news-11.png' },
  { url: 'https://static.wixstatic.com/media/091105_313c315193274d3db3be1b2ac9ef1a1c~mv2.png', name: 'news-12.png' }
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
