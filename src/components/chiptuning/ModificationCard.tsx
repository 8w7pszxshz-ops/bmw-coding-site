import Icon from '@/components/ui/icon';
import { EngineModification } from '@/types/chiptuning';

interface ModificationCardProps {
  modification: EngineModification;
  totalPrice: number;
  bodyName: string;
}

export default function ModificationCard({ modification, totalPrice, bodyName }: ModificationCardProps) {
  const typeColor = modification.engineType === 'petrol' ? '#FF0040' : '#00A8E8';
  const powerGainPercent = Math.round(((modification.powerAfter - modification.powerBefore) / modification.powerBefore) * 100);
  const torqueGainPercent = Math.round(((modification.torqueAfter - modification.torqueBefore) / modification.torqueBefore) * 100);

  return (
    <div
      className="p-5 rounded-xl transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
        border: `1px solid ${typeColor}30`
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        <Icon 
          name={modification.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
          className="w-6 h-6 flex-shrink-0" 
          style={{ color: typeColor }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-white font-medium text-base uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
              {modification.name}
            </div>
            {modification.isRestyling && (
              <span className="px-2 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-xs rounded" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                LCI
              </span>
            )}
          </div>
          <div className="text-white/50 text-xs uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
            {modification.engineType === 'petrol' ? 'БЕНЗИНОВЫЙ ДВИГАТЕЛЬ' : 'ДИЗЕЛЬНЫЙ ДВИГАТЕЛЬ'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div 
          className="p-3 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${typeColor}10, ${typeColor}05)`,
            border: `1px solid ${typeColor}20`
          }}
        >
          <div className="text-white/50 text-[10px] mb-1 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>МОЩНОСТЬ</div>
          <div className="flex items-center gap-1 mb-1" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
            <span className="text-white text-base">{modification.powerBefore}</span>
            <Icon name="ArrowRight" className="w-3 h-3 text-white/40" />
            <span className="text-lg" style={{ color: typeColor }}>{modification.powerAfter}</span>
          </div>
          <div className="text-white/60 text-xs mb-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>Л.С.</div>
          <div className="text-xs font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>+{powerGainPercent}%</div>
        </div>

        <div 
          className="p-3 rounded-lg"
          style={{
            background: `linear-gradient(135deg, ${typeColor}10, ${typeColor}05)`,
            border: `1px solid ${typeColor}20`
          }}
        >
          <div className="text-white/50 text-[10px] mb-1 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>КРУТЯЩИЙ МОМЕНТ</div>
          <div className="flex items-center gap-1 mb-1" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
            <span className="text-white text-base">{modification.torqueBefore}</span>
            <Icon name="ArrowRight" className="w-3 h-3 text-white/40" />
            <span className="text-lg" style={{ color: typeColor }}>{modification.torqueAfter}</span>
          </div>
          <div className="text-white/60 text-xs mb-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>НМ</div>
          <div className="text-xs font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>+{torqueGainPercent}%</div>
        </div>
      </div>

      <div 
        className="p-4 rounded-lg text-center mb-4"
        style={{
          background: `linear-gradient(135deg, ${typeColor}20, ${typeColor}10)`,
          border: `1px solid ${typeColor}40`
        }}
      >
        <div className="text-white/60 text-xs mb-1 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>СТОИМОСТЬ ПРОШИВКИ</div>
        <div className="text-2xl" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
          {totalPrice.toLocaleString()} ₽
        </div>
      </div>

      <a
        href="https://t.me/bmw_tuning_spb"
        target="_blank"
        rel="noopener noreferrer"
        className="py-3 px-4 w-full rounded-xl text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${typeColor}40, ${typeColor}30)`,
          border: `1px solid ${typeColor}60`
        }}
      >
        <Icon name="MessageCircle" className="w-4 h-4" />
        <span className="uppercase text-sm" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>Заказать</span>
      </a>
    </div>
  );
}
