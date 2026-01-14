export const gSeriesOptions = [
  // DME / Двигатель
  { id: 'g_start_stop', name: 'Отключение функции Start-Stop', category: 'performance', description: 'Полное отключение автостарта в DME', icon: 'Power', series: 'G' as const },
  { id: 'g_sport_plus', name: 'Режим Sport Plus', category: 'performance', description: 'Активация дополнительного спортивного режима', icon: 'Zap', series: 'G' as const },
  { id: 'g_comfort_plus', name: 'Режим Comfort Plus', category: 'performance', description: 'Кодировка расширенного комфортного режима', icon: 'Armchair', series: 'G' as const },
  { id: 'g_eco_pro_plus', name: 'Режим ECO Pro Plus', category: 'performance', description: 'Кодировка максимально экономичного режима', icon: 'Leaf', series: 'G' as const },
  { id: 'g_default_mode', name: 'Стандартный режим при запуске', category: 'performance', description: 'Изменение режима драйва по умолчанию', icon: 'Power', series: 'G' as const },
  { id: 'g_eco_pro', name: 'Режим ECO Pro', category: 'performance', description: 'Настройка параметров экономичного режима', icon: 'Leaf', series: 'G' as const },
  { id: 'g_exhaust_sound', name: 'Звук двигателя через колонки', category: 'performance', description: 'Active Sound имитация через аудиосистему', icon: 'Volume2', series: 'G' as const },

  // DKOMBI2 / Приборка
  { id: 'g_digital_speed', name: 'Цифровая скорость сверху', category: 'multimedia', description: 'Видна постоянно, не через BC', icon: 'Gauge', series: 'G' as const },
  { id: 'g_range_off', name: 'Отключить запас хода', category: 'multimedia', description: 'Скрыть под спидометром', icon: 'Gauge', series: 'G' as const },
  { id: 'g_fuel_scale', name: 'Шкала расходометра', category: 'multimedia', description: 'Длина шкалы: 15/20/30 л/100км', icon: 'Fuel', series: 'G' as const },
  { id: 'g_sport_grey', name: 'Серый цвет в Sport', category: 'multimedia', description: 'Изменить оранжевый на серый M-стиль', icon: 'Palette', series: 'G' as const },
  { id: 'g_speedo_330', name: 'M-шрифт и разметка 330 км/ч', category: 'multimedia', description: 'Спортивный шрифт приборной панели', icon: 'Gauge', series: 'G' as const },
  { id: 'g_m_icon', name: 'Значок M в Sport', category: 'multimedia', description: 'Отображение M-логотипа на приборке', icon: 'Star', series: 'G' as const },
  { id: 'g_accel', name: 'Акселерометр G-сил', category: 'multimedia', description: 'Активация с настройкой пределов виджета', icon: 'Activity', series: 'G' as const },
  { id: 'g_digital_speed_large', name: 'Крупная скорость внизу', category: 'multimedia', description: 'На базовой приборке', icon: 'Gauge', series: 'G' as const },
  { id: 'g_led_covers', name: 'Обложки LED приборки', category: 'multimedia', description: 'Выбор фоновых изображений', icon: 'Image', series: 'G' as const },
  { id: 'g_digital_speed_freq', name: 'Частота обновления скорости', category: 'multimedia', description: 'Увеличение частоты показаний', icon: 'Activity', series: 'G' as const },
  { id: 'g_xdrive_off', name: 'Отключить xDrive меню', category: 'performance', description: 'Скрыть информацию полного привода', icon: 'Settings2', series: 'G' as const },

  // Комфорт
  { id: 'g_mirror_dim', name: 'Затемнение зеркал', category: 'comfort', description: 'Чувствительность затемнения для тонировки', icon: 'Maximize2', series: 'G' as const },
  { id: 'g_wiper_count', name: 'Взмахи стеклоочистителей', category: 'comfort', description: 'Регулировка числа взмахов', icon: 'Wind', series: 'G' as const },
  { id: 'g_trunk_close_fast', name: 'Багажник без задержки', category: 'comfort', description: 'Быстрое закрытие без долгого удержания (HRFM)', icon: 'Package', series: 'G' as const },
  { id: 'g_window_comfort', name: 'Стеклоподъемники без удержания', category: 'comfort', description: 'Закрывание без удержания кнопки при открытой двери', icon: 'Square', series: 'G' as const },
  { id: 'g_seat_heat_dist', name: 'Зоны подогрева сидений', category: 'comfort', description: 'Спина/колени/полностью (только водитель в G20)', icon: 'Thermometer', series: 'G' as const },
  { id: 'g_seat_auto_heat', name: 'Авто подогрев сидений', category: 'comfort', description: 'Управление в меню климата (VO-кодирование)', icon: 'Thermometer', series: 'G' as const },
  { id: 'g_mirror_tilt', name: 'Угол наклона зеркала', category: 'comfort', description: 'Правое зеркало при заднем ходе', icon: 'Maximize2', series: 'G' as const },
  { id: 'g_comfort_entry', name: 'Комфортная посадка', category: 'comfort', description: 'Отодвигается сиденье при входе', icon: 'Armchair', series: 'G' as const },

  // Мультимедиа
  { id: 'g_video', name: 'Видео в движении', category: 'multimedia', description: 'Просмотр на ГУ во время езды', icon: 'Play', series: 'G' as const },
  { id: 'g_tpms_temp', name: 'Температура в шинах', category: 'multimedia', description: 'Если датчики уже показывают давление', icon: 'Thermometer', series: 'G' as const },
  { id: 'g_tpms_off', name: 'Отключить контроль давления', category: 'multimedia', description: 'Деактивация TPMS', icon: 'Gauge', series: 'G' as const },
  { id: 'g_bowers', name: 'Профили Bowers & Wilkins', category: 'multimedia', description: 'Для работы нужна H/K система', icon: 'Music', series: 'G' as const },
  { id: 'g_car_select', name: 'Цвет авто в MGU', category: 'multimedia', description: 'Выбор цвета и комплектации', icon: 'Palette', series: 'G' as const },
  { id: 'g_sounds_bmw', name: 'Звуки BMW', category: 'multimedia', description: 'Звуковые предупреждения и системные звуки', icon: 'Volume2', series: 'G' as const },
  { id: 'g_m_animation', name: 'M-заставка при запуске', category: 'multimedia', description: 'Смена стартовой анимации', icon: 'Star', series: 'G' as const },
  { id: 'g_sport_color_change', name: 'Цвет Sport режима', category: 'multimedia', description: 'Оранжевый → серый M-стиль', icon: 'Palette', series: 'G' as const },
  { id: 'g_sound_styles', name: 'Стили звуков', category: 'multimedia', description: 'i8, Rolls Royce, Mini', icon: 'Volume2', series: 'G' as const },
  { id: 'g_m_theme', name: 'M-style тема NBT', category: 'multimedia', description: 'Смена оформления ГУ', icon: 'Palette', series: 'G' as const },
  { id: 'g_greeting', name: 'Приветствие/прощание', category: 'multimedia', description: 'На приборке при старте/остановке', icon: 'MessageCircle', series: 'G' as const },
  { id: 'g_ringtone', name: 'Рингтон в авто', category: 'multimedia', description: 'Передача своей мелодии', icon: 'Phone', series: 'G' as const },
  { id: 'g_bluetooth_ext', name: 'Расширенный Bluetooth', category: 'multimedia', description: 'СМС и несколько телефонов (VO)', icon: 'Bluetooth', series: 'G' as const },
  { id: 'g_lane_assist', name: 'Lane Change Assist', category: 'safety', description: 'Ассистент смены полосы', icon: 'Navigation', series: 'G' as const },
  { id: 'g_driving_view', name: 'Assisted Driving View', category: 'safety', description: 'Визуализация потока на приборке', icon: 'Eye', series: 'G' as const },

  // VO-кодирование
  { id: 'g_sport_box', name: 'Спорт-коробка 2TB', category: 'performance', description: 'Launch-control, быстрее переключается', icon: 'Rocket', series: 'G' as const },
  { id: 'g_perf_control', name: 'Performance Control 2VG', category: 'performance', description: 'Активнее ввинчивает в поворот', icon: 'Gauge', series: 'G' as const },
  { id: 'g_m_pack', name: 'M-пакет (337)', category: 'performance', description: 'Руль становится тяжелее', icon: 'Star', series: 'G' as const },
  { id: 'g_steering_paddle', name: 'Лепестки на руле', category: 'performance', description: 'Активация подрулевых переключателей', icon: 'Gauge', series: 'G' as const },

  // Безопасность
  { id: 'g_belt_gong_off', name: 'Отключить гонг ремня', category: 'safety', description: 'Звуковое предупреждение', icon: 'UserCheck', series: 'G' as const },
  { id: 'g_belt_icon_off', name: 'Убрать значок ремня', category: 'safety', description: 'На LED приборной панели', icon: 'UserCheck', series: 'G' as const },
  { id: 'g_horn_off', name: 'Отключить клаксон', category: 'safety', description: 'При закрытии заведенной машины', icon: 'Volume2', series: 'G' as const },
  { id: 'g_horn_alarm', name: 'Звук постановки на охрану', category: 'safety', description: 'Клаксон/мигание при закрытии', icon: 'Volume2', series: 'G' as const },
  { id: 'g_lights_off', name: 'Отключить весь свет', category: 'exterior', description: 'В положении "0"', icon: 'SunOff', series: 'G' as const },
  { id: 'g_strobe', name: 'ПТФ в режиме стробоскопов', category: 'exterior', description: 'Отключаются при дальнем свете', icon: 'Zap', series: 'G' as const },
  { id: 'g_blinker_5', name: '5-кратное мигание поворотника', category: 'safety', description: 'Вместо 3 взмахов', icon: 'Navigation', series: 'G' as const },

  // Стиль / Визуал
  { id: 'g_angel_bright', name: 'Яркость ангельских глазок', category: 'exterior', description: 'Регулировка яркости Angel Eyes', icon: 'Circle', series: 'G' as const },
  { id: 'g_ambient', name: 'Цвет подсветки салона', category: 'exterior', description: 'Ambient освещение', icon: 'Lightbulb', series: 'G' as const }
];