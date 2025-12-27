import { useState } from 'react';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/HeroSection';
import SpecialOffer from '@/components/SpecialOffer';
import CodingPackages from '@/components/CodingPackages';
import ChipTuning from '@/components/ChipTuning';
import ServicesGrid from '@/components/ServicesGrid';
import ExpertTips from '@/components/ExpertTips';
import Reviews from '@/components/Reviews';
import QuickActions from '@/components/QuickActions';

export default function Index() {
  const [currentTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

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
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(0, 150, 255, 0.2), transparent)',
              top: '10%',
              left: '15%',
              animationDuration: '4s'
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(100, 200, 255, 0.15), transparent)',
              bottom: '15%',
              right: '20%',
              animationDuration: '5s',
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(50, 180, 255, 0.18), transparent)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: '6s',
              animationDelay: '2s'
            }}
          />
        </div>
        
        <div className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/reborn.jpg" 
              alt="Logo" 
              className="h-10 w-auto opacity-90"
            />
            <div className="h-6 w-px bg-white/20" />
            <span className="text-white/60 text-sm font-light tracking-wider" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>REBORN BMW</span>
          </div>
          
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Wifi" className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Signal" className="w-4 h-4" />
            </div>
            <div className="font-light tracking-wide">{currentTime}</div>
          </div>
        </div>

        <div className="container mx-auto px-6 pt-24 pb-32">
          <HeroSection />
          <SpecialOffer />
          <ServicesGrid />
          <CodingPackages />
          <ChipTuning />
          <ExpertTips />
          <Reviews />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}