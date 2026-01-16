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
            background: `linear-gradient(135deg, #0a1628 0%, #0d1b2a 50%, #08121d 100%)`,
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 1200px 800px at 10% 20%, rgba(0, 180, 255, 0.15), transparent),
              radial-gradient(ellipse 1000px 700px at 90% 80%, rgba(220, 40, 80, 0.12), transparent)
            `,
            filter: 'blur(60px)',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent 0px, rgba(0, 180, 255, 0.03) 1px, transparent 2px, transparent 40px),
              repeating-linear-gradient(90deg, transparent 0px, rgba(0, 180, 255, 0.03) 1px, transparent 2px, transparent 40px)
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