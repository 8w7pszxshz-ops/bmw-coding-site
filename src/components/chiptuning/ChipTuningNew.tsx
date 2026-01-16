import { MobileOnly, DesktopOnly } from '@/components/ui/responsive';
import { City } from '@/components/CitySelector';
import ChipTuningMobileView from './ChipTuningMobileView';
import ChipTuningDesktopView from './ChipTuningDesktopView';
import UpdateDataButton from './UpdateDataButton';

interface ChipTuningProps {
  selectedCity: City;
  onClose?: () => void;
  audioEnabled?: boolean;
}

export default function ChipTuningNew({ selectedCity, onClose, audioEnabled = false }: ChipTuningProps) {
  return (
    <>
      <MobileOnly>
        <ChipTuningMobileView selectedCity={selectedCity} onClose={onClose} audioEnabled={audioEnabled} />
      </MobileOnly>
      <DesktopOnly>
        <ChipTuningDesktopView selectedCity={selectedCity} onClose={onClose} audioEnabled={audioEnabled} />
      </DesktopOnly>
      <UpdateDataButton />
    </>
  );
}