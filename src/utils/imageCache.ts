const CACHE_NAME = 'reborn-image-cache-v1';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 дней

interface CachedImage {
  url: string;
  timestamp: number;
}

export async function cacheImage(url: string): Promise<string> {
  if (!('caches' in window)) {
    return url;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
      const metadata = await getImageMetadata(url);
      if (metadata && Date.now() - metadata.timestamp < CACHE_EXPIRY) {
        return url;
      }
    }

    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response.clone());
      await setImageMetadata(url);
    }

    return url;
  } catch (error) {
    console.warn('Image cache error:', error);
    return url;
  }
}

async function getImageMetadata(url: string): Promise<CachedImage | null> {
  try {
    const metadata = localStorage.getItem(`img_cache_${btoa(url)}`);
    return metadata ? JSON.parse(metadata) : null;
  } catch {
    return null;
  }
}

async function setImageMetadata(url: string): Promise<void> {
  try {
    const metadata: CachedImage = {
      url,
      timestamp: Date.now(),
    };
    localStorage.setItem(`img_cache_${btoa(url)}`, JSON.stringify(metadata));
  } catch (error) {
    console.warn('Failed to set image metadata:', error);
  }
}

export async function clearExpiredCache(): Promise<void> {
  if (!('caches' in window)) return;

  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();

    for (const request of requests) {
      const metadata = await getImageMetadata(request.url);
      if (metadata && Date.now() - metadata.timestamp >= CACHE_EXPIRY) {
        await cache.delete(request);
        localStorage.removeItem(`img_cache_${btoa(request.url)}`);
      }
    }
  } catch (error) {
    console.warn('Failed to clear expired cache:', error);
  }
}

export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
    cacheImage(url);
  });
}
