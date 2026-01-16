# Reborn Technologies Font Download Instructions

## Automatic Download (Recommended)

### Option 1: Using Node.js Script
Run this command from the project root:
```bash
node scripts/download-font.mjs
```

This will automatically:
1. Fetch the download URL from Yandex Disk API
2. Download the font file (21,964 bytes)
3. Save it to `public/fonts/RebornTechnologies.ttf`
4. Verify the file size

### Option 2: Using Browser Helper
1. Open `download-font.html` in your browser
2. Click the "Download Font" button
3. The font will be downloaded to your Downloads folder
4. Move the file from Downloads to `public/fonts/RebornTechnologies.ttf`

## Manual Download

### Option 1: Direct from Yandex Disk
1. Visit: https://disk.yandex.ru/d/9ri_46n71GxFmg
2. Click the "Скачать" (Download) button
3. Save the file as `public/fonts/RebornTechnologies.ttf` in your project

### Option 2: Using cURL
```bash
# First, get the download URL
curl "https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=https://disk.yandex.ru/d/9ri_46n71GxFmg" | grep -o '"href":"[^"]*' | cut -d'"' -f4 > download_url.txt

# Then download the font
curl -L -o public/fonts/RebornTechnologies.ttf "$(cat download_url.txt)"

# Clean up
rm download_url.txt
```

### Option 3: Using wget
```bash
# Get download URL and download in one step
wget -O public/fonts/RebornTechnologies.ttf "$(curl -s 'https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=https://disk.yandex.ru/d/9ri_46n71GxFmg' | grep -o '"href":"[^"]*' | cut -d'"' -f4)"
```

## Verification

After downloading, verify the font file:

```bash
# Check if file exists
ls -lh public/fonts/RebornTechnologies.ttf

# Should show: 21964 bytes (or ~21.4 KB)
```

## Font Information

- **File name:** Reborn Technologies ©.ttf
- **Saved as:** RebornTechnologies.ttf
- **Expected size:** 21,964 bytes
- **Format:** TrueType Font (TTF)
- **Source:** Yandex Disk public share

## Next Steps

After downloading the font, you may want to add it to your CSS:

```css
@font-face {
  font-family: 'Reborn Technologies';
  src: url('/fonts/RebornTechnologies.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

Then use it in your components:
```css
.my-element {
  font-family: 'Reborn Technologies', sans-serif;
}
```
