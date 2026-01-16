import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import { EngineVariant, getGainPercentage } from './chipTuningData';
import { getTelegramLink } from '@/utils/cityConfig';
import { City } from '@/components/CitySelector';

interface EngineVariantCardProps {
  variant: EngineVariant;
  engineType: 'petrol' | 'diesel';
  color: string;
  index: number;
  selectedCity: City;
}

function EngineVariantCardMobile({ variant, engineType, color, index, selectedCity }: EngineVariantCardProps) {
  const powerGain = getGainPercentage(variant.powerBefore, variant.powerAfter);
  const torqueGain = getGainPercentage(variant.torqueBefore, variant.torqueAfter);

  return (
    <div
      className="relative p-5 rounded-xl transition-all duration-300 animate-fade-in overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)), linear-gradient(135deg, ${color}12, ${color}06)`,
        border: `1px solid ${color}40`,
        boxShadow: `0 8px 32px ${color}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        backdropFilter: 'blur(20px)',
        animationDelay: `${index * 50}ms`
      }}
    >
      <div 
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '2px',
          background: `linear-gradient(180deg, transparent 0%, ${color}40 30%, ${color}80 50%, ${color}40 70%, transparent 100%)`,
          boxShadow: `0 0 20px ${color}50`
        }}
      />
      <div 
        className="absolute right-0 top-1/4 bottom-1/4"
        style={{
          width: '1px',
          background: `linear-gradient(180deg, transparent, ${color}30, transparent)`,
          boxShadow: `0 0 10px ${color}30`
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <pattern id={`variant-mobile-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.7" fill={color} opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#variant-mobile-${index})`} />
      </svg>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-white mb-1">{variant.name}</h3>
          <div className="flex items-center gap-1.5">
            <Icon name={engineType === 'petrol' ? 'Flame' : 'Fuel'} className="w-3 h-3" style={{ color }} />
            <span className="text-white/80 text-xs font-medium">{engineType === 'petrol' ? 'Бензиновый' : 'Дизельный'}</span>
          </div>
        </div>
        <div 
          className="px-2.5 py-1 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}
        >
          <span className="text-green-400 text-xs font-medium">+{powerGain}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-white/60 text-[10px] mb-1.5 flex items-center gap-1 font-medium">
            <Icon name="Gauge" className="w-2.5 h-2.5" />
            Мощность
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/80 text-sm font-medium">{variant.powerBefore}</span>
            <Icon name="ArrowRight" className="w-3 h-3" style={{ color }} />
            <span className="text-lg font-light" style={{ color }}>{variant.powerAfter}</span>
            <span className="text-white/40 text-[10px]">л.с.</span>
          </div>
          <div className="text-green-400 text-[10px]">+{variant.powerAfter - variant.powerBefore} л.с.</div>
        </div>

        <div>
          <div className="text-white/60 text-[10px] mb-1.5 flex items-center gap-1 font-medium">
            <Icon name="Zap" className="w-2.5 h-2.5" />
            Кр. момент
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/80 text-sm font-medium">{variant.torqueBefore}</span>
            <Icon name="ArrowRight" className="w-3 h-3" style={{ color }} />
            <span className="text-lg font-light" style={{ color }}>{variant.torqueAfter}</span>
            <span className="text-white/40 text-[10px]">Нм</span>
          </div>
          <div 
            className="px-2 py-0.5 rounded inline-block"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <span className="text-green-400 text-[10px]">+{torqueGain}%</span>
          </div>
        </div>
      </div>

      <div 
        className="mb-4 p-3 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
          border: `1px solid ${color}20`
        }}
      >
        <div className="text-white/60 text-[10px] mb-1.5 flex items-center gap-1 font-medium">
          <Icon name="Car" className="w-2.5 h-2.5" />
          Подходящие модели:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {variant.models.map((model, i) => (
            <span 
              key={i}
              className="px-2 py-0.5 rounded text-[10px] text-white/90 font-medium"
              style={{
                background: `linear-gradient(135deg, ${color}20, ${color}12)`,
                border: `1px solid ${color}35`
              }}
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      <div 
        className="mb-3 flex justify-center"
      >
        <img 
          src="https://cdn.poehali.dev/files/наклейки_белый_текст.png" 
          alt="RaceChip Technologies"
          className="h-4 opacity-80"
        />
      </div>

      <div 
        className="pt-4 border-t flex items-center justify-between"
        style={{ borderColor: `${color}20` }}
      >
        <div>
          <div className="text-white/60 text-[10px] mb-0.5 font-medium">Стоимость Stage 1</div>
          <div className="text-lg font-medium" style={{ color }}>
            {variant.price.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <a
          href={getTelegramLink(selectedCity, `чип-тюнинг ${variant.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-white text-xs transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #E7222E, #C51D26)',
            boxShadow: '0 8px 24px rgba(231, 34, 46, 0.4)'
          }}
        >
          <Icon name="Gauge" className="w-3 h-3" />
          <span>Тюнинг</span>
        </a>
      </div>
    </div>
  );
}

function EngineVariantCardDesktop({ variant, engineType, color, index, selectedCity }: EngineVariantCardProps) {
  const powerGain = getGainPercentage(variant.powerBefore, variant.powerAfter);
  const torqueGain = getGainPercentage(variant.torqueBefore, variant.torqueAfter);

  return (
    <div
      className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)), linear-gradient(135deg, ${color}12, ${color}06)`,
        border: `1px solid ${color}40`,
        boxShadow: `0 8px 32px ${color}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        backdropFilter: 'blur(20px)',
        animationDelay: `${index * 50}ms`
      }}
    >
      <div 
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '3px',
          background: `linear-gradient(180deg, transparent 0%, ${color}40 30%, ${color}80 50%, ${color}40 70%, transparent 100%)`,
          boxShadow: `0 0 25px ${color}60, 2px 0 15px ${color}40`
        }}
      />
      <div 
        className="absolute right-0 top-1/4 bottom-1/4"
        style={{
          width: '1px',
          background: `linear-gradient(180deg, transparent, ${color}40, transparent)`,
          boxShadow: `0 0 12px ${color}30`
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <pattern id={`variant-desktop-${index}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="12.5" cy="12.5" r="1" fill={color} opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#variant-desktop-${index})`} />
      </svg>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-medium text-white mb-2">{variant.name}</h3>
          <div className="flex items-center gap-2">
            <Icon name={engineType === 'petrol' ? 'Flame' : 'Fuel'} className="w-4 h-4" style={{ color }} />
            <span className="text-white/80 text-sm font-medium">{engineType === 'petrol' ? 'Бензиновый' : 'Дизельный'}</span>
          </div>
        </div>
        <div 
          className="px-4 py-2 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}
        >
          <span className="text-green-400 text-sm font-medium">+{powerGain}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-white/60 text-xs mb-2 flex items-center gap-1 font-medium">
            <Icon name="Gauge" className="w-3 h-3" />
            Мощность
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white/80 text-lg font-medium">{variant.powerBefore}</span>
            <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
            <span className="text-2xl font-light" style={{ color }}>{variant.powerAfter}</span>
            <span className="text-white/40 text-sm">л.с.</span>
          </div>
          <div className="text-green-400 text-xs">+{variant.powerAfter - variant.powerBefore} л.с.</div>
        </div>

        <div>
          <div className="text-white/60 text-xs mb-2 flex items-center gap-1 font-medium">
            <Icon name="Zap" className="w-3 h-3" />
            Крутящий момент
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white/80 text-lg font-medium">{variant.torqueBefore}</span>
            <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
            <span className="text-2xl font-light" style={{ color }}>{variant.torqueAfter}</span>
            <span className="text-white/40 text-sm">Нм</span>
          </div>
          <div 
            className="px-3 py-1 rounded-lg inline-block"
            style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
              border: '1px solid rgba(34, 197, 94, 0.2)'
            }}
          >
            <span className="text-green-400 text-xs">+{torqueGain}%</span>
          </div>
        </div>
      </div>

      <div 
        className="mb-6 p-4 rounded-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
          border: `1px solid ${color}20`
        }}
      >
        <div className="text-white/60 text-xs mb-2 flex items-center gap-1 font-medium">
          <Icon name="Car" className="w-3 h-3" />
          Подходящие модели:
        </div>
        <div className="flex flex-wrap gap-2">
          {variant.models.map((model, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-lg text-xs text-white/90 font-medium"
              style={{
                background: `linear-gradient(135deg, ${color}20, ${color}12)`,
                border: `1px solid ${color}35`
              }}
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      <div 
        className="mb-4 flex justify-center"
      >
        <img 
          src="https://cdn.poehali.dev/files/наклейки_белый_текст.png" 
          alt="RaceChip Technologies"
          className="h-6 opacity-80"
        />
      </div>

      <div 
        className="pt-6 border-t flex items-center justify-between"
        style={{ borderColor: `${color}20` }}
      >
        <div>
          <div className="text-white/60 text-xs mb-1 font-medium">Стоимость Stage 1</div>
          <div className="text-xl font-medium" style={{ color }}>
            {variant.price.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <a
          href={getTelegramLink(selectedCity, `чип-тюнинг ${variant.name}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #E7222E, #C51D26)',
            boxShadow: '0 8px 24px rgba(231, 34, 46, 0.4)'
          }}
        >
          <Icon name="Gauge" className="w-4 h-4" />
          <span>Начать тюнинг</span>
        </a>
      </div>
    </div>
  );
}

export default function EngineVariantCard(props: EngineVariantCardProps) {
  return (
    <Adaptive
      mobile={<EngineVariantCardMobile {...props} />}
      desktop={<EngineVariantCardDesktop {...props} />}
    />
  );
}