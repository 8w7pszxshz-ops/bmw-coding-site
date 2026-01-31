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
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 800px 600px at 20% 30%, rgba(255, 0, 0, 0.25), transparent), radial-gradient(ellipse 800px 600px at 80% 70%, rgba(0, 120, 255, 0.25), transparent)',
          filter: 'blur(100px)',
          animation: 'subtleFlash 4s ease-in-out infinite'
        }}
      />
      
      <div className="min-h-screen relative z-10">
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-16 md:pb-24">
          {children}
        </div>
      </div>
    </div>
  );
}