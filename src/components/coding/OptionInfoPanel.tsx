import Icon from '@/components/ui/icon';

interface OptionInfoPanelProps {
  description: string;
  visualDescription: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function OptionInfoPanel({ 
  description, 
  visualDescription, 
  isSelected, 
  onToggle 
}: OptionInfoPanelProps) {
  return (
    <>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-300">{description}</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray-400 text-sm">
          <span className="text-white font-semibold text-lg">1500 ₽</span>
          <span className="text-gray-500 text-xs ml-2">за опцию</span>
        </div>
        <button
          onClick={onToggle}
          className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
            isSelected
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
          }`}
        >
          {isSelected ? 'Убрать из заказа' : 'Добавить в заказ'}
        </button>
      </div>
    </>
  );
}
