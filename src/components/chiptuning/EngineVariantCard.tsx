import Icon from '@/components/ui/icon';
import { EngineVariant, getGainPercentage } from './chipTuningData';

interface EngineVariantCardProps {
  variant: EngineVariant;
  engineType: 'petrol' | 'diesel';
  color: string;
  index: number;
}

export default function EngineVariantCard({ variant, engineType, color, index }: EngineVariantCardProps) {
  const powerGain = getGainPercentage(variant.powerBefore, variant.powerAfter);
  const torqueGain = getGainPercentage(variant.torqueBefore, variant.torqueAfter);

  return (
    <div
      className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      style={{
        background: `linear-gradient(135deg, ${color}0D, ${color}05)`,
        border: `1px solid ${color}30`,
        boxShadow: `0 8px 32px ${color}20`,
        animationDelay: `${index * 50}ms`
      }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-light text-white mb-2">{variant.name}</h3>
          <div className="flex items-center gap-2">
            <Icon name={engineType === 'petrol' ? 'Flame' : 'Fuel'} className="w-4 h-4" style={{ color }} />
            <span className="text-white/60 text-sm">{engineType === 'petrol' ? 'Бензиновый' : 'Дизельный'}</span>
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
          <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
            <Icon name="Gauge" className="w-3 h-3" />
            Мощность
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white/60 text-lg">{variant.powerBefore}</span>
            <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
            <span className="text-2xl font-light" style={{ color }}>{variant.powerAfter}</span>
            <span className="text-white/40 text-sm">л.с.</span>
          </div>
          <div className="text-green-400 text-xs">+{variant.powerAfter - variant.powerBefore} л.с.</div>
        </div>

        <div>
          <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
            <Icon name="Zap" className="w-3 h-3" />
            Крутящий момент
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-white/60 text-lg">{variant.torqueBefore}</span>
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
        <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
          <Icon name="Car" className="w-3 h-3" />
          Подходящие модели:
        </div>
        <div className="flex flex-wrap gap-2">
          {variant.models.map((model, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-lg text-xs text-white/70"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                border: `1px solid ${color}25`
              }}
            >
              {model}
            </span>
          ))}
        </div>
      </div>

      <div 
        className="pt-6 border-t flex items-center justify-between"
        style={{ borderColor: `${color}20` }}
      >
        <div>
          <div className="text-white/40 text-xs mb-1">Стоимость Stage 1</div>
          <div className="text-xl font-light" style={{ color }}>
            {variant.price.toLocaleString('ru-RU')} ₽
          </div>
        </div>
        <a
          href="https://t.me/Bocha_reborn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            boxShadow: `0 8px 24px ${color}40`
          }}
        >
          <Icon name="MessageCircle" className="w-4 h-4" />
          <span>Заказать</span>
        </a>
      </div>
    </div>
  );
}
