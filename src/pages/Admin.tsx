import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const API_URL = 'https://functions.poehali.dev/1465efc7-1ef5-4210-8079-7bbd027f47a0';

interface ChiptuningRecord {
  id: number;
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
  stock: { power: number; torque: number };
  stage1: { power: number; torque: number; price: number };
  stage2: { power: number; torque: number } | null;
  stage_type: string;
  is_restyling: boolean;
  status: string;
  show_stage2: boolean;
}

export default function Admin() {
  const [records, setRecords] = useState<ChiptuningRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [editingCell, setEditingCell] = useState<{ id: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [savedCells, setSavedCells] = useState<Set<string>>(new Set());
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeries, setFilterSeries] = useState('all');
  const [filterBodyType, setFilterBodyType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`${API_URL}?admin=1`);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      alert('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(r => {
    const matchSearch = searchTerm === '' || 
      r.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.engine_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSeries = filterSeries === 'all' || r.series === filterSeries;
    const matchBodyType = filterBodyType === 'all' || r.body_type === filterBodyType;
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;
    
    return matchSearch && matchSeries && matchBodyType && matchStatus;
  });

  const uniqueSeries = Array.from(new Set(records.map(r => r.series))).sort();
  const uniqueBodyTypes = Array.from(new Set(records.map(r => r.body_type))).sort();

  const handleCellClick = (id: number, field: string, currentValue: any) => {
    setEditingCell({ id, field });
    setEditValue(String(currentValue ?? ''));
  };

  const saveRecord = async (updatedRecord: ChiptuningRecord) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          id: updatedRecord.id,
          data: {
            model_name: updatedRecord.model_name,
            series: updatedRecord.series,
            body_type: updatedRecord.body_type,
            engine_code: updatedRecord.engine_code,
            article_code: updatedRecord.article_code,
            stock_power: updatedRecord.stock.power,
            stock_torque: updatedRecord.stock.torque,
            stage1_power: updatedRecord.stage1.power,
            stage1_torque: updatedRecord.stage1.torque,
            stage1_price: updatedRecord.stage1.price,
            stage2_power: updatedRecord.stage2?.power ?? null,
            stage2_torque: updatedRecord.stage2?.torque ?? null,
            stage_type: updatedRecord.stage_type,
            is_restyling: updatedRecord.is_restyling,
            status: updatedRecord.status,
            show_stage2: updatedRecord.show_stage2
          }
        })
      });

      if (response.ok) {
        setRecords(prev => prev.map(r => r.id === updatedRecord.id ? updatedRecord : r));
        return true;
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Ошибка сохранения');
    }
    return false;
  };

  const handleCellSave = async () => {
    if (!editingCell) return;

    const record = records.find(r => r.id === editingCell.id);
    if (!record) return;

    const updatedRecord = { ...record };
    const fieldPath = editingCell.field.split('.');
    
    if (fieldPath.length === 2) {
      const [parent, child] = fieldPath;
      if (parent === 'stock' || parent === 'stage1' || parent === 'stage2') {
        if (!updatedRecord[parent]) {
          updatedRecord[parent] = { power: 0, torque: 0 };
        }
        updatedRecord[parent] = {
          ...updatedRecord[parent],
          [child]: parseFloat(editValue) || 0
        };
      }
    } else {
      const field = editingCell.field as keyof ChiptuningRecord;
      (updatedRecord[field] as any) = editValue;
    }

    const success = await saveRecord(updatedRecord);
    
    if (success) {
      const cellKey = `${editingCell.id}-${editingCell.field}`;
      setSavedCells(prev => new Set(prev).add(cellKey));
      setTimeout(() => {
        setSavedCells(prev => {
          const newSet = new Set(prev);
          newSet.delete(cellKey);
          return newSet;
        });
      }, 2000);
    }

    setEditingCell(null);
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync_csv' })
      });
      
      const result = await response.json();
      if (result.message?.includes('Successfully')) {
        alert('✅ Данные успешно синхронизированы с GitHub!');
      } else {
        alert(`⚠️ ${result.message || 'Ошибка синхронизации'}`);
      }
    } catch (error) {
      console.error('Ошибка синхронизации:', error);
      alert('❌ Ошибка синхронизации');
    } finally {
      setSyncing(false);
    }
  };

  const handleExport = () => {
    const headers = ['Модель', 'Серия', 'Кузов', 'Двигатель', 'Артикул', 'Сток л.с.', 'Сток Нм', 'Stage1 л.с.', 'Stage1 Нм', 'Цена Stage1', 'Stage2 л.с.', 'Stage2 Нм', 'Тип', 'Рестайлинг', 'Статус', 'Показ Stage2'];
    const rows = records.map(r => [
      r.model_name, r.series, r.body_type, r.engine_code, r.article_code,
      r.stock.power, r.stock.torque, r.stage1.power, r.stage1.torque, r.stage1.price,
      r.stage2?.power ?? '', r.stage2?.torque ?? '', r.stage_type, r.is_restyling ? '1' : '0', r.status, r.show_stage2 ? '1' : '0'
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chiptuning_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').slice(1);
      
      for (const line of lines) {
        const parts = line.split(',');
        if (parts.length < 15) continue;

        try {
          await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'add',
              data: {
                model_name: parts[0],
                series: parts[1],
                body_type: parts[2],
                engine_code: parts[3],
                article_code: parts[4],
                stock_power: parseFloat(parts[5]),
                stock_torque: parseFloat(parts[6]),
                stage1_power: parseFloat(parts[7]),
                stage1_torque: parseFloat(parts[8]),
                stage1_price: parseFloat(parts[9]),
                stage2_power: parts[10] ? parseFloat(parts[10]) : null,
                stage2_torque: parts[11] ? parseFloat(parts[11]) : null,
                stage_type: parts[12],
                is_restyling: parts[13] === '1',
                status: parts[14],
                show_stage2: parts[15] === '1'
              }
            })
          });
        } catch (error) {
          console.error('Ошибка импорта строки:', error);
        }
      }
      
      loadData();
      alert('Импорт завершён');
    };
    reader.readAsText(file);
  };

  const renderCell = (record: ChiptuningRecord, field: string, value: any) => {
    const cellKey = `${record.id}-${field}`;
    const isEditing = editingCell?.id === record.id && editingCell?.field === field;
    const isSaved = savedCells.has(cellKey);

    return (
      <td
        key={field}
        className={`px-4 py-3 text-white/90 cursor-pointer hover:bg-white/10 transition-colors ${
          isSaved ? 'bg-green-500/30 animate-pulse' : ''
        }`}
        onClick={() => !isEditing && handleCellClick(record.id, field, value)}
      >
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellSave}
            onKeyDown={(e) => e.key === 'Enter' && handleCellSave()}
            autoFocus
            className="w-full bg-blue-600/30 border border-blue-500 rounded px-2 py-1 text-white"
          />
        ) : (
          <span>{value ?? '-'}</span>
        )}
      </td>
    );
  };

  const renderCheckbox = (record: ChiptuningRecord, field: 'status' | 'show_stage2', checked: boolean) => {
    const cellKey = `${record.id}-${field}`;
    const isSaved = savedCells.has(cellKey);

    const toggleCheckbox = async () => {
      let updatedRecord: ChiptuningRecord;
      
      if (field === 'status') {
        updatedRecord = { ...record, status: checked ? 'draft' : 'active' };
      } else {
        updatedRecord = { ...record, show_stage2: !checked };
      }
      
      const success = await saveRecord(updatedRecord);
      
      if (success) {
        setSavedCells(prev => new Set(prev).add(cellKey));
        setTimeout(() => {
          setSavedCells(prev => {
            const newSet = new Set(prev);
            newSet.delete(cellKey);
            return newSet;
          });
        }, 2000);
      }
    };

    return (
      <td
        key={field}
        className={`px-4 py-3 text-center cursor-pointer hover:bg-white/10 transition-colors ${
          isSaved ? 'bg-green-500/30 animate-pulse' : ''
        }`}
        onClick={toggleCheckbox}
      >
        <div className="flex items-center justify-center">
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            checked ? 'bg-green-500 border-green-500' : 'border-white/30'
          }`}>
            {checked && <Icon name="Check" className="w-4 h-4 text-white" />}
          </div>
        </div>
      </td>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Админ-панель чип-тюнинга</h1>
          <div className="flex gap-3">
            <Button 
              onClick={handleSync}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={syncing}
            >
              <Icon name={syncing ? 'RefreshCw' : 'CloudUpload'} className={`w-5 h-5 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Синхронизация...' : 'Синхронизировать с GitHub'}
            </Button>
            <Button onClick={handleExport} variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              <Icon name="Download" className="w-5 h-5 mr-2" />
              Экспорт CSV
            </Button>
            <Button 
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.csv';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) handleImport(file);
                };
                input.click();
              }}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Icon name="Upload" className="w-5 h-5 mr-2" />
              Импорт CSV
            </Button>
          </div>
        </div>

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
            <option value="active" style={{ background: '#1e293b' }}>Показывать</option>
            <option value="draft" style={{ background: '#1e293b' }}>Скрыть</option>
          </select>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setFilterSeries('all');
              setFilterBodyType('all');
              setFilterStatus('all');
            }}
            variant="outline"
            className="bg-white/5 hover:bg-white/10 border-white/20 text-white"
          >
            <Icon name="X" className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">ID</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Модель</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Серия</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Кузов</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Двигатель</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Сток л.с.</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Сток Нм</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Stage1 л.с.</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Stage1 Нм</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Цена</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Stage2 л.с.</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Stage2 Нм</th>
                  <th className="px-4 py-3 text-center text-white/80 font-medium">На сайте</th>
                  <th className="px-4 py-3 text-center text-white/80 font-medium">Stage2 на сайте</th>
                  <th className="px-4 py-3 text-left text-white/80 font-medium">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 text-white/60">{record.id}</td>
                    {renderCell(record, 'model_name', record.model_name)}
                    {renderCell(record, 'series', record.series)}
                    {renderCell(record, 'body_type', record.body_type)}
                    {renderCell(record, 'engine_code', record.engine_code)}
                    {renderCell(record, 'stock.power', record.stock.power)}
                    {renderCell(record, 'stock.torque', record.stock.torque)}
                    {renderCell(record, 'stage1.power', record.stage1.power)}
                    {renderCell(record, 'stage1.torque', record.stage1.torque)}
                    {renderCell(record, 'stage1.price', record.stage1.price)}
                    {renderCell(record, 'stage2.power', record.stage2?.power)}
                    {renderCell(record, 'stage2.torque', record.stage2?.torque)}
                    {renderCheckbox(record, 'status', record.status === 'active')}
                    {renderCheckbox(record, 'show_stage2', record.show_stage2)}
                    <td className="px-4 py-3">
                      <Button
                        onClick={async () => {
                          if (confirm('Удалить запись?')) {
                            await fetch(API_URL, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ action: 'delete', id: record.id })
                            });
                            loadData();
                          }
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Icon name="Trash2" className="w-4 h-4" />
                      </Button>
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
    </div>
  );
}
