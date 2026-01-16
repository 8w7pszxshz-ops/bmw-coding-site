#!/usr/bin/env node
/**
 * Script to download Reborn Technologies font from CDN
 * Run with: node scripts/download-font-cdn.mjs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FONT_URL = 'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/bucket/Reborn%20Technologies.ttf';

async function downloadFile(url, destPath) {
  const file = fs.createWriteStream(destPath);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(response.headers.location, destPath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => reject(err));
    });
  });
}

async function main() {
  try {
    console.log('Downloading Reborn Technologies font from CDN...');
    console.log('URL:', FONT_URL);
    
    const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
    if (!fs.existsSync(fontsDir)) {
      fs.mkdirSync(fontsDir, { recursive: true });
      console.log('Created fonts directory');
    }
    
    const destPath = path.join(fontsDir, 'Reborn-Technologies.ttf');
    const absolutePath = path.resolve(destPath);
    console.log('Saving to:', absolutePath);
    
    await downloadFile(FONT_URL, destPath);
    
    const stats = fs.statSync(destPath);
    console.log('\n========================================');
    console.log('✓ Font downloaded successfully!');
    console.log('========================================');
    console.log('File path:', absolutePath);
    console.log('File size:', stats.size, 'bytes');
    console.log('========================================\n');
  } catch (error) {
    console.error('\n========================================');
    console.error('✗ Error downloading font');
    console.error('========================================');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('========================================\n');
    process.exit(1);
  }
}

main();