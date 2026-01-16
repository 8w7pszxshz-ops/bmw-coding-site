import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/HeroSection';
import SpecialOffer from '@/components/SpecialOffer';
import CalculatorHub from '@/components/CalculatorHub';
import ServicesGrid from '@/components/ServicesGrid';
import ExpertTips from '@/components/ExpertTips';
import Reviews from '@/components/Reviews';
import QuickActions from '@/components/QuickActions';
import StickyContactButton from '@/components/StickyContactButton';
import BurgerMenu from '@/components/BurgerMenu';
import FloatingAIButton from '@/components/FloatingAIButton';
import PullToRefresh from '@/components/PullToRefresh';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { preloadImages, clearExpiredCache } from '@/utils/imageCache';

export default function Index() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initCity = async () => {
      const result = await detectCityByGeolocation();
      if (result.detected && result.city) {
        setSelectedCity(result.city);
      } else {
        setShowCityPulse(true);
        setTimeout(() => setShowCityPulse(false), 5000);
      }
      setIsLoading(false);
    };
    initCity();

    // Предзагрузка ключевых изображений
    preloadImages([
      'https://cdn.poehali.dev/files/rebornlogo.png',
      'https://cdn.poehali.dev/files/reborn.jpg',
    ]);

    // Очистка устаревшего кэша
    clearExpiredCache();
  }, []);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setShowCityPulse(false);
  };

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-white/60 text-sm">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <StickyContactButton selectedCity={selectedCity} />
      <BurgerMenu />
      <FloatingAIButton />
      <MainLayout selectedCity={selectedCity} onCityChange={handleCityChange} showCityPulse={showCityPulse}>
      <HeroSection />
      <div id="offers">
        <SpecialOffer selectedCity={selectedCity} />
      </div>
      <CalculatorHub selectedCity={selectedCity} />
      <div id="services">
        <ServicesGrid selectedCity={selectedCity} />
      </div>
      <div id="tips">
        <ExpertTips />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <div id="contact">
        <QuickActions selectedCity={selectedCity} />
      </div>
    </MainLayout>
    </PullToRefresh>
  );
}