import Icon from '@/components/ui/icon';
import { EngineGroup, getGainPercentage, getTypeColor } from './chipTuningData';

interface EngineGroupCardProps {
  group: EngineGroup;
  index: number;
  onSelect: () => void;
}

export default function EngineGroupCard({ group, index, onSelect }: EngineGroupCardProps) {
  const color = getTypeColor(group.type);
  const totalModels = group.variants.reduce((sum, v) => sum + v.models.length, 0);

  return (
    <button
      onClick={onSelect}
      className="p-8 rounded-2xl transition-all duration-500 hover:scale-105 group text-left animate-fade-in hover:shadow-[0_0_40px_rgba(231,34,46,0.6)]"
      style={{
        background: `linear-gradient(135deg, ${color}12, ${color}05)`,
        border: `1px solid ${color}40`,
        boxShadow: `0 8px 32px ${color}20`,
        animationDelay: `${index * 100}ms`,
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-2xl font-light text-white mb-2 group-hover:text-[#E7222E] transition-colors duration-300">
            {group.name}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Icon name={group.type === 'petrol' ? 'Flame' : 'Fuel'} className="w-4 h-4" style={{ color }} />
            <span className="text-sm" style={{ color }}>{group.type === 'petrol' ? 'Бензин' : 'Дизель'}</span>
          </div>
          <div className="text-white/40 text-xs">{group.description}</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-white/40 text-xs mb-2">Подходящие модели:</div>
        <div className="flex flex-wrap gap-2">
          {group.variants.flatMap(v => v.models).map((model, i) => (
            <span 
              key={i}
              className="px-2 py-1 rounded-lg text-xs text-white/70"
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
    </button>
  );
}