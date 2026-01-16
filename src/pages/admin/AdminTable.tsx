import Icon from '@/components/ui/icon';
import { ChiptuningRecord } from './AdminTypes';

interface AdminTableProps {
  records: ChiptuningRecord[];
  onEdit: (record: ChiptuningRecord) => void;
  onDelete: (id: number) => void;
  editingCell: { id: number; field: string } | null;
  cellValue: string;
  onCellValueChange: (value: string) => void;
  onCellClick: (record: ChiptuningRecord, field: keyof ChiptuningRecord) => void;
  onCellSave: () => void;
  savedCell: { id: number; field: string } | null;
}

export default function AdminTable({ 
  records, 
  onEdit, 
  onDelete, 
  editingCell, 
  cellValue, 
  onCellValueChange, 
  onCellClick, 
  onCellSave,
  savedCell
}: AdminTableProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCellSave();
    } else if (e.key === 'Escape') {
      onCellValueChange('');
    }
  };

  const EditableCell = ({ 
    record, 
    field, 
    value, 
    className = '' 
  }: { 
    record: ChiptuningRecord; 
    field: keyof ChiptuningRecord; 
    value: string | number; 
    className?: string;
  }) => {
    const isEditing = editingCell?.id === record.id && editingCell?.field === field;
    const isSaved = savedCell?.id === record.id && savedCell?.field === field;
    
    if (isEditing) {
      return (
        <input
          type="text"
          value={cellValue}
          onChange={(e) => onCellValueChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={onCellSave}
          autoFocus
          className={`w-full px-2 py-1 bg-white/20 border border-blue-400 rounded text-white outline-none ${className}`}
        />
      );
    }
    
    return (
      <div 
        onClick={() => onCellClick(record, field)}
        className={`cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-all duration-300 ${
          isSaved ? 'bg-green-500/30 border border-green-400/50' : ''
        } ${className}`}
      >
        {value}
      </div>
    );
  };
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/10">
            <tr className="text-white/80 text-sm">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Модель</th>
              <th className="px-4 py-3 text-left">Серия</th>
              <th className="px-4 py-3 text-left">Кузов</th>
              <th className="px-4 py-3 text-left">Двигатель</th>
              <th className="px-4 py-3 text-right">Сток</th>
              <th className="px-4 py-3 text-right">St.1</th>
              <th className="px-4 py-3 text-right">Цена</th>
              <th className="px-4 py-3 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id} className="border-t border-white/10 hover:bg-white/5">
                <td className="px-4 py-3 text-white/60 text-sm">{record.id}</td>
                <td className="px-4 py-3 text-white text-sm">
                  <EditableCell record={record} field="model_name" value={record.model_name} />
                </td>
                <td className="px-4 py-3 text-white/80 text-sm">
                  <EditableCell record={record} field="series" value={record.series} />
                </td>
                <td className="px-4 py-3 text-white/80 text-sm">
                  <EditableCell record={record} field="body_type" value={record.body_type} />
                </td>
                <td className="px-4 py-3 text-white font-medium">
                  <EditableCell record={record} field="engine_code" value={record.engine_code} />
                </td>
                <td className="px-4 py-3 text-white/60 text-sm text-right">
                  <EditableCell record={record} field="stock_power" value={record.stock_power} className="text-right" /> / <EditableCell record={record} field="stock_torque" value={record.stock_torque} className="text-right" />
                </td>
                <td className="px-4 py-3 text-green-400 text-sm text-right">
                  <EditableCell record={record} field="stage1_power" value={record.stage1_power} className="text-right" /> / <EditableCell record={record} field="stage1_torque" value={record.stage1_torque} className="text-right" />
                </td>
                <td className="px-4 py-3 text-blue-400 font-medium text-right">
                  <EditableCell record={record} field="stage1_price" value={record.stage1_price.toLocaleString()} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(record)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Icon name="Edit" className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => onDelete(record.id)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Icon name="Trash2" className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}