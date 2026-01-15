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
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 150, 255, 0.15), transparent),
            radial-gradient(ellipse 600px 800px at 80% 70%, rgba(100, 200, 255, 0.12), transparent),
            radial-gradient(ellipse 400px 400px at 50% 50%, rgba(50, 180, 255, 0.08), transparent),
            linear-gradient(135deg, #000000 0%, #0a0d15 50%, #000509 100%)
          `,
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-water-droplets-1" style={{
            background: `
              radial-gradient(circle 3px at 15% 20%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 2px at 45% 35%, rgba(100, 200, 255, 0.4), transparent),
              radial-gradient(circle 4px at 75% 15%, rgba(100, 200, 255, 0.6), transparent),
              radial-gradient(circle 2px at 25% 60%, rgba(100, 200, 255, 0.3), transparent),
              radial-gradient(circle 3px at 85% 45%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 2px at 55% 75%, rgba(100, 200, 255, 0.4), transparent),
              radial-gradient(circle 3px at 10% 85%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 4px at 65% 90%, rgba(100, 200, 255, 0.6), transparent)
            `,
            mixBlendMode: 'screen',
            filter: 'blur(1px)',
          }} />
          
          <div className="absolute inset-0 animate-water-droplets-2" style={{
            background: `
              radial-gradient(circle 2px at 30% 10%, rgba(100, 200, 255, 0.4), transparent),
              radial-gradient(circle 3px at 60% 25%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 2px at 90% 40%, rgba(100, 200, 255, 0.3), transparent),
              radial-gradient(circle 4px at 40% 55%, rgba(100, 200, 255, 0.6), transparent),
              radial-gradient(circle 2px at 70% 70%, rgba(100, 200, 255, 0.4), transparent),
              radial-gradient(circle 3px at 20% 80%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 2px at 80% 95%, rgba(100, 200, 255, 0.3), transparent)
            `,
            mixBlendMode: 'screen',
            filter: 'blur(1px)',
          }} />
          
          <div className="absolute inset-0 animate-water-droplets-3" style={{
            background: `
              radial-gradient(circle 3px at 50% 5%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 2px at 5% 30%, rgba(100, 200, 255, 0.3), transparent),
              radial-gradient(circle 4px at 35% 45%, rgba(100, 200, 255, 0.6), transparent),
              radial-gradient(circle 2px at 95% 60%, rgba(100, 200, 255, 0.4), transparent),
              radial-gradient(circle 3px at 50% 80%, rgba(100, 200, 255, 0.5), transparent),
              radial-gradient(circle 2px at 15% 95%, rgba(100, 200, 255, 0.3), transparent)
            `,
            mixBlendMode: 'screen',
            filter: 'blur(1px)',
          }} />
        </div>
        <BackgroundEffects />
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-20 md:pb-32">
          {children}
        </div>
      </div>
    </div>
  );
}