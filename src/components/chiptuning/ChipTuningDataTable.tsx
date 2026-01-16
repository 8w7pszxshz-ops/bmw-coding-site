import Icon from '@/components/ui/icon';
import { ChipTuningRecord } from './ChipTuningTypes';

interface ChipTuningDataTableProps {
  filteredRecords: ChipTuningRecord[];
  editingId: number | null;
  editForm: Partial<ChipTuningRecord>;
  setEditForm: (form: Partial<ChipTuningRecord>) => void;
  handleEdit: (record: ChipTuningRecord) => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleDelete: (record: ChipTuningRecord) => void;
}

export default function ChipTuningDataTable({
  filteredRecords,
  editingId,
  editForm,
  setEditForm,
  handleEdit,
  handleSave,
  handleCancel,
  handleDelete
}: ChipTuningDataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white text-xs">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">ID</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Модель</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Серия</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Кузов</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Двиг.</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Stage</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Сток л.с.</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Сток Нм</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Stage 1 л.с.</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Stage 1 Нм</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Stage 1 ₽</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Stage 2 л.с.</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Stage 2 Нм</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Статус</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Перепрошивка</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Конв. ₽</th>
            <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id} className="border-b border-white/5 hover:bg-white/5">
              {editingId === record.id ? (
                <>
                  <td className="px-2 py-2 text-white/40">{record.id}</td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={editForm.model_name || ''}
                      onChange={(e) => setEditForm({...editForm, model_name: e.target.value})}
                      className="w-full px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={editForm.series || ''}
                      onChange={(e) => setEditForm({...editForm, series: e.target.value})}
                      className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={editForm.body_type || ''}
                      onChange={(e) => setEditForm({...editForm, body_type: e.target.value})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={editForm.engine_code || ''}
                      onChange={(e) => setEditForm({...editForm, engine_code: e.target.value})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={editForm.stage_type || 'St.1'}
                      onChange={(e) => setEditForm({...editForm, stage_type: e.target.value})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stock_power || 0}
                      onChange={(e) => setEditForm({...editForm, stock_power: parseInt(e.target.value)})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stock_torque || 0}
                      onChange={(e) => setEditForm({...editForm, stock_torque: parseInt(e.target.value)})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stage1_power || 0}
                      onChange={(e) => setEditForm({...editForm, stage1_power: parseInt(e.target.value)})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stage1_torque || 0}
                      onChange={(e) => setEditForm({...editForm, stage1_torque: parseInt(e.target.value)})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stage1_price || 0}
                      onChange={(e) => setEditForm({...editForm, stage1_price: parseInt(e.target.value)})}
                      className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stage2_power || ''}
                      onChange={(e) => setEditForm({...editForm, stage2_power: e.target.value ? parseInt(e.target.value) : null})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                      placeholder="-"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.stage2_torque || ''}
                      onChange={(e) => setEditForm({...editForm, stage2_torque: e.target.value ? parseInt(e.target.value) : null})}
                      className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                      placeholder="-"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <select
                      value={editForm.status ?? 1}
                      onChange={(e) => setEditForm({...editForm, status: parseInt(e.target.value)})}
                      className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                    >
                      <option value={1}>✅ Вкл</option>
                      <option value={0}>❌ Выкл</option>
                    </select>
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={editForm.conversion_type || ''}
                      onChange={(e) => setEditForm({...editForm, conversion_type: e.target.value || null})}
                      className="w-32 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                      placeholder="220i → 228i"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="number"
                      value={editForm.conversion_price || ''}
                      onChange={(e) => setEditForm({...editForm, conversion_price: e.target.value ? parseInt(e.target.value) : null})}
                      className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                      placeholder="-"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-1">
                      <button
                        onClick={handleSave}
                        className="p-1 rounded hover:bg-green-500/20"
                      >
                        <Icon name="Check" className="w-4 h-4 text-green-400" />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="p-1 rounded hover:bg-red-500/20"
                      >
                        <Icon name="X" className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-2 py-2 text-white/40">{record.id}</td>
                  <td className="px-2 py-2">{record.model_name}</td>
                  <td className="px-2 py-2">{record.series}</td>
                  <td className="px-2 py-2">{record.body_type}</td>
                  <td className="px-2 py-2">{record.engine_code}</td>
                  <td className="px-2 py-2">
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{background: 'rgba(255, 0, 64, 0.2)', color: '#FF0040'}}>
                      {record.stage_type || 'St.1'}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-white/60">{record.stock_power}</td>
                  <td className="px-2 py-2 text-white/60">{record.stock_torque}</td>
                  <td className="px-2 py-2 font-medium text-green-400">{record.stage1_power}</td>
                  <td className="px-2 py-2 font-medium text-green-400">{record.stage1_torque}</td>
                  <td className="px-2 py-2">{record.stage1_price.toLocaleString()}</td>
                  <td className="px-2 py-2 font-medium text-blue-400">{record.stage2_power || '-'}</td>
                  <td className="px-2 py-2 font-medium text-blue-400">{record.stage2_torque || '-'}</td>
                  <td className="px-2 py-2">
                    {record.status === 1 ? (
                      <span className="text-green-400">✅ Вкл</span>
                    ) : (
                      <span className="text-red-400">❌ Выкл</span>
                    )}
                  </td>
                  <td className="px-2 py-2 text-purple-400">
                    {record.conversion_type || '-'}
                  </td>
                  <td className="px-2 py-2 text-purple-400">
                    {record.conversion_price ? record.conversion_price.toLocaleString() : '-'}
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(record)}
                        className="p-1 rounded hover:bg-[#FF0040]/20"
                        title="Редактировать"
                      >
                        <Icon name="Pencil" className="w-4 h-4 text-[#FF0040]" />
                      </button>
                      <button
                        onClick={() => handleDelete(record)}
                        className="p-1 rounded hover:bg-red-500/20"
                        title="Удалить"
                      >
                        <Icon name="Trash2" className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}