import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';
import type { Series } from './SeriesSelector';

const stages = [
  { 
    id: 'stage1',
    name: 'STAGE 1',
    description: 'БАЗОВАЯ ПРОШИВКА ЭБУ',
    priceBase: 25000,
    gains: '+20-30% МОЩНОСТИ'
  },
  { 
    id: 'stage2',
    name: 'STAGE 2',
    description: 'ПРОДВИНУТАЯ ПРОШИВКА + ДАУНПАЙП',
    priceBase: 45000,
    gains: '+30-40% МОЩНОСТИ'
  }
];

interface StageSelectorProps {
  selectedSeries: Series;
  selectedCity: City;
  onReset: () => void;
}

export default function StageSelector({ selectedSeries, selectedCity, onReset }: StageSelectorProps) {
  const [selectedStage, setSelectedStage] = React.useState<string | null>(null);

  const handleOrder = () => {
    if (!selectedStage) return;
    
    const stage = stages.find(s => s.id === selectedStage);
    if (!stage) return;

    const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
    
    const message = `ЧИП-ТЮНИНГ BMW ${selectedSeries}\n\n${stage.name}\n${stage.description}\n${stage.gains}\n\nСТОИМОСТЬ: ${price.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.3) 0%, rgba(255, 0, 51, 0.4) 50%, rgba(0, 212, 255, 0.3) 50%, rgba(56, 189, 248, 0.4) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 51, 0.7) 50%, rgba(0, 212, 255, 0.7) 50%, rgba(56, 189, 248, 0.7) 100%) 1',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          boxShadow: '0 0 15px rgba(127, 106, 127, 0.5)'
        }}
      >
        <Icon name="ChevronLeft" className="w-5 h-5 text-white" />
        <span 
          className="tracking-wider text-white uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// НАЗАД
        </span>
      </button>

      <div 
        className="p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 8, 8, 0.9) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 51, 0.7) 50%, rgba(0, 212, 255, 0.7) 50%, rgba(56, 189, 248, 0.7) 100%) 1',
          boxShadow: '0 0 30px rgba(127, 106, 127, 0.5), inset 0 0 40px rgba(0, 0, 0, 0.5)',
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), rgba(0, 212, 255, 0.3))', clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        <p 
          className="text-white text-xs mb-2 tracking-widest uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// ВЫБРАНА СЕРИЯ
        </p>
        <p 
          className="text-white text-2xl tracking-widest font-bold uppercase"
          style={{ 
            fontFamily: '"Reborn Technologies", sans-serif',
            textShadow: '2px 2px 0 rgba(127, 106, 127, 0.4), 0 0 20px rgba(127, 106, 127, 0.5)'
          }}
        >
          {selectedSeries}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-1 h-8" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
        <p 
          className="text-white text-lg tracking-widest uppercase"
          style={{ 
            fontFamily: '"Reborn Technologies", sans-serif',
            textShadow: '0 0 10px rgba(127, 106, 127, 0.6)'
          }}
        >
          /// ВЫБЕРИТЕ STAGE
        </p>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => {
          const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
          const isSelected = selectedStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className="w-full p-6 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(26, 8, 8, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)',
                border: '2px solid',
                borderImage: isSelected
                  ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 51, 0.9) 50%, rgba(0, 212, 255, 0.9) 50%, rgba(56, 189, 248, 0.9) 100%) 1'
                  : 'linear-gradient(135deg, rgba(255, 0, 0, 0.5) 0%, rgba(255, 0, 51, 0.5) 50%, rgba(0, 212, 255, 0.5) 50%, rgba(56, 189, 248, 0.5) 100%) 1',
                boxShadow: isSelected 
                  ? '0 0 40px rgba(127, 106, 127, 0.7), inset 0 0 60px rgba(127, 106, 127, 0.15)'
                  : '0 0 20px rgba(127, 106, 127, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.5)',
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
              }}
            >
              {/* Corner cuts */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ 
                background: isSelected ? 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.4), rgba(0, 212, 255, 0.2))' : 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.15), rgba(0, 212, 255, 0.1))',
                clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
              }} />
              
              {/* Scanlines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(127, 106, 127, 0.3) 2px, rgba(127, 106, 127, 0.3) 4px)'
              }} />
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <h3 
                    className="text-white text-2xl md:text-3xl mb-2 tracking-widest uppercase font-bold"
                    style={{ 
                      fontFamily: '"Reborn Technologies", sans-serif',
                      textShadow: isSelected ? '2px 2px 0 rgba(127, 106, 127, 0.7), 0 0 30px rgba(127, 106, 127, 0.7)' : '2px 2px 0 rgba(127, 106, 127, 0.3), 0 0 10px rgba(127, 106, 127, 0.4)'
                    }}
                  >
                    {stage.name}
                  </h3>
                  <p 
                    className="text-white/80 text-sm tracking-wider uppercase"
                    style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                  >
                    /// {stage.description}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                    <Icon name="Check" className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-6" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 8px rgba(127, 106, 127, 0.7)' }} />
                  <span 
                    className="text-white tracking-widest uppercase text-sm"
                    style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                  >
                    {stage.gains}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>СТОИМОСТЬ</div>
                  <span 
                    className="text-white text-2xl md:text-3xl tracking-wider font-bold"
                    style={{ 
                      fontFamily: '"Reborn Technologies", sans-serif',
                      textShadow: '0 0 20px rgba(127, 106, 127, 0.5)'
                    }}
                  >
                    {price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedStage && (
        <button
          onClick={handleOrder}
          className="w-full p-6 text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 51, 0.9) 25%, rgba(0, 212, 255, 0.9) 75%, rgba(56, 189, 248, 0.9) 100%)',
            border: '3px solid',
            borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 51, 0.9) 50%, rgba(0, 212, 255, 0.9) 50%, rgba(56, 189, 248, 0.9) 100%) 1',
            boxShadow: '0 0 40px rgba(127, 106, 127, 0.8), inset 0 0 60px rgba(0, 0, 0, 0.3)',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
          }}
        >
          {/* Animated glow */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent 70%)'
            }}
          />
          
          <Icon name="MessageCircle" className="w-7 h-7 relative z-10" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }} />
          <span 
            className="text-xl tracking-widest uppercase font-bold relative z-10"
            style={{ 
              fontFamily: '"Reborn Technologies", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
            }}
          >
            ЗАКАЗАТЬ В TELEGRAM
          </span>
        </button>
      )}
    </div>
  );
}

// Add React import for useState
import React from 'react';