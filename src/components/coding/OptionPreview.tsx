import Icon from '@/components/ui/icon';

interface OptionPreviewProps {
  optionId: string;
  optionName: string;
  description: string;
  price: number;
  isSelected: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const serviceVisuals: Record<string, { before: string; after: string; description: string }> = {
  // Мультимедиа
  'carplay': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=600&q=80',
    description: 'Беспроводной Apple CarPlay и Android Auto появится в меню iDrive'
  },
  'video-motion': {
    before: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80',
    description: 'Возможность смотреть видео на экране во время движения (только для пассажира)'
  },
  'fullscreen-camera': {
    before: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80',
    description: 'Камера заднего вида растянется на весь экран для лучшего обзора'
  },
  'sport-displays': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    description: 'G-meter, давление турбины, температура масла на экране'
  },
  
  // Освещение
  'welcome-light': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80',
    description: 'Подсветка под дверями создаст эффект ковровой дорожки'
  },
  'scandinavian-drl': {
    before: 'https://images.unsplash.com/photo-1514866726862-0f081731e0ce?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=80',
    description: 'Дневные ходовые огни будут работать как в скандинавских странах'
  },
  'dynamic-blinkers': {
    before: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=600&q=80',
    description: 'Поворотники будут бежать волной вместо обычного мигания'
  },
  'angel-eyes-bright': {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    description: 'Ангельские глазки станут ярче и заметнее'
  },
  
  // Приборная панель
  'digital-speed': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80',
    description: 'Цифровой спидометр всегда будет виден на дисплее'
  },
  'needle-sweep': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1617128034254-61a3b0befc19?w=600&q=80',
    description: 'Стрелки приборов эффектно пробегут полный круг при запуске'
  },
  'oil-temp': {
    before: 'https://images.unsplash.com/photo-1563249278-1b0e9f0c2d67?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80',
    description: 'Температура масла двигателя появится на дисплее постоянно'
  },
  'm-displays': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=600&q=80',
    description: 'Спортивные M-дисплеи с доп. информацией для трека'
  },
  
  // Комфорт
  'comfort-access': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
    description: 'Багажник откроется от движения ноги, зеркала складываются автоматически'
  },
  'windows-from-key': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'Все окна закроются удержанием кнопки закрытия на ключе'
  },
  'start-stop-off': {
    before: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1620125501033-c285373a6e88?w=600&q=80',
    description: 'Система Start/Stop будет автоматически выключена при каждом запуске'
  },
  'mirrors-folding': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80',
    description: 'Зеркала можно будет сложить даже во время движения'
  }
};

export default function OptionPreview({
  optionId,
  optionName,
  description,
  price,
  isSelected,
  onToggle,
  onClose
}: OptionPreviewProps) {
  const visual = serviceVisuals[optionId];

  if (!visual) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-6 max-w-4xl w-full animate-in slide-in-from-bottom-4 duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-2xl font-semibold mb-1">{optionName}</h3>
            <p className="text-gray-400 text-sm">{visual.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="text-red-400 text-sm font-medium flex items-center gap-2">
              <Icon name="X" className="w-4 h-4" />
              <span>До кодирования</span>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-red-500/30">
              <img 
                src={visual.before} 
                alt="До"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-green-400 text-sm font-medium flex items-center gap-2">
              <Icon name="Check" className="w-4 h-4" />
              <span>После кодирования</span>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-green-500/30">
              <img 
                src={visual.after} 
                alt="После"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">{description}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            <span className="text-white font-semibold text-lg">{price.toLocaleString()} ₽</span>
          </div>
          <button
            onClick={() => {
              onToggle();
              onClose();
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
              isSelected
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            }`}
          >
            {isSelected ? 'Убрать из заказа' : 'Добавить в заказ'}
          </button>
        </div>
      </div>
    </div>
  );
}
