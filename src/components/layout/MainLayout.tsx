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
      {/* Police lights background effect - multiple layers */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 13, 0.45) 25%, transparent 50%, rgba(255, 0, 13, 0.45) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'policeLights 2s linear infinite',
          filter: 'blur(120px)'
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(255, 0, 13, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255, 0, 13, 0.25) 0%, transparent 50%)',
          backgroundSize: '200% 100%',
          animation: 'policeLights 2s linear infinite',
          filter: 'blur(100px)'
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 13, 0.2) 20%, transparent 40%, transparent 60%, rgba(255, 0, 13, 0.2) 80%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'policeLights 2.5s linear infinite',
          filter: 'blur(150px)'
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