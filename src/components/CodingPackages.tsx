import { useState } from 'react';
import Icon from '@/components/ui/icon';
import SeriesSelector from './coding/SeriesSelector';
import OptionsList from './coding/OptionsList';
import { options, calculatePrice } from './coding/codingData';

export default function CodingPackages() {
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
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/Bocha_reborn?text=${encodedMessage}`, '_blank');
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

      <div className="flex justify-center gap-4 mt-8">
        <a
          href="https://disk.yandex.ru/i/UmJoVZEGPbNOPw"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(129, 196, 255, 0.1), rgba(22, 88, 142, 0.1))',
            border: '1px solid rgba(129, 196, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(129, 196, 255, 0.2)'
          }}
        >
          <Icon name="Download" className="w-5 h-5" />
          <span>Полный список опций F-series</span>
        </a>

        <a
          href="https://disk.yandex.ru/i/Nd0Xi_oEIpiw4g"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(129, 196, 255, 0.1), rgba(22, 88, 142, 0.1))',
            border: '1px solid rgba(129, 196, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(129, 196, 255, 0.2)'
          }}
        >
          <Icon name="Download" className="w-5 h-5" />
          <span>Полный список опций G-series</span>
        </a>
      </div>
    </div>
  );
}
