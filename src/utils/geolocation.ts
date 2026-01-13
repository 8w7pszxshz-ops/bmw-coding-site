import { City } from '@/components/CitySelector';

interface GeolocationResult {
  city: City | null;
  detected: boolean;
}

const CITY_COORDINATES = {
  saratov: { lat: 51.5, lng: 46.0, radius: 100 },
  moscow: { lat: 55.75, lng: 37.62, radius: 100 }
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export async function detectCityByGeolocation(): Promise<GeolocationResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ city: null, detected: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        for (const [cityKey, coords] of Object.entries(CITY_COORDINATES)) {
          const distance = calculateDistance(latitude, longitude, coords.lat, coords.lng);
          if (distance <= coords.radius) {
            resolve({ city: cityKey as City, detected: true });
            return;
          }
        }
        
        resolve({ city: null, detected: false });
      },
      () => {
        resolve({ city: null, detected: false });
      },
      { timeout: 5000 }
    );
  });
}
