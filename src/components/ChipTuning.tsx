import { useState, memo } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';

interface ChipTuningProps {
  selectedCity: City;
}

type Series = '1 Series' | '2 Series' | '3 Series' | '4 Series' | '5 Series' | '6 Series' | '7 Series' | 'X1' | 'X3' | 'X4' | 'X5' | 'X6' | 'M2' | 'M3' | 'M4' | 'M5';

const seriesList: Series[] = [
  '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series',
  'X1', 'X3', 'X4', 'X5', 'X6',
  'M2', 'M3', 'M4', 'M5'
];

const stages = [
  { 
    id: 'stage1',
    name: 'Stage 1',
    description: 'Базовая прошивка ЭБУ',
    priceBase: 25000,
    gains: '+20-30% мощности'
  },
  { 
    id: 'stage2',
    name: 'Stage 2',
    description: 'Продвинутая прошивка + даунпайп',
    priceBase: 45000,
    gains: '+30-40% мощности'
  }
];

const ChipTuningMobile = memo(function ChipTuningMobile({ selectedCity }: ChipTuningProps) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const handleReset = () => {
    setSelectedSeries(null);
    setSelectedStage(null);
  };

  const handleOrder = () => {
    if (!selectedSeries || !selectedStage) return;
    
    const stage = stages.find(s => s.id === selectedStage);
    if (!stage) return;

    const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
    
    const message = `Чип-тюнинг BMW ${selectedSeries}\\n\\n${stage.name}\\n${stage.description}\\n${stage.gains}\\n\\nСтоимость: ${price.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="mb-12 px-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon name="Gauge" className="w-6 h-6 text-[#FF0040]" />
          <h2 className="font-light text-white text-xl">Чип-тюнинг</h2>
        </div>
        <p className="text-white/60 text-xs">Подберите программу для вашего BMW</p>
      </div>

      {!selectedSeries ? (
        <div className="space-y-3">
          <p className="text-white/70 text-sm mb-4">Выберите серию:</p>
          <div className="grid grid-cols-2 gap-3">
            {seriesList.map((series) => (
              <button
                key={series}
                onClick={() => setSelectedSeries(series)}
                className="relative p-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-start justify-center text-left overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 0, 64, 0.3)',
                  backdropFilter: 'blur(20px)',
                  minHeight: '90px'
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 0, 64, 0.08) 0%, transparent 50%, rgba(255, 0, 64, 0.05) 100%)'
                  }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                  <defs>
                    <pattern id={`dots-mobile-${series.replace(/\s/g, '-')}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="15" cy="15" r="1.5" fill="#FF0040" opacity="0.6">
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dots-mobile-${series.replace(/\s/g, '-')})`} />
                </svg>
                <div className="relative z-10">
                  <div className="text-white text-base font-bold mb-1">{series}</div>
                  <div className="text-white/50 text-xs">Выбрать серию</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <Icon name="ChevronLeft" className="w-4 h-4" />
            <span>Назад</span>
          </button>

          <div className="p-4 rounded-xl" style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 64, 0.1), rgba(255, 0, 64, 0.05))',
            border: '1px solid rgba(255, 0, 64, 0.2)'
          }}>
            <p className="text-white/70 text-xs mb-1">Выбрана серия:</p>
            <p className="text-white font-medium">{selectedSeries}</p>
          </div>

          <p className="text-white/70 text-sm">Выберите Stage:</p>

          <div className="space-y-3">
            {stages.map((stage) => {
              const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
              const isSelected = selectedStage === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className="relative w-full p-5 rounded-lg text-left transition-all duration-300"
                  style={{
                    background: '#000000',
                    border: isSelected 
                      ? '2px solid rgba(255, 0, 64, 0.5)'
                      : '1px solid rgba(255, 0, 64, 0.3)',
                    boxShadow: isSelected 
                      ? '0 4px 20px rgba(255, 0, 64, 0.3)'
                      : '0 4px 16px rgba(255, 0, 64, 0.2)'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(255, 0, 64, 0.3) 0%, rgba(255, 0, 64, 0.08) 20%, transparent 40%, rgba(255, 0, 64, 0.05) 60%, rgba(255, 0, 64, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 0, 64, 0.25) 0%, rgba(255, 0, 64, 0.05) 20%, transparent 40%, rgba(255, 0, 64, 0.03) 60%, rgba(255, 0, 64, 0.15) 100%)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <div 
                    className="absolute top-0 left-0 w-full h-1/3"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 0, 64, 0.4) 0%, transparent 100%)',
                      borderRadius: '0.75rem 0.75rem 0 0'
                    }}
                  />
                  <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
                    <defs>
                      <pattern id={`pattern-stage-mobile-${stage.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="1" fill="#FF0040" opacity="0.6">
                          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                        </circle>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-stage-mobile-${stage.id})`} />
                  </svg>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium text-lg mb-1" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>{stage.name}</h3>
                        <p className="text-white/60 text-xs">{stage.description}</p>
                      </div>
                      {isSelected && (
                        <Icon name="Check" className="w-5 h-5 text-[#FF0040]" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">{stage.gains}</span>
                      <span className="text-white font-medium text-lg" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>{price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedStage && (
            <button
              onClick={handleOrder}
              className="w-full p-4 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FF0040, #CC0033)',
                border: '1px solid rgba(255, 0, 64, 0.5)'
              }}
            >
              <Icon name="MessageCircle" className="w-5 h-5" />
              <span>Заказать в Telegram</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
});

const ChipTuningDesktop = memo(function ChipTuningDesktop({ selectedCity }: ChipTuningProps) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const handleReset = () => {
    setSelectedSeries(null);
    setSelectedStage(null);
  };

  const handleOrder = () => {
    if (!selectedSeries || !selectedStage) return;
    
    const stage = stages.find(s => s.id === selectedStage);
    if (!stage) return;

    const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
    
    const message = `Чип-тюнинг BMW ${selectedSeries}\\n\\n${stage.name}\\n${stage.description}\\n${stage.gains}\\n\\nСтоимость: ${price.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="mb-16 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Gauge" className="w-8 h-8 text-[#FF0040]" />
          <h2 className="font-light text-white text-3xl">Чип-тюнинг</h2>
        </div>
        <p className="text-white/60 text-base">Подберите программу для вашего BMW</p>
      </div>

      {!selectedSeries ? (
        <div className="space-y-4">
          <p className="text-white/70 text-lg mb-6">Выберите серию:</p>
          <div className="grid grid-cols-4 gap-4">
            {seriesList.map((series) => (
              <button
                key={series}
                onClick={() => setSelectedSeries(series)}
                className="relative p-5 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-start justify-center text-left overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 0, 64, 0.3)',
                  backdropFilter: 'blur(20px)',
                  minHeight: '110px'
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 0, 64, 0.08) 0%, transparent 50%, rgba(255, 0, 64, 0.05) 100%)'
                  }}
                />
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                  <defs>
                    <pattern id={`dots-desktop-${series.replace(/\s/g, '-')}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                      <circle cx="15" cy="15" r="1.5" fill="#FF0040" opacity="0.6">
                        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#dots-desktop-${series.replace(/\s/g, '-')})`} />
                </svg>
                <div className="relative z-10">
                  <div className="text-white text-lg font-bold mb-1">{series}</div>
                  <div className="text-white/50 text-sm">Выбрать серию</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <Icon name="ChevronLeft" className="w-5 h-5" />
              <span>Назад к выбору серии</span>
            </button>

            <div className="p-5 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 64, 0.1), rgba(255, 0, 64, 0.05))',
              border: '1px solid rgba(255, 0, 64, 0.2)'
            }}>
              <p className="text-white/70 text-sm mb-2">Выбрана серия:</p>
              <p className="text-white font-medium text-xl">{selectedSeries}</p>
            </div>

            <p className="text-white/70 text-lg">Выберите Stage:</p>

            <div className="space-y-4">
              {stages.map((stage) => {
                const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
                const isSelected = selectedStage === stage.id;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStage(stage.id)}
                    className="relative w-full p-6 rounded-lg text-left transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: '#000000',
                      border: isSelected 
                        ? '2px solid rgba(255, 0, 64, 0.5)'
                        : '1px solid rgba(255, 0, 64, 0.3)',
                      boxShadow: isSelected 
                        ? '0 4px 20px rgba(255, 0, 64, 0.3)'
                        : '0 4px 16px rgba(255, 0, 64, 0.2)'
                    }}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(255, 0, 64, 0.3) 0%, rgba(255, 0, 64, 0.08) 20%, transparent 40%, rgba(255, 0, 64, 0.05) 60%, rgba(255, 0, 64, 0.2) 100%)'
                          : 'linear-gradient(135deg, rgba(255, 0, 64, 0.25) 0%, rgba(255, 0, 64, 0.05) 20%, transparent 40%, rgba(255, 0, 64, 0.03) 60%, rgba(255, 0, 64, 0.15) 100%)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <div 
                      className="absolute top-0 left-0 w-full h-1/3"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255, 0, 64, 0.4) 0%, transparent 100%)',
                        borderRadius: '0.75rem 0.75rem 0 0'
                      }}
                    />
                    <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
                      <defs>
                        <pattern id={`pattern-stage-desktop-${stage.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="1" fill="#FF0040" opacity="0.6">
                            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                          </circle>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#pattern-stage-desktop-${stage.id})`} />
                    </svg>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-medium text-2xl mb-2" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>{stage.name}</h3>
                          <p className="text-white/60 text-sm">{stage.description}</p>
                        </div>
                        {isSelected && (
                          <Icon name="Check" className="w-6 h-6 text-[#FF0040]" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }} />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">{stage.gains}</span>
                        <span className="text-white font-medium text-2xl" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>{price.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="col-span-4">
            <div className="sticky top-6 p-6 rounded-xl" style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(10, 10, 15, 0.98))',
              border: '1px solid rgba(255, 0, 64, 0.3)'
            }}>
              <h3 className="text-white font-medium text-lg mb-4">Ваш выбор</h3>
              
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-lg" style={{
                  background: 'rgba(255, 0, 64, 0.1)',
                  border: '1px solid rgba(255, 0, 64, 0.2)'
                }}>
                  <p className="text-white/60 text-xs mb-1">Серия</p>
                  <p className="text-white font-medium">{selectedSeries}</p>
                </div>

                {selectedStage && (
                  <>
                    <div className="p-3 rounded-lg" style={{
                      background: 'rgba(255, 0, 64, 0.1)',
                      border: '1px solid rgba(255, 0, 64, 0.2)'
                    }}>
                      <p className="text-white/60 text-xs mb-1">Stage</p>
                      <p className="text-white font-medium">
                        {stages.find(s => s.id === selectedStage)?.name}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg" style={{
                      background: 'rgba(255, 0, 64, 0.15)',
                      border: '1px solid rgba(255, 0, 64, 0.3)'
                    }}>
                      <p className="text-white/60 text-xs mb-2">Итого</p>
                      <p className="text-white font-medium text-2xl">
                        {(() => {
                          const stage = stages.find(s => s.id === selectedStage);
                          if (!stage) return '0';
                          const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
                          return price.toLocaleString('ru-RU');
                        })()} ₽
                      </p>
                    </div>
                  </>
                )}
              </div>

              {selectedStage && (
                <button
                  onClick={handleOrder}
                  className="w-full p-4 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #FF0040, #CC0033)',
                    border: '1px solid rgba(255, 0, 64, 0.5)'
                  }}
                >
                  <Icon name="MessageCircle" className="w-5 h-5" />
                  <span>Заказать в Telegram</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default function ChipTuning({ selectedCity }: ChipTuningProps) {
  return (
    <Adaptive
      mobile={<ChipTuningMobile selectedCity={selectedCity} />}
      desktop={<ChipTuningDesktop selectedCity={selectedCity} />}
    />
  );
}