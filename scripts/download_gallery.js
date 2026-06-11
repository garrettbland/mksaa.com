import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wix image IDs extracted from the frontmatter
const imageIds = [
  "1f7d45_1843945032cd484a9e3de463157155d3~mv2",
  "1f7d45_b8052f65734b4721b615c9704cf00494~mv2",
  "1f7d45_2a1d10348c4b4a3a9a2f175aa80eec12~mv2",
  "1f7d45_1f66957f70794415b8b152316fd84082~mv2",
  "1f7d45_6e5cbde488a84307ae1496cb0815ca0d~mv2",
  "1f7d45_e924f1e1d9514ab3ac018291046d8c79~mv2",
  "1f7d45_0d62fbd34cba4d5795417442155cf53f~mv2",
  "1f7d45_816597a77f2f41159a8d9050e69f55d6~mv2"
];

// Try various Wix URL patterns
function getUrlVariants(id) {
  return [
    `https://static.wixstatic.com/media/${id}.jpg/v1/fill/w_800,h_600,al_c,q_85/${id}.jpg`,
    `https://static.wixstatic.com/media/${id}.jpg`,
    `https://static.wixstatic.com/media/${id}/v1/fill/w_800,h_600/${id}.jpg`,
  ];
}

const outDir = path.join(__dirname, '../public/images/events/gallery');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.mksaa.com/'
      }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          if (stats.size < 100) {
            reject(new Error(`File too small: ${stats.size} bytes`));
          } else {
            console.log(`  -> ${stats.size} bytes`);
            resolve();
          }
        });
      });
    });
    req.on('error', reject);
  });
}

async function main() {
  for (let i = 0; i < imageIds.length; i++) {
    const dest = path.join(outDir, `helping-hands-${i + 1}.jpg`);
    const variants = getUrlVariants(imageIds[i]);
    let success = false;
    
    for (const url of variants) {
      console.log(`Image ${i + 1}: trying ${url}`);
      try {
        await download(url, dest);
        success = true;
        break;
      } catch (err) {
        console.log(`  FAILED: ${err.message}`);
      }
    }
    
    if (!success) {
      console.log(`  *** Could not download image ${i + 1} with any URL variant`);
    }
  }
  console.log("Done.");
}

main().catch(console.error);
