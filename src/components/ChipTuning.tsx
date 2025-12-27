import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { EngineGroup, engineGroups, getTypeColor } from './chiptuning/chipTuningData';
import ChipTuningFilters from './chiptuning/ChipTuningFilters';
import EngineGroupCard from './chiptuning/EngineGroupCard';
import EngineVariantCard from './chiptuning/EngineVariantCard';

export default function ChipTuning() {
  const [selectedGroup, setSelectedGroup] = useState<EngineGroup | null>(null);
  const [generationFilter, setGenerationFilter] = useState<'all' | 'F' | 'G'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'petrol' | 'diesel'>('all');

  const filteredGroups = engineGroups.filter(g => {
    const typeMatch = typeFilter === 'all' || g.type === typeFilter;
    const genMatch = generationFilter === 'all' || g.variants.some(v => v.generation === generationFilter);
    return typeMatch && genMatch;
  });

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Gauge" className="w-8 h-8 text-[#FF9900]" />
          <h2 className="font-light text-white text-3xl">Чип-тюнинг BMW Stage 1</h2>
        </div>
        <p className="text-white/60 text-sm">Выберите двигатель вашего автомобиля</p>
      </div>

      <ChipTuningFilters
        generationFilter={generationFilter}
        typeFilter={typeFilter}
        onGenerationChange={setGenerationFilter}
        onTypeChange={setTypeFilter}
      />

      {!selectedGroup ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, idx) => (
            <EngineGroupCard
              key={group.name}
              group={group}
              index={idx}
              onSelect={() => setSelectedGroup(group)}
            />
          ))}
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
            {selectedGroup.variants.map((variant, idx) => (
              <EngineVariantCard
                key={idx}
                variant={variant}
                engineType={selectedGroup.type}
                color={getTypeColor(selectedGroup.type)}
                index={idx}
              />
            ))}
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