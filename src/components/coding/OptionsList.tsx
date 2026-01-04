import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Option, categories, options, calculatePrice } from './codingData';
import OptionPreview from './OptionPreview';

interface OptionsListProps {
  selectedSeries: 'F' | 'G';
  selectedOptions: Set<string>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onToggleOption: (optionId: string) => void;
  onResetSeries: () => void;
  onSendConfig: () => void;
}

const optionsWithVisuals = [
  // F-series
  'f_video', 'f_carplay', 'f_digital_speed', 'f_sport_indicators',
  'f_rings_bright', 'f_welcome_light', 'f_autostop', 'f_comfort_open',
  'f_m_logo', 'f_logo_change', 'f_mirror_auto_fold', 'f_auto_handbrake',
  // G-series
  'g_video', 'g_carplay', 'g_digital_speed', 'g_sport_displays',
  'g_angel_bright', 'g_welcome_light', 'g_autostop', 'g_windows_close',
  'g_needle_sweep', 'g_m_displays', 'g_mirrors_fold', 'g_comfort_trunk'
];

export default function OptionsList({
  selectedSeries,
  selectedOptions,
  activeCategory,
  onCategoryChange,
  onToggleOption,
  onResetSeries,
  onSendConfig
}: OptionsListProps) {
  const [previewOption, setPreviewOption] = useState<Option | null>(null);
  
  const filteredOptions = options.filter(
    o => o.category === activeCategory && (o.series === selectedSeries || o.series === 'both')
  );

  const selectedCount = selectedOptions.size;
  const pricing = calculatePrice(selectedCount);

  return (
    <>
      <div className="flex items-center justify-center gap-4 mb-8">
        <div 
          className="px-6 py-3 rounded-xl flex items-center gap-3"
          style={{
            background: 'linear-gradient(135deg, #81C4FF, #16588E)',
            boxShadow: '0 8px 32px rgba(129, 196, 255, 0.3)'
          }}
        >
          <span className="text-white font-medium">BMW {selectedSeries}-series</span>
        </div>
        <button
          onClick={onResetSeries}
          className="px-4 py-2 rounded-lg text-white/60 hover:text-white transition-colors text-sm hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          Изменить серию
        </button>
      </div>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 whitespace-nowrap hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
            style={{
              background: activeCategory === cat.id
                ? 'linear-gradient(135deg, #81C4FF, #16588E)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: activeCategory === cat.id
                ? '1px solid rgba(129, 196, 255, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: activeCategory === cat.id
                ? '0 8px 32px rgba(129, 196, 255, 0.3)'
                : 'none',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Icon name={cat.icon as any} className="w-5 h-5" />
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 transition-all duration-500">
        {filteredOptions.map((option, index) => {
          const isSelected = selectedOptions.has(option.id);
          return (
            <button
              key={option.id}
              onClick={() => onToggleOption(option.id)}
              className="relative p-6 rounded-xl transition-all duration-300 text-left group hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(129, 196, 255, 0.15), rgba(22, 88, 142, 0.15))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                border: isSelected
                  ? '2px solid rgba(129, 196, 255, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isSelected
                  ? '0 8px 32px rgba(129, 196, 255, 0.2)'
                  : 'none',
                animationDelay: `${index * 30}ms`,
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className="p-2 rounded-lg"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(129, 196, 255, 0.3), rgba(22, 88, 142, 0.2))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                      border: '1px solid rgba(129, 196, 255, 0.2)'
                    }}
                  >
                    <Icon 
                      name={option.icon as any} 
                      className="w-5 h-5"
                      style={{ color: isSelected ? '#81C4FF' : 'rgba(255, 255, 255, 0.6)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 
                        className="font-medium text-base"
                        style={{ color: isSelected ? '#81C4FF' : '#fff' }}
                      >
                        {option.name}
                      </h3>
                      {optionsWithVisuals.includes(option.id) && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewOption(option);
                          }}
                          className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs px-2 py-1 rounded-full transition-all"
                        >
                          <Icon name="Image" className="w-3 h-3" />
                          <span>Фото</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div 
                  className="w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    borderColor: isSelected ? '#81C4FF' : 'rgba(255, 255, 255, 0.2)',
                    background: isSelected ? '#81C4FF' : 'transparent'
                  }}
                >
                  {isSelected && <Icon name="Check" className="w-4 h-4 text-black" />}
                </div>
              </div>

              <p className="text-white/50 text-sm">{option.description}</p>
            </button>
          );
        })}
      </div>

      <div 
        className="sticky bottom-6 rounded-2xl p-6 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(135deg, rgba(129, 196, 255, 0.15), rgba(22, 88, 142, 0.15))',
          border: '1px solid rgba(129, 196, 255, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div>
              <div className="text-white/60 text-sm mb-1">Выбрано опций</div>
              <div className="text-white text-2xl font-light">{selectedCount}</div>
            </div>
            <div 
              className="h-12 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(129, 196, 255, 0.3), transparent)' }}
            />
            <div>
              <div className="text-white/60 text-sm mb-1">
                {pricing.discount > 0 ? (
                  <span className="flex items-center gap-2">
                    Скидка <span className="text-[#81C4FF] font-medium">{pricing.discount}%</span>
                  </span>
                ) : (
                  'Итоговая стоимость'
                )}
              </div>
              <div className="flex items-center gap-3">
                {pricing.discount > 0 && (
                  <span className="text-white/40 text-lg line-through">
                    {pricing.original.toLocaleString('ru-RU')} ₽
                  </span>
                )}
                <span className="text-[#81C4FF] text-2xl font-light">
                  {pricing.total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onToggleOption('')}
              disabled={selectedCount === 0}
              className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(231,34,46,0.4)]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              Сбросить
            </button>
            <button
              onClick={onSendConfig}
              disabled={selectedCount === 0}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
              style={{
                background: selectedCount > 0
                  ? 'linear-gradient(135deg, #81C4FF, #16588E)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                border: '1px solid rgba(129, 196, 255, 0.3)',
                boxShadow: selectedCount > 0 ? '0 10px 40px rgba(129, 196, 255, 0.4)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Icon name="Send" className="w-5 h-5" />
              <span>Отправить конфигурацию</span>
            </button>
          </div>
        </div>
      </div>

      {previewOption && (
        <OptionPreview
          optionId={previewOption.id}
          optionName={previewOption.name}
          description={previewOption.description}
          price={previewOption.price}
          isSelected={selectedOptions.has(previewOption.id)}
          onToggle={() => onToggleOption(previewOption.id)}
          onClose={() => setPreviewOption(null)}
        />
      )}
    </>
  );
}