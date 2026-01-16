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
            background: `
              radial-gradient(circle 600px at 15% 25%, #1a1f3a 0%, transparent 50%),
              radial-gradient(circle 700px at 85% 70%, #0f1f2d 0%, transparent 50%),
              radial-gradient(circle 500px at 50% 90%, #1e142a 0%, transparent 50%),
              linear-gradient(135deg, #0a0e1a 0%, #12192b 100%)
            `,
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 400px at 20% 30%, rgba(80, 100, 200, 0.15), transparent),
              radial-gradient(ellipse 600px 500px at 80% 65%, rgba(40, 140, 160, 0.12), transparent),
              radial-gradient(circle 400px at 90% 20%, rgba(200, 60, 80, 0.1), transparent),
              radial-gradient(circle 350px at 10% 80%, rgba(180, 50, 70, 0.08), transparent)
            `,
            filter: 'blur(60px)',
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.6) 100%)
            `,
          }}
        />
        
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
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