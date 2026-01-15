import { useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { EngineModification } from '@/types/chiptuning';

interface ModificationCardProps {
  mod: EngineModification;
  getPriceForCity: (basePrice: number) => number;
  variant?: 'mobile' | 'desktop';
}

function getTypeColor(type: 'petrol' | 'diesel'): string {
  return type === 'petrol' ? '#FF0040' : '#00A8E8';
}

function getGainPercentage(before: number, after: number): number {
  return Math.round(((after - before) / before) * 100);
}

export default function ModificationCard({ mod, getPriceForCity, variant = 'mobile' }: ModificationCardProps) {
  const totalPrice = useMemo(() => {
    return getPriceForCity(mod.price);
  }, [mod.price, getPriceForCity]);

  const isMobile = variant === 'mobile';

  return (
    <div
      className={isMobile ? 'p-5 rounded-2xl' : 'p-6 rounded-2xl'}
      style={{
        background: `linear-gradient(135deg, ${getTypeColor(mod.engineType)}15, ${getTypeColor(mod.engineType)}05)`,
        border: `1px solid ${getTypeColor(mod.engineType)}30`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className={`flex items-center gap-3 ${isMobile ? 'mb-4' : 'mb-6'}`}>
        <Icon 
          name={mod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
          className={isMobile ? 'w-5 h-5' : 'w-6 h-6'} 
          style={{ color: getTypeColor(mod.engineType) }}
        />
        <div className="flex-1">
          <div className={`text-white font-medium ${isMobile ? '' : 'text-lg'} flex items-center gap-2`}>
            {mod.name}
            {mod.isRestyling && (
              <span className="px-2 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-xs rounded border border-[#FF0040]/30">
                Рестайлинг
              </span>
            )}
          </div>
          <div className={`text-white/50 ${isMobile ? 'text-xs' : 'text-sm'} capitalize`}>
            {mod.engineType === 'petrol' ? 'Бензиновый' : 'Дизельный'}
          </div>
        </div>
        <div className="text-right">
          <div className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`} style={{ color: getTypeColor(mod.engineType) }}>
            {totalPrice.toLocaleString()} ₽
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-2 ${isMobile ? 'gap-3 text-xs mb-4' : 'gap-4 mb-6'}`}>
        <div>
          <div className={`text-white/50 ${isMobile ? 'mb-1' : 'text-sm mb-2'}`}>Мощность</div>
          <div className={`text-white ${isMobile ? '' : 'text-base'}`}>
            {mod.powerBefore} → <span style={{ color: getTypeColor(mod.engineType) }} className="font-bold">{mod.powerAfter} л.с.</span>
          </div>
          <div className={`text-green-400 ${isMobile ? 'text-[10px]' : 'text-sm mt-1'}`}>
            +{getGainPercentage(mod.powerBefore, mod.powerAfter)}%
          </div>
        </div>
        <div>
          <div className={`text-white/50 ${isMobile ? 'mb-1' : 'text-sm mb-2'}`}>Крутящий момент</div>
          <div className={`text-white ${isMobile ? '' : 'text-base'}`}>
            {mod.torqueBefore} → <span style={{ color: getTypeColor(mod.engineType) }} className="font-bold">{mod.torqueAfter} Нм</span>
          </div>
          <div className={`text-green-400 ${isMobile ? 'text-[10px]' : 'text-sm mt-1'}`}>
            +{getGainPercentage(mod.torqueBefore, mod.torqueAfter)}%
          </div>
        </div>
      </div>

      <a
        href={`https://t.me/bmw_tuning_spb`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${isMobile ? 'py-2.5 px-4 text-sm' : 'py-3 px-6'} w-full rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105`}
        style={{
          background: `linear-gradient(135deg, ${getTypeColor(mod.engineType)}, ${getTypeColor(mod.engineType)}CC)`,
          boxShadow: `0 8px 32px ${getTypeColor(mod.engineType)}40`
        }}
      >
        <Icon name="MessageCircle" className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
        {isMobile ? 'Записаться' : 'Записаться на чип-тюнинг'}
      </a>
    </div>
  );
}