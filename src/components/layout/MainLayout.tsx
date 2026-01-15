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
            background: `linear-gradient(135deg, #000000 0%, #0a0d15 50%, #000509 100%)`,
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 200, 255, 0.4), transparent),
              radial-gradient(ellipse 600px 800px at 80% 70%, rgba(100, 220, 255, 0.35), transparent),
              radial-gradient(ellipse 500px 500px at 50% 50%, rgba(80, 180, 255, 0.3), transparent),
              radial-gradient(ellipse 400px 400px at 15% 80%, rgba(0, 150, 255, 0.25), transparent),
              radial-gradient(ellipse 350px 350px at 85% 20%, rgba(120, 200, 255, 0.28), transparent)
            `,
            filter: 'blur(40px)',
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/3c496751-7454-4202-9376-e92a9c07ff7a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            mixBlendMode: 'overlay',
          }}
        />
        
        <BackgroundEffects />
        <NavigationBar selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />
        
        <div className="container mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-20 md:pb-32 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}