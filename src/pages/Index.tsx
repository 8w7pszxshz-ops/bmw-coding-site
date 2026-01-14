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
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';

export default function Index() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  useEffect(() => {
    const initCity = async () => {
      const result = await detectCityByGeolocation();
      if (result.detected && result.city) {
        setSelectedCity(result.city);
      } else {
        setShowCityPulse(true);
        setTimeout(() => setShowCityPulse(false), 5000);
      }
    };
    initCity();
  }, []);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    setShowCityPulse(false);
  };

  return (
    <>
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
    </>
  );
}