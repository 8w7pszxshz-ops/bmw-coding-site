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
      <div 
        className="min-h-screen relative"
      >
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #000000 0%, #0a1428 100%)`,
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, transparent 0%, rgba(200, 220, 255, 0.08) 20%, transparent 30%, transparent 70%, rgba(255, 100, 120, 0.06) 80%, transparent 100%),
              linear-gradient(315deg, transparent 0%, rgba(180, 200, 255, 0.06) 15%, transparent 25%, transparent 75%, rgba(255, 80, 100, 0.05) 85%, transparent 100%)
            `,
            filter: 'blur(50px)',
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle 400px at 50% 50%, rgba(0, 0, 0, 0.7), transparent)
            `,
          }}
        />
        

        
        <BackgroundEffects />
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-16 md:pt-20 pb-16 md:pb-24 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}