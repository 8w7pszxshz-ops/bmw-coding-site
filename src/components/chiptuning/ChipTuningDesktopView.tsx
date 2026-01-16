import { useState, memo, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import ModificationCard from './ModificationCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useChiptuningData } from '@/hooks/useChiptuningData';
import { ModelData } from '@/types/chiptuning';

interface ChipTuningDesktopViewProps {
  selectedCity: City;
  onClose?: () => void;
}

type Step = 'series' | 'body' | 'engine';

const ChipTuningDesktopView = memo(function ChipTuningDesktopView({ selectedCity, onClose }: ChipTuningDesktopViewProps) {
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
      <div className="mb-16 flex items-center justify-center py-20">
        <div className="w-12 h-12 rounded-full border-4 border-[#FF0040]/20 border-t-[#FF0040] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-16 text-center py-20">
        <Icon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-white/70" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>ОШИБКА ЗАГРУЗКИ ДАННЫХ: {error.toUpperCase()}</p>
        <p className="text-white/50 text-sm mt-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>ИСПОЛЬЗУЮТСЯ ЛОКАЛЬНЫЕ ДАННЫЕ</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      {showPoliceLights && (
        <div 
          className="fixed inset-0 pointer-events-none z-[9999] animate-police-lights"
          style={{ mixBlendMode: 'screen' }}
        />
      )}
      <Dialog open={step === 'series'} onOpenChange={(open) => {
        if (!open && onClose) {
          onClose();
        }
      }}>
        <DialogContent 
          className="border-0 max-w-4xl"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white flex flex-col items-center justify-center gap-4">
              <img 
                src="https://cdn.poehali.dev/files/rebornlogo.png" 
                alt="Reborn Technologies" 
                className="h-12 w-auto object-contain"
              />
              <span className="text-3xl" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal', letterSpacing: '-0.02em' }}>ВЫБЕРИТЕ СЕРИЮ BMW</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 0, 64, 0.5) rgba(255, 255, 255, 0.1)' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {uniqueSeries.map((series) => (
                <button
                  key={series}
                  onClick={() => handleSeriesSelect(series)}
                  className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(231,34,46,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Icon name="Waypoints" className="w-14 h-14 text-[#FF0040] mx-auto mb-3" />
                  <div className="text-white text-xl" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>{series.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {step !== 'series' && (
        <div className="text-center mb-12">
          <img 
            src="https://cdn.poehali.dev/files/rebornlogo.png" 
            alt="Reborn Technologies" 
            className="h-12 w-auto object-contain mx-auto mb-6"
          />
          <div className="flex items-center justify-center gap-3 mb-2">
            <h2 className="text-white text-3xl" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal', letterSpacing: '-0.02em' }}>
              {step === 'body' && 'ВЫБЕРИТЕ КУЗОВ'}
              {step === 'engine' && 'ВЫБЕРИТЕ МОДИФИКАЦИЮ'}
            </h2>
          </div>
        </div>
      )}

      {step !== 'series' && (
        <button
          onClick={handleBack}
          className="mb-8 px-6 py-3 rounded-xl text-white/60 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Icon name="ArrowLeft" className="w-5 h-5" />
          <span style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>НАЗАД</span>
        </button>
      )}

      {step === 'body' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bodiesForSeries.map((body) => (
            <button
              key={body.series}
              onClick={() => handleBodySelect(body)}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(231,34,46,0.4)]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Icon name="Box" className="w-14 h-14 text-[#FF0040] mx-auto mb-3" />
              <div className="text-white text-xl" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>{body.series.toUpperCase()}</div>
            </button>
          ))}
        </div>
      )}

      {step === 'engine' && selectedBody && (
        <div className="max-w-5xl mx-auto space-y-2">
          {selectedBody.modifications.map((mod, idx) => {
            const totalPrice = getPriceForCity(mod.price);
            const powerGain = mod.powerAfter - mod.powerBefore;
            const torqueGain = mod.torqueAfter - mod.torqueBefore;
            const typeColor = mod.engineType === 'petrol' ? '#FF0040' : '#00A8E8';
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedMod(mod)}
                className="w-full p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-4 text-left"
                style={{
                  background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                  border: `1px solid ${typeColor}30`
                }}
              >
                <Icon 
                  name={mod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ color: typeColor }}
                />
                <div className="flex-1 flex items-center gap-6">
                  <div className="min-w-[180px]">
                    <div className="text-white flex items-center gap-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {mod.name.toUpperCase()}
                      {mod.isRestyling && (
                        <span className="px-2 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-xs rounded border border-[#FF0040]/30">
                          LCI
                        </span>
                      )}
                    </div>
                    <div className="text-white/50 text-xs" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {mod.engineType === 'petrol' ? 'БЕНЗИН' : 'ДИЗЕЛЬ'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-1">
                    <div className="text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      <span className="text-white/50">МОЩНОСТЬ: </span>
                      <span className="text-white">{mod.powerBefore}</span>
                      <Icon name="ArrowRight" className="w-3 h-3 inline mx-1 text-white/30" />
                      <span style={{ color: typeColor }} className="font-bold">{mod.powerAfter} л.с.</span>
                      <span className="text-green-400 text-xs ml-2">+{powerGain}</span>
                    </div>
                    
                    <div className="text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      <span className="text-white/50">МОМЕНТ: </span>
                      <span className="text-white">{mod.torqueBefore}</span>
                      <Icon name="ArrowRight" className="w-3 h-3 inline mx-1 text-white/30" />
                      <span style={{ color: typeColor }} className="font-bold">{mod.torqueAfter} Нм</span>
                      <span className="text-green-400 text-xs ml-2">+{torqueGain}</span>
                    </div>
                  </div>
                  
                  <div className="text-right min-w-[140px]">
                    <div className="font-bold text-xl" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {totalPrice.toLocaleString()} ₽
                    </div>
                  </div>
                  
                  <Icon name="ChevronRight" className="w-5 h-5 text-white/30 flex-shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {step === 'engine' && (
        <div 
          className="mt-8 p-6 rounded-2xl max-w-4xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(0, 212, 255, 0.05))',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="flex items-start gap-3">
            <Icon name="Info" className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-1" />
            <div className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
              <p className="mb-2"><strong className="text-white">ПРОЦЕСС ЗАНИМАЕТ 2-3 ЧАСА:</strong> ПРЕДВАРИТЕЛЬНАЯ ДИАГНОСТИКА, СЧИТЫВАНИЕ ПРОШИВКИ ЧЕРЕЗ OBD-ПОРТ, КОРРЕКЦИЯ STAGE 1, ЗАПИСЬ И ТЕСТ-ДРАЙВ С ВЛАДЕЛЬЦЕМ.</p>
              <p className="text-white/60 text-xs">ГАРАНТИЯ НА ВСЕ РАБОТЫ. ДЛЯ БЕНЗИНОВЫХ ДВИГАТЕЛЕЙ РЕКОМЕНДУЕТСЯ ТОПЛИВО АИ-98.</p>
            </div>
          </div>
        </div>
      )}

      <Dialog open={!!selectedMod} onOpenChange={(open) => !open && setSelectedMod(null)}>
        <DialogContent 
          className="border-0 max-w-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8)'
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
                  <DialogTitle className="text-white flex items-center gap-3">
                    <Icon 
                      name={selectedMod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                      className="w-8 h-8" 
                      style={{ color: typeColor }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-light text-2xl" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>{selectedMod.name.toUpperCase()}</span>
                        {selectedMod.isRestyling && (
                          <span className="px-2 py-1 bg-[#FF0040]/20 text-[#FF0040] text-xs rounded border border-[#FF0040]/30" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                            LCI
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/50 font-normal" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        {selectedMod.engineType === 'petrol' ? 'БЕНЗИНОВЫЙ ДВИГАТЕЛЬ' : 'ДИЗЕЛЬНЫЙ ДВИГАТЕЛЬ'}
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div 
                      className="p-6 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                        border: `1px solid ${typeColor}30`
                      }}
                    >
                      <div className="text-white/50 text-sm mb-3" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>МОЩНОСТЬ</div>
                      <div className="flex items-baseline gap-3" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <span className="text-white text-2xl">{selectedMod.powerBefore}</span>
                        <Icon name="ArrowRight" className="w-5 h-5 text-white/30" />
                        <span className="text-4xl font-bold" style={{ color: typeColor }}>{selectedMod.powerAfter}</span>
                        <span className="text-white/50 text-lg">л.с.</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <div className="text-green-400 text-xl font-bold">+{powerGainPercent}%</div>
                        <div className="text-white/40 text-sm">(+{selectedMod.powerAfter - selectedMod.powerBefore} л.с.)</div>
                      </div>
                    </div>

                    <div 
                      className="p-6 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                        border: `1px solid ${typeColor}30`
                      }}
                    >
                      <div className="text-white/50 text-sm mb-3" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>КРУТЯЩИЙ МОМЕНТ</div>
                      <div className="flex items-baseline gap-3" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <span className="text-white text-2xl">{selectedMod.torqueBefore}</span>
                        <Icon name="ArrowRight" className="w-5 h-5 text-white/30" />
                        <span className="text-4xl font-bold" style={{ color: typeColor }}>{selectedMod.torqueAfter}</span>
                        <span className="text-white/50 text-lg">Нм</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                        <div className="text-green-400 text-xl font-bold">+{torqueGainPercent}%</div>
                        <div className="text-white/40 text-sm">(+{selectedMod.torqueAfter - selectedMod.torqueBefore} Нм)</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-6 rounded-xl text-center"
                    style={{
                      background: `linear-gradient(135deg, ${typeColor}20, ${typeColor}10)`,
                      border: `1px solid ${typeColor}40`
                    }}
                  >
                    <div className="text-white/60 text-sm mb-2" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>СТОИМОСТЬ ПРОШИВКИ</div>
                    <div className="text-5xl font-bold mb-1" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      {totalPrice.toLocaleString()} ₽
                    </div>
                    <div className="text-white/40 text-xs" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif', letterSpacing: '-0.01em' }}>
                      ВКЛЮЧАЕТ ДИАГНОСТИКУ И ТЕСТ-ДРАЙВ
                    </div>
                  </div>

                  <a
                    href={`https://t.me/bmw_tuning_spb`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105"
                    aria-label="Записаться на чип-тюнинг"
                    style={{
                      background: `linear-gradient(135deg, ${typeColor}, ${typeColor}CC)`,
                      boxShadow: `0 8px 32px ${typeColor}40`
                    }}
                  >
                    <Icon name="MessageCircle" className="w-6 h-6" />
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

export default ChipTuningDesktopView;