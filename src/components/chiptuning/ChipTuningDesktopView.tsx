import { useState, memo } from 'react';
import Icon from '@/components/ui/icon';
import { bmwModels, getTypeColor, ModelData } from './chipTuningDataNew';
import { City } from '@/components/CitySelector';
import ModificationCard from './ModificationCard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useChiptuningData } from '@/hooks/useChiptuningData';

interface ChipTuningDesktopViewProps {
  selectedCity: City;
}

type Step = 'series' | 'body' | 'engine';

const ChipTuningDesktopView = memo(function ChipTuningDesktopView({ selectedCity }: ChipTuningDesktopViewProps) {
  const { data: apiData, loading, error } = useChiptuningData();
  const [step, setStep] = useState<Step>('series');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<ModelData | null>(null);

  const models = apiData.length > 0 ? apiData : bmwModels;

  const uniqueSeries = Array.from(new Set(models.map(m => m.name)));
  
  const bodiesForSeries = selectedSeries 
    ? models.filter(m => m.name === selectedSeries)
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
        <p className="text-white/70">Ошибка загрузки данных: {error}</p>
        <p className="text-white/50 text-sm mt-2">Используются локальные данные</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <Dialog open={step === 'series'} onOpenChange={(open) => !open && setStep('series')}>
        <DialogContent 
          className="border-0 max-w-4xl"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-center gap-3">
              <Icon name="Gauge" className="w-8 h-8 text-[#FF0040]" />
              <span className="font-light text-3xl">Выберите серию BMW</span>
            </DialogTitle>
          </DialogHeader>
          <p className="text-white/60 text-sm text-center mb-6">Все данные актуальны для прошивок 2025 года. Цены включают полную компьютерную диагностику перед началом работ</p>
          
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
                <div className="text-white font-medium text-xl">{series}</div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {step !== 'series' && (
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Gauge" className="w-8 h-8 text-[#FF0040]" />
            <h2 className="font-light text-white text-3xl">
              {step === 'body' && 'Выберите кузов'}
              {step === 'engine' && 'Выберите двигатель и модификацию'}
            </h2>
          </div>
          <p className="text-white/60 text-sm">Все данные актуальны для прошивок 2025 года. Цены включают полную компьютерную диагностику перед началом работ</p>
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
          Назад
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
              <div className="text-white font-medium text-xl">{body.series}</div>
            </button>
          ))}
        </div>
      )}

      {step === 'engine' && selectedBody && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedBody.engines.map((engine, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${getTypeColor(engine.type)}15, ${getTypeColor(engine.type)}05)`,
                border: `1px solid ${getTypeColor(engine.type)}30`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Icon 
                  name={engine.type === 'petrol' ? 'Flame' : 'Fuel'} 
                  className="w-6 h-6" 
                  style={{ color: getTypeColor(engine.type) }}
                />
                <div>
                  <div className="text-white font-medium text-lg">{engine.code} {engine.displacement}L</div>
                  <div className="text-white/50 text-sm capitalize">{engine.type === 'petrol' ? 'Бензиновый' : 'Дизельный'}</div>
                </div>
              </div>

              <div className="space-y-4">
                {engine.modifications.map((mod, midx) => (
                  <ModificationCard
                    key={midx}
                    mod={mod}
                    engineType={engine.type}
                    getPriceForCity={getPriceForCity}
                    variant="desktop"
                  />
                ))}
              </div>
            </div>
          ))}
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
            <div className="text-white/70 text-sm leading-relaxed">
              <p className="mb-2"><strong className="text-white">Процесс занимает 2-3 часа:</strong> предварительная диагностика, считывание прошивки через OBD-порт, коррекция Stage 1, запись и тест-драйв с владельцем.</p>
              <p className="text-white/60 text-xs">Гарантия на все работы. Для бензиновых двигателей рекомендуется топливо АИ-98.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ChipTuningDesktopView;