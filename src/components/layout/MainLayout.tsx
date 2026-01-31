import { ReactNode } from 'react';
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
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 25% 40%, rgba(255, 0, 0, 0.4), transparent 70%), radial-gradient(circle 600px at 75% 60%, rgba(0, 150, 255, 0.4), transparent 70%)',
          filter: 'blur(120px)',
          animation: 'subtleFlash 3.5s ease-in-out infinite',
          zIndex: 1
        }}
      />
      
      <div className="min-h-screen relative" style={{ zIndex: 10 }}>
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-16 md:pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}