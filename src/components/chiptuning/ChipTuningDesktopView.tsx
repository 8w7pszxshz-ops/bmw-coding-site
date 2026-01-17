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
  const [showPoliceLights, setShowPoliceLights] = useState(false);

  useEffect(() => {
    setShowPoliceLights(true);
    
    const audio = new Audio('/reborn-sound.mp3');
    audio.volume = 0.5;
    
    const lightsTimer = setTimeout(() => {
      setShowPoliceLights(false);
    }, 4500);
    
    audio.play().catch(() => {});

    return () => {
      clearTimeout(lightsTimer);
      audio.pause();
      audio.src = '';
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
        <p className="text-white/70" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>ОШИБКА ЗАГРУЗКИ ДАННЫХ</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <Dialog open={step === 'series'} onOpenChange={(open) => {
        if (!open && onClose) onClose();
      }}>
        <DialogContent 
          className={`chiptuning-dialog border-0 max-w-4xl ${showPoliceLights ? 'with-police-lights' : ''}`}
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
              <span className="text-2xl" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>ВЫБЕРИТЕ СЕРИЮ BMW</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 0, 64, 0.5) rgba(255, 255, 255, 0.1)' }}>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueSeries.map((series) => (
                <button
                  key={series}
                  onClick={() => handleSeriesSelect(series)}
                  className="p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(231,34,46,0.3)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Icon name="Waypoints" className="w-10 h-10 text-[#FF0040] mx-auto mb-2" />
                  <div className="text-white text-base" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>{series.toUpperCase()}</div>
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
            className="mb-6 px-5 py-2.5 rounded-xl text-white/60 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Icon name="ArrowLeft" className="w-4 h-4" />
            <span style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>НАЗАД</span>
          </button>
          
          <div className="text-center mb-10">
            <img 
              src="https://cdn.poehali.dev/files/rebornlogo.png" 
              alt="Reborn Technologies" 
              className="h-12 w-auto object-contain mx-auto mb-5"
            />
            <h2 className="text-white text-2xl" style={{ fontFamily: '"Reborn Technologies", Impact, sans-serif', fontWeight: 'normal' }}>
              {step === 'body' && 'ВЫБЕРИТЕ КУЗОВ'}
              {step === 'engine' && 'ВЫБЕРИТЕ МОДИФИКАЦИЮ'}
            </h2>
          </div>
        </>
      )}

      {step === 'body' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {bodiesForSeries.map((body) => (
            <button
              key={body.series}
              onClick={() => handleBodySelect(body)}
              className="p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(231,34,46,0.3)]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              <Icon name="Box" className="w-10 h-10 text-[#FF0040] mx-auto mb-2" />
              <div className="text-white text-base" style={{ fontFamily: '"Reborn Technologies", Arial, sans-serif' }}>{body.series.toUpperCase()}</div>
            </button>
          ))}
        </div>
      )}

      {step === 'engine' && selectedBody && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedBody.modifications.map((mod, idx) => (
            <ModificationCard
              key={idx}
              modification={mod}
              totalPrice={getPriceForCity(mod.price)}
              bodyName={selectedBody.series}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default ChipTuningDesktopView;