interface ChipTuningAdminFiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  statusFilter: 'all' | 'visible' | 'hidden';
  setStatusFilter: (value: 'all' | 'visible' | 'hidden') => void;
  seriesFilter: string;
  setSeriesFilter: (value: string) => void;
  bodyTypeFilter: string;
  setBodyTypeFilter: (value: string) => void;
  engineTypeFilter: 'all' | 'petrol' | 'diesel';
  setEngineTypeFilter: (value: 'all' | 'petrol' | 'diesel') => void;
  uniqueSeries: string[];
  uniqueBodyTypes: string[];
}

export default function ChipTuningAdminFilters({
  filter,
  setFilter,
  statusFilter,
  setStatusFilter,
  seriesFilter,
  setSeriesFilter,
  bodyTypeFilter,
  setBodyTypeFilter,
  engineTypeFilter,
  setEngineTypeFilter,
  uniqueSeries,
  uniqueBodyTypes
}: ChipTuningAdminFiltersProps) {
  return (
    <div className="space-y-3 bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <input
        type="text"
        placeholder="Поиск по названию, двигателю или серии..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'visible' | 'hidden')}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="all">Все статусы</option>
          <option value="visible">Видимые (1)</option>
          <option value="hidden">Скрытые (0)</option>
        </select>

        <select
          value={seriesFilter}
          onChange={(e) => setSeriesFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="all">Все серии</option>
          {uniqueSeries.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={bodyTypeFilter}
          onChange={(e) => setBodyTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="all">Все кузова</option>
          {uniqueBodyTypes.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={engineTypeFilter}
          onChange={(e) => setEngineTypeFilter(e.target.value as 'all' | 'petrol' | 'diesel')}
          className="px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="all">Все типы</option>
          <option value="petrol">Бензин</option>
          <option value="diesel">Дизель</option>
        </select>

        <button
          onClick={() => {
            setFilter('');
            setStatusFilter('all');
            setSeriesFilter('all');
            setBodyTypeFilter('all');
            setEngineTypeFilter('all');
          }}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
