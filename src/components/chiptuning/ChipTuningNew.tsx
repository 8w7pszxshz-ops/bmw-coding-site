import { useState, memo } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import { bmwModels, getTypeColor, getGainPercentage, ModelData } from './chipTuningDataNew';
import ScrollIndicator from '@/components/ScrollIndicator';
import { City } from '@/components/CitySelector';

interface ChipTuningProps {
  selectedCity: City;
}

type Step = 'generation' | 'model' | 'engine';

const ChipTuningMobile = memo(function ChipTuningMobile({ selectedCity }: ChipTuningProps) {
  const [step, setStep] = useState<Step>('generation');
  const [selectedGeneration, setSelectedGeneration] = useState<'F' | 'G' | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const [selectedEngine, setSelectedEngine] = useState<ModelData['engines'][0] | null>(null);

  const filteredModels = selectedGeneration 
    ? bmwModels.filter(m => m.generation === selectedGeneration)
    : [];

  const uniqueModels = filteredModels.reduce((acc, model) => {
    const existing = acc.find(m => m.name === model.name);
    if (!existing) {
      acc.push(model);
    }
    return acc;
  }, [] as ModelData[]);

  const handleGenerationSelect = (gen: 'F' | 'G') => {
    setSelectedGeneration(gen);
    setStep('model');
  };

  const handleModelSelect = (model: ModelData) => {
    setSelectedModel(model);
    setStep('engine');
  };

  const handleBack = () => {
    if (step === 'engine') {
      setSelectedEngine(null);
      setStep('model');
    } else if (step === 'model') {
      setSelectedModel(null);
      setStep('generation');
    }
  };

  const getPriceForCity = (basePrice: number) => {
    return selectedCity.value === 'moscow' ? basePrice : Math.round(basePrice * 0.9);
  };

  return (
    <div className="mb-12 px-4">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon name="Gauge" className="w-6 h-6 text-[#FF0040]" />
          <h2 className="font-light text-white text-xl">
            {step === 'generation' && 'Выберите поколение BMW'}
            {step === 'model' && 'Выберите модель'}
            {step === 'engine' && 'Выберите двигатель'}
          </h2>
        </div>
        <p className="text-white/60 text-xs">Цены включают полную диагностику перед работами</p>
      </div>

      {step !== 'generation' && (
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

      {step === 'generation' && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'F' as const, label: 'F-серия', years: '2010-2018', icon: 'Calendar' },
            { id: 'G' as const, label: 'G-серия', years: '2015+', icon: 'CalendarDays' }
          ].map((gen) => (
            <button
              key={gen.id}
              onClick={() => handleGenerationSelect(gen.id)}
              className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Icon name={gen.icon as any} className="w-12 h-12 text-[#FF0040] mx-auto mb-3" />
              <div className="text-white font-medium text-lg mb-1">{gen.label}</div>
              <div className="text-white/50 text-xs">{gen.years}</div>
            </button>
          ))}
        </div>
      )}

      {step === 'model' && (
        <>
          <div className="overflow-x-auto scrollbar-hide -mx-4 snap-x snap-mandatory">
            <div className="flex gap-4 px-4 pb-2">
              {uniqueModels.map((model) => (
                <button
                  key={model.series}
                  onClick={() => handleModelSelect(model)}
                  className="snap-center min-w-[160px] p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Icon name="Car" className="w-10 h-10 text-[#FF0040] mx-auto mb-2" />
                  <div className="text-white font-medium text-base mb-1">{model.name}</div>
                  <div className="text-white/50 text-xs">{model.series}</div>
                </button>
              ))}
            </div>
          </div>
          <ScrollIndicator totalItems={uniqueModels.length} color="#FF6B35" />
        </>
      )}

      {step === 'engine' && selectedModel && (
        <div className="space-y-4">
          {selectedModel.engines.map((engine, idx) => (
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
                  <div
                    key={midx}
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-white font-medium">{mod.name}</div>
                      <div className="text-[#FF0040] font-bold text-lg">
                        {getPriceForCity(mod.price).toLocaleString()} ₽
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-white/50 mb-1">Мощность</div>
                        <div className="text-white">
                          {mod.powerBefore} → <span className="text-[#FF0040] font-bold">{mod.powerAfter} л.с.</span>
                        </div>
                        <div className="text-green-400 text-[10px]">+{getGainPercentage(mod.powerBefore, mod.powerAfter)}%</div>
                      </div>
                      <div>
                        <div className="text-white/50 mb-1">Крутящий момент</div>
                        <div className="text-white">
                          {mod.torqueBefore} → <span className="text-[#FF0040] font-bold">{mod.torqueAfter} Нм</span>
                        </div>
                        <div className="text-green-400 text-[10px]">+{getGainPercentage(mod.torqueBefore, mod.torqueAfter)}%</div>
                      </div>
                    </div>

                    <a
                      href={`https://t.me/bmw_tuning_spb`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 w-full py-2.5 px-4 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${getTypeColor(engine.type)}, ${getTypeColor(engine.type)}CC)`,
                        boxShadow: `0 8px 32px ${getTypeColor(engine.type)}40`
                      }}
                    >
                      <Icon name="MessageCircle" className="w-4 h-4" />
                      Записаться
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const ChipTuningDesktop = memo(function ChipTuningDesktop({ selectedCity }: ChipTuningProps) {
  const [step, setStep] = useState<Step>('generation');
  const [selectedGeneration, setSelectedGeneration] = useState<'F' | 'G' | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);

  const filteredModels = selectedGeneration 
    ? bmwModels.filter(m => m.generation === selectedGeneration)
    : [];

  const uniqueModels = filteredModels.reduce((acc, model) => {
    const existing = acc.find(m => m.name === model.name);
    if (!existing) {
      acc.push(model);
    }
    return acc;
  }, [] as ModelData[]);

  const handleGenerationSelect = (gen: 'F' | 'G') => {
    setSelectedGeneration(gen);
    setStep('model');
  };

  const handleModelSelect = (model: ModelData) => {
    setSelectedModel(model);
    setStep('engine');
  };

  const handleBack = () => {
    if (step === 'engine') {
      setSelectedModel(null);
      setStep('model');
    } else if (step === 'model') {
      setSelectedGeneration(null);
      setStep('generation');
    }
  };

  const getPriceForCity = (basePrice: number) => {
    return selectedCity.value === 'moscow' ? basePrice : Math.round(basePrice * 0.9);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Gauge" className="w-8 h-8 text-[#FF0040]" />
          <h2 className="font-light text-white text-3xl">
            {step === 'generation' && 'Выберите поколение BMW'}
            {step === 'model' && 'Выберите модель'}
            {step === 'engine' && 'Выберите двигатель и модификацию'}
          </h2>
        </div>
        <p className="text-white/60 text-sm">Все данные актуальны для прошивок 2025 года. Цены включают полную компьютерную диагностику перед началом работ</p>
      </div>

      {step !== 'generation' && (
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

      {step === 'generation' && (
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            { id: 'F' as const, label: 'F-серия', years: '2010-2018', icon: 'Calendar', desc: 'Легендарное поколение' },
            { id: 'G' as const, label: 'G-серия', years: '2015+', icon: 'CalendarDays', desc: 'Современные технологии' }
          ].map((gen) => (
            <button
              key={gen.id}
              onClick={() => handleGenerationSelect(gen.id)}
              className="p-10 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(231,34,46,0.5)]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Icon name={gen.icon as any} className="w-16 h-16 text-[#FF0040] mx-auto mb-4" />
              <div className="text-white font-medium text-2xl mb-2">{gen.label}</div>
              <div className="text-white/50 text-sm mb-1">{gen.years}</div>
              <div className="text-white/40 text-xs">{gen.desc}</div>
            </button>
          ))}
        </div>
      )}

      {step === 'model' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueModels.map((model) => (
            <button
              key={model.series}
              onClick={() => handleModelSelect(model)}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(231,34,46,0.4)]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Icon name="Car" className="w-14 h-14 text-[#FF0040] mx-auto mb-3" />
              <div className="text-white font-medium text-xl mb-1">{model.name}</div>
              <div className="text-white/50 text-sm">{model.series}</div>
            </button>
          ))}
        </div>
      )}

      {step === 'engine' && selectedModel && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedModel.engines.map((engine, idx) => (
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
                  <div
                    key={midx}
                    className="p-5 rounded-xl"
                    style={{
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-white font-medium text-lg">{mod.name}</div>
                      <div className="text-[#FF0040] font-bold text-2xl">
                        {getPriceForCity(mod.price).toLocaleString()} ₽
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-white/50 text-sm mb-2">Мощность</div>
                        <div className="text-white text-base">
                          {mod.powerBefore} → <span className="text-[#FF0040] font-bold">{mod.powerAfter} л.с.</span>
                        </div>
                        <div className="text-green-400 text-sm mt-1">+{getGainPercentage(mod.powerBefore, mod.powerAfter)}%</div>
                      </div>
                      <div>
                        <div className="text-white/50 text-sm mb-2">Крутящий момент</div>
                        <div className="text-white text-base">
                          {mod.torqueBefore} → <span className="text-[#FF0040] font-bold">{mod.torqueAfter} Нм</span>
                        </div>
                        <div className="text-green-400 text-sm mt-1">+{getGainPercentage(mod.torqueBefore, mod.torqueAfter)}%</div>
                      </div>
                    </div>

                    <a
                      href={`https://t.me/bmw_tuning_spb`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-6 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${getTypeColor(engine.type)}, ${getTypeColor(engine.type)}CC)`,
                        boxShadow: `0 8px 32px ${getTypeColor(engine.type)}40`
                      }}
                    >
                      <Icon name="MessageCircle" className="w-5 h-5" />
                      Записаться на чип-тюнинг
                    </a>
                  </div>
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

export default function ChipTuningNew({ selectedCity }: ChipTuningProps) {
  return (
    <>
      <Adaptive.Mobile>
        <ChipTuningMobile selectedCity={selectedCity} />
      </Adaptive.Mobile>
      <Adaptive.Desktop>
        <ChipTuningDesktop selectedCity={selectedCity} />
      </Adaptive.Desktop>
    </>
  );
}
