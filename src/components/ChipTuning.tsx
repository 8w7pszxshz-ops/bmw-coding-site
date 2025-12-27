import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface EngineVariant {
  name: string;
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  price: number;
  models: string[];
  generation: string;
}

interface EngineGroup {
  name: string;
  type: 'petrol' | 'diesel';
  description: string;
  variants: EngineVariant[];
}

const engineGroups: EngineGroup[] = [
  {
    name: 'N20 2.0 Turbo',
    type: 'petrol',
    description: 'F-серия (2011-2015)',
    variants: [
      { 
        name: '184 л.с.', 
        powerBefore: 184, 
        powerAfter: 260, 
        torqueBefore: 270, 
        torqueAfter: 440, 
        price: 80000,
        models: ['F30 320i', 'F10 520i', 'F25 X3 20i', 'F26 X4 20i'],
        generation: 'F'
      },
      { 
        name: '245 л.с.', 
        powerBefore: 245, 
        powerAfter: 290, 
        torqueBefore: 350, 
        torqueAfter: 450, 
        price: 80000,
        models: ['F30 328i', 'F10 528i', 'F25 X3 28i', 'F26 X4 28i'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'N55 3.0 Turbo',
    type: 'petrol',
    description: 'F-серия (2010-2016)',
    variants: [
      { 
        name: '306 л.с.', 
        powerBefore: 306, 
        powerAfter: 365, 
        torqueBefore: 400, 
        torqueAfter: 520, 
        price: 40000,
        models: ['F30 335i', 'F10 535i', 'F15 X5 35i', 'F16 X6 35i'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'B48 2.0 Turbo',
    type: 'petrol',
    description: 'G-серия (2015+)',
    variants: [
      { 
        name: '184 л.с.', 
        powerBefore: 184, 
        powerAfter: 280, 
        torqueBefore: 290, 
        torqueAfter: 440, 
        price: 30000,
        models: ['G20 320i', 'G30 520i', 'G01 X3 20i', 'G02 X4 20i'],
        generation: 'G'
      },
      { 
        name: '252 л.с.', 
        powerBefore: 252, 
        powerAfter: 280, 
        torqueBefore: 350, 
        torqueAfter: 460, 
        price: 30000,
        models: ['G20 330i', 'G30 530i', 'G01 X3 30i', 'G02 X4 30i'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'B58 3.0 Turbo',
    type: 'petrol',
    description: 'G-серия (2015+)',
    variants: [
      { 
        name: '340-360 л.с.', 
        powerBefore: 340, 
        powerAfter: 450, 
        torqueBefore: 450, 
        torqueAfter: 650, 
        price: 40000,
        models: ['G30 540i', 'G05 X5 40i', 'G06 X6 40i', 'G07 X7 40i'],
        generation: 'G'
      },
      { 
        name: '374-387 л.с.', 
        powerBefore: 387, 
        powerAfter: 450, 
        torqueBefore: 500, 
        torqueAfter: 650, 
        price: 40000,
        models: ['G20 M340i', 'G01 X3 M40i', 'G02 X4 M40i'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'S58 3.0 Twin-Turbo',
    type: 'petrol',
    description: 'M-Performance (2019+)',
    variants: [
      { 
        name: '530 л.с.', 
        powerBefore: 530, 
        powerAfter: 600, 
        torqueBefore: 750, 
        torqueAfter: 850, 
        price: 50000,
        models: ['G30 M550i', 'G05 X5 M50i', 'G06 X6 M50i', 'G07 X7 M50i'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'N47 2.0 Diesel',
    type: 'diesel',
    description: 'F-серия (2009-2015)',
    variants: [
      { 
        name: '184 л.с.', 
        powerBefore: 184, 
        powerAfter: 220, 
        torqueBefore: 380, 
        torqueAfter: 440, 
        price: 30000,
        models: ['F30 320d', 'F10 520d', 'F25 X3 20d', 'F26 X4 20d'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'N57 3.0 Diesel',
    type: 'diesel',
    description: 'F-серия (2008-2016)',
    variants: [
      { 
        name: '258 л.с.', 
        powerBefore: 258, 
        powerAfter: 310, 
        torqueBefore: 560, 
        torqueAfter: 650, 
        price: 35000,
        models: ['F30 330d', 'F10 530d', 'F15 X5 30d', 'F16 X6 30d'],
        generation: 'F'
      },
      { 
        name: '313 л.с.', 
        powerBefore: 313, 
        powerAfter: 375, 
        torqueBefore: 630, 
        torqueAfter: 730, 
        price: 35000,
        models: ['F25 X3 35d', 'F15 X5 40d', 'F16 X6 40d'],
        generation: 'F'
      }
    ]
  },
  {
    name: 'B47 2.0 Diesel',
    type: 'diesel',
    description: 'G-серия (2014+)',
    variants: [
      { 
        name: '150-190 л.с.', 
        powerBefore: 190, 
        powerAfter: 230, 
        torqueBefore: 400, 
        torqueAfter: 490, 
        price: 30000,
        models: ['G20 318d/320d', 'G30 520d', 'G01 X3 20d', 'G05 X5 25d'],
        generation: 'G'
      }
    ]
  },
  {
    name: 'B57 3.0 Diesel',
    type: 'diesel',
    description: 'G-серия (2015+)',
    variants: [
      { 
        name: '265 л.с.', 
        powerBefore: 265, 
        powerAfter: 340, 
        torqueBefore: 620, 
        torqueAfter: 770, 
        price: 35000,
        models: ['G20 330d', 'G30 530d', 'G01 X3 30d', 'G05 X5 30d', 'G11 730d'],
        generation: 'G'
      },
      { 
        name: '340 л.с.', 
        powerBefore: 340, 
        powerAfter: 400, 
        torqueBefore: 700, 
        torqueAfter: 800, 
        price: 35000,
        models: ['G20 M340d', 'G01 X3 M40d', 'G05 X5 40d', 'G11 740d'],
        generation: 'G'
      },
      { 
        name: '400 л.с.', 
        powerBefore: 400, 
        powerAfter: 460, 
        torqueBefore: 760, 
        torqueAfter: 860, 
        price: 40000,
        models: ['G30 M550d', 'G05 X5 M50d', 'G11 750d'],
        generation: 'G'
      }
    ]
  }
];

export default function ChipTuning() {
  const [selectedGroup, setSelectedGroup] = useState<EngineGroup | null>(null);
  const [generationFilter, setGenerationFilter] = useState<'all' | 'F' | 'G'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'petrol' | 'diesel'>('all');

  const getGainPercentage = (before: number, after: number) => {
    return Math.round(((after - before) / before) * 100);
  };

  const filteredGroups = engineGroups.filter(g => {
    const typeMatch = typeFilter === 'all' || g.type === typeFilter;
    const genMatch = generationFilter === 'all' || g.variants.some(v => v.generation === generationFilter);
    return typeMatch && genMatch;
  });

  const getTypeColor = (type: string) => {
    return type === 'petrol' ? '#FFD700' : '#81C4FF';
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Gauge" className="w-8 h-8 text-[#FFD700]" />
          <h2 className="font-light text-white text-3xl">Чип-тюнинг BMW Stage 1</h2>
        </div>
        <p className="text-white/60 text-sm">Выберите двигатель вашего автомобиля</p>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'Все поколения', icon: 'Grid' },
            { id: 'F', label: 'F-серия (2010-2018)', icon: 'Calendar' },
            { id: 'G', label: 'G-серия (2015+)', icon: 'CalendarDays' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setGenerationFilter(filter.id as any)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{
                background: generationFilter === filter.id
                  ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: generationFilter === filter.id
                  ? '1px solid rgba(255, 215, 0, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: generationFilter === filter.id ? '#FFD700' : 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <Icon name={filter.icon as any} className="w-4 h-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex gap-2">
          {[
            { id: 'all', label: 'Все типы', icon: 'Grid' },
            { id: 'petrol', label: 'Бензин', icon: 'Flame' },
            { id: 'diesel', label: 'Дизель', icon: 'Fuel' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setTypeFilter(filter.id as any)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{
                background: typeFilter === filter.id
                  ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                border: typeFilter === filter.id
                  ? '1px solid rgba(255, 215, 0, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                color: typeFilter === filter.id ? '#FFD700' : 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <Icon name={filter.icon as any} className="w-4 h-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {!selectedGroup ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => {
            const color = getTypeColor(group.type);
            const totalModels = group.variants.reduce((sum, v) => sum + v.models.length, 0);
            
            return (
              <button
                key={group.name}
                onClick={() => setSelectedGroup(group)}
                className="p-8 rounded-2xl transition-all duration-500 hover:scale-105 group text-left animate-fade-in"
                style={{
                  background: `linear-gradient(135deg, ${color}12, ${color}05)`,
                  border: `1px solid ${color}40`,
                  boxShadow: `0 8px 32px ${color}20`,
                  animationDelay: `${idx * 100}ms`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-2xl font-light text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                      {group.name}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={group.type === 'petrol' ? 'Flame' : 'Fuel'} className="w-4 h-4" style={{ color }} />
                      <span className="text-sm" style={{ color }}>{group.type === 'petrol' ? 'Бензин' : 'Дизель'}</span>
                    </div>
                    <div className="text-white/40 text-xs">{group.description}</div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {group.variants.map((variant, i) => (
                    <div key={i} className="text-white/60 text-sm flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: color }} />
                      <span>{variant.name}</span>
                      <span className="text-white/40">→</span>
                      <span style={{ color }}>{variant.powerAfter} л.с.</span>
                      <span className="text-green-400 text-xs ml-1">+{getGainPercentage(variant.powerBefore, variant.powerAfter)}%</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-white/40 text-xs pt-3 border-t" style={{ borderColor: `${color}20` }}>
                  <Icon name="Car" className="w-4 h-4" />
                  <span>{totalModels} моделей BMW</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="px-6 py-3 rounded-xl flex items-center gap-3"
                style={{
                  background: `linear-gradient(135deg, ${getTypeColor(selectedGroup.type)}, ${getTypeColor(selectedGroup.type)}CC)`,
                  boxShadow: `0 8px 32px ${getTypeColor(selectedGroup.type)}40`
                }}
              >
                <Icon name={selectedGroup.type === 'petrol' ? 'Flame' : 'Fuel'} className="w-5 h-5 text-black" />
                <span className="text-black font-medium">{selectedGroup.name}</span>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                Изменить двигатель
              </button>
            </div>
            <div className="text-white/40 text-sm">{selectedGroup.description}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedGroup.variants.map((variant, idx) => {
              const powerGain = getGainPercentage(variant.powerBefore, variant.powerAfter);
              const torqueGain = getGainPercentage(variant.torqueBefore, variant.torqueAfter);
              const color = getTypeColor(selectedGroup.type);
              
              return (
                <div
                  key={idx}
                  className="relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{
                    background: `linear-gradient(135deg, ${color}0D, ${color}05)`,
                    border: `1px solid ${color}30`,
                    boxShadow: `0 8px 32px ${color}20`,
                    animationDelay: `${idx * 50}ms`
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-light text-white mb-2">{variant.name}</h3>
                      <div className="flex items-center gap-2">
                        <Icon name={selectedGroup.type === 'petrol' ? 'Flame' : 'Fuel'} className="w-4 h-4" style={{ color }} />
                        <span className="text-white/60 text-sm">{selectedGroup.type === 'petrol' ? 'Бензиновый' : 'Дизельный'}</span>
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
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white/60 text-lg">{variant.powerBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
                        <span className="text-2xl font-light" style={{ color }}>{variant.powerAfter}</span>
                        <span className="text-white/40 text-sm">л.с.</span>
                      </div>
                      <div className="text-green-400 text-xs">+{variant.powerAfter - variant.powerBefore} л.с.</div>
                    </div>

                    <div>
                      <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                        <Icon name="Zap" className="w-3 h-3" />
                        Крутящий момент
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white/60 text-lg">{variant.torqueBefore}</span>
                        <Icon name="ArrowRight" className="w-4 h-4" style={{ color }} />
                        <span className="text-2xl font-light" style={{ color }}>{variant.torqueAfter}</span>
                        <span className="text-white/40 text-sm">Нм</span>
                      </div>
                      <div 
                        className="px-3 py-1 rounded-lg inline-block"
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
                    className="mb-6 p-4 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                      border: `1px solid ${color}20`
                    }}
                  >
                    <div className="text-white/40 text-xs mb-2 flex items-center gap-1">
                      <Icon name="Car" className="w-3 h-3" />
                      Подходящие модели:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {variant.models.map((model, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 rounded-lg text-xs text-white/70"
                          style={{
                            background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                            border: `1px solid ${color}25`
                          }}
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div 
                    className="pt-6 border-t flex items-center justify-between"
                    style={{ borderColor: `${color}20` }}
                  >
                    <div>
                      <div className="text-white/40 text-xs mb-1">Стоимость Stage 1</div>
                      <div className="text-xl font-light" style={{ color }}>
                        {variant.price.toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <a
                      href="https://t.me/Bocha_reborn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-black transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                        boxShadow: `0 8px 24px ${color}40`
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
              background: `linear-gradient(135deg, ${getTypeColor(selectedGroup.type)}0D, ${getTypeColor(selectedGroup.type)}05)`,
              border: `1px solid ${getTypeColor(selectedGroup.type)}30`
            }}
          >
            <div className="flex items-start gap-4">
              <Icon name="Info" className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: getTypeColor(selectedGroup.type) }} />
              <div className="text-white/70 text-sm leading-relaxed">
                <p className="mb-2"><strong className="text-white">Процесс занимает 2-3 часа:</strong> диагностика, считывание заводской прошивки через OBD-порт, коррекция параметров Stage 1, запись улучшенной программы и обязательный тест-драйв.</p>
                <p className="mb-2">Работы проводятся без вскрытия блока управления. Для автомобилей после 07.2020 может потребоваться дополнительная разблокировка ECU.</p>
                <p className="text-white/60 text-xs">Гарантия на все работы. Рекомендуется топливо АИ-98 для бензиновых двигателей.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
