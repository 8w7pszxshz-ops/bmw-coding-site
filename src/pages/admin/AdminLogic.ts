import { useState, useEffect, useCallback } from 'react';
import { ChiptuningRecord, EditFormData, API_URL } from './AdminTypes';

export function useAdminLogic() {
  const [records, setRecords] = useState<ChiptuningRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState<ChiptuningRecord | null>(null);
  const [formData, setFormData] = useState<EditFormData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeries, setFilterSeries] = useState<string>('all');
  const [editingCell, setEditingCell] = useState<{ id: number; field: string } | null>(null);
  const [cellValue, setCellValue] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?admin=1`);
      const data = await response.json();
      
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
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const handleCellClick = (record: ChiptuningRecord, field: keyof ChiptuningRecord) => {
    setEditingCell({ id: record.id, field });
    setCellValue(String(record[field] ?? ''));
  };

  const handleCellSave = async () => {
    if (!editingCell) return;

    const record = records.find(r => r.id === editingCell.id);
    if (!record) return;

    const updatedData: any = {
      model_name: record.model_name,
      series: record.series,
      body_type: record.body_type,
      engine_code: record.engine_code,
      article_code: record.article_code,
      stock_power: record.stock_power,
      stock_torque: record.stock_torque,
      stage1_power: record.stage1_power,
      stage1_torque: record.stage1_torque,
      stage1_price: record.stage1_price,
      stage2_power: record.stage2_power,
      stage2_torque: record.stage2_torque,
      stage_type: record.stage_type,
      is_restyling: record.is_restyling,
      status: record.status
    };

    const field = editingCell.field;
    const numericFields = ['stock_power', 'stock_torque', 'stage1_power', 'stage1_torque', 'stage1_price', 'stage2_power', 'stage2_torque', 'status'];
    
    if (numericFields.includes(field)) {
      updatedData[field] = cellValue === '' ? null : parseInt(cellValue);
    } else if (field === 'is_restyling') {
      updatedData[field] = cellValue === 'true';
    } else {
      updatedData[field] = cellValue;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          id: record.id,
          data: updatedData
        })
      });

      if (!response.ok) throw new Error('Save failed');

      setEditingCell(null);
      setCellValue('');
      loadData();
    } catch (error) {
      console.error('Cell save error:', error);
      alert('Ошибка сохранения');
    }
  };

  const uniqueSeries = Array.from(new Set(records.map(r => r.series))).sort();

  const filteredRecords = records.filter(r => {
    const matchSearch = searchTerm === '' || 
      r.model_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.engine_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchSeries = filterSeries === 'all' || r.series === filterSeries;
    
    return matchSearch && matchSeries;
  });

  return {
    records,
    loading,
    editingRecord,
    setEditingRecord,
    formData,
    setFormData,
    searchTerm,
    setSearchTerm,
    filterSeries,
    setFilterSeries,
    uniqueSeries,
    filteredRecords,
    handleEdit,
    handleSave,
    handleDelete,
    handleAddNew,
    editingCell,
    cellValue,
    setCellValue,
    handleCellClick,
    handleCellSave
  };
}