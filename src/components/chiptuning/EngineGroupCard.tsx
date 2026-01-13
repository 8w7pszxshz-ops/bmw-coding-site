import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import { EngineGroup, getTypeColor } from './chipTuningData';

interface EngineGroupCardProps {
  group: EngineGroup;
  index: number;
  onSelect: () => void;
}

function EngineGroupCardMobile({ group, index, onSelect }: EngineGroupCardProps) {
  const color = getTypeColor(group.type);

  return (
    <Card
      onClick={onSelect}
      className="group relative overflow-hidden border-0 transition-all duration-300 cursor-pointer flex-shrink-0"
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
          linear-gradient(135deg, ${color}08, ${color}03)
        `,
        backdropFilter: 'blur(40px)',
        boxShadow: `
          0 20px 50px -15px rgba(0, 0, 0, 0.5), 
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px ${color}15
        `,
        animationDelay: `${index * 50}ms`,
        minWidth: '260px',
        width: '260px'
      }}
    >
      <div 
        className="absolute top-0 left-0 right-0"
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${color}30 20%, ${color}70 50%, ${color}30 80%, transparent 100%)`,
          boxShadow: `0 0 25px ${color}50, 0 2px 15px ${color}40`
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${color}20 30%, ${color}40 50%, ${color}20 70%, transparent 100%)`,
          boxShadow: `0 0 12px ${color}30`
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <pattern id={`engine-card-mobile-${index}`} x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <circle cx="12.5" cy="12.5" r="0.8" fill={color} opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#engine-card-mobile-${index})`} />
      </svg>
      
      <CardContent className="p-5 relative z-10">
        <div className="mb-4">
          <Icon 
            name={group.type === 'petrol' ? 'Flame' : 'Fuel'}
            className="w-9 h-9 transition-all duration-300"
            style={{ color }}
          />
        </div>
        
        <h3 className="text-xl font-medium text-white mb-2 tracking-tight">
          {group.name}
        </h3>
        <p className="text-xs text-white/70 mb-3 font-medium">
          {group.description}
        </p>

        <div className="mb-3">
          <div className="text-white/60 text-[10px] mb-2 font-medium">Подходящие модели:</div>
          <div className="flex flex-wrap gap-1.5">
            {group.variants.flatMap(v => v.models).slice(0, 4).map((model, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 rounded-md text-[10px] text-white/90 font-medium"
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
      </CardContent>
    </Card>
  );
}

function EngineGroupCardDesktop({ group, index, onSelect }: EngineGroupCardProps) {
  const color = getTypeColor(group.type);

  return (
    <Card
      onClick={onSelect}
      className="group relative overflow-hidden border-0 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
          linear-gradient(135deg, ${color}08, ${color}03)
        `,
        backdropFilter: 'blur(40px)',
        boxShadow: `
          0 30px 80px -20px rgba(0, 0, 0, 0.6), 
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px ${color}15
        `,
        animationDelay: `${index * 50}ms`
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
          mixBlendMode: 'screen'
        }}
      />

      <div 
        className="absolute top-0 left-0 right-0"
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, ${color}30 20%, ${color}70 50%, ${color}30 80%, transparent 100%)`,
          boxShadow: `0 0 25px ${color}50, 0 2px 15px ${color}40`
        }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${color}20 30%, ${color}40 50%, ${color}20 70%, transparent 100%)`,
          boxShadow: `0 0 12px ${color}30`
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
        <defs>
          <pattern id={`engine-card-desktop-${index}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="1" fill={color} opacity="0.6">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#engine-card-desktop-${index})`} />
      </svg>
      
      <CardContent className="p-8 relative z-10">
        <div className="mb-6">
          <Icon 
            name={group.type === 'petrol' ? 'Flame' : 'Fuel'}
            className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
            style={{ color }}
          />
        </div>
        
        <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">
          {group.name}
        </h3>
        <p className="text-sm text-white/70 mb-4 font-medium">
          {group.description}
        </p>

        <div className="mb-4">
          <div className="text-white/60 text-xs mb-2 font-medium">Подходящие модели:</div>
          <div className="flex flex-wrap gap-2">
            {group.variants.flatMap(v => v.models).slice(0, 6).map((model, i) => (
              <span 
                key={i}
                className="px-2 py-1 rounded-lg text-xs text-white/90 font-medium"
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
      </CardContent>
    </Card>
  );
}

export default function EngineGroupCard(props: EngineGroupCardProps) {
  return (
    <Adaptive
      mobile={<EngineGroupCardMobile {...props} />}
      desktop={<EngineGroupCardDesktop {...props} />}
    />
  );
}