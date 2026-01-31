import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import CitySelector, { City } from '@/components/CitySelector';

interface NavigationBarProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
  showCityPulse: boolean;
}

function NavigationBarMobile({ selectedCity, onCityChange, showCityPulse }: NavigationBarProps) {
  const [currentTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <img 
            src="https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/bf6e599a-dea7-4790-89ca-1e92a66d7b70.jpg" 
            alt="Logo" 
            className="h-7 w-auto opacity-90"
          />
          <div className="h-4 w-px bg-white/20" />
          <span className="text-white/60 text-xs font-light tracking-wider" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>REBORN BMW</span>
        </div>
        
        <div className="flex items-center gap-3 text-white/60 text-xs">
          <Icon name="Wifi" className="w-3 h-3" />
          <Icon name="Signal" className="w-3 h-3" />
          <div className="font-light tracking-wide">{currentTime}</div>
        </div>
      </div>
      <div className="fixed top-16 left-4 z-50">
        <div className="relative">
          {showCityPulse && (
            <div className="absolute -inset-2 bg-blue-500/30 rounded-lg" />
          )}
          <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
        </div>
      </div>
    </>
  );
}

function NavigationBarDesktop({ selectedCity, onCityChange, showCityPulse }: NavigationBarProps) {
  const [currentTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-3">
        <img 
          src="https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/bf6e599a-dea7-4790-89ca-1e92a66d7b70.jpg" 
          alt="Logo" 
          className="h-10 w-auto opacity-90"
        />
        <div className="h-6 w-px bg-white/20" />
        <span className="text-white/60 text-sm font-light tracking-wider" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>REBORN BMW</span>
      </div>
      
      <div className="flex items-center gap-6 text-white/60 text-sm">
        <div className="relative">
          {showCityPulse && (
            <>
              <div className="absolute -inset-2 bg-blue-500/30 rounded-lg" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Icon name="MapPin" className="w-3 h-3" />
                  <span>Выберите город</span>
                </div>
              </div>
            </>
          )}
          <CitySelector selectedCity={selectedCity} onCityChange={onCityChange} />
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Wifi" className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Signal" className="w-4 h-4" />
        </div>
        <div className="font-light tracking-wide">{currentTime}</div>
      </div>
    </div>
  );
}

interface NavigationBarWrapperProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
  showCityPulse: boolean;
}

export default function NavigationBar({ selectedCity, onCityChange, showCityPulse }: NavigationBarWrapperProps) {
  return (
    <Adaptive
      mobile={<NavigationBarMobile selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />}
      desktop={<NavigationBarDesktop selectedCity={selectedCity} onCityChange={onCityChange} showCityPulse={showCityPulse} />}
    />
  );
}