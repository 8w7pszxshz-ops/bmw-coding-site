import { useState } from 'react';
import { Button } from '@/components/ui/button';

export interface ChiptuningRecord {
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
  firmware_type: string;
}

interface AddCarFormProps {
  onAdd: (data: Omit<ChiptuningRecord, 'id'>) => Promise<boolean>;
  onCancel: () => void;
}

export default function AddCarForm({ onAdd, onCancel }: AddCarFormProps) {
  const [formData, setFormData] = useState({
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
    firmware_type: '30I',
    is_restyling: false,
    status: '1',
    show_stage2: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newData = {
      model_name: formData.model_name,
      series: formData.series,
      body_type: formData.body_type,
      engine_code: formData.engine_code,
      article_code: formData.article_code,
      stock: {
        power: parseInt(formData.stock_power) || 0,
        torque: parseInt(formData.stock_torque) || 0
      },
      stage1: {
        power: parseInt(formData.stage1_power) || 0,
        torque: parseInt(formData.stage1_torque) || 0,
        price: parseInt(formData.stage1_price) || 30000
      },
      stage2: formData.stage2_power && formData.stage2_torque ? {
        power: parseInt(formData.stage2_power),
        torque: parseInt(formData.stage2_torque)
      } : null,
      stage_type: formData.stage_type,
      firmware_type: formData.firmware_type,
      is_restyling: formData.is_restyling,
      status: formData.status,
      show_stage2: formData.show_stage2
    } as Omit<ChiptuningRecord, 'id'>;

    await onAdd(newData);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Добавить новый автомобиль</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-white/70 text-sm mb-1 block">Модель</label>
          <input
            type="text"
            value={formData.model_name}
            onChange={(e) => setFormData(prev => ({ ...prev, model_name: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Серия</label>
          <input
            type="text"
            value={formData.series}
            onChange={(e) => setFormData(prev => ({ ...prev, series: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Кузов</label>
          <input
            type="text"
            value={formData.body_type}
            onChange={(e) => setFormData(prev => ({ ...prev, body_type: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Двигатель</label>
          <input
            type="text"
            value={formData.engine_code}
            onChange={(e) => setFormData(prev => ({ ...prev, engine_code: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Артикул</label>
          <input
            type="text"
            value={formData.article_code}
            onChange={(e) => setFormData(prev => ({ ...prev, article_code: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Тип прошивки</label>
          <select
            value={formData.firmware_type}
            onChange={(e) => setFormData(prev => ({ ...prev, firmware_type: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
          >
            <option value="30I" style={{ background: '#1e293b' }}>30I</option>
            <option value="28I" style={{ background: '#1e293b' }}>28I</option>
          </select>
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Сток л.с.</label>
          <input
            type="number"
            value={formData.stock_power}
            onChange={(e) => setFormData(prev => ({ ...prev, stock_power: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Сток Нм</label>
          <input
            type="number"
            value={formData.stock_torque}
            onChange={(e) => setFormData(prev => ({ ...prev, stock_torque: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Тип Stage</label>
          <select
            value={formData.stage_type}
            onChange={(e) => setFormData(prev => ({ ...prev, stage_type: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
          >
            <option value="St.1" style={{ background: '#1e293b' }}>Stage 1</option>
            <option value="St.2" style={{ background: '#1e293b' }}>Stage 2</option>
          </select>
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Stage1 л.с.</label>
          <input
            type="number"
            value={formData.stage1_power}
            onChange={(e) => setFormData(prev => ({ ...prev, stage1_power: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Stage1 Нм</label>
          <input
            type="number"
            value={formData.stage1_torque}
            onChange={(e) => setFormData(prev => ({ ...prev, stage1_torque: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Цена Stage1</label>
          <input
            type="number"
            value={formData.stage1_price}
            onChange={(e) => setFormData(prev => ({ ...prev, stage1_price: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
            required
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Stage2 л.с. (опционально)</label>
          <input
            type="number"
            value={formData.stage2_power}
            onChange={(e) => setFormData(prev => ({ ...prev, stage2_power: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>
        <div>
          <label className="text-white/70 text-sm mb-1 block">Stage2 Нм (опционально)</label>
          <input
            type="number"
            value={formData.stage2_torque}
            onChange={(e) => setFormData(prev => ({ ...prev, stage2_torque: e.target.value }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
          />
        </div>
        <div className="col-span-3 flex gap-4 items-center">
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={formData.show_stage2}
              onChange={(e) => setFormData(prev => ({ ...prev, show_stage2: e.target.checked }))}
              className="w-4 h-4"
            />
            <span>Показывать Stage2</span>
          </label>
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_restyling}
              onChange={(e) => setFormData(prev => ({ ...prev, is_restyling: e.target.checked }))}
              className="w-4 h-4"
            />
            <span>Рестайлинг</span>
          </label>
        </div>
        <div className="col-span-3 flex gap-3 justify-end">
          <Button type="button" onClick={onCancel} variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
            Отмена
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Добавить
          </Button>
        </div>
      </form>
    </div>
  );
}
