import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { API_URL, ADMIN_PASSWORD, ChipTuningRecord } from './ChipTuningTypes';
import ChipTuningAuthScreen from './ChipTuningAuthScreen';
import ChipTuningDataTable from './ChipTuningDataTable';

export default function ChipTuningAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [records, setRecords] = useState<ChipTuningRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ChipTuningRecord>>({});
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'visible' | 'hidden'>('all');
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
        const statusMsg = [
          `✅ Импорт завершён: ${result.imported} записей загружено`,
          result.deleted ? `Удалено старых: ${result.deleted}` : '',
          result.errors?.length > 0 ? `⚠️ Ошибок: ${result.errors.length}` : ''
        ].filter(Boolean).join(' | ');
        
        setUploadStatus(statusMsg);
        
        // Показываем первые 5 ошибок в консоли
        if (result.errors?.length > 0) {
          console.warn('Ошибки импорта (первые 5):', result.errors.slice(0, 5));
        }
        
        await loadData();
        setTimeout(() => setUploadStatus(''), 8000);
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
    // Экспортируем ВСЕ записи (не только отфильтрованные)
    const headers = [
      'Наименование',
      'Компания',
      'Stage 1 (крутящий момент)',
      'Stage 1 (мощность)',
      'Статус',
      'Stage 2 (мощность)',
      'Stage 2 (крутящий момент)',
      'цена'
    ];
    
    const rows = records.map(record => {
      // Формируем наименование: "BMW 1-series E8x 116d 115 л.с. 260 Нм"
      const modelName = `BMW ${record.series} ${record.body_type} ${record.engine_code} ${record.stock_power} л.с. ${record.stock_torque} Нм`;
      
      return [
        modelName,
        'Reborn Technologies',
        `${record.stage1_torque} Нм`,
        `${record.stage1_power} л.с.`,
        record.status,
        record.stage2_power ? `${record.stage2_power} л.с.` : '',
        record.stage2_torque ? `${record.stage2_torque} Нм` : '',
        record.stage1_price
      ];
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `chiptuning_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredRecords = records.filter(r => {
    // Фильтр по тексту
    const matchesText = r.model_name.toLowerCase().includes(filter.toLowerCase()) ||
      r.series.toLowerCase().includes(filter.toLowerCase()) ||
      r.body_type.toLowerCase().includes(filter.toLowerCase()) ||
      r.engine_code.toLowerCase().includes(filter.toLowerCase()) ||
      r.article_code.toLowerCase().includes(filter.toLowerCase());
    
    // Фильтр по статусу
    const matchesStatus = statusFilter === 'all' ? true :
      statusFilter === 'visible' ? r.status === 1 :
      r.status === 0;
    
    return matchesText && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <ChipTuningAuthScreen
        password={password}
        setPassword={setPassword}
        handleAuth={handleAuth}
        authError={authError}
      />
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

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Поиск по модели, кузову, двигателю, артикулу..."
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FF0040]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'visible' | 'hidden')}
            className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF0040]"
          >
            <option value="all">Все записи</option>
            <option value="visible">Видимые (статус 1)</option>
            <option value="hidden">Скрытые (статус 0)</option>
          </select>
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

        <ChipTuningDataTable
          filteredRecords={filteredRecords}
          editingId={editingId}
          editForm={editForm}
          setEditForm={setEditForm}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}