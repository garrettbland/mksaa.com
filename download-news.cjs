const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'images', 'news');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloads = [
  { url: 'https://static.wixstatic.com/media/nsplsh_a5dc772c6ca94418b05c97372282cceb~mv2.jpg', name: 'news-2.jpg' },
  { url: 'https://static.wixstatic.com/media/13f346_9a4a4d08582246fcb1f65bd33a7f936c~mv2.jpg', name: 'news-1.jpg' },
  { url: 'https://static.wixstatic.com/media/1f7d45_4d850a7a4dbf445a9addf4e602e7af56~mv2.png', name: 'news-3.png' },
  { url: 'https://static.wixstatic.com/media/866064_bff6409acef94bb0b6b11e88e3ece269~mv2.jpg', name: 'news-4.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_0da0b258460a4a7ebb03c2a4340bf6b0~mv2.jpg', name: 'news-5.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_e26b02c28e194f81b4c9f0f253613925~mv2.jpg', name: 'news-6.jpg' },
  { url: 'https://static.wixstatic.com/media/091105_c078aa7ced764dbba545cb9405d5515f~mv2.jpg', name: 'news-7.jpg' }
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
