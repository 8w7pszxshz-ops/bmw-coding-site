#!/usr/bin/env python3
"""
Script to download Reborn Technologies font from Yandex Disk
Run with: python scripts/download_font.py
"""

import os
import sys
import json
import urllib.request
import urllib.parse
from pathlib import Path

def get_download_url(public_url):
    """Get direct download URL from Yandex Disk API"""
    api_url = f"https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key={urllib.parse.quote(public_url)}"
    
    try:
        with urllib.request.urlopen(api_url) as response:
            data = json.loads(response.read().decode())
            return data.get('href')
    except Exception as e:
        print(f"Error fetching download URL: {e}")
        return None

def download_file(url, dest_path):
    """Download file from URL to destination path"""
    try:
        print(f"Downloading from Yandex servers...")
        with urllib.request.urlopen(url) as response:
            data = response.read()
            
        with open(dest_path, 'wb') as f:
            f.write(data)
            
        return len(data)
    except Exception as e:
        print(f"Error downloading file: {e}")
        return None

def main():
    print("=" * 60)
    print("Reborn Technologies Font Downloader")
    print("=" * 60)
    
    # Get script directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    fonts_dir = project_root / "public" / "fonts"
    
    # Create fonts directory if it doesn't exist
    fonts_dir.mkdir(parents=True, exist_ok=True)
    
    dest_path = fonts_dir / "RebornTechnologies.ttf"
    
    print(f"\nStep 1/3: Fetching download URL from Yandex Disk API...")
    public_url = "https://disk.yandex.ru/d/9ri_46n71GxFmg"
    download_url = get_download_url(public_url)
    
    if not download_url:
        print("\n✗ Failed to get download URL")
        print("\nPlease try manual download:")
        print(f"  1. Visit: {public_url}")
        print("  2. Click the Download button")
        print(f"  3. Save to: {dest_path.absolute()}")
        sys.exit(1)
    
    print("✓ Download URL obtained")
    
    print(f"\nStep 2/3: Downloading font file...")
    file_size = download_file(download_url, dest_path)
    
    if not file_size:
        print("\n✗ Failed to download font")
        sys.exit(1)
    
    print(f"✓ Downloaded {file_size:,} bytes")
    
    print(f"\nStep 3/3: Verifying download...")
    
    if dest_path.exists():
        actual_size = dest_path.stat().st_size
        expected_size = 21964
        
        print("\n" + "=" * 60)
        print("✓ Font downloaded successfully!")
        print("=" * 60)
        print(f"File path: {dest_path.absolute()}")
        print(f"File size: {actual_size:,} bytes")
        
        if actual_size == expected_size:
            print(f"Status: ✓ File size matches expected ({expected_size:,} bytes)")
        else:
            print(f"Status: ⚠ File size differs from expected ({expected_size:,} bytes)")
            print(f"        Difference: {actual_size - expected_size:+,} bytes")
        
        print("=" * 60)
        print("\nNext steps:")
        print("  1. Add @font-face rule to your CSS if needed")
        print("  2. Use font-family: 'Reborn Technologies' in your styles")
        print("=" * 60)
    else:
        print("\n✗ File was not created")
        sys.exit(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nDownload cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
