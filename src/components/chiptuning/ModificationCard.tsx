import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { EngineModification } from './chipTuningDataNew';
import { getTypeColor, getGainPercentage } from './chipTuningDataNew';

interface ModificationCardProps {
  mod: EngineModification;
  engineType: 'petrol' | 'diesel';
  getPriceForCity: (basePrice: number) => number;
  variant?: 'mobile' | 'desktop';
}

export default function ModificationCard({ mod, engineType, getPriceForCity, variant = 'mobile' }: ModificationCardProps) {
  const [selectedOptions, setSelectedOptions] = useState<{
    egs: boolean;
    euro2: boolean;
    egr: boolean;
    adblue: boolean;
    dpf: boolean;
    flaps: boolean;
  }>({
    egs: false,
    euro2: false,
    egr: false,
    adblue: false,
    dpf: false,
    flaps: false
  });

  const totalPrice = useMemo(() => {
    let price = getPriceForCity(mod.price);
    
    if (selectedOptions.egs && mod.egsPrice) {
      price += getPriceForCity(mod.egsPrice);
    }
    
    if (selectedOptions.euro2 && mod.euro2Price) {
      price += getPriceForCity(5000);
    }
    
    if (selectedOptions.egr && mod.egrPrice) {
      price += getPriceForCity(5000);
    }
    
    if (selectedOptions.adblue && mod.adbluePrice) {
      price += getPriceForCity(20000);
    }
    
    if (selectedOptions.dpf && mod.dpfPrice) {
      price += getPriceForCity(5000);
    }
    
    if (selectedOptions.flaps && mod.flapsPrice) {
      price += getPriceForCity(5000);
    }
    
    return price;
  }, [selectedOptions, mod, getPriceForCity]);

  const hasOptions = mod.egsPrice || mod.euro2Price || mod.egrPrice || mod.adbluePrice || mod.dpfPrice || mod.flapsPrice;

  const isMobile = variant === 'mobile';

  return (
    <div
      className={isMobile ? 'p-4 rounded-xl' : 'p-5 rounded-xl'}
      style={{
        background: isMobile ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className={`flex justify-between items-start ${isMobile ? 'mb-3' : 'mb-4'}`}>
        <div className={`text-white font-medium ${isMobile ? '' : 'text-lg'}`}>{mod.name}</div>
        <div className="text-right">
          <div className={`text-[#FF0040] font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>
            {totalPrice.toLocaleString()} ₽
          </div>
          {hasOptions && totalPrice > getPriceForCity(mod.price) && (
            <div className={`text-white/40 line-through ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {getPriceForCity(mod.price).toLocaleString()} ₽
            </div>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-2 ${isMobile ? 'gap-3 text-xs mb-3' : 'gap-4 mb-4'}`}>
        <div>
          <div className={`text-white/50 ${isMobile ? 'mb-1' : 'text-sm mb-2'}`}>Мощность</div>
          <div className={`text-white ${isMobile ? '' : 'text-base'}`}>
            {mod.powerBefore} → <span className="text-[#FF0040] font-bold">{mod.powerAfter} л.с.</span>
          </div>
          <div className={`text-green-400 ${isMobile ? 'text-[10px]' : 'text-sm mt-1'}`}>
            +{getGainPercentage(mod.powerBefore, mod.powerAfter)}%
          </div>
        </div>
        <div>
          <div className={`text-white/50 ${isMobile ? 'mb-1' : 'text-sm mb-2'}`}>Крутящий момент</div>
          <div className={`text-white ${isMobile ? '' : 'text-base'}`}>
            {mod.torqueBefore} → <span className="text-[#FF0040] font-bold">{mod.torqueAfter} Нм</span>
          </div>
          <div className={`text-green-400 ${isMobile ? 'text-[10px]' : 'text-sm mt-1'}`}>
            +{getGainPercentage(mod.torqueBefore, mod.torqueAfter)}%
          </div>
        </div>
      </div>

      {hasOptions && (
        <div className={`${isMobile ? 'mb-3 p-3' : 'mb-4 p-4'} rounded-lg`} style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <div className={`text-white/${isMobile ? '60' : '70'} ${isMobile ? 'text-xs mb-2' : 'text-sm mb-3'} font-medium`}>
            Дополнительные опции:
          </div>
          <div className={isMobile ? 'space-y-2' : 'grid grid-cols-1 gap-3'}>
            {mod.egsPrice && (
              <label className={`flex items-center justify-between cursor-pointer ${isMobile ? '' : 'hover:bg-white/5 p-2 rounded transition-colors'}`}>
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.egs}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, egs: e.target.checked }))}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded border-white/20 bg-white/5 text-[#FF0040] focus:ring-[#FF0040] focus:ring-offset-0`}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Тюнинг АКПП</span>
                    <span className="text-white/40 text-[9px]">(для достижения полной мощности)</span>
                  </div>
                </div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm font-medium'}`}>
                  +{getPriceForCity(mod.egsPrice).toLocaleString()} ₽
                </span>
              </label>
            )}
            {mod.euro2Price && (
              <label className={`flex items-center justify-between cursor-pointer ${isMobile ? '' : 'hover:bg-white/5 p-2 rounded transition-colors'}`}>
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.euro2}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, euro2: e.target.checked }))}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded border-white/20 bg-white/5 text-[#FF0040] focus:ring-[#FF0040] focus:ring-offset-0`}
                  />
                  <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Отключение Euro 2</span>
                </div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm font-medium'}`}>
                  +5 000 ₽
                </span>
              </label>
            )}
            {mod.egrPrice && (
              <label className={`flex items-center justify-between cursor-pointer ${isMobile ? '' : 'hover:bg-white/5 p-2 rounded transition-colors'}`}>
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.egr}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, egr: e.target.checked }))}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded border-white/20 bg-white/5 text-[#FF0040] focus:ring-[#FF0040] focus:ring-offset-0`}
                  />
                  <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Удаление EGR</span>
                </div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm font-medium'}`}>
                  +5 000 ₽
                </span>
              </label>
            )}
            {mod.adbluePrice && (
              <label className={`flex items-center justify-between cursor-pointer ${isMobile ? '' : 'hover:bg-white/5 p-2 rounded transition-colors'}`}>
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.adblue}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, adblue: e.target.checked }))}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded border-white/20 bg-white/5 text-[#FF0040] focus:ring-[#FF0040] focus:ring-offset-0`}
                  />
                  <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Удаление Adblue</span>
                </div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm font-medium'}`}>
                  +20 000 ₽
                </span>
              </label>
            )}
            {mod.dpfPrice && (
              <label className={`flex items-center justify-between cursor-pointer ${isMobile ? '' : 'hover:bg-white/5 p-2 rounded transition-colors'}`}>
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.dpf}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, dpf: e.target.checked }))}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded border-white/20 bg-white/5 text-[#FF0040] focus:ring-[#FF0040] focus:ring-offset-0`}
                  />
                  <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Удаление DPF</span>
                </div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm font-medium'}`}>
                  +5 000 ₽
                </span>
              </label>
            )}
            {mod.flapsPrice && (
              <label className={`flex items-center justify-between cursor-pointer ${isMobile ? '' : 'hover:bg-white/5 p-2 rounded transition-colors'}`}>
                <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.flaps}
                    onChange={(e) => setSelectedOptions(prev => ({ ...prev, flaps: e.target.checked }))}
                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} rounded border-white/20 bg-white/5 text-[#FF0040] focus:ring-[#FF0040] focus:ring-offset-0`}
                  />
                  <span className={`text-white ${isMobile ? 'text-xs' : 'text-sm'}`}>Удаление заслонок</span>
                </div>
                <span className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm font-medium'}`}>
                  +5 000 ₽
                </span>
              </label>
            )}
          </div>
        </div>
      )}

      <a
        href={`https://t.me/bmw_tuning_spb`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'mt-3 py-2.5 px-4 text-sm' : 'py-3 px-6'} w-full rounded-${isMobile ? 'lg' : 'xl'} text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105`}
        style={{
          background: `linear-gradient(135deg, ${getTypeColor(engineType)}, ${getTypeColor(engineType)}CC)`,
          boxShadow: `0 8px 32px ${getTypeColor(engineType)}40`
        }}
      >
        <Icon name="MessageCircle" className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
        {isMobile ? 'Записаться' : 'Записаться на чип-тюнинг'}
      </a>
    </div>
  );
}