const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./src').filter(f => f.endsWith('.astro'));
let replacedCount = 0;

files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    // THE BUG: importing from "astro/components/Image.astro" crashes the Vite chunks!
    const badTarget = 'import Image from "astro/components/Image.astro";';
    // THE FIX: importing from "astro:assets" is the ONLY proper way in Astro 4+
    const goodReplacement = 'import { Image } from "astro:assets";';
    
    if (content.includes(badTarget)) {
      content = content.split(badTarget).join(goodReplacement);
      fs.writeFileSync(f, content);
      console.log('Fixed:', f);
      replacedCount++;
    }
  } catch (err) {
    console.error('Error on', f, err.message);
  }
});

console.log('Total fixed to proper astro:assets:', replacedCount);
