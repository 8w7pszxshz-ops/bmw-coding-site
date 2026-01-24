import React from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';
import { trackChiptuningOrder, trackGoal, goals } from '@/utils/analytics';
import type { Series } from './SeriesSelector';
import type { ChiptuningData } from './types';

interface StageStepProps {
  selectedEngine: ChiptuningData;
  selectedSeries: Series;
  selectedCity: City;
  selectedStage: 'stage1' | 'stage2' | null;
  euro2Enabled: boolean;
  dieselOptions: { egr: boolean; dpf: boolean; flaps: boolean; adblue: boolean };
  onSelectStage: (stage: 'stage1' | 'stage2') => void;
  onEuro2Change: (enabled: boolean) => void;
  onDieselOptionChange: (option: 'egr' | 'dpf' | 'flaps' | 'adblue', enabled: boolean) => void;
  onBack: () => void;
  onOrder: (finalPrice: number) => void;
}

export default function StageStep({ 
  selectedEngine, 
  selectedSeries, 
  selectedCity, 
  selectedStage,
  euro2Enabled,
  dieselOptions,
  onSelectStage,
  onEuro2Change,
  onDieselOptionChange,
  onBack,
  onOrder 
}: StageStepProps) {
  
  const stages = [
    { id: 'stage1', name: 'STAGE 1', data: selectedEngine.stage1 },
    ...(selectedEngine.stage2 ? [{ id: 'stage2', name: 'STAGE 2', data: selectedEngine.stage2 }] : [])
  ];

  const isDiesel = selectedEngine.engine_code?.toLowerCase().includes('d') || false;

  const calculatePrice = (basePrice: number, stageId: string) => {
    // Базовая цена стейджа с учетом города
    let price = selectedCity.value === 'moscow' ? basePrice : Math.round(basePrice * 0.9);
    
    // Если выбран стейдж И включен Euro2 - добавляем 5000₽
    if (selectedStage && euro2Enabled) {
      price += 5000;
    }
    
    // Дизельные опции (только если выбран стейдж)
    if (selectedStage && isDiesel) {
      if (dieselOptions.egr) price += 5000;
      if (dieselOptions.dpf) price += 5000;
      if (dieselOptions.flaps) price += 5000;
      if (dieselOptions.adblue) price += 20000;
    }
    
    return price;
  };
  
  // Цена только Euro2 без стейджа
  const euro2OnlyPrice = 12000;
  
  // Цена дизельных опций без стейджа
  const dieselOnlyPrice = () => {
    let price = 0;
    if (dieselOptions.egr) price += 12000;
    if (dieselOptions.dpf) price += 12000;
    if (dieselOptions.flaps) price += 12000;
    if (dieselOptions.adblue) price += 20000;
    return price;
  };

  return (
    <>
      {!isDiesel && (
        <div className="p-3 mb-2 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)',
            border: '1px solid',
            borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(0, 212, 255, 0.4) 100%) 1',
            boxShadow: '0 0 15px rgba(127, 106, 127, 0.3)',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
          }}
        >
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={euro2Enabled}
              onChange={(e) => onEuro2Change(e.target.checked)}
              className="w-6 h-6 accent-red-500 cursor-pointer"
            />
            <span
              className="text-white text-sm tracking-wider uppercase font-medium group-hover:text-red-400 transition-colors"
              style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
            >
              EURO 2
            </span>
          </label>
        </div>
      )}

      {isDiesel && (
        <div className="space-y-2 mb-2">
          {[
            { key: 'egr' as const, label: 'EGR', price: 12000, withStage: 5000 },
            { key: 'dpf' as const, label: 'DPF', price: 12000, withStage: 5000 },
            { key: 'flaps' as const, label: 'FLAPS', price: 12000, withStage: 5000 },
            { key: 'adblue' as const, label: 'ADBLUE', price: 20000, withStage: 20000 }
          ].map(option => (
            <div key={option.key} className="p-3 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)',
                border: '1px solid',
                borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(0, 212, 255, 0.4) 100%) 1',
                boxShadow: '0 0 15px rgba(127, 106, 127, 0.3)',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
              }}
            >
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dieselOptions[option.key]}
                  onChange={(e) => onDieselOptionChange(option.key, e.target.checked)}
                  className="w-6 h-6 accent-red-500 cursor-pointer"
                />
                <span
                  className="text-white text-sm tracking-wider uppercase font-medium group-hover:text-red-400 transition-colors"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  {option.label}
                </span>
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="space-y-1">
          {stages.map((stage) => {
            const price = calculatePrice(stage.data.price, stage.id);
            const isSelected = selectedStage === stage.id;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  if (isSelected) {
                    onSelectStage(null as any);
                  } else {
                    onSelectStage(stage.id as 'stage1' | 'stage2');
                    // Трекинг выбора Stage
                    trackGoal(goals.chiptuningStageSelected, {
                      series: selectedSeries,
                      engine: selectedEngine.engine_code,
                      stage: stage.id,
                      city: selectedCity
                    });
                  }
                }}
                className="w-full p-2 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
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
              
              <div className="flex items-start justify-between mb-0.5 relative z-10">
                <div>
                  <h3 
                    className="text-white text-sm mb-0.5 tracking-widest uppercase font-bold"
                    style={{ 
                      fontFamily: '"Reborn Technologies", sans-serif',
                      textShadow: isSelected ? '2px 2px 0 rgba(127, 106, 127, 0.7), 0 0 30px rgba(127, 106, 127, 0.7)' : '2px 2px 0 rgba(127, 106, 127, 0.3), 0 0 10px rgba(127, 106, 127, 0.4)'
                    }}
                  >
                    {stage.name}
                  </h3>
                  <p 
                    className="text-white/90 text-[10px] tracking-wider uppercase font-medium"
                    style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                  >
                    {stage.data.power} Л.С. / {stage.data.torque} НМ
                  </p>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                    <Icon name="Check" className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

            </button>
            );
          })}
        </div>

        {/* Итоговый блок стоимости */}
        {(selectedStage || euro2Enabled || (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue))) && (
          <div 
            className="p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 8, 8, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)',
              border: '2px solid',
              borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(0, 212, 255, 0.9) 100%) 1',
              boxShadow: '0 0 40px rgba(127, 106, 127, 0.6), inset 0 0 40px rgba(127, 106, 127, 0.2)',
              clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))'
            }}
          >
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ 
              background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.4), rgba(0, 212, 255, 0.2))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
            }} />
            <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none" style={{ 
              background: 'linear-gradient(to top left, rgba(0, 212, 255, 0.3), transparent)',
              clipPath: 'polygon(0 100%, 100% 100%, 0 0)' 
            }} />
            
            <div className="relative z-10 space-y-2">
              <p 
                className="text-white/60 text-xs tracking-widest uppercase mb-1"
                style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
              >
                /// ИТОГОВАЯ СТОИМОСТЬ
              </p>
              
              <div className="space-y-1">
                {selectedStage && (() => {
                  const stageData = selectedStage === 'stage1' ? selectedEngine.stage1 : selectedEngine.stage2;
                  const basePrice = selectedCity.value === 'moscow' ? stageData.price : Math.round(stageData.price * 0.9);
                  return (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        {selectedStage.toUpperCase()}
                      </span>
                      <span className="text-white font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        {basePrice.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  );
                })()}

                {selectedStage && euro2Enabled && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      EURO 2
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 line-through text-xs" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        12,000 ₽
                      </span>
                      <span className="text-green-400 font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        +5,000 ₽
                      </span>
                    </div>
                  </div>
                )}

                {!selectedStage && euro2Enabled && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      EURO 2 (без Stage)
                    </span>
                    <span className="text-white font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      {euro2OnlyPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                )}

                {isDiesel && dieselOptions.egr && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      EGR
                    </span>
                    {selectedStage ? (
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 line-through text-xs" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                          12,000 ₽
                        </span>
                        <span className="text-green-400 font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                          +5,000 ₽
                        </span>
                      </div>
                    ) : (
                      <span className="text-white font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        12,000 ₽
                      </span>
                    )}
                  </div>
                )}

                {isDiesel && dieselOptions.dpf && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      DPF
                    </span>
                    {selectedStage ? (
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 line-through text-xs" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                          12,000 ₽
                        </span>
                        <span className="text-green-400 font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                          +5,000 ₽
                        </span>
                      </div>
                    ) : (
                      <span className="text-white font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        12,000 ₽
                      </span>
                    )}
                  </div>
                )}

                {isDiesel && dieselOptions.flaps && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      FLAPS
                    </span>
                    {selectedStage ? (
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 line-through text-xs" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                          12,000 ₽
                        </span>
                        <span className="text-green-400 font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                          +5,000 ₽
                        </span>
                      </div>
                    ) : (
                      <span className="text-white font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                        12,000 ₽
                      </span>
                    )}
                  </div>
                )}

                {isDiesel && dieselOptions.adblue && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      ADBLUE
                    </span>
                    <span className="text-white font-medium" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                      {selectedStage ? '+20,000 ₽' : '20,000 ₽'}
                    </span>
                  </div>
                )}
              </div>

              <div 
                className="h-px my-3"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.5) 20%, rgba(0, 212, 255, 0.5) 80%, transparent 100%)'
                }}
              />

              <div className="flex items-center justify-between">
                <span 
                  className="text-white text-base tracking-widest uppercase font-bold"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif', textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
                >
                  ИТОГО
                </span>
                <span 
                  className="text-white text-xl tracking-wider font-bold"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif', textShadow: '0 0 25px rgba(127, 106, 127, 0.8)' }}
                >
                  {(() => {
                    let finalPrice;
                    if (selectedStage) {
                      const stageData = selectedStage === 'stage1' ? selectedEngine.stage1 : selectedEngine.stage2;
                      finalPrice = calculatePrice(stageData.price, selectedStage);
                    } else if (euro2Enabled) {
                      finalPrice = euro2OnlyPrice;
                    } else if (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue)) {
                      finalPrice = dieselOnlyPrice();
                    }
                    return finalPrice?.toLocaleString('ru-RU');
                  })()} ₽
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          let finalPrice;
          if (selectedStage) {
            const stageData = selectedStage === 'stage1' ? selectedEngine.stage1 : selectedEngine.stage2;
            if (!stageData) return;
            finalPrice = calculatePrice(stageData.price, selectedStage);
          } else if (euro2Enabled) {
            finalPrice = euro2OnlyPrice;
          } else if (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue)) {
            finalPrice = dieselOnlyPrice();
          } else {
            return;
          }
          
          // Отправка цели в Яндекс.Метрику
          const dieselOptionsList = [];
          if (dieselOptions.egr) dieselOptionsList.push('EGR');
          if (dieselOptions.dpf) dieselOptionsList.push('DPF');
          if (dieselOptions.flaps) dieselOptionsList.push('FLAPS');
          if (dieselOptions.adblue) dieselOptionsList.push('ADBLUE');
          
          trackChiptuningOrder({
            series: selectedSeries,
            engine: selectedEngine.engine_code,
            stage: selectedStage || undefined,
            euro2: euro2Enabled,
            diesel: dieselOptionsList.length > 0 ? dieselOptionsList : undefined,
            city: selectedCity,
            price: finalPrice
          });
          
          onOrder(finalPrice);
        }}
        disabled={!selectedStage && !euro2Enabled && !(isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue))}
        className="w-full py-2 px-4 transition-all hover:scale-[1.02] relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: (selectedStage || euro2Enabled || (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue)))
            ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(255, 0, 51, 0.5) 50%, rgba(0, 212, 255, 0.4) 100%)'
            : 'linear-gradient(135deg, rgba(50, 50, 50, 0.4) 0%, rgba(70, 70, 70, 0.5) 50%, rgba(50, 50, 50, 0.4) 100%)',
          border: '2px solid',
          borderImage: (selectedStage || euro2Enabled || (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue)))
            ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(0, 212, 255, 0.9) 100%) 1'
            : 'linear-gradient(135deg, rgba(100, 100, 100, 0.5) 0%, rgba(150, 150, 150, 0.5) 100%) 1',
          boxShadow: (selectedStage || euro2Enabled || (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue)))
            ? '0 0 40px rgba(127, 106, 127, 0.6), inset 0 0 40px rgba(127, 106, 127, 0.2)'
            : '0 0 10px rgba(100, 100, 100, 0.3)',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)'
        }} />
        <div className="flex items-center justify-center gap-2 relative z-10">
          <Icon name={(selectedStage || euro2Enabled || (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue))) ? "Send" : "AlertCircle"} className="w-4 h-4 text-white" />
          <span 
            className="text-white text-xs tracking-widest uppercase font-bold"
            style={{ 
              fontFamily: '"Reborn Technologies", sans-serif',
              textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5), 0 0 20px rgba(127, 106, 127, 0.7)'
            }}
          >
            {(selectedStage || euro2Enabled || (isDiesel && (dieselOptions.egr || dieselOptions.dpf || dieselOptions.flaps || dieselOptions.adblue))) ? '/// ЗАКАЗАТЬ' : '/// ВЫБЕРИТЕ ОПЦИЮ'}
          </span>
        </div>
      </button>
    </>
  );
}