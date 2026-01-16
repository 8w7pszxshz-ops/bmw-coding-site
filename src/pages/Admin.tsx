import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ChiptuningRecord {
  id: number;
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
  stock_power: number;
  stock_torque: number;
  stage1_power: number;
  stage1_torque: number;
  stage1_price: number;
  stage2_power: number | null;
  stage2_torque: number | null;
  stage_type: string;
  is_restyling: boolean;
  status: number;
}

interface EditFormData {
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
  stock_power: string;
  stock_torque: string;
  stage1_power: string;
  stage1_torque: string;
  stage1_price: string;
  stage2_power: string;
  stage2_torque: string;
  stage_type: string;
  is_restyling: boolean;
  status: string;
}

const API_URL = 'https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229';

export default function Admin() {
  const [records, setRecords] = useState<ChiptuningRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState<ChiptuningRecord | null>(null);
  const [formData, setFormData] = useState<EditFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeries, setFilterSeries] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?admin=1`);
      const data = await response.json();
      
      // Convert API format to table format
      const tableRecords: ChiptuningRecord[] = [];
      data.forEach((item: any) => {
        tableRecords.push({
          id: item.id,
          model_name: item.model_name,
          series: item.series,
          body_type: item.body_type,
          engine_code: item.engine_code,
          article_code: item.article_code,
          stock_power: item.stock.power,
          stock_torque: item.stock.torque,
          stage1_power: item.stage1.power,
          stage1_torque: item.stage1.torque,
          stage1_price: item.stage1.price,
          stage2_power: item.stage2?.power || null,
          stage2_torque: item.stage2?.torque || null,
          stage_type: item.stage_type,
          is_restyling: item.is_restyling,
          status: 1
        });
      });
      
      setRecords(tableRecords);
    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: ChiptuningRecord) => {
    setEditingRecord(record);
    setFormData({
      model_name: record.model_name,
      series: record.series,
      body_type: record.body_type,
      engine_code: record.engine_code,
      article_code: record.article_code,
      stock_power: String(record.stock_power),
      stock_torque: String(record.stock_torque),
      stage1_power: String(record.stage1_power),
      stage1_torque: String(record.stage1_torque),
      stage1_price: String(record.stage1_price),
      stage2_power: record.stage2_power ? String(record.stage2_power) : '',
      stage2_torque: record.stage2_torque ? String(record.stage2_torque) : '',
      stage_type: record.stage_type,
      is_restyling: record.is_restyling,
      status: String(record.status)
    });
  };

  const handleSave = async () => {
    if (!editingRecord || !formData) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          id: editingRecord.id,
          data: {
            model_name: formData.model_name,
            series: formData.series,
            body_type: formData.body_type,
            engine_code: formData.engine_code,
            article_code: formData.article_code,
            stock_power: parseInt(formData.stock_power),
            stock_torque: parseInt(formData.stock_torque),
            stage1_power: parseInt(formData.stage1_power),
            stage1_torque: parseInt(formData.stage1_torque),
            stage1_price: parseInt(formData.stage1_price),
            stage2_power: formData.stage2_power ? parseInt(formData.stage2_power) : null,
            stage2_torque: formData.stage2_torque ? parseInt(formData.stage2_torque) : null,
            stage_type: formData.stage_type,
            is_restyling: formData.is_restyling,
            status: parseInt(formData.status)
          }
        })
      });

      if (!response.ok) throw new Error('Save failed');

      alert('Сохранено!');
      setEditingRecord(null);
      setFormData(null);
      loadData();
    } catch (error) {
      console.error('Save error:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить запись?')) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });

      if (!response.ok) throw new Error('Delete failed');

      alert('Удалено!');
      loadData();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Ошибка удаления');
    }
  };

  const handleAddNew = () => {
    setEditingRecord({ id: 0 } as ChiptuningRecord);
    setFormData({
      model_name: '',
      series: '',
      body_type: '',
      engine_code: '',
      article_code: '',
      stock_power: '',
      stock_torque: '',
      stage1_power: '',
      stage1_torque: '',
      stage1_price: '30000',
      stage2_power: '',
      stage2_torque: '',
      stage_type: 'St.1',
      is_restyling: false,
      status: '1'
    });
  };

  const uniqueSeries = Array.from(new Set(records.map(r => r.series))).sort();

  const filteredRecords = records.filter(r => {
    const matchSearch = searchTerm === '' || 
      r.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.engine_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchSeries = filterSeries === 'all' || r.series === filterSeries;
    
    return matchSearch && matchSeries;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Админ-панель Чип-тюнинга</h1>
          <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
            <Icon name="Plus" className="w-5 h-5 mr-2" />
            Добавить
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 mb-6 flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Поиск по модели или двигателю..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            />
          </div>
          <select
            value={filterSeries}
            onChange={(e) => setFilterSeries(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
          >
            <option value="all">Все серии</option>
            {uniqueSeries.map(series => (
              <option key={series} value={series}>{series}</option>
            ))}
          </select>
        </div>

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
                {filteredRecords.map((record) => (
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
                          onClick={() => handleEdit(record)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Icon name="Edit" className="w-4 h-4 text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
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

        <div className="mt-4 text-white/60 text-sm">
          Показано записей: {filteredRecords.length} из {records.length}
        </div>
      </div>

      <Dialog open={!!editingRecord} onOpenChange={(open) => !open && setEditingRecord(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingRecord?.id === 0 ? 'Новая запись' : `Редактирование #${editingRecord?.id}`}
            </DialogTitle>
          </DialogHeader>

          {formData && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Серия</label>
                  <input
                    type="text"
                    value={formData.series}
                    onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    placeholder="1-series"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Кузов</label>
                  <input
                    type="text"
                    value={formData.body_type}
                    onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    placeholder="E8x"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/80 text-sm mb-1 block">Название модели</label>
                <input
                  type="text"
                  value={formData.model_name}
                  onChange={(e) => setFormData({ ...formData, model_name: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Код двигателя</label>
                  <input
                    type="text"
                    value={formData.engine_code}
                    onChange={(e) => setFormData({ ...formData, engine_code: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    placeholder="116d"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Артикул</label>
                  <input
                    type="text"
                    value={formData.article_code}
                    onChange={(e) => setFormData({ ...formData, article_code: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  />
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-medium mb-3">Характеристики Stock</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Мощность (л.с.)</label>
                    <input
                      type="number"
                      value={formData.stock_power}
                      onChange={(e) => setFormData({ ...formData, stock_power: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Момент (Нм)</label>
                    <input
                      type="number"
                      value={formData.stock_torque}
                      onChange={(e) => setFormData({ ...formData, stock_torque: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-medium mb-3">Stage 1</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Мощность (л.с.)</label>
                    <input
                      type="number"
                      value={formData.stage1_power}
                      onChange={(e) => setFormData({ ...formData, stage1_power: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Момент (Нм)</label>
                    <input
                      type="number"
                      value={formData.stage1_torque}
                      onChange={(e) => setFormData({ ...formData, stage1_torque: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Цена (₽)</label>
                    <input
                      type="number"
                      value={formData.stage1_price}
                      onChange={(e) => setFormData({ ...formData, stage1_price: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-medium mb-3">Stage 2 (опционально)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Мощность (л.с.)</label>
                    <input
                      type="number"
                      value={formData.stage2_power}
                      onChange={(e) => setFormData({ ...formData, stage2_power: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      placeholder="оставьте пустым если нет"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Момент (Нм)</label>
                    <input
                      type="number"
                      value={formData.stage2_torque}
                      onChange={(e) => setFormData({ ...formData, stage2_torque: e.target.value })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      placeholder="оставьте пустым если нет"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Stage Type</label>
                  <select
                    value={formData.stage_type}
                    onChange={(e) => setFormData({ ...formData, stage_type: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  >
                    <option value="St.1">St.1</option>
                    <option value="St.2">St.2</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Рестайлинг</label>
                  <select
                    value={formData.is_restyling ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, is_restyling: e.target.value === 'true' })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  >
                    <option value="false">Нет</option>
                    <option value="true">Да</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-1 block">Статус</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                  >
                    <option value="1">Активна</option>
                    <option value="0">Неактивна</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Icon name="Save" className="w-5 h-5 mr-2" />
                  Сохранить
                </Button>
                <Button 
                  onClick={() => setEditingRecord(null)} 
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
