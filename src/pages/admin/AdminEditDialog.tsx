import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChiptuningRecord, EditFormData } from './AdminTypes';

interface AdminEditDialogProps {
  editingRecord: ChiptuningRecord | null;
  formData: EditFormData | null;
  setFormData: (data: EditFormData | null) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function AdminEditDialog({
  editingRecord,
  formData,
  setFormData,
  onSave,
  onClose
}: AdminEditDialogProps) {
  if (!formData) return null;

  return (
    <Dialog open={!!editingRecord} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">
            {editingRecord?.id === 0 ? 'Новая запись' : `Редактирование #${editingRecord?.id}`}
          </DialogTitle>
        </DialogHeader>

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
            <Button onClick={onSave} className="flex-1 bg-green-600 hover:bg-green-700">
              <Icon name="Save" className="w-5 h-5 mr-2" />
              Сохранить
            </Button>
            <Button 
              onClick={onClose} 
              variant="outline"
              className="flex-1"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
