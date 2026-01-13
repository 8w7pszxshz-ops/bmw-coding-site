import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface CodingOption {
  id: number;
  title: string;
  category: 'dme' | 'kombi' | 'comfort' | 'multimedia' | 'vo' | 'safety' | 'style';
}

const codingOptions: CodingOption[] = [
  { id: 1, title: 'Отключение функции Start-Stop', category: 'dme' },
  { id: 2, title: 'Мелкая цифровая скорость в верхней части спидометра', category: 'kombi' },
  { id: 3, title: 'Отключить отображение запаса хода под спидометром', category: 'kombi' },
  { id: 4, title: 'Длина шкалы расходометра топлива (15/20/30 л/100км)', category: 'kombi' },
  { id: 5, title: 'Поменять цвет приборки в спорт-режиме на серый', category: 'style' },
  { id: 6, title: 'Режим Sport Plus', category: 'dme' },
  { id: 7, title: 'Кодировка режима Comfort Plus', category: 'comfort' },
  { id: 8, title: 'Кодировка режима ECO Pro Plus', category: 'dme' },
  { id: 9, title: 'Изменение стандартного режима при запуске двигателя', category: 'dme' },
  { id: 10, title: 'Режим ECO Pro', category: 'dme' },
  { id: 11, title: 'Чувствительность сенсора затемнения зеркал (при тонировке)', category: 'comfort' },
  { id: 12, title: 'Количество взмахов стеклоочистителей', category: 'comfort' },
  { id: 13, title: 'Отключить весь свет в положении "0"', category: 'safety' },
  { id: 14, title: 'Видео в движении', category: 'multimedia' },
  { id: 15, title: 'Температура в шинах (если датчики включены)', category: 'kombi' },
  { id: 16, title: 'Автоматическое включение подогрева/вентиляции сидений', category: 'comfort' },
  { id: 17, title: 'VO: Спорт-коробка 2TB (launch-control)', category: 'vo' },
  { id: 18, title: 'VO: Performance Control 2VG', category: 'vo' },
  { id: 19, title: 'VO: Расширенный Bluetooth (SMS, несколько телефонов)', category: 'vo' },
  { id: 20, title: 'VO: M-пакет (код 337) - тяжелее руль', category: 'vo' },
  { id: 21, title: 'Отключение гонга о непристёгнутом ремне', category: 'safety' },
  { id: 22, title: 'Отключение клаксона при закрытии заведённой машины', category: 'comfort' },
  { id: 23, title: 'Закрывание стеклоподъёмников без удержания кнопки', category: 'comfort' },
  { id: 24, title: 'Закрытие багажника без долгого удержания кнопок', category: 'comfort' },
  { id: 25, title: 'Распределение подогрева (спина/колени/полностью)', category: 'comfort' },
  { id: 26, title: 'M-шрифт приборной панели + разметка до 330 км/ч', category: 'style' },
  { id: 27, title: 'Значок M на приборной панели в режиме Sport', category: 'style' },
  { id: 28, title: '5-кратное мигание поворотника', category: 'safety' },
  { id: 29, title: 'Активация акселерометра и расширенного меню спортприборов', category: 'kombi' },
  { id: 30, title: 'Отключение гонга ремня', category: 'safety' },
  { id: 31, title: 'Отключение значка ремней на LED приборной панели', category: 'safety' },
  { id: 32, title: 'Включение профилей звука Bowers & Wilkins', category: 'multimedia' },
  { id: 33, title: 'Выбор цвета авто и комплектации в MGU', category: 'style' },
  { id: 34, title: 'Звуковые предупреждения BMW', category: 'multimedia' },
  { id: 35, title: 'Смена стартовой анимации (M-заставка)', category: 'style' },
  { id: 36, title: 'Смена цветов спортивных приборов (серый M-стиль)', category: 'style' },
  { id: 37, title: 'Смена стилей звукового оформления (i8, Rolls Royce, Mini)', category: 'multimedia' },
  { id: 38, title: 'Смена темы оформления ГУ (M-style NBT)', category: 'style' },
  { id: 39, title: 'Крупная цифровая скорость внизу на базовой приборке', category: 'kombi' },
  { id: 40, title: 'Выбор обложек для LED приборки', category: 'style' },
  { id: 41, title: 'Увеличение частоты обновления цифровой скорости', category: 'kombi' },
  { id: 42, title: 'Lane Change Assist (ассистент смены полосы)', category: 'safety' },
  { id: 43, title: 'Assisted Driving View (визуализация потока на приборке)', category: 'safety' },
  { id: 44, title: 'Угол наклона правого зеркала при заднем ходе', category: 'comfort' },
  { id: 45, title: 'ПТФ в режиме стробоскопов', category: 'safety' },
  { id: 46, title: 'Закрытие багажника без задержки (HRFM)', category: 'comfort' },
  { id: 47, title: 'Лепестки на руле', category: 'vo' },
  { id: 48, title: 'Звук постановки на охрану', category: 'multimedia' },
  { id: 49, title: 'Передача рингтона в авто', category: 'multimedia' },
  { id: 50, title: 'Приветствие/прощание на приборке', category: 'style' },
  { id: 51, title: 'Звук двигателя через колонки', category: 'multimedia' },
  { id: 52, title: 'Отключить контроль давления в шинах', category: 'safety' },
  { id: 53, title: 'Отключить xDrive меню', category: 'kombi' },
  { id: 54, title: 'Комфортная посадка в салон (отодвигается сиденье)', category: 'comfort' },
  { id: 55, title: 'Яркость ангельских глазок', category: 'style' },
  { id: 56, title: 'Цвет подсветки салона', category: 'style' }
];

