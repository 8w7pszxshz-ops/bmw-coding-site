import { useState, lazy, Suspense, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import ChipTuning from './ChipTuning';

const KeyCalculator = lazy(() => import('./KeyCalculator'));
const CodingPackages = lazy(() => import('./CodingPackages'));

type CalculatorType = 'key' | 'coding' | 'chiptuning' | null;

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 rounded-full border-4 border-[#E7222E]/20 border-t-[#E7222E] animate-spin" />
    </div>
  );
}

interface CalculatorHubProps {
  selectedCity: City;
}

export default function CalculatorHub({ selectedCity }: CalculatorHubProps) {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);
  const [isChipTuningOpen, setIsChipTuningOpen] = useState(false);
  const chipTuningAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleChipTuningOpen = () => {
    // Создаем и запускаем аудио сразу при клике пользователя
    if (!chipTuningAudioRef.current) {
      chipTuningAudioRef.current = new Audio('/music/1.mp3');
      chipTuningAudioRef.current.volume = 0.5;
    }
    
    chipTuningAudioRef.current.play().catch(err => {
      console.log('Audio play error:', err);
    });
    
    setIsChipTuningOpen(true);
  };

  const calculators = [
    {
      id: 'key' as CalculatorType,
      icon: 'Key',
      title: 'Изготовление ключей',
      description: 'Рассчитайте стоимость ключа для вашего BMW',
      color: '#E7222E'
    },
    {
      id: 'coding' as CalculatorType,
      icon: 'Wrench',
      title: 'Конфигуратор опций',
      description: 'Соберите свой пакет кодировок',
      color: '#81C4FF'
    },
    {
      id: 'chiptuning' as CalculatorType,
      icon: 'Gauge',
      title: 'Чип-тюнинг',
      description: 'Подберите программу для вашего двигателя',
      color: '#FF0040'
    }
  ];

  if (activeCalculator === 'key') {
    return (
      <div className="mb-12 md:mb-16">
        <button
          onClick={() => setActiveCalculator(null)}
          className="mb-4 md:mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 md:px-0"
        >
          <Icon name="ChevronLeft" className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Назад</span>
        </button>
        <Suspense fallback={<LoadingSpinner />}>
          <KeyCalculator selectedCity={selectedCity} />
        </Suspense>
      </div>
    );
  }

  if (activeCalculator === 'coding') {
    return (
      <div className="mb-12 md:mb-16">
        <button
          onClick={() => setActiveCalculator(null)}
          className="mb-4 md:mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors px-4 md:px-0"
        >
          <Icon name="ChevronLeft" className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Назад</span>
        </button>
        <Suspense fallback={<LoadingSpinner />}>
          <CodingPackages selectedCity={selectedCity} />
        </Suspense>
      </div>
    );
  }



  return (
    <>
      <div id="calculator-hub" className="mb-12 md:mb-16">
        <div className="text-center mb-6 md:mb-8 px-4">
          <p className="text-base md:text-xl text-white/70">Выберите услугу для расчёта стоимости</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
          {calculators.map((calc) => (
            <button
              key={calc.id}
              id={calc.id}
              onClick={() => {
                if (calc.id === 'chiptuning') {
                  handleChipTuningOpen();
                } else {
                  setActiveCalculator(calc.id);
                }
              }}
              className="group relative rounded-2xl p-5 md:p-8 text-left transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
              border: `1px solid ${calc.color}40`,
              boxShadow: `0 10px 40px -10px ${calc.color}30`,
            }}
          >
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at top right, ${calc.color}15, transparent 70%)`,
              }}
            />
            
            <div 
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: `linear-gradient(90deg, transparent 0%, ${calc.color}20 20%, ${calc.color}80 50%, ${calc.color}20 80%, transparent 100%)`,
                boxShadow: `0 0 30px ${calc.color}60, 0 2px 20px ${calc.color}40`,
                borderRadius: '1rem 1rem 0 0'
              }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, ${calc.color}15 30%, ${calc.color}40 50%, ${calc.color}15 70%, transparent 100%)`,
                boxShadow: `0 0 15px ${calc.color}30`,
                borderRadius: '0 0 1rem 1rem'
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none rounded-2xl" style={{ mixBlendMode: 'screen' }}>
              <defs>
                <pattern id={`pattern-calc-${calc.id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="1" fill={calc.color} opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pattern-calc-${calc.id})`} />
            </svg>
            
            <div className="relative">
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden"
                style={{
                  background: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 20%, transparent 40%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.15) 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <div 
                  className="absolute top-0 left-0 w-full h-1/3"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                    borderRadius: '0.75rem 0.75rem 0 0'
                  }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-1/3 h-1/3"
                  style={{
                    background: 'radial-gradient(circle at bottom right, rgba(255,255,255,0.2) 0%, transparent 70%)'
                  }}
                />
                <Icon name={calc.icon} className="w-6 h-6 md:w-7 md:h-7 relative z-10" style={{ color: calc.color, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
              </div>

              <h3 className="text-base md:text-xl font-light text-white mb-1.5 md:mb-2">{calc.title}</h3>
              <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">{calc.description}</p>

              <div className="flex items-center gap-2 text-white/80 group-hover:gap-3 transition-all">
                <span className="text-xs md:text-sm">Открыть</span>
                <Icon name="ArrowRight" className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
    
    <ChipTuning 
      selectedCity={selectedCity}
      isOpen={isChipTuningOpen}
      onClose={() => setIsChipTuningOpen(false)}
      audioRef={chipTuningAudioRef}
    />
    </>
  );
}