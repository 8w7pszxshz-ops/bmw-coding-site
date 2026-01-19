import React from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';
import type { Series } from './SeriesSelector';
import type { ChiptuningData } from './types';

interface StageStepProps {
  selectedEngine: ChiptuningData;
  selectedSeries: Series;
  selectedCity: City;
  selectedStage: 'stage1' | 'stage2' | null;
  onSelectStage: (stage: 'stage1' | 'stage2') => void;
  onBack: () => void;
  onOrder: () => void;
}

export default function StageStep({ 
  selectedEngine, 
  selectedSeries, 
  selectedCity, 
  selectedStage, 
  onSelectStage, 
  onBack,
  onOrder 
}: StageStepProps) {
  const stages = [
    { id: 'stage1', name: 'STAGE 1', data: selectedEngine.stage1 },
    ...(selectedEngine.stage2 ? [{ id: 'stage2', name: 'STAGE 2', data: selectedEngine.stage2 }] : [])
  ];

  return (
    <>
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-3 py-1.5 transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 51, 0.3))',
          border: '1px solid rgba(255, 0, 0, 0.4)',
          clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
        }}
      >
        <Icon name="ChevronLeft" className="w-4 h-4 text-red-400" />
        <span 
          className="tracking-wider text-red-400 uppercase text-xs"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// ДРУГОЙ ДВИГАТЕЛЬ
        </span>
      </button>

      <div 
        className="p-2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 8, 8, 0.8) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
          boxShadow: '0 0 20px rgba(127, 106, 127, 0.4)',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none" style={{ 
          background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), rgba(0, 212, 255, 0.2))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
        }} />
        <p 
          className="text-white/80 text-[10px] mb-1 tracking-widest uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// {selectedEngine.engine_code} • {selectedEngine.body_type}
        </p>
        <p 
          className="text-white text-sm tracking-wider"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          СТОК: {selectedEngine.stock.power} л.с. / {selectedEngine.stock.torque} Нм
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="w-0.5 h-4" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
        <p 
          className="text-white text-xs tracking-widest uppercase"
          style={{ 
            fontFamily: '"Reborn Technologies", sans-serif',
            textShadow: '0 0 10px rgba(127, 106, 127, 0.6)'
          }}
        >
          /// ШАГ 3: ВЫБЕРИТЕ STAGE
        </p>
      </div>

      <div className="space-y-2">
        {stages.map((stage) => {
          const price = selectedCity.value === 'moscow' ? stage.data.price : Math.round(stage.data.price * 0.9);
          const isSelected = selectedStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => onSelectStage(stage.id as 'stage1' | 'stage2')}
              className="w-full p-3 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
              style={{
                background: stage.id === 'stage1'
                  ? (isSelected ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.35) 100%)' : 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.15) 100%)')
                  : (isSelected ? 'linear-gradient(135deg, rgba(26, 8, 8, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)' : 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)'),
                border: '2px solid',
                borderImage: stage.id === 'stage1'
                  ? (isSelected ? 'linear-gradient(135deg, rgba(0, 255, 0, 1) 0%, rgba(0, 255, 0, 0.8) 50%, rgba(0, 255, 0, 1) 100%) 1' : 'linear-gradient(135deg, rgba(0, 255, 0, 0.6) 0%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 0.6) 100%) 1')
                  : (isSelected ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 51, 0.9) 50%, rgba(0, 212, 255, 0.9) 50%, rgba(56, 189, 248, 0.9) 100%) 1' : 'linear-gradient(135deg, rgba(255, 0, 0, 0.5) 0%, rgba(255, 0, 51, 0.5) 50%, rgba(0, 212, 255, 0.5) 50%, rgba(56, 189, 248, 0.5) 100%) 1'),
                boxShadow: stage.id === 'stage1'
                  ? (isSelected ? '0 0 60px rgba(0, 255, 0, 0.8), inset 0 0 80px rgba(0, 255, 0, 0.25)' : '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 50px rgba(0, 255, 0, 0.15)')
                  : (isSelected ? '0 0 40px rgba(127, 106, 127, 0.7), inset 0 0 60px rgba(127, 106, 127, 0.15)' : '0 0 20px rgba(127, 106, 127, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.5)'),
                clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
              }}
            >
              <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ 
                background: stage.id === 'stage1'
                  ? (isSelected ? 'linear-gradient(to bottom right, rgba(0, 255, 0, 0.6), transparent)' : 'linear-gradient(to bottom right, rgba(0, 255, 0, 0.3), transparent)')
                  : (isSelected ? 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.4), rgba(0, 212, 255, 0.2))' : 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.15), rgba(0, 212, 255, 0.1))'),
                clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
              }} />
              
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(127, 106, 127, 0.3) 2px, rgba(127, 106, 127, 0.3) 4px)'
              }} />
              
              <div className="flex items-start justify-between mb-1 relative z-10">
                <div>
                  <h3 
                    className="text-white text-base mb-0.5 tracking-widest uppercase font-bold"
                    style={{ 
                      fontFamily: '"Reborn Technologies", sans-serif',
                      textShadow: isSelected ? '2px 2px 0 rgba(127, 106, 127, 0.7), 0 0 30px rgba(127, 106, 127, 0.7)' : '2px 2px 0 rgba(127, 106, 127, 0.3), 0 0 10px rgba(127, 106, 127, 0.4)'
                    }}
                  >
                    {stage.name}
                  </h3>
                  <p 
                    className="text-white/80 text-[10px] tracking-wider uppercase"
                    style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                  >
                    /// {stage.data.power} Л.С. / {stage.data.torque} НМ
                  </p>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                    <Icon name="Check" className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="w-0.5 h-3" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.8), rgba(0, 212, 255, 0.8))' }} />
                  <p 
                    className="text-white text-lg font-bold tracking-wider"
                    style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                  >
                    {price.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedStage && (
        <button
          onClick={onOrder}
          className="w-full py-3 px-4 transition-all hover:scale-[1.02] relative overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(255, 0, 51, 0.5) 50%, rgba(0, 212, 255, 0.4) 100%)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(0, 212, 255, 0.9) 100%) 1',
            boxShadow: '0 0 40px rgba(127, 106, 127, 0.6), inset 0 0 40px rgba(127, 106, 127, 0.2)',
            clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
          }}
        >
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)'
          }} />
          <div className="flex items-center justify-center gap-2 relative z-10">
            <Icon name="Send" className="w-5 h-5 text-white" />
            <span 
              className="text-white text-sm tracking-widest uppercase font-bold"
              style={{ 
                fontFamily: '"Reborn Technologies", sans-serif',
                textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5), 0 0 20px rgba(127, 106, 127, 0.7)'
              }}
            >
              /// ЗАКАЗАТЬ
            </span>
          </div>
        </button>
      )}
    </>
  );
}