const categoryNames: Record<string, string> = {
  dme: 'DME / Двигатель',
  kombi: 'DKOMBI2 / Приборка',
  comfort: 'Комфорт',
  multimedia: 'Мультимедиа',
  vo: 'VO-кодирование',
  safety: 'Безопасность',
  style: 'Стиль / Визуал'
};

const categoryColors: Record<string, string> = {
  dme: '#FF0040',
  kombi: '#00D4FF',
  comfort: '#FF6B35',
  multimedia: '#A855F7',
  vo: '#10B981',
  safety: '#F59E0B',
  style: '#EC4899'
};

interface CodingOptionsProps {
  variant?: 'mobile' | 'desktop';
}

export default function CodingOptions({ variant = 'mobile' }: CodingOptionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set());

  const isMobile = variant === 'mobile';

  const categories = Object.keys(categoryNames);
  const filteredOptions = selectedCategory === 'all' 
    ? codingOptions 
    : codingOptions.filter(opt => opt.category === selectedCategory);

  const toggleOption = (id: number) => {
    setSelectedOptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={isMobile ? 'px-4 mb-12' : 'mb-16'}>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Settings" className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-[#FF0040]`} />
          <h2 className={`font-light text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            Кодирование G-серии
          </h2>
        </div>
        <p className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          Полный список доступных опций для BMW G-серии
        </p>
      </div>

      <div className={`${isMobile ? 'mb-6' : 'mb-8'} overflow-x-auto scrollbar-hide -mx-${isMobile ? '4' : '0'}`}>
        <div className={`flex ${isMobile ? 'gap-2 px-4' : 'gap-3 justify-center flex-wrap'}`}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`${isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'} rounded-lg whitespace-nowrap transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-[#FF0040] text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Все опции
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'} rounded-lg whitespace-nowrap transition-all duration-300`}
              style={{
                background: selectedCategory === cat ? categoryColors[cat] : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
              }}
            >
              {categoryNames[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className={`${isMobile ? 'space-y-2' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}`}>
        {filteredOptions.map(option => (
          <label
            key={option.id}
            className={`flex items-start ${isMobile ? 'gap-3 p-3' : 'gap-4 p-4'} rounded-xl cursor-pointer transition-all duration-300`}
            style={{
              background: selectedOptions.has(option.id)
                ? `linear-gradient(135deg, ${categoryColors[option.category]}20, ${categoryColors[option.category]}05)`
                : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${selectedOptions.has(option.id) ? categoryColors[option.category] + '40' : 'rgba(255, 255, 255, 0.1)'}`,
              backdropFilter: 'blur(10px)'
            }}
          >
            <input
              type="checkbox"
              checked={selectedOptions.has(option.id)}
              onChange={() => toggleOption(option.id)}
              className={`${isMobile ? 'w-5 h-5 mt-0.5' : 'w-6 h-6 mt-1'} rounded border-white/20 bg-white/5 focus:ring-offset-0`}
              style={{
                accentColor: categoryColors[option.category]
              }}
            />
            <div className="flex-1">
              <div className={`text-white ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                {option.title}
              </div>
              <div 
                className={`${isMobile ? 'text-[10px]' : 'text-xs'} mt-1 font-medium`}
                style={{ color: categoryColors[option.category] }}
              >
                {categoryNames[option.category]}
              </div>
            </div>
          </label>
        ))}
      </div>

      {selectedOptions.size > 0 && (
        <div 
          className={`${isMobile ? 'mt-6 p-4' : 'mt-8 p-6'} rounded-2xl sticky bottom-4`}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 64, 0.15), rgba(255, 0, 64, 0.05))',
            border: '1px solid rgba(255, 0, 64, 0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(255, 0, 64, 0.2)'
          }}
        >
          <div className={`flex items-center justify-between ${isMobile ? 'mb-3' : 'mb-4'}`}>
            <div className="text-white">
              <div className={`font-medium ${isMobile ? 'text-sm' : 'text-lg'}`}>
                Выбрано опций: {selectedOptions.size}
              </div>
              <div className={`text-white/60 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Стоимость кодирования рассчитывается индивидуально
              </div>
            </div>
          </div>
          <a
            href="https://t.me/bmw_tuning_spb"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isMobile ? 'py-3 px-4 text-sm' : 'py-4 px-6 text-base'} w-full rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105`}
            style={{
              background: 'linear-gradient(135deg, #FF0040, #FF0040CC)',
              boxShadow: '0 8px 32px rgba(255, 0, 64, 0.4)'
            }}
          >
            <Icon name="MessageCircle" className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
            Записаться на кодирование
          </a>
        </div>
      )}
    </div>
  );
}
