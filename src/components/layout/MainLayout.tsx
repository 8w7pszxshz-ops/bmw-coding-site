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
          <div className="absolute w-1 animate-rain-drop-1" style={{
            left: '15%',
            top: '-50px',
            height: '80px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.6) 20%, rgba(100, 200, 255, 0.8) 50%, rgba(100, 200, 255, 0.4) 80%, transparent)',
            boxShadow: '0 0 8px rgba(100, 200, 255, 0.5)',
            filter: 'blur(1px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-0.5 animate-rain-drop-2" style={{
            left: '35%',
            top: '-30px',
            height: '60px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.5) 20%, rgba(100, 200, 255, 0.7) 50%, rgba(100, 200, 255, 0.3) 80%, transparent)',
            boxShadow: '0 0 6px rgba(100, 200, 255, 0.4)',
            filter: 'blur(0.5px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-1 animate-rain-drop-3" style={{
            left: '60%',
            top: '-70px',
            height: '90px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.7) 20%, rgba(100, 200, 255, 0.9) 50%, rgba(100, 200, 255, 0.5) 80%, transparent)',
            boxShadow: '0 0 10px rgba(100, 200, 255, 0.6)',
            filter: 'blur(1px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-0.5 animate-rain-drop-4" style={{
            left: '80%',
            top: '-40px',
            height: '70px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.6) 20%, rgba(100, 200, 255, 0.8) 50%, rgba(100, 200, 255, 0.4) 80%, transparent)',
            boxShadow: '0 0 7px rgba(100, 200, 255, 0.5)',
            filter: 'blur(1px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-0.5 animate-rain-drop-5" style={{
            left: '25%',
            top: '-35px',
            height: '55px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.5) 20%, rgba(100, 200, 255, 0.7) 50%, rgba(100, 200, 255, 0.3) 80%, transparent)',
            boxShadow: '0 0 5px rgba(100, 200, 255, 0.4)',
            filter: 'blur(0.5px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-1 animate-rain-drop-6" style={{
            left: '50%',
            top: '-60px',
            height: '85px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.65) 20%, rgba(100, 200, 255, 0.85) 50%, rgba(100, 200, 255, 0.45) 80%, transparent)',
            boxShadow: '0 0 9px rgba(100, 200, 255, 0.55)',
            filter: 'blur(1px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-0.5 animate-rain-drop-7" style={{
            left: '70%',
            top: '-45px',
            height: '65px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.55) 20%, rgba(100, 200, 255, 0.75) 50%, rgba(100, 200, 255, 0.35) 80%, transparent)',
            boxShadow: '0 0 6px rgba(100, 200, 255, 0.45)',
            filter: 'blur(0.5px)',
            borderRadius: '50%',
          }} />
          
          <div className="absolute w-1 animate-rain-drop-8" style={{
            left: '90%',
            top: '-55px',
            height: '75px',
            background: 'linear-gradient(180deg, transparent, rgba(100, 200, 255, 0.6) 20%, rgba(100, 200, 255, 0.8) 50%, rgba(100, 200, 255, 0.4) 80%, transparent)',
            boxShadow: '0 0 8px rgba(100, 200, 255, 0.5)',
            filter: 'blur(1px)',
            borderRadius: '50%',
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