import { useState, memo, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import ScrollIndicator from '@/components/ScrollIndicator';
import { City } from '@/components/CitySelector';
import { useChiptuningData } from '@/hooks/useChiptuningData';
import { ModelData } from '@/types/chiptuning';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ChipTuningMobileViewProps {
  selectedCity: City;
  onClose?: () => void;
}

type Step = 'series' | 'body' | 'engine';

const ChipTuningMobileView = memo(function ChipTuningMobileView({ selectedCity, onClose }: ChipTuningMobileViewProps) {
  const { data: apiData, loading, error } = useChiptuningData();
  const [step, setStep] = useState<Step>('series');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<ModelData | null>(null);
  const [selectedMod, setSelectedMod] = useState<any>(null);
  const [showPoliceLights, setShowPoliceLights] = useState(true);

  useEffect(() => {
    const audio = new Audio('/reborn-sound.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));

    const timer = setTimeout(() => {
      setShowPoliceLights(false);
    }, 4500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const models = apiData;

  const uniqueSeries = Array.from(new Set(models.map(m => m.name)))
    .sort((a, b) => {
      const getSeriesNum = (name: string) => {
        const match = name.match(/(\d+)/);
        return match ? parseInt(match[1]) : 999;
      };
      
      const getSeriesType = (name: string) => {
        if (name.startsWith('M') && name.includes('Series')) return 3; // M-серии в конце (M2, M3, M4...)
        if (name.startsWith('X')) return 2; // X-серии после обычных
        return 1; // Обычные серии (1-8) первыми
      };
      
      const typeA = getSeriesType(a);
      const typeB = getSeriesType(b);
      
      if (typeA !== typeB) {
        return typeA - typeB;
      }
      
      return getSeriesNum(a) - getSeriesNum(b);
    });
  
  const bodiesForSeries = selectedSeries 
    ? models.filter(m => m.name === selectedSeries).sort((a, b) => {
        if (a.generation !== b.generation) {
          return a.generation === 'G' ? -1 : 1;
        }
        return a.series.localeCompare(b.series);
      })
    : [];

  const handleSeriesSelect = (series: string) => {
    setSelectedSeries(series);
    setStep('body');
  };

  const handleBodySelect = (body: ModelData) => {
    setSelectedBody(body);
    setStep('engine');
  };

  const handleBack = () => {
    if (step === 'engine') {
      setSelectedBody(null);
      setStep('body');
    } else if (step === 'body') {
      setSelectedSeries(null);
      setStep('series');
    }
  };

  const getPriceForCity = (basePrice: number) => {
    return selectedCity.value === 'moscow' ? basePrice : Math.round(basePrice * 0.9);
  };

  if (loading) {
    return (
      <div className="mb-12 px-4 flex items-center justify-center py-20">
        <div className="w-12 h-12 rounded-full border-4 border-[#FF0040]/20 border-t-[#FF0040] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12 px-4 text-center py-20">
        <Icon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-white/70 text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>ОШИБКА ЗАГРУЗКИ ДАННЫХ</p>
        <p className="text-white/50 text-xs mt-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>ИСПОЛЬЗУЮТСЯ ЛОКАЛЬНЫЕ ДАННЫЕ</p>
      </div>
    );
  }

  return (
    <div className="mb-12 px-4">
      <div className="text-center mb-8">
        <img 
          src="https://cdn.poehali.dev/files/rebornlogo.png" 
          alt="Reborn Technologies" 
          className="h-8 w-auto object-contain mx-auto mb-4"
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-white text-xl" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal', letterSpacing: '-0.02em' }}>
            {step === 'series' && 'ВЫБЕРИТЕ СЕРИЮ BMW'}
            {step === 'body' && 'ВЫБЕРИТЕ КУЗОВ'}
            {step === 'engine' && 'ВЫБЕРИТЕ МОДИФИКАЦИЮ'}
          </h2>
        </div>
      </div>

      {step !== 'series' && (
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Icon name="ArrowLeft" className="w-4 h-4" />
          <span style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>НАЗАД</span>
        </button>
      )}

      {step === 'series' && (
        <>
          <div className="overflow-x-auto scrollbar-hide -mx-4 snap-x snap-mandatory">
            <div className="flex gap-4 px-4 pb-2">
              {uniqueSeries.map((series) => (
                <button
                  key={series}
                  onClick={() => handleSeriesSelect(series)}
                  className="snap-center min-w-[160px] p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Icon name="Waypoints" className="w-10 h-10 text-[#FF0040] mx-auto mb-2" />
                  <div className="text-white text-base" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>{series.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </div>
          <ScrollIndicator totalItems={uniqueSeries.length} color="#FF6B35" />
        </>
      )}

      {step === 'body' && (
        <>
          <div className="overflow-x-auto scrollbar-hide -mx-4 snap-x snap-mandatory">
            <div className="flex gap-4 px-4 pb-2">
              {bodiesForSeries.map((body) => (
                <button
                  key={body.series}
                  onClick={() => handleBodySelect(body)}
                  className="snap-center min-w-[160px] p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Icon name="Box" className="w-10 h-10 text-[#FF0040] mx-auto mb-2" />
                  <div className="text-white text-base" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>{body.series.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </div>
          <ScrollIndicator totalItems={bodiesForSeries.length} color="#FF6B35" />
        </>
      )}

      {step === 'engine' && selectedBody && (
        <div className="space-y-2">
          {selectedBody.modifications.map((mod, idx) => {
            const totalPrice = getPriceForCity(mod.price);
            const typeColor = mod.engineType === 'petrol' ? '#FF0040' : '#00A8E8';
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedMod(mod)}
                className="w-full p-3 rounded-xl transition-all duration-300 active:scale-95 text-left"
                style={{
                  background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                  border: `1px solid ${typeColor}30`
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    name={mod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                    className="w-5 h-5 flex-shrink-0" 
                    style={{ color: typeColor }}
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm flex items-center gap-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {mod.name}
                      {mod.isRestyling && (
                        <span className="px-1.5 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-[10px] rounded" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                          LCI
                        </span>
                      )}
                    </div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {mod.powerBefore} → {mod.powerAfter} л.с. • {mod.torqueBefore} → {mod.torqueAfter} Нм
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {totalPrice.toLocaleString()} ₽
                    </div>
                  </div>
                  <Icon name="ChevronRight" className="w-4 h-4 text-white/30 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      <Dialog open={!!selectedMod} onOpenChange={(open) => !open && setSelectedMod(null)}>
        <DialogContent 
          className="border-0 max-w-[95vw] w-full"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            backdropFilter: 'blur(40px)',
            animation: showPoliceLights ? 'chiptuningPoliceLights 1.5s steps(1) infinite' : 'none'
          }}
        >
          {selectedMod && (() => {
            const totalPrice = getPriceForCity(selectedMod.price);
            const typeColor = selectedMod.engineType === 'petrol' ? '#FF0040' : '#00A8E8';
            const powerGainPercent = Math.round(((selectedMod.powerAfter - selectedMod.powerBefore) / selectedMod.powerBefore) * 100);
            const torqueGainPercent = Math.round(((selectedMod.torqueAfter - selectedMod.torqueBefore) / selectedMod.torqueBefore) * 100);
            
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center gap-2">
                    <Icon 
                      name={selectedMod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                      className="w-6 h-6" 
                      style={{ color: typeColor }}
                    />
                    <div>
                      <div className="flex items-center gap-2 text-lg" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <span>{selectedMod.name}</span>
                        {selectedMod.isRestyling && (
                          <span className="px-2 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-xs rounded" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                            LCI
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-white/50 font-normal uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        {selectedMod.engineType === 'petrol' ? 'Бензиновый двигатель' : 'Дизельный двигатель'}
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                        border: `1px solid ${typeColor}30`
                      }}
                    >
                      <div className="text-white/50 text-xs mb-2 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>Мощность</div>
                      <div className="flex items-baseline gap-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <span className="text-white text-lg">{selectedMod.powerBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4 text-white/30" />
                        <span className="text-2xl font-bold" style={{ color: typeColor }}>{selectedMod.powerAfter} <span className="text-sm">л.с.</span></span>
                      </div>
                      <div className="mt-2 text-sm font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>+{powerGainPercent}%</div>
                    </div>

                    <div 
                      className="p-4 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                        border: `1px solid ${typeColor}30`
                      }}
                    >
                      <div className="text-white/50 text-xs mb-2 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>Крутящий момент</div>
                      <div className="flex items-baseline gap-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <span className="text-white text-lg">{selectedMod.torqueBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4 text-white/30" />
                        <span className="text-2xl font-bold" style={{ color: typeColor }}>{selectedMod.torqueAfter} <span className="text-sm">Нм</span></span>
                      </div>
                      <div className="mt-2 text-sm font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>+{torqueGainPercent}%</div>
                    </div>
                  </div>

                  <div 
                    className="p-5 rounded-xl text-center"
                    style={{
                      background: `linear-gradient(135deg, ${typeColor}20, ${typeColor}10)`,
                      border: `1px solid ${typeColor}40`
                    }}
                  >
                    <div className="text-white/60 text-xs mb-1 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>Стоимость прошивки</div>
                    <div className="text-3xl font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {totalPrice.toLocaleString()} ₽
                    </div>
                  </div>

                  <a
                    href={`https://t.me/bmw_tuning_spb`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${typeColor}, ${typeColor}CC)`,
                      boxShadow: `0 8px 32px ${typeColor}40`
                    }}
                  >
                    <Icon name="MessageCircle" className="w-5 h-5" />
                    <span style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>ЗАПИСАТЬСЯ НА ЧИП-ТЮНИНГ</span>
                  </a>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default ChipTuningMobileView;