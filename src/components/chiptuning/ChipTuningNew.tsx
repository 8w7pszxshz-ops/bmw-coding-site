import { MobileOnly, DesktopOnly } from '@/components/ui/responsive';
import { City } from '@/components/CitySelector';
import ChipTuningMobileView from './ChipTuningMobileView';
import ChipTuningDesktopView from './ChipTuningDesktopView';
import UpdateDataButton from './UpdateDataButton';

interface ChipTuningProps {
  selectedCity: City;
  onClose?: () => void;
}

export default function ChipTuningNew({ selectedCity, onClose }: ChipTuningProps) {
  return (
    <>
      <MobileOnly>
        <ChipTuningMobileView selectedCity={selectedCity} onClose={onClose} />
      </MobileOnly>
      <DesktopOnly>
        <ChipTuningDesktopView selectedCity={selectedCity} onClose={onClose} />
      </DesktopOnly>
      <UpdateDataButton />
    </>
  );
}