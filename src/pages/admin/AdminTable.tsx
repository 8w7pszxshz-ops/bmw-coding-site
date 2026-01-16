import Icon from '@/components/ui/icon';
import { ChiptuningRecord } from './AdminTypes';

interface AdminTableProps {
  records: ChiptuningRecord[];
  onEdit: (record: ChiptuningRecord) => void;
  onDelete: (id: number) => void;
}

export default function AdminTable({ records, onEdit, onDelete }: AdminTableProps) {
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
                <td className="px-4 py-3 text-white text-sm">{record.model_name}</td>
                <td className="px-4 py-3 text-white/80 text-sm">{record.series}</td>
                <td className="px-4 py-3 text-white/80 text-sm">{record.body_type}</td>
                <td className="px-4 py-3 text-white font-medium">{record.engine_code}</td>
                <td className="px-4 py-3 text-white/60 text-sm text-right">
                  {record.stock_power} / {record.stock_torque}
                </td>
                <td className="px-4 py-3 text-green-400 text-sm text-right">
                  {record.stage1_power} / {record.stage1_torque}
                </td>
                <td className="px-4 py-3 text-blue-400 font-medium text-right">
                  {record.stage1_price.toLocaleString()} ₽
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
