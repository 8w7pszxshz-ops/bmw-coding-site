#!/usr/bin/env node
/**
 * Script to download font from Yandex Disk
 * Run with: node scripts/download-font.mjs
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getDownloadUrl(publicUrl) {
  const apiUrl = `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(publicUrl)}`;
  
  return new Promise((resolve, reject) => {
    https.get(apiUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.href);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

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
    console.log('Fetching download URL from Yandex Disk...');
    const publicUrl = 'https://disk.yandex.ru/d/9ri_46n71GxFmg';
    const downloadUrl = await getDownloadUrl(publicUrl);
    
    console.log('Download URL obtained');
    console.log('URL length:', downloadUrl.length);
    
    const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
    if (!fs.existsSync(fontsDir)) {
      fs.mkdirSync(fontsDir, { recursive: true });
      console.log('Created fonts directory');
    }
    
    const destPath = path.join(fontsDir, 'RebornTechnologies.ttf');
    const absolutePath = path.resolve(destPath);
    console.log('Downloading font to:', absolutePath);
    
    await downloadFile(downloadUrl, destPath);
    
    const stats = fs.statSync(destPath);
    console.log('\n========================================');
    console.log('✓ Font downloaded successfully!');
    console.log('========================================');
    console.log('File path:', absolutePath);
    console.log('File size:', stats.size, 'bytes');
    
    if (stats.size === 21964) {
      console.log('Status: ✓ File size matches expected (21,964 bytes)');
    } else {
      console.log('Status: ⚠ Warning - File size differs from expected (21,964 bytes)');
    }
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
