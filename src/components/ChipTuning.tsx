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
  const [audio] = useState(() => new Audio('/reborn-sound.mp3'));

  useEffect(() => {
    if (isOpen) {
      setShowLights(true);
      audio.play();
      
      const timer = setTimeout(() => {
        setShowLights(false);
      }, 20000);

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
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-0" />

      {/* Modal content */}
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl z-20"
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
            <div className="relative">
              {/* Police lights behind buttons - 7 seconds */}
              {showLights && (
                <>
                  {/* Bright flash layer */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: 'linear-gradient(90deg, #FF000D 0%, transparent 25%, transparent 75%, #FF000D 100%)',
                      backgroundSize: '300% 100%',
                      animation: 'policeLights 0.8s linear infinite',
                      opacity: 0.8,
                      filter: 'blur(80px)',
                      borderRadius: '1rem'
                    }}
                  />
                  {/* Glow layer */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: 'radial-gradient(ellipse at 20% 50%, #FF000D 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #FF000D 0%, transparent 50%)',
                      animation: 'policeLights 0.8s linear infinite',
                      filter: 'blur(100px)',
                      opacity: 0.9
                    }}
                  />
                  {/* Center pulse */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 13, 1) 0%, transparent 40%)',
                      animation: 'policeLights 0.8s linear infinite',
                      filter: 'blur(120px)'
                    }}
                  />
                  {/* Extra diffusion layer */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, #FF000D 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, #FF000D 0%, transparent 60%)',
                      animation: 'policeLights 0.8s linear infinite',
                      filter: 'blur(150px)',
                      opacity: 0.7
                    }}
                  />
                </>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              {seriesList.map((series, index) => (
                <button
                  key={series}
                  onClick={() => setSelectedSeries(series)}
                  className="group relative rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{
                    background: 'rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 0, 13, 0.05)',
                    minHeight: '180px',
                    aspectRatio: '1 / 1'
                  }}
                >
                  {/* Radial gradient glow */}
                  <div 
                    className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity rounded-2xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, #FF000D30, transparent 70%)',
                      boxShadow: 'inset 0 0 60px #FF000D20',
                      mixBlendMode: 'screen'
                    }}
                  />
                  
                  {/* Top border glow */}
                  <div 
                    className="absolute top-0 left-0 right-0 rounded-t-2xl pointer-events-none"
                    style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent 0%, #FF000D30 20%, #FF000D90 50%, #FF000D30 80%, transparent 100%)',
                      boxShadow: '0 0 30px #FF000D60, 0 2px 20px #FF000D40'
                    }}
                  />
                  
                  {/* Bottom border glow */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 rounded-b-2xl pointer-events-none"
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent 0%, #FF000D20 30%, #FF000D50 50%, #FF000D20 70%, transparent 100%)',
                      boxShadow: '0 0 15px #FF000D30'
                    }}
                  />
                  
                  {/* Animated pattern - brighter pulsating dots */}
                  <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none rounded-2xl" style={{ mixBlendMode: 'screen' }}>
                    <defs>
                      <pattern id={`pattern-series-${index}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                        <circle cx="15" cy="15" r="1.5" fill="#FF000D" opacity="1">
                          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-series-${index})`} />
                  </svg>
                  
                  {/* Extra bright pulsating dots */}
                  <div 
                    className="absolute top-2 right-2 w-3 h-3 rounded-full pointer-events-none"
                    style={{
                      background: '#FF000D',
                      boxShadow: '0 0 15px #FF000D, 0 0 30px rgba(255, 0, 13, 0.6)',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
                    <div 
                      className="text-white text-lg tracking-wider text-center"
                      style={{ 
                        fontFamily: '"Reborn Technologies", sans-serif',
                        textShadow: '0 0 20px rgba(255, 0, 13, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {series}
                    </div>
                  </div>
                </button>
              ))}
              </div>
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