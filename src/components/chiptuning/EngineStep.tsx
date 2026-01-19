import React from 'react';
import Icon from '@/components/ui/icon';
import type { ChiptuningData } from './types';

interface EngineStepProps {
  engines: ChiptuningData[];
  selectedBody: string | null;
  onSelectEngine: (engine: ChiptuningData) => void;
  onBack: () => void;
}

export default function EngineStep({ engines, selectedBody, onSelectEngine, onBack }: EngineStepProps) {
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
          /// НАЗАД К КУЗОВУ
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
          /// КУЗОВ
        </p>
        <p 
          className="text-white text-sm tracking-wider font-bold"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          {selectedBody}
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
          /// ШАГ 2: ВЫБЕРИТЕ ДВИГАТЕЛЬ
        </p>
      </div>

      <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1" style={{ 
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(255, 0, 0, 0.5) rgba(0, 0, 0, 0.3)'
      }}>
        {engines.map((engine, idx) => (
          <button
            key={idx}
            onClick={() => onSelectEngine(engine)}
            className="w-full p-2 text-left transition-all duration-300 hover:scale-[1.01] relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)',
              border: '1px solid',
              borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(0, 212, 255, 0.4) 100%) 1',
              boxShadow: '0 0 15px rgba(127, 106, 127, 0.3)',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
            }}
          >
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{ 
              background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.2), transparent)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
            }} />
            
            <div className="relative z-10">
              <p 
                className="text-white text-xs mb-1 tracking-wider font-medium"
                style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
              >
                {engine.engine_code}
              </p>
              <p 
                className="text-white/70 text-[10px] tracking-wide"
                style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
              >
                СТОК: {engine.stock.power} л.с. / {engine.stock.torque} Нм
              </p>
              <p 
                className="text-white/70 text-[10px] tracking-wide"
                style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
              >
                STAGE 1: {engine.stage1.power} л.с. / {engine.stage1.torque} Нм
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
