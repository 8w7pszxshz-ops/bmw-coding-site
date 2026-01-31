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
          background: 'radial-gradient(ellipse 900px 700px at 15% 35%, rgba(255, 0, 0, 0.5), transparent 65%), radial-gradient(ellipse 900px 700px at 85% 65%, rgba(0, 150, 255, 0.5), transparent 65%)',
          filter: 'blur(90px)',
          animation: 'subtleFlash 3s ease-in-out infinite',
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