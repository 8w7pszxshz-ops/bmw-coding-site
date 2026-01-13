import { City } from '@/components/CitySelector';

interface CityConfig {
  phone: string;
  telegram: string;
  displayPhone: string;
}

export const cityConfigs: Record<City, CityConfig> = {
  saratov: {
    phone: '+79873573338',
    telegram: 'https://t.me/Bocha_reborn',
    displayPhone: '+7 (987) 357-33-38'
  },
  moscow: {
    phone: '+79297775525',
    telegram: 'https://t.me/Bocha_reborn_msk',
    displayPhone: '+7 (929) 777-55-25'
  }
};

export const getCityConfig = (city: City): CityConfig => {
  return cityConfigs[city];
};