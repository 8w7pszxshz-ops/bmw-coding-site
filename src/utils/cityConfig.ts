import { City } from '@/components/CitySelector';

interface CityConfig {
  phone: string;
  telegram: string;
  displayPhone: string;
}

export const cityConfigs: Record<City, CityConfig> = {
  saratov: {
    phone: '+79873573338',
    telegram: 'https://t.me/bocha_reborn',
    displayPhone: '+7 (987) 357-33-38'
  },
  moscow: {
    phone: '+79297775525',
    telegram: 'https://t.me/bocha_reborn',
    displayPhone: '+7 (987) 357-33-38'
  }
};

export const getCityConfig = (city: City): CityConfig => {
  return cityConfigs[city];
};

const cityNames: Record<City, string> = {
  saratov: 'Саратов',
  moscow: 'Саратов'
};

export const getTelegramLink = (city: City, service?: string): string => {
  const config = getCityConfig(city);
  const baseUrl = config.telegram;
  const cityName = cityNames[city];
  
  if (!service) {
    return baseUrl;
  }
  
  const message = encodeURIComponent(`Здравствуйте! Интересует ${service}. Город: ${cityName}`);
  return `${baseUrl}?text=${message}`;
};