import Icon from '@/components/ui/icon';

interface OptionComparisonImagesProps {
  beforeImage: string;
  afterImage: string;
}

export default function OptionComparisonImages({ beforeImage, afterImage }: OptionComparisonImagesProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div className="space-y-2">
        <div className="text-red-400 text-sm font-medium flex items-center gap-2">
          <Icon name="X" className="w-4 h-4" />
          <span>До кодирования</span>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden border-2 border-red-500/30">
          <img 
            src={beforeImage} 
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
            src={afterImage} 
            alt="После"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
