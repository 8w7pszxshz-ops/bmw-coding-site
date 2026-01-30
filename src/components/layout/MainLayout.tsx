import { ReactNode } from 'react';
import BackgroundEffects from './BackgroundEffects';
import NavigationBar from './NavigationBar';
import { City } from '@/components/CitySelector';

interface MainLayoutProps {
  children: ReactNode;
  selectedCity: City;
  onCityChange: (city: City) => void;
  showCityPulse: boolean;
}

export default function MainLayout({ children, selectedCity, onCityChange, showCityPulse }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Плавные красные мигалки на фоне */}
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none blur-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 51, 0.7) 25%, transparent 50%, rgba(0, 212, 255, 0.7) 75%, rgba(56, 189, 248, 0.7) 100%)',
          backgroundSize: '400% 400%',
          animation: 'policeLights 2s steps(4, jump-both) infinite'
        }}
      />
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none blur-2xl"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(255, 0, 0, 0.7) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(0, 212, 255, 0.7) 0%, transparent 50%)',
          animation: 'breathePulse 1.5s steps(3, jump-both) infinite'
        }}
      />
      
      <div 
        className="min-h-screen relative"
      >
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-16 md:pb-24 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}