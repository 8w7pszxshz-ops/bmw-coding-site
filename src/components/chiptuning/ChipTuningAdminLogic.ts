import { useState } from 'react';
import { API_URL, ADMIN_PASSWORD, ChipTuningRecord } from './ChipTuningTypes';

export function useChipTuningAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [records, setRecords] = useState<ChipTuningRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ChipTuningRecord>>({});
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'visible' | 'hidden'>('all');
  const [seriesFilter, setSeriesFilter] = useState<string>('all');
  const [bodyTypeFilter, setBodyTypeFilter] = useState<string>('all');
  const [engineTypeFilter, setEngineTypeFilter] = useState<'all' | 'petrol' | 'diesel'>('all');
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [lastImportErrors, setLastImportErrors] = useState<string[]>([]);

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
        conversion_price: item.conversion_price || null,
        stage_type: item.stage_type || 'Stage 1'
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
            conversion_price: editForm.conversion_price,
            stage_type: editForm.stage_type
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
        
        if (result.errors?.length > 0) {
          setLastImportErrors(result.errors);
          console.warn(`Ошибки импорта (всего ${result.errors.length}):`, result.errors);
        } else {
          setLastImportErrors([]);
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

  const handleDownloadErrorReport = () => {
    if (lastImportErrors.length === 0) {
      alert('Нет ошибок для скачивания');
      return;
    }

    const reportContent = [
      `Отчёт об ошибках импорта CSV`,
      `Дата: ${new Date().toLocaleString('ru-RU')}`,
      `Всего ошибок: ${lastImportErrors.length}`,
      '',
      '='.repeat(80),
      '',
      ...lastImportErrors.map((err, idx) => `${idx + 1}. ${err}`)
    ].join('\n');

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `import_errors_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
  };

  return {
    isAuthenticated,
    password,
    setPassword,
    authError,
    records,
    loading,
    editingId,
    editForm,
    setEditForm,
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
    uploadStatus,
    uploading,
    lastImportErrors,
    handleAuth,
    handleEdit,
    handleSave,
    handleCancel,
    handleDelete,
    handleCSVUpload,
    handleDownloadErrorReport
  };
}