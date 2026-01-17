import { useState, useEffect, memo } from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';

interface ChipTuningProps {
  selectedCity: City;
  isOpen: boolean;
  onClose: () => void;
}

type Series = '1 SERIES' | '2 SERIES' | '3 SERIES' | '4 SERIES' | '5 SERIES' | '6 SERIES' | '7 SERIES' | 'X1' | 'X3' | 'X4' | 'X5' | 'X6' | 'M2' | 'M3' | 'M4' | 'M5' | 'Z4';

const seriesList: Series[] = [
  '1 SERIES', '2 SERIES', '3 SERIES', '4 SERIES', 
  '5 SERIES', '6 SERIES', '7 SERIES', 'M2',
  'M3', 'M4', 'M5', 'M6',
  'X1', 'X3', 'X4', 'X5', 'X6', 'Z4'
];

const stages = [
  { 
    id: 'stage1',
    name: 'STAGE 1',
    description: 'БАЗОВАЯ ПРОШИВКА ЭБУ',
    priceBase: 25000,
    gains: '+20-30% МОЩНОСТИ'
  },
  { 
    id: 'stage2',
    name: 'STAGE 2',
    description: 'ПРОДВИНУТАЯ ПРОШИВКА + ДАУНПАЙП',
    priceBase: 45000,
    gains: '+30-40% МОЩНОСТИ'
  }
];

