import Icon from '@/components/ui/icon';

interface ChipTuningFiltersProps {
  generationFilter: 'all' | 'F' | 'G';
  typeFilter: 'all' | 'petrol' | 'diesel';
  onGenerationChange: (value: 'all' | 'F' | 'G') => void;
  onTypeChange: (value: 'all' | 'petrol' | 'diesel') => void;
}

export default function ChipTuningFilters({
  generationFilter,
  typeFilter,
  onGenerationChange,
  onTypeChange
}: ChipTuningFiltersProps) {
  return (
    <div className="flex gap-3 mb-8 overflow-x-auto pb-2 justify-center flex-wrap">
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'Все поколения', icon: 'Grid' },
          { id: 'F', label: 'F-серия (2010-2018)', icon: 'Calendar' },
          { id: 'G', label: 'G-серия (2015+)', icon: 'CalendarDays' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => onGenerationChange(filter.id as any)}
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
            onClick={() => onTypeChange(filter.id as any)}
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
  );
}
