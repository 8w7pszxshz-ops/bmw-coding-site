import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface AdminFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterSeries: string;
  setFilterSeries: (value: string) => void;
  filterBodyType: string;
  setFilterBodyType: (value: string) => void;
  filterStatus: string;
  setFilterStatus: (value: string) => void;
  uniqueSeries: string[];
  uniqueBodyTypes: string[];
  onReset: () => void;
}

export default function AdminFilters({
  searchTerm,
  setSearchTerm,
  filterSeries,
  setFilterSeries,
  filterBodyType,
  setFilterBodyType,
  filterStatus,
  setFilterStatus,
  uniqueSeries,
  uniqueBodyTypes,
  onReset
}: AdminFiltersProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-6 flex gap-4">
      <input
        type="text"
        placeholder="Поиск по модели или двигателю..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
      />
      <select
        value={filterSeries}
        onChange={(e) => setFilterSeries(e.target.value)}
        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
      >
        <option value="all" style={{ background: '#1e293b' }}>Все серии</option>
        {uniqueSeries.map(series => (
          <option key={series} value={series} style={{ background: '#1e293b' }}>{series}</option>
        ))}
      </select>
      <select
        value={filterBodyType}
        onChange={(e) => setFilterBodyType(e.target.value)}
        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
      >
        <option value="all" style={{ background: '#1e293b' }}>Все кузова</option>
        {uniqueBodyTypes.map(bodyType => (
          <option key={bodyType} value={bodyType} style={{ background: '#1e293b' }}>{bodyType}</option>
        ))}
      </select>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
      >
        <option value="all" style={{ background: '#1e293b' }}>Все статусы</option>
        <option value="1" style={{ background: '#1e293b' }}>Показывать</option>
        <option value="0" style={{ background: '#1e293b' }}>Скрыть</option>
      </select>
      <Button 
        onClick={onReset}
        variant="outline"
        className="bg-white/5 hover:bg-white/10 border-white/20 text-white"
      >
        <Icon name="X" className="w-4 h-4 mr-2" />
        Сбросить
      </Button>
    </div>
  );
}
