import { gSeriesOptions } from './codingDataGSeries';

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
  // Внешний вид - F series
  { id: 'f_fog_flicker', name: 'Отключение мерцания туманок', category: 'exterior', description: 'Устранение эффекта опроса ПТФ при включении света', icon: 'Lightbulb', series: 'F' },
  { id: 'f_strobe', name: 'Эффект стробоскопа ПТФ', category: 'exterior', description: 'Автоматическое отключение противотуманок при дальнем свете', icon: 'Zap', series: 'F' },
  { id: 'f_fog_smooth', name: 'Плавное включение туманок', category: 'exterior', description: 'Мягкая активация ПТФ без резкого включения', icon: 'Sun', series: 'F' },
  { id: 'f_adaptive_fog', name: 'Адаптивные противотуманки', category: 'exterior', description: 'ПТФ поворачиваются вместе с рулевым управлением', icon: 'Navigation', series: 'F' },
  { id: 'f_headlight_wash', name: 'Омыватель фар', category: 'exterior', description: 'Настройка частоты и условий работы омывателя', icon: 'Droplet', series: 'F' },
  { id: 'f_rings_bright', name: 'Яркость Angel Eyes', category: 'exterior', description: 'Регулировка яркости ангельских глазок днем и ночью', icon: 'Circle', series: 'F' },
  { id: 'f_drl_off', name: 'Отключение ДХО', category: 'exterior', description: 'Возможность полного отключения дневных ходовых огней', icon: 'SunOff', series: 'F' },
  { id: 'f_rear_drl', name: 'Задние габариты в режиме ДХО', category: 'exterior', description: 'Включение задних фонарей вместе с дневными огнями', icon: 'Lightbulb', series: 'F' },
  { id: 'f_rear_smooth', name: 'Плавное включение стоп-сигналов', category: 'exterior', description: 'Мягкая активация задних фонарей при торможении', icon: 'Sun', series: 'F' },
  
  // Производительность - F series
  { id: 'f_auto_handbrake', name: 'Авто снятие с ручника', category: 'performance', description: 'Автоматическое снятие при переключении на D или R', icon: 'Gauge', series: 'F' },
  { id: 'f_start_no_brake', name: 'Запуск без педали тормоза', category: 'performance', description: 'Возможность завести двигатель без нажатия тормоза', icon: 'Power', series: 'F' },
  { id: 'f_speed_limit', name: 'Лимит скорости', category: 'performance', description: 'Установка ограничения максимальной скорости автомобиля', icon: 'Gauge', series: 'F' },
  { id: 'f_autostop', name: 'Отключение Start/Stop', category: 'performance', description: 'Полная деактивация системы автостарт-стоп', icon: 'Power', series: 'F' },
  { id: 'f_launch', name: 'Launch Control', category: 'performance', description: 'Активация системы резкого старта с контролем пробуксовки', icon: 'Rocket', series: 'F' },
  { id: 'f_sport_mode', name: 'Настройка Sport режима', category: 'performance', description: 'Тонкая настройка параметров спортивного режима', icon: 'Gauge', series: 'F' },
  { id: 'f_coasting', name: 'Режим свободного качения', category: 'performance', description: 'Движение накатом с отключенной трансмиссией для экономии', icon: 'Wind', series: 'F' },
  
  // Мультимедиа - F series
  { id: 'f_digital_speed', name: 'Цифровой спидометр', category: 'multimedia', description: 'Постоянное отображение скорости цифрами на приборке', icon: 'Gauge', series: 'F' },
  { id: 'f_color_change', name: 'Цвет приборов день/ночь', category: 'multimedia', description: 'Изменение цветовой схемы панели приборов', icon: 'Palette', series: 'F' },
  { id: 'f_auto_brightness', name: 'Авто яркость без датчика света', category: 'multimedia', description: 'Автоматическое переключение подсветки по времени', icon: 'Sun', series: 'F' },
  { id: 'f_consumption_limit', name: 'Шкала расхода топлива', category: 'multimedia', description: 'Изменение диапазона шкалы расходометра', icon: 'Fuel', series: 'F' },
  { id: 'f_remove_ed', name: 'Скрыть EfficientDynamics', category: 'multimedia', description: 'Удаление надписи ED с приборной панели', icon: 'X', series: 'F' },
  { id: 'f_m_logo', name: 'M Performance логотип', category: 'multimedia', description: 'Отображение M-лого на приборной панели', icon: 'Star', series: 'F' },
  { id: 'f_video', name: 'Видео в движении', category: 'multimedia', description: 'Просмотр видео на головном устройстве во время езды', icon: 'Play', series: 'F' },
  { id: 'f_codecs', name: 'Активация видео кодеков', category: 'multimedia', description: 'Поддержка дополнительных форматов видео (MKV, AVI)', icon: 'FileVideo', series: 'F' },
  { id: 'f_media_off', name: 'Авто выкл медиа при выходе', category: 'multimedia', description: 'Автоматическое отключение при открытии двери', icon: 'DoorOpen', series: 'F' },
  { id: 'f_phone_sound', name: 'Звук телефона через COMBOX', category: 'multimedia', description: 'Трансляция звонков и уведомлений через динамики', icon: 'Phone', series: 'F' },
  { id: 'f_sport_indicators', name: 'Спортивные индикаторы', category: 'multimedia', description: 'Дополнительные показатели производительности', icon: 'Activity', series: 'F' },
  { id: 'f_tpms_data', name: 'Давление и температура шин', category: 'multimedia', description: 'Детальная информация о каждом колесе на экране', icon: 'Gauge', series: 'F' },
  { id: 'f_usb_video', name: 'Видео с USB накопителя', category: 'multimedia', description: 'Воспроизведение видео файлов с флешки', icon: 'Usb', series: 'F' },
  { id: 'f_towbar_cam', name: 'Камера фаркопа', category: 'multimedia', description: 'Активация камеры заднего вида в режиме прицепа', icon: 'Camera', series: 'F' },
  { id: 'f_units', name: 'Единицы измерения', category: 'multimedia', description: 'Переключение между км/ч и mph, литрами и галлонами', icon: 'Ruler', series: 'F' },
  { id: 'f_comfort_open', name: 'Комфортное открытие', category: 'multimedia', description: 'Открытие окон и люка удержанием кнопки брелка', icon: 'DoorOpen', series: 'F' },
  { id: 'f_service_history', name: 'История обслуживания', category: 'multimedia', description: 'Отображение данных о проведенном ТО в iDrive', icon: 'History', series: 'F' },
  { id: 'f_radio_off', name: 'Отключение SDARS радио', category: 'multimedia', description: 'Деактивация неработающего спутникового радио', icon: 'RadioOff', series: 'F' },
  { id: 'f_ed_menu', name: 'Меню EfficientDynamics', category: 'multimedia', description: 'Расширенное информационное меню энергоэффективности', icon: 'Menu', series: 'F' },
  { id: 'f_dev_menu', name: 'Меню разработчика', category: 'multimedia', description: 'Доступ к скрытым инженерным настройкам', icon: 'Code', series: 'F' },
  { id: 'f_hifi', name: 'Улучшение аудио Stereo→Hi-Fi', category: 'multimedia', description: 'Программное улучшение качества звука', icon: 'Music', series: 'F' },
  { id: 'f_xdrive_display', name: 'Индикация xDrive', category: 'multimedia', description: 'Отображение наклона кузова и компаса', icon: 'Compass', series: 'F' },
  { id: 'f_volume_bar', name: 'Полоса громкости на экране', category: 'multimedia', description: 'Визуальная индикация уровня звука', icon: 'Volume2', series: 'F' },
  { id: 'f_connected', name: 'ConnectedDrive сервисы', category: 'multimedia', description: 'Активация онлайн сервисов BMW', icon: 'Wifi', series: 'F' },
  { id: 'f_logo_change', name: 'Логотип при запуске', category: 'multimedia', description: 'Замена заставки на своё изображение', icon: 'Image', series: 'F' },
  { id: 'f_radio_time', name: 'Задержка выкл магнитолы', category: 'multimedia', description: 'Время работы после выключения зажигания', icon: 'Clock', series: 'F' },
  
  // Безопасность - F series
  { id: 'f_autolock', name: 'Автозакрытие дверей', category: 'safety', description: 'Повторное закрытие если двери не открывали', icon: 'Lock', series: 'F' },
  { id: 'f_alarm_key', name: 'Сигнализация от мех ключа', category: 'safety', description: 'Срабатывание сигнализации при открытии ключом', icon: 'Key', series: 'F' },
  { id: 'f_no_belt_gong', name: 'Отключение гонга ремня', category: 'safety', description: 'Убрать звуковое предупреждение непристегнутого ремня', icon: 'UserCheck', series: 'F' },
  { id: 'f_horn_signal', name: 'Клаксон при закрытии', category: 'safety', description: 'Звуковой сигнал при постановке на охрану', icon: 'Volume2', series: 'F' },
  
  // Комфорт - F series
  { id: 'f_trunk_delay', name: 'Задержка открытия багажника', category: 'comfort', description: 'Настройка времени задержки срабатывания', icon: 'Package', series: 'F' },
  { id: 'f_trunk_close', name: 'Закрытие багажника с брелка', category: 'comfort', description: 'Дистанционное закрытие без удержания кнопки', icon: 'Package', series: 'F' },
  { id: 'f_trunk_smooth_close', name: 'Плавное закрытие багажника', category: 'comfort', description: 'Мягкое опускание крышки без удара', icon: 'Package', series: 'F' },
  { id: 'f_trunk_smooth_open', name: 'Плавное открытие багажника', category: 'comfort', description: 'Мягкое поднятие крышки без рывка', icon: 'Package', series: 'F' },
  { id: 'f_mirror_tilt', name: 'Наклон зеркала при задней', category: 'comfort', description: 'Автонаклон правого зеркала при R для парковки', icon: 'Maximize2', series: 'F' },
  { id: 'f_mirror_dimming', name: 'Затемнение зеркал', category: 'comfort', description: 'Чувствительность автозатемнения от фар сзади', icon: 'Sun', series: 'F' },
  { id: 'f_mirror_heat', name: 'Обогрев зеркал', category: 'comfort', description: 'Активация подогрева зеркал и дворников', icon: 'Thermometer', series: 'F' },
  { id: 'f_mirror_heat_delay', name: 'Убрать задержку обогрева', category: 'comfort', description: 'Мгновенное включение обогрева зеркал', icon: 'Zap', series: 'F' },
  { id: 'f_wheel_size', name: 'Размерность колес', category: 'comfort', description: 'Коррекция показаний спидометра под диски', icon: 'Circle', series: 'F' },
  { id: 'f_window_delay', name: 'Управление окнами с брелка', category: 'comfort', description: 'Открытие/закрытие окон удержанием кнопки', icon: 'Key', series: 'F' },
  { id: 'f_blinker_count', name: 'Моргания поворотника', category: 'comfort', description: 'Количество миганий при касании рычага (3/5/7)', icon: 'Navigation', series: 'F' },
  { id: 'f_handle_light', name: 'Подсветка ручек при задней', category: 'comfort', description: 'Яркая подсветка ручек при включении R', icon: 'Lightbulb', series: 'F' },
  { id: 'f_easy_entry', name: 'Комфортная посадка Easy Entry', category: 'comfort', description: 'Автоотъезд руля и сиденья при выходе', icon: 'Armchair', series: 'F' },
  { id: 'f_air_sensor', name: 'Датчик качества воздуха', category: 'comfort', description: 'Чувствительность датчика AUC (рециркуляция)', icon: 'Wind', series: 'F' },
  { id: 'f_light_sensor', name: 'Датчик света', category: 'comfort', description: 'Чувствительность датчика освещенности', icon: 'Sun', series: 'F' },
  { id: 'f_seat_heat_memory', name: 'Память подогрева сидений', category: 'comfort', description: 'Время запоминания после выключения зажигания', icon: 'Thermometer', series: 'F' },
  { id: 'f_wheel_heat_memory', name: 'Память подогрева руля', category: 'comfort', description: 'Время запоминания после выключения зажигания', icon: 'Thermometer', series: 'F' },
  { id: 'f_auto_no_ac', name: 'AUTO без кондиционера', category: 'comfort', description: 'Режим AUTO работает без включения компрессора', icon: 'Wind', series: 'F' },
  { id: 'f_recirculation_memory', name: 'Память рециркуляции', category: 'comfort', description: 'Сохранение состояния рециркуляции после запуска', icon: 'RotateCcw', series: 'F' },
  { id: 'f_gong_sound', name: 'Тип звука гонга', category: 'comfort', description: 'Изменение мелодии предупреждений и ошибок', icon: 'Volume2', series: 'F' },
  { id: 'f_brightness_wheel', name: 'Колесико яркости', category: 'comfort', description: 'Отвязать регулятор от подсветки салона', icon: 'Sun', series: 'F' },
  { id: 'f_seat_memory_sound', name: 'Гонг памяти сиденья', category: 'comfort', description: 'Звуковой сигнал после сохранения позиции', icon: 'Volume2', series: 'F' },
  { id: 'f_battery_warning', name: 'Предупреждение разряда АКБ', category: 'comfort', description: 'Отключение напоминания о разряде на парковке', icon: 'Battery', series: 'F' },
  { id: 'f_recuperation', name: 'Отключить рекуперацию', category: 'comfort', description: 'Постоянная зарядка АКБ без EfficientDynamics', icon: 'BatteryCharging', series: 'F' },
  { id: 'f_emergency_brake', name: 'Аварийка при резком торможении', category: 'comfort', description: 'Отключение автоматической аварийки', icon: 'AlertTriangle', series: 'F' },
  { id: 'f_battery_min', name: 'Минимальный заряд АКБ', category: 'comfort', description: 'Порог минимального уровня заряда батареи', icon: 'Battery', series: 'F' },
  { id: 'f_brake_system', name: 'Данные тормозной системы', category: 'comfort', description: 'Изменение параметров CBS тормозов', icon: 'Disc', series: 'F' },

  
  // G-series опции (новый список из 56 пунктов)
  ...gSeriesOptions
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