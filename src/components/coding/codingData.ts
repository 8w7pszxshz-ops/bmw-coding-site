export interface Option {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  series: 'F' | 'G' | 'both';
}

export const categories = [
  { id: 'comfort', name: 'Комфорт', icon: 'Armchair' },
  { id: 'multimedia', name: 'Мультимедиа', icon: 'Monitor' },
  { id: 'exterior', name: 'Внешний вид', icon: 'Sparkles' },
  { id: 'safety', name: 'Безопасность', icon: 'Shield' },
  { id: 'performance', name: 'Производительность', icon: 'Gauge' }
];

export const options: Option[] = [
  // Внешний вид - F series (Осветительные приборы)
  { id: 'f_fog_flicker', name: 'Отключение мерцания туманок', category: 'exterior', description: 'Убирает эффект опроса ПТФ', icon: 'Lightbulb', series: 'F' },
  { id: 'f_strobe', name: 'Эффект стробоскопа', category: 'exterior', description: 'ПТФ отключаются при нажатии дальнего света', icon: 'Zap', series: 'F' },
  { id: 'f_fog_smooth', name: 'Плавное включение туманок', category: 'exterior', description: 'Мягкая активация ПТФ', icon: 'Sun', series: 'F' },
  { id: 'f_adaptive_fog', name: 'Адаптивное освещение ПТФ', category: 'exterior', description: 'Поворотные противотуманки', icon: 'Navigation', series: 'F' },
  { id: 'f_headlight_wash', name: 'Омыватель фар', category: 'exterior', description: 'Настройка работы омывателя', icon: 'Droplet', series: 'F' },
  { id: 'f_rings_bright', name: 'Яркость колец', category: 'exterior', description: 'Изменение яркости Angel Eyes', icon: 'Circle', series: 'F' },
  { id: 'f_drl_off', name: 'Отключение ДХО', category: 'exterior', description: 'Возможность выключить дневные огни', icon: 'SunOff', series: 'F' },
  { id: 'f_rear_drl', name: 'Задние габариты в ДХО', category: 'exterior', description: 'Задние фонари в режиме ДХО', icon: 'Lightbulb', series: 'F' },
  { id: 'f_rear_smooth', name: 'Плавное включение задних фонарей', category: 'exterior', description: 'Мягкая активация стоп-сигналов', icon: 'Sun', series: 'F' },
  
  // Производительность - F series (Режимы езды)
  { id: 'f_auto_handbrake', name: 'Авто снятие с ручника', category: 'performance', description: 'Автоматически на D и R', icon: 'Gauge', series: 'F' },
  { id: 'f_start_no_brake', name: 'Старт без педали тормоза', category: 'performance', description: 'Запуск двигателя без тормоза', icon: 'Power', series: 'F' },
  { id: 'f_speed_limit', name: 'Лимит скорости', category: 'performance', description: 'Ограничение максимальной скорости', icon: 'Gauge', series: 'F' },
  { id: 'f_autostop', name: 'Отключение Start/Stop', category: 'performance', description: 'Деактивация системы Старт/Стоп', icon: 'Power', series: 'F' },
  { id: 'f_launch', name: 'Launch Control', category: 'performance', description: 'Активация Лаунч-контроля', icon: 'Rocket', series: 'F' },
  { id: 'f_sport_mode', name: 'Настройка режима Спорт', category: 'performance', description: 'Кастомизация Sport режима', icon: 'Gauge', series: 'F' },
  { id: 'f_coasting', name: 'Режим наката', category: 'performance', description: 'Движение накатом без торможения', icon: 'Wind', series: 'F' },
  
  // Мультимедиа - F series (Панель приборов и Бортовой компьютер)
  { id: 'f_digital_speed', name: 'Цифровой спидометр', category: 'multimedia', description: 'Отображение скорости цифрами', icon: 'Gauge', series: 'F' },
  { id: 'f_color_change', name: 'Цвет панели день/ночь', category: 'multimedia', description: 'Изменение цвета приборов', icon: 'Palette', series: 'F' },
  { id: 'f_auto_brightness', name: 'Авто подсветка без датчика', category: 'multimedia', description: 'Автопереключение без датчика света', icon: 'Sun', series: 'F' },
  { id: 'f_consumption_limit', name: 'Ограничение расхода', category: 'multimedia', description: 'Изменение шкалы расхода', icon: 'Fuel', series: 'F' },
  { id: 'f_remove_ed', name: 'Убрать EfficientDynamics', category: 'multimedia', description: 'Удаление надписи ED', icon: 'X', series: 'F' },
  { id: 'f_m_logo', name: 'Лого M-Performance', category: 'multimedia', description: 'M-лого на приборной панели', icon: 'Star', series: 'F' },
  { id: 'f_video', name: 'Видео в движении', category: 'multimedia', description: 'Просмотр видео на ходу', icon: 'Play', series: 'F' },
  { id: 'f_codecs', name: 'Активация кодеков', category: 'multimedia', description: 'Дополнительные форматы видео', icon: 'FileVideo', series: 'F' },
  { id: 'f_media_off', name: 'Отключение медиа после двери', category: 'multimedia', description: 'Авто выключение при открытии', icon: 'DoorOpen', series: 'F' },
  { id: 'f_phone_sound', name: 'Телефонный звонок COMBOX', category: 'multimedia', description: 'Трансляция звонков через авто', icon: 'Phone', series: 'F' },
  { id: 'f_sport_indicators', name: 'Спортивные индикаторы', category: 'multimedia', description: 'Дополнительные показатели', icon: 'Activity', series: 'F' },
  { id: 'f_tpms_data', name: 'Данные TPMS', category: 'multimedia', description: 'Информация о давлении в шинах', icon: 'Gauge', series: 'F' },
  { id: 'f_usb_video', name: 'Видео с USB', category: 'multimedia', description: 'Воспроизведение с флешки', icon: 'Usb', series: 'F' },
  { id: 'f_towbar_cam', name: 'Камера в режим фаркопа', category: 'multimedia', description: 'Установка камеры фаркопа', icon: 'Camera', series: 'F' },
  { id: 'f_units', name: 'Единицы измерения', category: 'multimedia', description: 'Изменение единиц (км, мили)', icon: 'Ruler', series: 'F' },
  { id: 'f_comfort_open', name: 'Комфортное открытие', category: 'multimedia', description: 'Настройка опций открытия', icon: 'DoorOpen', series: 'F' },
  { id: 'f_service_history', name: 'Сервисная история', category: 'multimedia', description: 'Отображение истории ТО', icon: 'History', series: 'F' },
  { id: 'f_radio_off', name: 'Отключение SDARS', category: 'multimedia', description: 'Деактивация спутникового радио', icon: 'RadioOff', series: 'F' },
  { id: 'f_ed_menu', name: 'Меню EfficientDynamics', category: 'multimedia', description: 'Информативное меню ED', icon: 'Menu', series: 'F' },
  { id: 'f_dev_menu', name: 'Меню разработчика', category: 'multimedia', description: 'Доступ к скрытому меню', icon: 'Code', series: 'F' },
  { id: 'f_hifi', name: 'Stereo в Hi-Fi', category: 'multimedia', description: 'Улучшение звука головного устройства', icon: 'Music', series: 'F' },
  { id: 'f_xdrive_display', name: 'Состояние xDrive', category: 'multimedia', description: 'Наклон и компас на экране', icon: 'Compass', series: 'F' },
  { id: 'f_volume_bar', name: 'Полоска громкости', category: 'multimedia', description: 'Визуализация уровня звука', icon: 'Volume2', series: 'F' },
  { id: 'f_connected', name: 'ConnectedDrive', category: 'multimedia', description: 'Включение сервисов CD', icon: 'Wifi', series: 'F' },
  { id: 'f_logo_change', name: 'Изменение эмблемы запуска', category: 'multimedia', description: 'Кастомный логотип при старте', icon: 'Image', series: 'F' },
  { id: 'f_radio_time', name: 'Время отключения магнитолы', category: 'multimedia', description: 'Задержка выключения после зажигания', icon: 'Clock', series: 'F' },
  
  // Безопасность - F series
  { id: 'f_autolock', name: 'Автозакрытие авто', category: 'safety', description: 'Если не открывались двери', icon: 'Lock', series: 'F' },
  { id: 'f_alarm_key', name: 'Сигнализация при мех. ключе', category: 'safety', description: 'Включение при открытии ключом', icon: 'Key', series: 'F' },
  { id: 'f_no_belt_gong', name: 'Отключение гонга ремня', category: 'safety', description: 'Без звука при заводе без ремня', icon: 'UserCheck', series: 'F' },
  { id: 'f_horn_signal', name: 'Звук при постановке на охрану', category: 'safety', description: 'Управление звуковым сигналом', icon: 'Volume2', series: 'F' },
  
  // Комфорт - F series (Багажник, Кузов, Салон)
  { id: 'f_trunk_delay', name: 'Задержка открытия багажника', category: 'comfort', description: 'Настройка времени открытия', icon: 'Package', series: 'F' },
  { id: 'f_trunk_close', name: 'Закрытие багажника с ключа', category: 'comfort', description: 'Удаленное закрытие', icon: 'Package', series: 'F' },
  { id: 'f_trunk_smooth_close', name: 'Плавное закрытие багажника', category: 'comfort', description: 'Без удара при закрытии', icon: 'Package', series: 'F' },
  { id: 'f_trunk_smooth_open', name: 'Плавное открытие багажника', category: 'comfort', description: 'Без удара при открытии', icon: 'Package', series: 'F' },
  { id: 'f_mirror_tilt', name: 'Наклон зеркала назад', category: 'comfort', description: 'При движении задним ходом', icon: 'Maximize2', series: 'F' },
  { id: 'f_mirror_dimming', name: 'Чувствительность затемнения', category: 'comfort', description: 'Более чувствительный датчик', icon: 'Sun', series: 'F' },
  { id: 'f_mirror_heat', name: 'Обогрев зеркал и дворников', category: 'comfort', description: 'Активация подогрева', icon: 'Thermometer', series: 'F' },
  { id: 'f_mirror_heat_delay', name: 'Убрать задержку подогрева', category: 'comfort', description: 'Мгновенный подогрев зеркал', icon: 'Zap', series: 'F' },
  { id: 'f_wheel_size', name: 'Размер колес', category: 'comfort', description: 'Настройка размерности дисков', icon: 'Circle', series: 'F' },
  { id: 'f_window_delay', name: 'Задержка окон с ключа', category: 'comfort', description: 'Открытие/закрытие с брелка', icon: 'Key', series: 'F' },
  { id: 'f_blinker_count', name: 'Количество миганий поворотника', category: 'comfort', description: 'При касании рычага', icon: 'Navigation', series: 'F' },
  { id: 'f_handle_light', name: 'Подсветка ручек при R', category: 'comfort', description: 'При включении задней передачи', icon: 'Lightbulb', series: 'F' },
  { id: 'f_easy_entry', name: 'Комфортная посадка', category: 'comfort', description: 'Отъезжает руль и кресло', icon: 'Armchair', series: 'F' },
  { id: 'f_air_sensor', name: 'Датчик грязного воздуха', category: 'comfort', description: 'Высокая чувствительность рециркуляции', icon: 'Wind', series: 'F' },
  { id: 'f_light_sensor', name: 'Датчик света менее чувствительный', category: 'comfort', description: 'Настройка датчика освещения', icon: 'Sun', series: 'F' },
  { id: 'f_seat_heat_memory', name: 'Память подогрева сидений', category: 'comfort', description: 'Время запоминания после выключения', icon: 'Thermometer', series: 'F' },
  { id: 'f_wheel_heat_memory', name: 'Память подогрева руля', category: 'comfort', description: 'Время запоминания после выключения', icon: 'Thermometer', series: 'F' },
  { id: 'f_auto_no_ac', name: 'AUTO без кондиционера', category: 'comfort', description: 'Кнопка AUTO не включает AC', icon: 'Wind', series: 'F' },
  { id: 'f_recirculation_memory', name: 'Память рециркуляции', category: 'comfort', description: 'Запоминание положения режима', icon: 'RotateCcw', series: 'F' },
  { id: 'f_gong_sound', name: 'Звук гонга двери', category: 'comfort', description: 'Изменение звука открытой двери и ошибок', icon: 'Volume2', series: 'F' },
  { id: 'f_brightness_wheel', name: 'Колесико яркости салона', category: 'comfort', description: 'Не меняет яркость подсветки салона', icon: 'Sun', series: 'F' },
  { id: 'f_seat_memory_sound', name: 'Звук запоминания кресла', category: 'comfort', description: 'Сигнал после сохранения положения', icon: 'Volume2', series: 'F' },
  { id: 'f_battery_warning', name: 'Напоминание о разряде АКБ', category: 'comfort', description: 'Убрать предупреждение на стоянке', icon: 'Battery', series: 'F' },
  { id: 'f_recuperation', name: 'Отключить рекуперацию ED', category: 'comfort', description: 'Постоянная зарядка аккумулятора', icon: 'BatteryCharging', series: 'F' },
  { id: 'f_emergency_brake', name: 'Аварийка при торможении', category: 'comfort', description: 'Отключение при резком торможении', icon: 'AlertTriangle', series: 'F' },
  { id: 'f_battery_min', name: 'Минимальный заряд АКБ', category: 'comfort', description: 'Увеличение минимального заряда', icon: 'Battery', series: 'F' },
  { id: 'f_brake_system', name: 'Данные тормозной системы', category: 'comfort', description: 'Изменение информации о тормозах', icon: 'Disc', series: 'F' },
  
  // Производительность - G series (Режимы езды)
  { id: 'g_autostop', name: 'Отключение Start/Stop', category: 'performance', description: 'Отключение функции старт-стоп в DME', icon: 'Power', series: 'G' },
  { id: 'g_sport', name: 'Sport режим по умолчанию', category: 'performance', description: 'Изменение стандартного режима при запуске', icon: 'Gauge', series: 'G' },
  { id: 'g_sport_plus', name: 'Режим Sport Plus', category: 'performance', description: 'Кодировка режима Sport Plus', icon: 'Zap', series: 'G' },
  { id: 'g_comfort_plus', name: 'Режим Comfort Plus', category: 'performance', description: 'Кодировка режима Комфорт Плюс', icon: 'Armchair', series: 'G' },
  { id: 'g_eco_pro', name: 'Режим ECO Pro', category: 'performance', description: 'Настройка режима ECO Pro', icon: 'Leaf', series: 'G' },
  { id: 'g_eco_pro_plus', name: 'Режим ECO Pro Plus', category: 'performance', description: 'Кодировка режима Эко Про Плюс', icon: 'Leaf', series: 'G' },
  { id: 'g_launch', name: 'Launch Control', category: 'performance', description: 'Активация ланч-контроля через спорт-коробку', icon: 'Rocket', series: 'G' },
  { id: 'g_perf_control', name: 'Performance Control', category: 'performance', description: 'Настройка управления в поворотах', icon: 'Gauge', series: 'G' },
  { id: 'g_xdrive_off', name: 'Отключение xDrive меню', category: 'performance', description: 'Убрать меню xDrive', icon: 'Settings2', series: 'G' },
  { id: 'g_dsc', name: 'Полное отключение DSC', category: 'performance', description: 'Деактивация стабилизации', icon: 'RotateCcw', series: 'G' },
  { id: 'g_exhaust', name: 'Звук двигателя через колонки', category: 'performance', description: 'Постоянный спортивный звук', icon: 'Volume2', series: 'G' },
  { id: 'g_steering_paddle', name: 'Лепестки на руле', category: 'performance', description: 'Настройка работы лепестков', icon: 'Gauge', series: 'G' },
  { id: 'g_m_pack', name: 'M-пакет (код 337)', category: 'performance', description: 'Руль становится тяжелее', icon: 'Star', series: 'G' },
  
  // Мультимедиа - G series (Панель приборов и БК)
  { id: 'g_digital_speed', name: 'Мелкая цифровая скорость', category: 'multimedia', description: 'В верхней части спидометра постоянно', icon: 'Gauge', series: 'G' },
  { id: 'g_digital_speed_large', name: 'Крупная цифровая скорость', category: 'multimedia', description: 'Внизу на базовой приборке', icon: 'Gauge', series: 'G' },
  { id: 'g_digital_speed_freq', name: 'Частота обновления скорости', category: 'multimedia', description: 'Увеличение частоты обновления цифровой скорости', icon: 'Activity', series: 'G' },
  { id: 'g_range_off', name: 'Отключить запас хода', category: 'multimedia', description: 'Убрать отображение под спидометром', icon: 'Gauge', series: 'G' },
  { id: 'g_fuel_scale', name: 'Шкала расходометра топлива', category: 'multimedia', description: 'Изменение длины шкалы (15/20/30 л)', icon: 'Fuel', series: 'G' },
  { id: 'g_sport_color', name: 'Цвет приборки в Sport', category: 'multimedia', description: 'Изменение на серый M-стиль', icon: 'Palette', series: 'G' },
  { id: 'g_speedo_330', name: 'Разметка спидометра 330 км/ч', category: 'multimedia', description: 'М-шрифт + разметка до 330', icon: 'Gauge', series: 'G' },
  { id: 'g_m_icon', name: 'Значок M на приборке', category: 'multimedia', description: 'В режиме Sport отображается M', icon: 'Star', series: 'G' },
  { id: 'g_accel', name: 'Акселерометр', category: 'multimedia', description: 'Активация и настройка пределов виджета', icon: 'Activity', series: 'G' },
  { id: 'g_sport_instruments', name: 'Расширенное меню спортприборов', category: 'multimedia', description: 'Дополнительные спортивные индикаторы', icon: 'Gauge', series: 'G' },
  { id: 'g_led_covers', name: 'Обложки для LED приборки', category: 'multimedia', description: 'Выбор обложек приборной панели', icon: 'Image', series: 'G' },
  { id: 'g_video', name: 'Видео в движении', category: 'multimedia', description: 'Просмотр видео на ходу', icon: 'Play', series: 'G' },
  { id: 'g_tpms_temp', name: 'Температура в шинах', category: 'multimedia', description: 'Отображение температуры TPMS', icon: 'Thermometer', series: 'G' },
  { id: 'g_tpms_off', name: 'Отключить контроль давления', category: 'multimedia', description: 'Деактивация TPMS', icon: 'Gauge', series: 'G' },
  { id: 'g_bowers', name: 'Профили звука Bowers & Wilkins', category: 'multimedia', description: 'Активация профилей звука (нужен H/K)', icon: 'Music', series: 'G' },
  { id: 'g_car_select', name: 'Выбор цвета авто в MGU', category: 'multimedia', description: 'Настройка комплектации на экране', icon: 'Palette', series: 'G' },
  { id: 'g_sounds_bmw', name: 'Звуковые предупреждения BMW', category: 'multimedia', description: 'Стили звукового оформления', icon: 'Volume2', series: 'G' },
  { id: 'g_m_animation', name: 'M заставка', category: 'multimedia', description: 'Смена стартовой анимации', icon: 'Star', series: 'G' },
  { id: 'g_m_theme', name: 'M-style тема ГУ', category: 'multimedia', description: 'Смена темы оформления NBT', icon: 'Palette', series: 'G' },
  { id: 'g_greeting', name: 'Приветствие на приборке', category: 'multimedia', description: 'Приветствие/прощание при старте', icon: 'MessageCircle', series: 'G' },
  { id: 'g_ringtone', name: 'Передача рингтона в авто', category: 'multimedia', description: 'Использование собственного рингтона', icon: 'Phone', series: 'G' },
  { id: 'g_bluetooth_ext', name: 'Расширенный Bluetooth', category: 'multimedia', description: 'СМС и несколько телефонов одновременно', icon: 'Bluetooth', series: 'G' },
  { id: 'g_lane_assist', name: 'Lane Change Assist', category: 'multimedia', description: 'Ассистент смены полосы', icon: 'Navigation', series: 'G' },
  { id: 'g_driving_view', name: 'Assisted Driving View', category: 'multimedia', description: 'Визуализация потока на приборке', icon: 'Eye', series: 'G' },
  
  // Внешний вид - G series (Осветительные приборы)
  { id: 'g_lights_off', name: 'Отключить свет в положении 0', category: 'exterior', description: 'Полное отключение света', icon: 'SunOff', series: 'G' },
  { id: 'g_angel_bright', name: 'Яркость ангельских глазок', category: 'exterior', description: 'Настройка яркости Angel Eyes', icon: 'Circle', series: 'G' },
  { id: 'g_strobe', name: 'ПТФ в режиме стробоскопов', category: 'exterior', description: 'Отключаются при дальнем свете', icon: 'Zap', series: 'G' },
  { id: 'g_welcome_light', name: 'Приветственная анимация света', category: 'exterior', description: 'Световое шоу при открытии', icon: 'Star', series: 'G' },
  { id: 'g_ambient', name: 'Цвет подсветки салона', category: 'exterior', description: 'Изменение цвета Ambient', icon: 'Lightbulb', series: 'G' },
  
  // Безопасность - G series
  { id: 'g_belt_gong_off', name: 'Отключение гонга ремня', category: 'safety', description: 'Убрать звук непристегнутого ремня', icon: 'UserCheck', series: 'G' },
  { id: 'g_belt_icon_off', name: 'Отключение значка ремня', category: 'safety', description: 'Убрать значок на LED приборке', icon: 'UserCheck', series: 'G' },
  { id: 'g_horn_off', name: 'Отключение клаксона при закрытии', category: 'safety', description: 'Нет звука при постановке на охрану', icon: 'Volume2', series: 'G' },
  { id: 'g_horn_alarm', name: 'Звук при постановке на охрану', category: 'safety', description: 'Управление звуковым сигналом', icon: 'Volume2', series: 'G' },
  
  // Комфорт - G series (Багажник, Кузов, Салон)
  { id: 'g_mirror_tilt', name: 'Угол наклона зеркала при R', category: 'comfort', description: 'Настройка наклона при заднем ходе', icon: 'Maximize2', series: 'G' },
  { id: 'g_mirror_dimming', name: 'Чувствительность затемнения зеркал', category: 'comfort', description: 'Настройка для тонировки', icon: 'Sun', series: 'G' },
  { id: 'g_wiper_count', name: 'Количество взмахов стеклоочистителей', category: 'comfort', description: 'Изменение числа проходов', icon: 'Wind', series: 'G' },
  { id: 'g_blinker_5x', name: '5-кратное мигание поворотника', category: 'comfort', description: 'При касании рычага', icon: 'Navigation', series: 'G' },
  { id: 'g_trunk_close_fast', name: 'Закрытие багажника без задержки', category: 'comfort', description: 'Без долгого удержания кнопки', icon: 'Package', series: 'G' },
  { id: 'g_window_no_hold', name: 'Закрывание стеклоподъемников без удержания', category: 'comfort', description: 'При открытой двери без удержания', icon: 'ArrowUp', series: 'G' },
  { id: 'g_seat_heat_zones', name: 'Распределение подогрева сидений', category: 'comfort', description: 'Спина/колени/полностью (только водитель)', icon: 'Thermometer', series: 'G' },
  { id: 'g_seat_heat_auto', name: 'Авто подогрев/вентиляция сидений', category: 'comfort', description: 'Управление в меню климата (VO-код)', icon: 'Thermometer', series: 'G' },
  { id: 'g_easy_entry', name: 'Комфортная посадка', category: 'comfort', description: 'Отодвигается сиденье при входе', icon: 'Armchair', series: 'G' },
];

export const calculatePrice = (count: number): { total: number; discount: number; original: number } => {
  if (count === 0) return { total: 0, discount: 0, original: 0 };
  
  const pricePerOption = 1500;
  let total = 0;
  let discount = 0;
  
  if (count === 1) {
    total = 1500;
  } else if (count === 2) {
    total = 3000;
  } else if (count === 3) {
    total = 3500;
  } else if (count >= 4 && count <= 5) {
    const original = count * pricePerOption;
    discount = 25;
    total = Math.round(original * 0.75);
  } else if (count >= 6 && count <= 9) {
    const original = count * pricePerOption;
    discount = 30;
    total = Math.round(original * 0.70);
  } else if (count >= 10) {
    const original = count * pricePerOption;
    discount = 35;
    total = Math.round(original * 0.65);
  }
  
  const original = count * pricePerOption;
  return { total, discount, original };
};
