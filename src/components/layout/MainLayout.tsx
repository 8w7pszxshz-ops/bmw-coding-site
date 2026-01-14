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
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-0 animate-marble-flow-1"
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/files/mram.jpg)',
              backgroundSize: '150%',
              backgroundPosition: '20% 30%',
              mixBlendMode: 'screen',
              filter: 'brightness(0.4) contrast(1.8) saturate(2) hue-rotate(35deg)',
            }}
          />
          <div 
            className="absolute inset-0 opacity-0 animate-marble-flow-2"
            style={{
              backgroundImage: 'url(https://cdn.poehali.dev/files/mram.jpg)',
              backgroundSize: '120%',
              backgroundPosition: '70% 60%',
              mixBlendMode: 'overlay',
              filter: 'brightness(0.6) contrast(2) saturate(1.8) hue-rotate(45deg) sepia(0.5)',
            }}
          />
          <div 
            className="absolute inset-0 opacity-0 animate-gold-shimmer"
            style={{
              background: 'radial-gradient(ellipse 1200px 800px at var(--shimmer-x, 30%) var(--shimmer-y, 40%), rgba(255, 215, 0, 0.15) 0%, rgba(255, 223, 128, 0.08) 30%, transparent 60%)',
              mixBlendMode: 'screen',
            }}
          />
          <div 
            className="absolute inset-0 opacity-0 animate-marble-glow"
            style={{
              background: `
                radial-gradient(circle 800px at 25% 35%, rgba(255, 215, 0, 0.12), transparent 50%),
                radial-gradient(circle 600px at 75% 65%, rgba(255, 223, 186, 0.08), transparent 50%),
                radial-gradient(circle 400px at 50% 80%, rgba(255, 200, 100, 0.06), transparent 50%)
              `,
              mixBlendMode: 'soft-light',
            }}
          />
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