import { useState, memo } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import SeriesSelector from './coding/SeriesSelector';
import OptionsList from './coding/OptionsList';
import { options, calculatePrice } from './coding/codingData';
import { getTelegramLink } from '@/utils/cityConfig';
import { City } from '@/components/CitySelector';

interface CodingPackagesProps {
  selectedCity: City;
}

const CodingPackagesMobile = memo(function CodingPackagesMobile({ selectedCity }: CodingPackagesProps) {
  const [selectedSeries, setSelectedSeries] = useState<'F' | 'G' | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('comfort');

  const toggleOption = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleSendConfig = () => {
    const selectedItems = Array.from(selectedOptions)
      .map(id => options.find(o => o.id === id))
      .filter(Boolean)
      .map(o => `• ${o!.name}`)
      .join('\n');
    
    const selectedCount = selectedOptions.size;
    const pricing = calculatePrice(selectedCount);
    
    let message = `Конфигурация опций BMW ${selectedSeries}-series:\n\n${selectedItems}\n\n`;
    message += `Количество опций: ${selectedCount}\n`;
    if (pricing.discount > 0) {
      message += `Скидка: ${pricing.discount}%\n`;
      message += `Было: ${pricing.original.toLocaleString('ru-RU')} ₽\n`;
    }
    message += `Итого: ${pricing.total.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `кодирование BMW ${selectedSeries}-series`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSeriesChange = (series: 'F' | 'G') => {
    setSelectedSeries(series);
    setSelectedOptions(new Set());
  };

  const handleResetSeries = () => {
    setSelectedSeries(null);
    setSelectedOptions(new Set());
  };

  return (
    <div className="mb-12 px-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon name="Wrench" className="w-6 h-6 text-[#81C4FF]" />
          <h2 className="font-light text-white text-xl">Конфигуратор опций</h2>
        </div>
        <p className="text-white/60 text-xs">Соберите свой пакет кодировок</p>
      </div>

      {!selectedSeries ? (
        <SeriesSelector onSelectSeries={handleSeriesChange} />
      ) : (
        <OptionsList
          selectedSeries={selectedSeries}
          selectedOptions={selectedOptions}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onToggleOption={toggleOption}
          onResetSeries={handleResetSeries}
          onSendConfig={handleSendConfig}
        />
      )}
    </div>
  );
});

const CodingPackagesDesktop = memo(function CodingPackagesDesktop({ selectedCity }: CodingPackagesProps) {
  const [selectedSeries, setSelectedSeries] = useState<'F' | 'G' | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('comfort');

  const toggleOption = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
  };

  const handleSendConfig = () => {
    const selectedItems = Array.from(selectedOptions)
      .map(id => options.find(o => o.id === id))
      .filter(Boolean)
      .map(o => `• ${o!.name}`)
      .join('\n');
    
    const selectedCount = selectedOptions.size;
    const pricing = calculatePrice(selectedCount);
    
    let message = `Конфигурация опций BMW ${selectedSeries}-series:\n\n${selectedItems}\n\n`;
    message += `Количество опций: ${selectedCount}\n`;
    if (pricing.discount > 0) {
      message += `Скидка: ${pricing.discount}%\n`;
      message += `Было: ${pricing.original.toLocaleString('ru-RU')} ₽\n`;
    }
    message += `Итого: ${pricing.total.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `кодирование BMW ${selectedSeries}-series`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSeriesChange = (series: 'F' | 'G') => {
    setSelectedSeries(series);
    setSelectedOptions(new Set());
  };

  const handleResetSeries = () => {
    setSelectedSeries(null);
    setSelectedOptions(new Set());
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Wrench" className="w-8 h-8 text-[#81C4FF]" />
          <h2 className="font-light text-white text-3xl">Конфигуратор опций BMW</h2>
        </div>
        <p className="text-white/60 text-sm">Выберите серию и соберите свой пакет кодировок</p>
      </div>

      {!selectedSeries ? (
        <SeriesSelector onSelectSeries={handleSeriesChange} />
      ) : (
        <OptionsList
          selectedSeries={selectedSeries}
          selectedOptions={selectedOptions}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onToggleOption={toggleOption}
          onResetSeries={handleResetSeries}
          onSendConfig={handleSendConfig}
        />
      )}


    </div>
  );
});

export default memo(function CodingPackages({ selectedCity }: CodingPackagesProps) {
  return (
    <Adaptive
      mobile={<CodingPackagesMobile selectedCity={selectedCity} />}
      desktop={<CodingPackagesDesktop selectedCity={selectedCity} />}
    />
  );
});