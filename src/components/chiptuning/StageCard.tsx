import React from 'react';
import Icon from '@/components/ui/icon';

interface StageCardProps {
  stageId: string;
  stageName: string;
  isSelected: boolean;
  price: number;
  power: string;
  torque: string;
  onClick: () => void;
}

export default function StageCard({ 
  stageId, 
  stageName, 
  isSelected, 
  price, 
  power, 
  torque, 
  onClick 
}: StageCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-2 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
      style={{
        background: stageId === 'stage1'
          ? (isSelected ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.35) 100%)' : 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.15) 100%)')
          : (isSelected ? 'linear-gradient(135deg, rgba(26, 8, 8, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)' : 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)'),
        border: '2px solid',
        borderImage: stageId === 'stage1'
          ? (isSelected ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.8) 0%, rgba(0, 255, 0, 0.6) 100%) 1' : 'linear-gradient(135deg, rgba(0, 255, 0, 0.4) 0%, rgba(0, 255, 0, 0.2) 100%) 1')
          : (isSelected ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.8) 0%, rgba(0, 212, 255, 0.8) 100%) 1' : 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(0, 212, 255, 0.4) 100%) 1'),
        boxShadow: isSelected 
          ? '0 0 30px rgba(127, 106, 127, 0.5), inset 0 0 20px rgba(127, 106, 127, 0.2)'
          : '0 0 10px rgba(100, 100, 100, 0.3)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 
            className="text-white text-base font-bold tracking-wider uppercase mb-0.5"
            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
          >
            {stageName}
          </h3>
          <div className="flex gap-3 text-xs">
            <span className="text-white/70 flex items-center gap-1">
              <Icon name="Zap" className="w-3 h-3" />
              {power}
            </span>
            <span className="text-white/70 flex items-center gap-1">
              <Icon name="Gauge" className="w-3 h-3" />
              {torque}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div 
            className="text-lg font-bold"
            style={{ 
              fontFamily: '"Reborn Technologies", sans-serif',
              color: stageId === 'stage1' ? '#00FF00' : '#FF0040'
            }}
          >
            {price.toLocaleString('ru-RU')}₽
          </div>
        </div>
      </div>
    </button>
  );
}
