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
      {/* Police lights background effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 13, 0.35) 25%, transparent 50%, rgba(255, 0, 13, 0.35) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'policeLights 2s linear infinite',
          filter: 'blur(80px)'
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