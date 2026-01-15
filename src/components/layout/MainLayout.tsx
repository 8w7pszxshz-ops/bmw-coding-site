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
        <BackgroundEffects />
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-20 md:pb-32 relative z-10">
          {children}
        </div>

        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/files/капли.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            mixBlendMode: 'screen',
          }}
        />
      </div>
    </div>
  );
}