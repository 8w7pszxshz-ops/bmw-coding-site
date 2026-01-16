#!/usr/bin/env node
/**
 * Script to download font from Yandex Disk
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

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
  const urlObj = new URL(url);
  const protocol = urlObj.protocol === 'https:' ? https : http;
  
  return new Promise((resolve, reject) => {
    protocol.get(url, (response) => {
      // Follow redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, destPath)
          .then(resolve)
          .catch(reject);
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
      fs.unlink(destPath, () => reject(err));
    });
  });
}

async function main() {
  try {
    console.log('Fetching download URL from Yandex Disk...');
    const publicUrl = 'https://disk.yandex.ru/d/9ri_46n71GxFmg';
    const downloadUrl = await getDownloadUrl(publicUrl);
    
    console.log('Download URL obtained:', downloadUrl.substring(0, 80) + '...');
    
    const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
    if (!fs.existsSync(fontsDir)) {
      fs.mkdirSync(fontsDir, { recursive: true });
    }
    
    const destPath = path.join(fontsDir, 'RebornTechnologies.ttf');
    console.log('Downloading font to:', destPath);
    
    await downloadFile(downloadUrl, destPath);
    
    const stats = fs.statSync(destPath);
    console.log('\n✓ Font downloaded successfully!');
    console.log('  File:', destPath);
    console.log('  Size:', stats.size, 'bytes');
    
    if (stats.size === 21964) {
      console.log('  ✓ File size matches expected size (21,964 bytes)');
    } else {
      console.log('  ⚠ Warning: File size differs from expected (21,964 bytes)');
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
