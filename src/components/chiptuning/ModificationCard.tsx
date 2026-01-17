import Icon from '@/components/ui/icon';
import { EngineModification } from '@/types/chiptuning';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ModificationCardProps {
  modification: EngineModification;
  totalPrice: number;
  bodyName: string;
}

export default function ModificationCard({ modification, totalPrice, bodyName }: ModificationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const typeColor = modification.engineType === 'petrol' ? '#FF0040' : '#00A8E8';
  const powerGainPercent = Math.round(((modification.powerAfter - modification.powerBefore) / modification.powerBefore) * 100);
  const torqueGainPercent = Math.round(((modification.torqueAfter - modification.torqueBefore) / modification.torqueBefore) * 100);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-5 rounded-xl transition-all duration-300 hover:scale-105 text-left w-full"
        style={{
          background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
          border: `1px solid ${typeColor}30`
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Icon 
            name={modification.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
            className="w-7 h-7 flex-shrink-0" 
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
            <div className="text-white/50 text-sm uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
              {modification.engineType === 'petrol' ? 'БЕНЗИНОВЫЙ ДВИГАТЕЛЬ' : 'ДИЗЕЛЬНЫЙ ДВИГАТЕЛЬ'}
            </div>
          </div>
          <Icon name="ChevronRight" className="w-5 h-5 text-white/30 flex-shrink-0" />
        </div>

        <div className="text-white/60 text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
          {modification.powerBefore} Л.С. • {modification.torqueBefore} НМ
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="border-0 max-w-lg"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            backdropFilter: 'blur(40px)'
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white flex flex-col items-center justify-center gap-2 text-center">
              <Icon 
                name={modification.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                className="w-10 h-10" 
                style={{ color: typeColor }}
              />
              <div>
                <div className="flex items-center justify-center gap-2 text-2xl uppercase" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                  <span>{modification.name}</span>
                  {modification.isRestyling && (
                    <span className="px-2 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-sm rounded" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                      LCI
                    </span>
                  )}
                </div>
                <div className="text-sm text-white/50 font-normal mt-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                  {modification.engineType === 'petrol' ? 'БЕНЗИНОВЫЙ ДВИГАТЕЛЬ' : 'ДИЗЕЛЬНЫЙ ДВИГАТЕЛЬ'}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="p-5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                  border: `1px solid ${typeColor}30`
                }}
              >
                <div className="text-white/50 text-xs mb-2 uppercase text-center" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>МОЩНОСТЬ</div>
                <div className="flex items-center justify-center gap-1 mb-2" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                  <span className="text-white text-xl">{modification.powerBefore}</span>
                  <Icon name="ArrowRight" className="w-4 h-4 text-white/40" />
                  <span className="text-2xl" style={{ color: typeColor }}>{modification.powerAfter}</span>
                  <span className="text-white/60 text-sm ml-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>Л.С.</span>
                </div>
                <div className="text-base font-bold text-center" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>+{powerGainPercent}%</div>
              </div>

              <div 
                className="p-5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                  border: `1px solid ${typeColor}30`
                }}
              >
                <div className="text-white/50 text-xs mb-2 uppercase text-center" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>КРУТЯЩИЙ МОМЕНТ</div>
                <div className="flex items-center justify-center gap-1 mb-2" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                  <span className="text-white text-xl">{modification.torqueBefore}</span>
                  <Icon name="ArrowRight" className="w-4 h-4 text-white/40" />
                  <span className="text-2xl" style={{ color: typeColor }}>{modification.torqueAfter}</span>
                  <span className="text-white/60 text-sm ml-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>НМ</span>
                </div>
                <div className="text-base font-bold text-center" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>+{torqueGainPercent}%</div>
              </div>
            </div>

            <div 
              className="p-6 rounded-xl text-center"
              style={{
                background: `linear-gradient(135deg, ${typeColor}20, ${typeColor}10)`,
                border: `1px solid ${typeColor}40`
              }}
            >
              <div className="text-white/60 text-sm mb-2 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>СТОИМОСТЬ ПРОШИВКИ</div>
              <div className="text-4xl" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                {totalPrice.toLocaleString()} ₽
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Чип-тюнинг ${modification.name}`,
                      text: `${bodyName} • ${modification.name}\n💪 Мощность: ${modification.powerBefore} → ${modification.powerAfter} Л.С. (+${powerGainPercent}%)\n⚡ Момент: ${modification.torqueBefore} → ${modification.torqueAfter} НМ (+${torqueGainPercent}%)\n💰 Цена: ${totalPrice.toLocaleString()} ₽`,
                      url: window.location.href
                    });
                  }
                }}
                className="py-3 px-4 rounded-xl text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                  border: `1px solid ${typeColor}40`
                }}
              >
                <Icon name="Share2" className="w-4 h-4" />
                <span className="uppercase text-sm" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>Поделиться</span>
              </button>

              <a
                href="https://t.me/bmw_tuning_spb"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${typeColor}40, ${typeColor}30)`,
                  border: `1px solid ${typeColor}60`
                }}
              >
                <Icon name="MessageCircle" className="w-4 h-4" />
                <span className="uppercase text-sm" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>Заказать</span>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
