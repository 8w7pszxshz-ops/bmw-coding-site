import { useState, memo, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { useChiptuningData } from '@/hooks/useChiptuningData';
import { ModelData, EngineModification, StageOption } from '@/types/chiptuning';
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

type Step = 'series' | 'body' | 'engine' | 'stage';

const ChipTuningMobileView = memo(function ChipTuningMobileView({ selectedCity, onClose }: ChipTuningMobileViewProps) {
  const { data: apiData, loading, error } = useChiptuningData();
  const [step, setStep] = useState<Step>('series');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<ModelData | null>(null);
  const [selectedMod, setSelectedMod] = useState<EngineModification | null>(null);
  const [selectedStage, setSelectedStage] = useState<StageOption | null>(null);
  const [showPoliceLights, setShowPoliceLights] = useState(false);

  useEffect(() => {
    setShowPoliceLights(true);
    
    const audio = new Audio('/reborn-sound.mp3');
    audio.volume = 0.25;
    
    const lightsTimer = setTimeout(() => {
      setShowPoliceLights(false);
    }, 6500);
    
    audio.play().catch(() => {});

    return () => {
      clearTimeout(lightsTimer);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (step === 'series') {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        const scrollPos = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPos);
      };
    }
  }, [step]);

  const models = apiData;

  const uniqueSeries = Array.from(new Set(models.map(m => m.name)))
    .sort((a, b) => {
      const getSeriesNum = (name: string) => {
        const match = name.match(/(\d+)/);
        return match ? parseInt(match[1]) : 999;
      };
      
      const getSeriesType = (name: string) => {
        if (name.startsWith('M') && name.includes('Series')) return 3;
        if (name.startsWith('X')) return 2;
        return 1;
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

  const handleModSelect = (mod: EngineModification) => {
    setSelectedMod(mod);
    setStep('stage');
  };

  const handleStageSelect = (stage: StageOption) => {
    setSelectedStage(stage);
  };

  const handleBack = () => {
    if (step === 'stage') {
      setSelectedMod(null);
      setSelectedStage(null);
      setStep('engine');
    } else if (step === 'engine') {
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
        <p className="text-white/70 text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>ОШИБКА ЗАГРУЗКИ ДАННЫХ</p>
      </div>
    );
  }

  const typeColor = '#FF0040';

  return (
    <div className="mb-12 px-4 min-h-screen">
      <Dialog open={step === 'series'} onOpenChange={(open) => {
        if (!open && onClose) onClose();
      }}>
        <DialogContent 
          className={`chiptuning-dialog border-0 max-w-[95vw] w-full max-h-[85vh] ${showPoliceLights ? 'with-police-lights' : ''}`}
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white flex flex-col items-center justify-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/rebornlogo.png" 
                alt="Reborn Technologies" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-lg" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>ВЫБЕРИТЕ СЕРИЮ BMW</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4 pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 0, 64, 0.5) rgba(255, 255, 255, 0.1)' }}>
            <div className="grid grid-cols-2 gap-3">
              {uniqueSeries.map((series) => (
                <button
                  key={series}
                  onClick={() => handleSeriesSelect(series)}
                  className="p-4 rounded-xl transition-all duration-300 active:scale-95 flex flex-col items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Icon name="Waypoints" className="w-7 h-7 text-[#FF0040] mb-2" />
                  <div className="text-white text-xs" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>{series.toUpperCase()}</div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {step !== 'series' && (
        <>
          <button
            onClick={handleBack}
            className="mb-4 px-3 py-2 rounded-lg text-white/60 text-xs flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Icon name="ArrowLeft" className="w-3 h-3" />
            <span style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>НАЗАД</span>
          </button>
          
          <div className="text-center mb-6">
            <img 
              src="https://cdn.poehali.dev/files/rebornlogo.png" 
              alt="Reborn Technologies" 
              className="h-8 w-auto object-contain mx-auto mb-3"
            />
            <h2 className="text-white text-lg" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
              {step === 'body' && 'ВЫБЕРИТЕ КУЗОВ'}
              {step === 'engine' && 'ВЫБЕРИТЕ ДВИГАТЕЛЬ'}
              {step === 'stage' && 'ВЫБЕРИТЕ STAGE'}
            </h2>
          </div>
        </>
      )}

      {step === 'body' && (
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 mb-4">
          <div className="flex gap-3 pb-2" style={{ scrollSnapType: 'x mandatory' }}>
            {bodiesForSeries.map((body) => (
              <button
                key={body.series}
                onClick={() => handleBodySelect(body)}
                className="snap-center min-w-[140px] p-4 rounded-xl transition-all duration-300 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <Icon name="Box" className="w-8 h-8 text-[#FF0040] mx-auto mb-2" />
                <div className="text-white text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>{body.series.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'engine' && selectedBody && (
        <div className="space-y-2 pb-20">
          {selectedBody.modifications.map((mod, idx) => (
            <button
              key={idx}
              onClick={() => handleModSelect(mod)}
              className="w-full p-4 rounded-xl transition-all duration-300 active:scale-95 text-left"
              style={{
                background: `linear-gradient(135deg, ${typeColor}15, ${typeColor}05)`,
                border: `1px solid ${typeColor}30`
              }}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  name={mod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                  className="w-6 h-6 flex-shrink-0" 
                  style={{ color: typeColor }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-white font-medium text-base uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                      {mod.name}
                    </div>
                    {mod.isRestyling && (
                      <span className="px-1.5 py-0.5 bg-[#FF0040]/20 text-[#FF0040] text-[10px] rounded" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                        LCI
                      </span>
                    )}
                  </div>
                  <div className="text-white/50 text-sm" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                    {mod.powerBefore} Л.С. • {mod.torqueBefore} НМ
                  </div>
                </div>
                <Icon name="ChevronRight" className="w-5 h-5 text-white/30 flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 'stage' && selectedMod && (
        <div className="space-y-4 pb-20">
          {selectedMod.stages.map((stage, idx) => {
            const totalPrice = getPriceForCity(stage.price);
            const powerGainPercent = Math.round(((stage.powerAfter - selectedMod.powerBefore) / selectedMod.powerBefore) * 100);
            const torqueGainPercent = Math.round(((stage.torqueAfter - selectedMod.torqueBefore) / selectedMod.torqueBefore) * 100);

            return (
              <div
                key={idx}
                className="w-full p-5 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${typeColor}25, ${typeColor}15)`,
                  border: `2px solid ${typeColor}70`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon 
                      name={selectedMod.engineType === 'petrol' ? 'Flame' : 'Fuel'} 
                      className="w-8 h-8" 
                      style={{ color: typeColor }}
                    />
                    <div>
                      <div className="text-white text-2xl uppercase leading-none mb-1" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                        {stage.stage}
                      </div>
                      <div className="text-white/50 text-xs" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>
                        {selectedMod.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold leading-none" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                      {totalPrice.toLocaleString()}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>₽</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))`
                    }}
                  >
                    <div className="text-white/50 text-[10px] mb-2 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>МОЩНОСТЬ</div>
                    <div className="flex items-baseline gap-1 mb-2" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                      <span className="text-white text-xl">{selectedMod.powerBefore}</span>
                      <Icon name="ArrowRight" className="w-3 h-3 text-white/40 mx-0.5" />
                      <span className="text-2xl" style={{ color: typeColor }}>{stage.powerAfter}</span>
                      <span className="text-white/60 text-xs ml-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>Л.С.</span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>+{powerGainPercent}%</div>
                  </div>

                  <div 
                    className="p-4 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2))`
                    }}
                  >
                    <div className="text-white/50 text-[10px] mb-2 uppercase" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>КРУТЯЩИЙ МОМЕНТ</div>
                    <div className="flex items-baseline gap-1 mb-2" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
                      <span className="text-white text-xl">{selectedMod.torqueBefore}</span>
                      <Icon name="ArrowRight" className="w-3 h-3 text-white/40 mx-0.5" />
                      <span className="text-2xl" style={{ color: typeColor }}>{stage.torqueAfter}</span>
                      <span className="text-white/60 text-xs ml-1" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>НМ</span>
                    </div>
                    <div className="text-sm font-bold" style={{ color: typeColor, fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>+{torqueGainPercent}%</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `Чип-тюнинг ${selectedMod.name} ${stage.stage}`,
                          text: `${selectedBody?.series} • ${selectedMod.name} ${stage.stage}\n💪 Мощность: ${selectedMod.powerBefore} → ${stage.powerAfter} Л.С. (+${powerGainPercent}%)\n⚡ Момент: ${selectedMod.torqueBefore} → ${stage.torqueAfter} НМ (+${torqueGainPercent}%)\n💰 Цена: ${totalPrice.toLocaleString()} ₽`,
                          url: window.location.href
                        });
                      }
                    }}
                    className="flex-1 py-3 rounded-xl text-white flex items-center justify-center gap-2 text-xs transition-all duration-300 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
                      border: `1px solid rgba(255, 255, 255, 0.2)`
                    }}
                  >
                    <Icon name="Share2" className="w-4 h-4" />
                    <span className="uppercase" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>Поделиться</span>
                  </button>

                  <a
                    href="https://t.me/bmw_tuning_spb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl text-white flex items-center justify-center gap-2 text-xs transition-all duration-300 active:scale-95"
                    style={{
                      background: `linear-gradient(135deg, ${typeColor}, ${typeColor}DD)`,
                      border: `1px solid ${typeColor}`
                    }}
                  >
                    <Icon name="MessageCircle" className="w-4 h-4" />
                    <span className="uppercase" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>Заказать</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default ChipTuningMobileView;