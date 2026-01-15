import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229';
const ADMIN_PASSWORD = 'bmw2025';

interface ChipTuningRecord {
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
  status: number;
  conversion_type: string | null;
  conversion_target_power: number | null;
  conversion_price: number | null;
}

export default function ChipTuningAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [records, setRecords] = useState<ChipTuningRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ChipTuningRecord>>({});
  const [filter, setFilter] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
    } else {
      setAuthError('Неверный пароль');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      const flatList: ChipTuningRecord[] = data.map((item: any) => ({
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
        status: item.status,
        conversion_type: item.conversion_type || null,
        conversion_target_power: item.conversion_target_power || null,
        conversion_price: item.conversion_price || null
      }));
      
      setRecords(flatList);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: ChipTuningRecord) => {
    setEditingId(record.id);
    setEditForm(record);
  };

  const handleSave = async () => {
    if (!editForm.id) {
      alert('Невозможно сохранить: отсутствует ID записи');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'update',
          id: editForm.id,
          data: {
            model_name: editForm.model_name,
            series: editForm.series,
            body_type: editForm.body_type,
            engine_code: editForm.engine_code,
            article_code: editForm.article_code,
            stock_power: editForm.stock_power,
            stock_torque: editForm.stock_torque,
            stage1_power: editForm.stage1_power,
            stage1_torque: editForm.stage1_torque,
            stage1_price: editForm.stage1_price,
            stage2_power: editForm.stage2_power,
            stage2_torque: editForm.stage2_torque,
            status: editForm.status,
            conversion_type: editForm.conversion_type,
            conversion_target_power: editForm.conversion_target_power,
            conversion_price: editForm.conversion_price
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setRecords(prev => 
          prev.map(r => r.id === editingId ? { ...r, ...editForm } as ChipTuningRecord : r)
        );
        setUploadStatus('✅ Изменения сохранены');
        setTimeout(() => setUploadStatus(''), 3000);
      } else {
        setUploadStatus(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Ошибка сохранения: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = async (record: ChipTuningRecord) => {
    if (!confirm(`Удалить запись "${record.model_name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?id=${record.id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setRecords(prev => prev.filter(r => r.id !== record.id));
        setUploadStatus('✅ Запись удалена');
        setTimeout(() => setUploadStatus(''), 3000);
      } else {
        setUploadStatus(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Ошибка удаления: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('Чтение файла...');

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setUploadStatus('❌ Файл пустой или не содержит данных');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, idx) => {
          obj[header] = values[idx];
        });
        return obj;
      });

      setUploadStatus(`Загрузка ${rows.length} записей в базу данных...`);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'import_csv', data: rows })
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`✅ Успешно загружено: ${result.imported} записей`);
        await loadData();
        setTimeout(() => setUploadStatus(''), 5000);
      } else {
        setUploadStatus(`❌ Ошибка: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus(`❌ Ошибка загрузки: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'model_name', 'series', 'body_type', 'engine_code', 'article_code',
      'stock_power', 'stock_torque',
      'stage1_power', 'stage1_torque', 'stage1_price',
      'stage2_power', 'stage2_torque',
      'status', 'conversion_type', 'conversion_target_power', 'conversion_price'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => 
        headers.map(h => record[h as keyof ChipTuningRecord] ?? '').join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chiptuning_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredRecords = records.filter(r => 
    r.model_name.toLowerCase().includes(filter.toLowerCase()) ||
    r.series.toLowerCase().includes(filter.toLowerCase()) ||
    r.body_type.toLowerCase().includes(filter.toLowerCase()) ||
    r.engine_code.toLowerCase().includes(filter.toLowerCase()) ||
    r.article_code.toLowerCase().includes(filter.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98), rgba(20, 20, 30, 0.98))'
        }}
      >
        <div className="w-full max-w-md p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8)'
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Icon name="Shield" className="w-8 h-8 text-[#FF0040]" />
            <h1 className="text-2xl font-light text-white">Админка Чип-тюнинга</h1>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FF0040]"
            />
            <button
              onClick={handleAuth}
              className="w-full py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF0040, #E7222E)'
              }}
            >
              Войти
            </button>
            {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98), rgba(20, 20, 30, 0.98))'
      }}
    >
      <div className="max-w-[1900px] mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Icon name="Settings" className="w-8 h-8 text-[#FF0040]" />
            <h1 className="text-3xl font-light text-white">Админка Чип-тюнинга BMW</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.8), rgba(0, 170, 204, 0.8))'
              }}
            >
              <Icon name="Download" className="w-5 h-5" />
              Экспорт CSV
            </button>
            <label
              className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
              style={{
                background: uploading 
                  ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.5), rgba(204, 85, 42, 0.5))'
                  : 'linear-gradient(135deg, rgba(255, 107, 53, 0.8), rgba(204, 85, 42, 0.8))'
              }}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" className="w-5 h-5" />
                  Импорт CSV
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </>
              )}
            </label>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Поиск по модели, кузову, двигателю, артикулу..."
            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FF0040]"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-white/60">
            Найдено записей: {filteredRecords.length}
          </div>
          {uploadStatus && (
            <div className="text-sm px-4 py-2 rounded-lg" style={{
              background: uploadStatus.includes('✅') 
                ? 'rgba(0, 212, 255, 0.2)' 
                : uploadStatus.includes('❌') 
                  ? 'rgba(255, 0, 64, 0.2)'
                  : 'rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}>
              {uploadStatus}
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-white text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">ID</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Модель</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Серия</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Кузов</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Двиг.</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Сток л.с.</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Сток Нм</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">St.1 л.с.</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">St.1 Нм</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">St.1 ₽</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">St.2 л.с.</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">St.2 Нм</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Статус</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Перепрошивка</th>
                <th className="px-2 py-3 text-left text-xs font-medium text-white/70">Конв. л.с.</th>
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
                          value={editForm.conversion_target_power || ''}
                          onChange={(e) => setEditForm({...editForm, conversion_target_power: e.target.value ? parseInt(e.target.value) : null})}
                          className="w-16 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs"
                          placeholder="-"
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
                      <td className="px-2 py-2 text-purple-400 font-medium">
                        {record.conversion_target_power || '-'}
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
      </div>
    </div>
  );
}
