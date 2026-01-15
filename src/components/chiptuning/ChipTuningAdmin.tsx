import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229';
const ADMIN_PASSWORD = 'bmw2025';

interface Modification {
  id: number;
  mod_id: number;
  model_name: string;
  series: string;
  generation: string;
  engine_code: string;
  engine_type: string;
  displacement: string;
  mod_name: string;
  stage: string;
  power_before: number;
  power_after: number;
  torque_before: number;
  torque_after: number;
  price: number;
}

export default function ChipTuningAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [modifications, setModifications] = useState<Modification[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Modification>>({});
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
      
      // Преобразование данных в плоский список
      const flatList: Modification[] = [];
      let id = 0;
      
      data.forEach((model: any) => {
        model.engines.forEach((engine: any) => {
          engine.modifications.forEach((mod: any) => {
            flatList.push({
              id: id++,
              mod_id: mod.id || 0,
              model_name: model.name,
              series: model.series,
              generation: model.generation,
              engine_code: engine.code,
              engine_type: engine.type,
              displacement: engine.displacement,
              mod_name: mod.name,
              stage: mod.stage,
              power_before: mod.powerBefore,
              power_after: mod.powerAfter,
              torque_before: mod.torqueBefore,
              torque_after: mod.torqueAfter,
              price: mod.price
            });
          });
        });
      });
      
      setModifications(flatList);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mod: Modification) => {
    setEditingId(mod.id);
    setEditForm(mod);
  };

  const handleSave = async () => {
    if (!editForm.mod_id) {
      alert('Невозможно сохранить: отсутствует ID модификации');
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
          id: editForm.mod_id,
          data: {
            mod_name: editForm.mod_name,
            stage: editForm.stage,
            power_before: editForm.power_before,
            power_after: editForm.power_after,
            torque_before: editForm.torque_before,
            torque_after: editForm.torque_after,
            price: editForm.price
          }
        })
      });

      const result = await response.json();

      if (result.success) {
        setModifications(prev => 
          prev.map(m => m.id === editingId ? { ...m, ...editForm } : m)
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

  const handleDelete = async (mod: Modification) => {
    if (!mod.mod_id) {
      alert('Невозможно удалить: отсутствует ID модификации');
      return;
    }

    if (!confirm(`Удалить модификацию "${mod.mod_name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?id=${mod.mod_id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (result.success) {
        setModifications(prev => prev.filter(m => m.id !== mod.id));
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

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await fetch(`${API_URL}?action=populate&limit=10`);
      await loadData();
    } catch (error) {
      console.error('Error refreshing:', error);
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

      // Парсинг CSV
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

      // Отправка в backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'import_csv', data: rows })
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`✅ Успешно загружено: ${result.models} моделей, ${result.engines} двигателей, ${result.modifications} модификаций`);
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
      'model_name', 'series', 'generation', 'engine_code', 'engine_type', 'displacement',
      'mod_name', 'stage', 'power_before', 'power_after', 'torque_before', 'torque_after', 'price'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredMods.map(mod => 
        headers.map(h => mod[h as keyof Modification]).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chiptuning_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredMods = modifications.filter(m => 
    m.model_name.toLowerCase().includes(filter.toLowerCase()) ||
    m.series.toLowerCase().includes(filter.toLowerCase()) ||
    m.engine_code.toLowerCase().includes(filter.toLowerCase()) ||
    m.mod_name.toLowerCase().includes(filter.toLowerCase())
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
      <div className="max-w-7xl mx-auto">
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
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FF0040, #E7222E)'
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Обновление...
                </>
              ) : (
                <>
                  <Icon name="RefreshCw" className="w-5 h-5" />
                  Обновить из парсера
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Поиск по модели, серии, двигателю..."
            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FF0040]"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-white/60">
            Найдено записей: {filteredMods.length}
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
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Модель</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Кузов</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Двигатель</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Модификация</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Stage</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">HP До</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">HP После</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Nm До</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Nm После</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Цена</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredMods.map((mod) => (
                <tr key={mod.id} className="border-b border-white/5 hover:bg-white/5">
                  {editingId === mod.id ? (
                    <>
                      <td className="px-4 py-3 text-sm">{mod.model_name}</td>
                      <td className="px-4 py-3 text-sm">{mod.series}</td>
                      <td className="px-4 py-3 text-sm">{mod.engine_code}</td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="text"
                          value={editForm.mod_name || ''}
                          onChange={(e) => setEditForm({...editForm, mod_name: e.target.value})}
                          className="w-full px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="text"
                          value={editForm.stage || ''}
                          onChange={(e) => setEditForm({...editForm, stage: e.target.value})}
                          className="w-full px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="number"
                          value={editForm.power_before || 0}
                          onChange={(e) => setEditForm({...editForm, power_before: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="number"
                          value={editForm.power_after || 0}
                          onChange={(e) => setEditForm({...editForm, power_after: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="number"
                          value={editForm.torque_before || 0}
                          onChange={(e) => setEditForm({...editForm, torque_before: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="number"
                          value={editForm.torque_after || 0}
                          onChange={(e) => setEditForm({...editForm, torque_after: parseInt(e.target.value)})}
                          className="w-20 px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <input
                          type="number"
                          value={editForm.price || 0}
                          onChange={(e) => setEditForm({...editForm, price: parseInt(e.target.value)})}
                          className="w-24 px-2 py-1 rounded bg-white/10 border border-white/20 text-sm"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
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
                      <td className="px-4 py-3 text-sm">{mod.model_name}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 rounded text-xs" style={{
                          background: mod.generation === 'G' ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 107, 53, 0.2)'
                        }}>
                          {mod.series}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon 
                            name={mod.engine_type === 'petrol' ? 'Flame' : 'Fuel'} 
                            className="w-4 h-4"
                            style={{ color: mod.engine_type === 'petrol' ? '#FF6B35' : '#00D4FF' }}
                          />
                          {mod.engine_code}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{mod.mod_name}</td>
                      <td className="px-4 py-3 text-sm">{mod.stage}</td>
                      <td className="px-4 py-3 text-sm">{mod.power_before}</td>
                      <td className="px-4 py-3 text-sm font-medium text-green-400">{mod.power_after}</td>
                      <td className="px-4 py-3 text-sm">{mod.torque_before}</td>
                      <td className="px-4 py-3 text-sm font-medium text-green-400">{mod.torque_after}</td>
                      <td className="px-4 py-3 text-sm">{mod.price.toLocaleString()} ₽</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(mod)}
                            className="p-1 rounded hover:bg-[#FF0040]/20"
                            title="Редактировать"
                          >
                            <Icon name="Pencil" className="w-4 h-4 text-[#FF0040]" />
                          </button>
                          <button
                            onClick={() => handleDelete(mod)}
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