export default function ChipTuning({ selectedCity, isOpen, onClose }: ChipTuningProps) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showLights, setShowLights] = useState(false);
  const [audio] = useState(() => new Audio('/police-lights.mp3'));

  useEffect(() => {
    if (isOpen) {
      setShowLights(true);
      audio.play();
      
      const timer = setTimeout(() => {
        setShowLights(false);
      }, 7000);

      return () => {
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0;
      };
    } else {
      audio.pause();
      audio.currentTime = 0;
      setShowLights(false);
      setSelectedSeries(null);
      setSelectedStage(null);
    }
  }, [isOpen, audio]);

  const handleReset = () => {
    setSelectedSeries(null);
    setSelectedStage(null);
  };

  const handleOrder = () => {
    if (!selectedSeries || !selectedStage) return;
    
    const stage = stages.find(s => s.id === selectedStage);
    if (!stage) return;

    const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
    
    const message = `ЧИП-ТЮНИНГ BMW ${selectedSeries}\n\n${stage.name}\n${stage.description}\n${stage.gains}\n\nСТОИМОСТЬ: ${price.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      
      {/* Police lights effect - 7 seconds */}
      {showLights && (
        <>
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 13, 0.4) 25%, transparent 50%, rgba(255, 0, 13, 0.4) 75%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'policeLights 1.5s linear infinite',
              filter: 'blur(100px)'
            }}
          />
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, rgba(255, 0, 13, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255, 0, 13, 0.3) 0%, transparent 50%)',
              backgroundSize: '200% 100%',
              animation: 'policeLights 1.5s linear infinite',
              filter: 'blur(80px)'
            }}
          />
        </>
      )}

      {/* Modal content */}
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: 'rgba(10, 10, 15, 0.95)',
          border: '1px solid rgba(255, 0, 13, 0.3)',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg transition-colors z-10"
          style={{
            background: 'rgba(255, 0, 13, 0.1)',
            border: '1px solid rgba(255, 0, 13, 0.3)'
          }}
        >
          <Icon name="X" className="w-5 h-5 text-white" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img 
                src="https://cdn.poehali.dev/projects/LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF6c1NlZ2w0STVnZmtRdDgxMWF0YgppYWhVQ0dkVEhyeGZ0aWp6Y25tK0svQlM3Z3VEa01Kd0EwNjJoZTlMQUxuY1NGVGJiMmNnSXB0M3FzdzRsUmhKCjBPNmdTTDRyUzJVZWVsb25pZnBCdW9oQjVMd2RDRGUzcU9SL3RKZDlmYzhYMkRDQ2FGczRVVSt2ZThCa0xRVzYKbjNNdWRZZThuRlVEWmtScFZuN3BnNU43T2Q1L3ZIOVByL09QamJ3ZnMvQk9hZjlnTktneC9WMDEvc2l1eGN5egpxbjJzQW9yU1gzR1Eyb2dCZ2xVUnVyb1pGWS9oeEp1OGR2aCtHNnczRFpGU2RjZUtzN1FCQllyeGhoTng0NUIzCkpLVGRJZTVyRXYrVCtxcDlDOGZsSzlMNlN5TFFaSHA5ekhWRWhzb3ZtNGxKdUh1cXd4S0QwWEhtVm1TRC8xSzAKU3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==/bucket/reborn_logo.png" 
                alt="Reborn Technologies" 
                className="h-12"
              />
            </div>
            <h2 
              className="text-3xl text-white mb-2 tracking-wider"
              style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
            >
              ВЫБЕРИТЕ СЕРИЮ BMW
            </h2>
          </div>

          {!selectedSeries ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {seriesList.map((series) => (
                <button
                  key={series}
                  onClick={() => setSelectedSeries(series)}
                  className="group relative p-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'rgba(20, 20, 30, 0.8)',
                    border: '1px solid rgba(255, 0, 13, 0.3)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 0, 13, 0.2), transparent 70%)'
                    }}
                  />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center min-h-[100px]">
                    <Icon name="Settings" className="w-10 h-10 mb-3" style={{ color: '#FF000D' }} />
                    <div 
                      className="text-white text-lg tracking-wider"
                      style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                    >
                      {series}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Icon name="ChevronLeft" className="w-5 h-5" />
                <span 
                  className="tracking-wider"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  НАЗАД
                </span>
              </button>

              <div 
                className="p-5 rounded-xl"
                style={{
                  background: 'rgba(255, 0, 13, 0.1)',
                  border: '1px solid rgba(255, 0, 13, 0.3)'
                }}
              >
                <p 
                  className="text-white/70 text-sm mb-2 tracking-wider"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  ВЫБРАНА СЕРИЯ:
                </p>
                <p 
                  className="text-white text-xl tracking-wider"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  {selectedSeries}
                </p>
              </div>

              <p 
                className="text-white/70 text-lg tracking-wider"
                style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
              >
                ВЫБЕРИТЕ STAGE:
              </p>

              <div className="space-y-4">
                {stages.map((stage) => {
                  const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
                  const isSelected = selectedStage === stage.id;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      className="w-full p-6 rounded-xl text-left transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        background: 'rgba(20, 20, 30, 0.8)',
                        border: isSelected 
                          ? '2px solid rgba(255, 0, 13, 0.6)'
                          : '1px solid rgba(255, 0, 13, 0.3)',
                        boxShadow: isSelected 
                          ? '0 4px 30px rgba(255, 0, 13, 0.4)'
                          : 'none'
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 
                            className="text-white text-2xl mb-2 tracking-wider"
                            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                          >
                            {stage.name}
                          </h3>
                          <p 
                            className="text-white/60 text-sm tracking-wider"
                            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                          >
                            {stage.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Icon name="Check" className="w-6 h-6" style={{ color: '#FF000D' }} />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span 
                          className="text-white/70 tracking-wider"
                          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                        >
                          {stage.gains}
                        </span>
                        <span 
                          className="text-white text-2xl tracking-wider"
                          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                        >
                          {price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedStage && (
                <button
                  onClick={handleOrder}
                  className="w-full p-5 rounded-xl text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #FF000D, #CC0000)',
                    border: '1px solid rgba(255, 0, 13, 0.5)',
                    boxShadow: '0 10px 40px rgba(255, 0, 13, 0.3)'
                  }}
                >
                  <Icon name="MessageCircle" className="w-6 h-6" />
                  <span 
                    className="text-lg tracking-wider"
                    style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                  >
                    ЗАКАЗАТЬ В TELEGRAM
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
