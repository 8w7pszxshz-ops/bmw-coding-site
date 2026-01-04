import Icon from '@/components/ui/icon';
import { serviceVisuals } from './ServiceVisualData';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

interface Service {
  service_code: string;
  category: string;
  service_name: string;
  description: string;
  price: number;
  duration_minutes: number;
  complexity: string;
  is_popular: boolean;
  is_available: boolean;
  missing_blocks?: string[];
}

interface ServicePreviewModalProps {
  service: Service;
  isSelected: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ServicePreviewModal({ service, isSelected, onToggle, onClose }: ServicePreviewModalProps) {
  const visual = serviceVisuals[service.service_code];
  
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
            <h3 className="text-white text-2xl font-semibold mb-1">{service.service_name}</h3>
            <p className="text-gray-400 text-sm">{visual.description}</p>
          </div>
          <button
            onClick={() => { vibrate(5); onClose(); }}
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
            <div className="text-sm text-gray-300">{service.description}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            <span className="text-white font-semibold text-lg">{service.price.toLocaleString()} ₽</span>
            <span className="text-gray-500 ml-3">{service.duration_minutes} минут</span>
          </div>
          <button
            onClick={() => {
              vibrate(15);
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
