import { MobileOnly, DesktopOnly } from '@/components/ui/responsive';
import { City } from '@/components/CitySelector';
import ChipTuningMobileView from './ChipTuningMobileView';
import ChipTuningDesktopView from './ChipTuningDesktopView';

interface ChipTuningProps {
  selectedCity: City;
}

export default function ChipTuningNew({ selectedCity }: ChipTuningProps) {
  return (
    <>
      <MobileOnly>
        <ChipTuningMobileView selectedCity={selectedCity} />
      </MobileOnly>
      <DesktopOnly>
        <ChipTuningDesktopView selectedCity={selectedCity} />
      </DesktopOnly>
    </>
  );
}
