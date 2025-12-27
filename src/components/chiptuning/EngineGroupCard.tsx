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

      <div className="space-y-2 mb-4">
        {group.variants.map((variant, i) => (
          <div key={i} className="text-white/60 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ background: color }} />
            <span>{variant.name}</span>
            <span className="text-white/40">→</span>
            <span style={{ color }}>{variant.powerAfter} л.с.</span>
            <span className="text-green-400 text-xs ml-1">+{getGainPercentage(variant.powerBefore, variant.powerAfter)}%</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-white/40 text-xs pt-3 border-t" style={{ borderColor: `${color}20` }}>
        <Icon name="Car" className="w-4 h-4" />
        <span>{totalModels} моделей BMW</span>
      </div>
    </button>
  );
}