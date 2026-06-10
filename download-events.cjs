const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'images', 'events');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const downloads = [
  { url: 'https://static.wixstatic.com/media/914c06_4a5596f7f6b746dbbc9a69d545a80775~mv2.png', name: 'helping-hands.png' },
  { url: 'https://static.wixstatic.com/media/914c06_c09553f31c9d48c89aecae4628906ed1~mv2.png', name: 'big-annual.png' },
  { url: 'https://static.wixstatic.com/media/914c06_c18a9c3a11144471962e05c760f6030c~mv2.png', name: 'bag-sale.png' },
  { url: 'https://static.wixstatic.com/media/914c06_bfe5b6d0c32541419b5521408e6d5909~mv2.png', name: 'corn-roast.png' },
  { url: 'https://static.wixstatic.com/media/914c06_9b08c39ed06246158b5d6b9c3d5aa958~mv2.png', name: 'oktoberfest.png' },
  { url: 'https://static.wixstatic.com/media/914c06_42f0f51bc6e142f582639e4603d7c678~mv2.png', name: 'time-is-right.png' }
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
