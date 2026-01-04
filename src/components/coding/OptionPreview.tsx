import Icon from '@/components/ui/icon';
import { serviceVisuals } from './optionVisualsData';
import OptionComparisonImages from './OptionComparisonImages';
import OptionInfoPanel from './OptionInfoPanel';

interface OptionPreviewProps {
  optionId: string;
  optionName: string;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function OptionPreview({
  optionId,
  optionName,
  description,
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

        <OptionComparisonImages 
          beforeImage={visual.before}
          afterImage={visual.after}
        />

        <OptionInfoPanel 
          description={description}
          visualDescription={visual.description}
          isSelected={isSelected}
          onToggle={() => {
            onToggle();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
