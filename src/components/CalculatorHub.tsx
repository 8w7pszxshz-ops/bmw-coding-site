import { useState } from 'react';
import Icon from '@/components/ui/icon';
import KeyCalculator from './KeyCalculator';
import CodingPackages from './CodingPackages';
import ChipTuning from './ChipTuning';

type CalculatorType = 'key' | 'coding' | 'chiptuning' | null;

export default function CalculatorHub() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);

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
      <div className="mb-16">
        <button
          onClick={() => setActiveCalculator(null)}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <Icon name="ChevronLeft" className="w-5 h-5" />
          <span>Вернуться к выбору</span>
        </button>
        <KeyCalculator />
      </div>
    );
  }

  if (activeCalculator === 'coding') {
    return (
      <div className="mb-16">
        <button
          onClick={() => setActiveCalculator(null)}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <Icon name="ChevronLeft" className="w-5 h-5" />
          <span>Вернуться к выбору</span>
        </button>
        <CodingPackages />
      </div>
    );
  }

  if (activeCalculator === 'chiptuning') {
    return (
      <div className="mb-16">
        <button
          onClick={() => setActiveCalculator(null)}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <Icon name="ChevronLeft" className="w-5 h-5" />
          <span>Вернуться к выбору</span>
        </button>
        <ChipTuning />
      </div>
    );
  }

  return (
    <div id="calculator-hub" className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-white mb-2">Калькуляторы и конфигураторы</h2>
        <p className="text-white/70">Выберите услугу для расчёта стоимости</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => setActiveCalculator(calc.id)}
            className="group relative rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105"
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
            
            <div className="relative">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${calc.color}20`,
                  border: `1px solid ${calc.color}30`
                }}
              >
                <Icon name={calc.icon} className="w-7 h-7" style={{ color: calc.color }} />
              </div>

              <h3 className="text-xl font-light text-white mb-2">{calc.title}</h3>
              <p className="text-white/60 text-sm mb-4">{calc.description}</p>

              <div className="flex items-center gap-2 text-white/80 group-hover:gap-3 transition-all">
                <span className="text-sm">Открыть</span>
                <Icon name="ArrowRight" className="w-4 h-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
