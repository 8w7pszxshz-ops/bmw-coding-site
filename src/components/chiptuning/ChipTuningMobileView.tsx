import { useState, memo } from 'react';
import Icon from '@/components/ui/icon';
import { bmwModels, getTypeColor, ModelData } from './chipTuningDataNew';
import ScrollIndicator from '@/components/ScrollIndicator';
import { City } from '@/components/CitySelector';
import ModificationCard from './ModificationCard';
import { useChiptuningData } from '@/hooks/useChiptuningData';

interface ChipTuningMobileViewProps {
  selectedCity: City;
}

type Step = 'series' | 'body' | 'engine';

const ChipTuningMobileView = memo(function ChipTuningMobileView({ selectedCity }: ChipTuningMobileViewProps) {
  const { data: apiData, loading, error } = useChiptuningData();
  const [step, setStep] = useState<Step>('series');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<ModelData | null>(null);

  const models = apiData.length > 0 ? apiData : bmwModels;

  const uniqueSeries = Array.from(new Set(models.map(m => m.name))).sort((a, b) => {
    const getSeriesNum = (name: string) => {
      const match = name.match(/(\d+)/);
      return match ? parseInt(match[1]) : 999;
    };
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
        <p className="text-white/70 text-sm">Ошибка загрузки данных</p>
        <p className="text-white/50 text-xs mt-2">Используются локальные данные</p>
      </div>
    );
  }

  return (
    <div className="mb-12 px-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon name="Gauge" className="w-6 h-6 text-[#FF0040]" />
          <h2 className="font-light text-white text-xl">
            {step === 'series' && 'Выберите серию BMW'}
            {step === 'body' && 'Выберите кузов'}
            {step === 'engine' && 'Выберите двигатель'}
          </h2>
        </div>
        <p className="text-white/60 text-xs">Цены включают полную диагностику перед работами</p>
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
          Назад
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
                  <div className="text-white font-medium text-base">{series}</div>
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
                  <div className="text-white font-medium text-base">{body.series}</div>
                </button>
              ))}
            </div>
          </div>
          <ScrollIndicator totalItems={bodiesForSeries.length} color="#FF6B35" />
        </>
      )}

      {step === 'engine' && selectedBody && (
        <div className="space-y-4">
          {selectedBody.engines.map((engine, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${getTypeColor(engine.type)}15, ${getTypeColor(engine.type)}05)`,
                border: `1px solid ${getTypeColor(engine.type)}30`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon 
                  name={engine.type === 'petrol' ? 'Flame' : 'Fuel'} 
                  className="w-5 h-5" 
                  style={{ color: getTypeColor(engine.type) }}
                />
                <div>
                  <div className="text-white font-medium">{engine.code} {engine.displacement}L</div>
                  <div className="text-white/50 text-xs capitalize">{engine.type === 'petrol' ? 'Бензин' : 'Дизель'}</div>
                </div>
              </div>

              <div className="space-y-3">
                {engine.modifications.map((mod, midx) => (
                  <ModificationCard
                    key={midx}
                    mod={mod}
                    engineType={engine.type}
                    getPriceForCity={getPriceForCity}
                    variant="mobile"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ChipTuningMobileView;