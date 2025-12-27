import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Engine {
  model: string;
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  priceFrom: number;
  priceTo: number;
  type: 'petrol' | 'diesel';
}

interface CarSeries {
  name: string;
  generation: string;
  engines: Engine[];
}

const chipTuningData: CarSeries[] = [
  {
    name: '3 серия',
    generation: 'G20',
    engines: [
      { model: '318i', powerBefore: 156, powerAfter: 190, torqueBefore: 250, torqueAfter: 320, priceFrom: 22500, priceTo: 25000, type: 'petrol' },
      { model: '320i', powerBefore: 184, powerAfter: 240, torqueBefore: 270, torqueAfter: 380, priceFrom: 22500, priceTo: 25000, type: 'petrol' },
      { model: '330i', powerBefore: 258, powerAfter: 330, torqueBefore: 400, torqueAfter: 500, priceFrom: 25000, priceTo: 28000, type: 'petrol' },
      { model: 'M340i', powerBefore: 374, powerAfter: 430, torqueBefore: 500, torqueAfter: 600, priceFrom: 28000, priceTo: 30000, type: 'petrol' },
      { model: '318d', powerBefore: 150, powerAfter: 195, torqueBefore: 320, torqueAfter: 420, priceFrom: 22500, priceTo: 25000, type: 'diesel' },
      { model: '320d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 480, priceFrom: 22500, priceTo: 25000, type: 'diesel' },
      { model: '330d', powerBefore: 265, powerAfter: 330, torqueBefore: 580, torqueAfter: 680, priceFrom: 25000, priceTo: 28000, type: 'diesel' },
      { model: 'M340d', powerBefore: 340, powerAfter: 400, torqueBefore: 700, torqueAfter: 800, priceFrom: 28000, priceTo: 30000, type: 'diesel' },
    ]
  },
  {
    name: '5 серия',
    generation: 'G30',
    engines: [
      { model: '520i', powerBefore: 184, powerAfter: 240, torqueBefore: 290, torqueAfter: 380, priceFrom: 22500, priceTo: 25000, type: 'petrol' },
      { model: '530i', powerBefore: 252, powerAfter: 320, torqueBefore: 350, torqueAfter: 450, priceFrom: 25000, priceTo: 28000, type: 'petrol' },
      { model: 'M550i', powerBefore: 530, powerAfter: 600, torqueBefore: 750, torqueAfter: 850, priceFrom: 30000, priceTo: 35000, type: 'petrol' },
      { model: '520d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 480, priceFrom: 22500, priceTo: 25000, type: 'diesel' },
      { model: '530d', powerBefore: 265, powerAfter: 330, torqueBefore: 620, torqueAfter: 720, priceFrom: 25000, priceTo: 28000, type: 'diesel' },
    ]
  },
  {
    name: 'X3',
    generation: 'G01',
    engines: [
      { model: 'X3 20i', powerBefore: 184, powerAfter: 240, torqueBefore: 290, torqueAfter: 380, priceFrom: 22500, priceTo: 25000, type: 'petrol' },
      { model: 'X3 30i', powerBefore: 252, powerAfter: 320, torqueBefore: 350, torqueAfter: 450, priceFrom: 25000, priceTo: 28000, type: 'petrol' },
      { model: 'X3 M40i', powerBefore: 360, powerAfter: 420, torqueBefore: 500, torqueAfter: 600, priceFrom: 28000, priceTo: 30000, type: 'petrol' },
      { model: 'X3 20d', powerBefore: 190, powerAfter: 240, torqueBefore: 400, torqueAfter: 480, priceFrom: 22500, priceTo: 25000, type: 'diesel' },
      { model: 'X3 30d', powerBefore: 265, powerAfter: 330, torqueBefore: 620, torqueAfter: 720, priceFrom: 25000, priceTo: 28000, type: 'diesel' },
    ]
  },
  {
    name: 'X5',
    generation: 'G05',
    engines: [
      { model: 'X5 30i', powerBefore: 265, powerAfter: 320, torqueBefore: 400, torqueAfter: 480, priceFrom: 25000, priceTo: 28000, type: 'petrol' },
      { model: 'X5 40i', powerBefore: 340, powerAfter: 400, torqueBefore: 450, torqueAfter: 550, priceFrom: 28000, priceTo: 30000, type: 'petrol' },
      { model: 'X5 M50i', powerBefore: 530, powerAfter: 600, torqueBefore: 750, torqueAfter: 850, priceFrom: 30000, priceTo: 35000, type: 'petrol' },
      { model: 'X5 30d', powerBefore: 265, powerAfter: 330, torqueBefore: 620, torqueAfter: 720, priceFrom: 25000, priceTo: 28000, type: 'diesel' },
      { model: 'X5 40d', powerBefore: 340, powerAfter: 400, torqueBefore: 700, torqueAfter: 800, priceFrom: 28000, priceTo: 30000, type: 'diesel' },
    ]
  }
];

export default function ChipTuning() {
  const [selectedSeries, setSelectedSeries] = useState<CarSeries | null>(null);
  const [fuelFilter, setFuelFilter] = useState<'all' | 'petrol' | 'diesel'>('all');

  const getGainPercentage = (before: number, after: number) => {
    return Math.round(((after - before) / before) * 100);
  };

  const filteredEngines = selectedSeries 
    ? selectedSeries.engines.filter(e => fuelFilter === 'all' || e.type === fuelFilter)
    : [];

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Gauge" className="w-8 h-8 text-[#FFD700]" />
          <h2 className="font-light text-white text-3xl">Чип-тюнинг BMW</h2>
        </div>
        <p className="text-white/60 text-sm">Увеличение мощности через OBD-порт без вскрытия блока</p>
      </div>

      {!selectedSeries ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {chipTuningData.map((series, idx) => (
            <button
              key={series.name}
              onClick={() => setSelectedSeries(series)}
              className="p-8 rounded-2xl transition-all duration-500 hover:scale-105 group text-left animate-fade-in"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(255, 215, 0, 0.02))',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15)',
                animationDelay: `${idx * 100}ms`
              }}
            >
              <div className="text-4xl font-light text-white mb-3 group-hover:text-[#FFD700] transition-colors duration-300">
                {series.name}
              </div>
              <div className="text-white/60 text-sm mb-4">{series.generation}</div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Icon name="Zap" className="w-4 h-4" />
                <span>{series.engines.length} двигателей</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div 
                className="px-6 py-3 rounded-xl flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                  boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)'
                }}
              >
                <span className="text-black font-medium">BMW {selectedSeries.name} {selectedSeries.generation}</span>
              </div>
              <button
                onClick={() => setSelectedSeries(null)}
                className="px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                Изменить серию
              </button>
            </div>

            <div className="flex gap-2">
              {[
                { id: 'all', label: 'Все', icon: 'Grid' },
                { id: 'petrol', label: 'Бензин', icon: 'Flame' },
                { id: 'diesel', label: 'Дизель', icon: 'Fuel' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setFuelFilter(filter.id as any)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300"
                  style={{
                    background: fuelFilter === filter.id
                      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                    border: fuelFilter === filter.id
                      ? '1px solid rgba(255, 215, 0, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: fuelFilter === filter.id ? '#FFD700' : 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  <Icon name={filter.icon as any} className="w-4 h-4" />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEngines.map((engine, idx) => {
              const powerGain = getGainPercentage(engine.powerBefore, engine.powerAfter);
              const torqueGain = getGainPercentage(engine.torqueBefore, engine.torqueAfter);
              
              return (
                <div
                  key={engine.model}
                  className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.02))',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    boxShadow: '0 8px 32px rgba(255, 215, 0, 0.1)',
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-light text-white mb-2">{engine.model}</h3>
                      <div className="flex items-center gap-2">
                        <Icon 
                          name={engine.type === 'petrol' ? 'Flame' : 'Fuel'} 
                          className="w-4 h-4 text-[#FFD700]" 
                        />
                        <span className="text-white/60 text-sm">
                          {engine.type === 'petrol' ? 'Бензин' : 'Дизель'}
                        </span>
                      </div>
                    </div>
                    <div 
                      className="px-4 py-2 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      <span className="text-green-400 text-sm font-medium">+{powerGain}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                        <Icon name="Gauge" className="w-3 h-3" />
                        Мощность
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-lg">{engine.powerBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-[#FFD700] text-2xl font-light">{engine.powerAfter}</span>
                        <span className="text-white/40 text-sm">л.с.</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                        <Icon name="Zap" className="w-3 h-3" />
                        Крутящий момент
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 text-lg">{engine.torqueBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4 text-[#FFD700]" />
                        <span className="text-[#FFD700] text-2xl font-light">{engine.torqueAfter}</span>
                        <span className="text-white/40 text-sm">Нм</span>
                      </div>
                      <div 
                        className="mt-2 px-3 py-1 rounded-lg inline-block"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))',
                          border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}
                      >
                        <span className="text-green-400 text-xs">+{torqueGain}%</span>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="pt-6 border-t flex items-center justify-between"
                    style={{ borderColor: 'rgba(255, 215, 0, 0.15)' }}
                  >
                    <div>
                      <div className="text-white/40 text-xs mb-1">Стоимость Stage 1</div>
                      <div className="text-[#FFD700] text-xl font-light">
                        {engine.priceFrom.toLocaleString('ru-RU')} - {engine.priceTo.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <a
                      href="https://t.me/Bocha_reborn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black transition-all duration-300 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                        boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)'
                      }}
                    >
                      <Icon name="MessageCircle" className="w-4 h-4" />
                      <span>Заказать</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div 
            className="mt-8 p-6 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.02))',
              border: '1px solid rgba(255, 215, 0, 0.2)'
            }}
          >
            <div className="flex items-start gap-4">
              <Icon name="Info" className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-1" />
              <div className="text-white/70 text-sm leading-relaxed">
                <p className="mb-2"><strong className="text-white">Процесс занимает 3 часа:</strong> диагностика, считывание заводской прошивки, коррекция параметров, запись улучшенной программы и тест-драйв.</p>
                <p>Работы проводятся через OBD-порт без вскрытия блока управления. Гарантия на все работы.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
