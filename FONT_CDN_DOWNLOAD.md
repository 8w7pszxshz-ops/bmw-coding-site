# Font Download from CDN - Instructions

## Quick Start

Run this command from the project root to download the font:

```bash
node scripts/download-font-cdn.mjs
```

This will:
1. Download the Reborn Technologies font from the CDN
2. Save it to `public/fonts/Reborn-Technologies.ttf`
3. Display the file size and confirmation

## What's Next

After running the script successfully:

1. The font file will be saved at: `public/fonts/Reborn-Technologies.ttf`
2. The CSS file `src/index.css` needs to be updated to use the local path instead of the CDN URL

## CSS Update Required

In `src/index.css`, the @font-face declaration (lines 4-12) currently uses:
```css
src: url("https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/bucket/Reborn%20Technologies.ttf")
```

This needs to be changed to:
```css
src: url("/fonts/Reborn-Technologies.ttf")
```

## Verification

After downloading, verify the font:
```bash
ls -lh public/fonts/Reborn-Technologies.ttf
```

The file should exist and have a reasonable size for a TrueType font file.
