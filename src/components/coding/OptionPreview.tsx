import Icon from '@/components/ui/icon';

interface OptionPreviewProps {
  optionId: string;
  optionName: string;
  description: string;
  isSelected: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const serviceVisuals: Record<string, { before: string; after: string; description: string }> = {
  // F-series - Мультимедиа
  'f_video': {
    before: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80',
    description: 'Просмотр видео во время движения станет доступным'
  },
  'f_carplay': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80',
    description: 'Беспроводной CarPlay появится в меню iDrive'
  },
  'f_digital_speed': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    description: 'Цифровая скорость всегда видна на панели'
  },
  'f_sport_indicators': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    description: 'Спортивные индикаторы производительности'
  },
  'f_m_logo': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800&q=80',
    description: 'M Performance логотип на приборке'
  },
  'f_logo_change': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617128034254-61a3b0befc19?w=800&q=80',
    description: 'Свой логотип при запуске автомобиля'
  },
  'f_codecs': {
    before: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80',
    description: 'Поддержка MKV, AVI и других форматов видео'
  },
  'f_usb_video': {
    before: 'https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
    description: 'Воспроизведение видео с USB накопителя'
  },
  
  // F-series - Освещение
  'f_rings_bright': {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    description: 'Angel Eyes станут ярче и заметнее'
  },
  'f_welcome_light': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
    description: 'Подсветка под дверями при приветствии'
  },
  'f_drl_off': {
    before: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    description: 'Полное отключение дневных ходовых огней'
  },
  'f_rear_drl': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80',
    description: 'Задние габариты включаются вместе с ДХО'
  },
  
  // F-series - Комфорт
  'f_autostop': {
    before: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1620125501033-c285373a6e88?w=800&q=80',
    description: 'Start/Stop всегда выключен при запуске'
  },
  'f_comfort_open': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    description: 'Открытие окон и люка с брелка удержанием'
  },
  'f_mirror_auto_fold': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    description: 'Зеркала складываются автоматически'
  },
  'f_auto_handbrake': {
    before: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    description: 'Авто снятие с ручника при движении'
  },
  'f_mirror_tilt': {
    before: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    description: 'Наклон зеркала при задней передаче для парковки'
  },
  'f_trunk_close': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Закрытие багажника с брелка без удержания'
  },
  'f_easy_entry': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
    description: 'Автоотъезд руля и сиденья при выходе'
  },
  'f_blinker_count': {
    before: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    description: 'Настройка количества миганий (3/5/7)'
  },
  
  // F-series - Производительность
  'f_launch': {
    before: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Launch Control для максимального старта'
  },
  'f_sport_mode': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80',
    description: 'Тонкая настройка Sport режима'
  },
  
  // G-series - Мультимедиа
  'g_video': {
    before: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80',
    description: 'Просмотр видео во время движения'
  },
  'g_carplay': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80',
    description: 'Беспроводной CarPlay в меню'
  },
  'g_digital_speed': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    description: 'Постоянная цифровая скорость сверху'
  },
  'g_sport_displays': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    description: 'Спортивные дисплеи с данными'
  },
  'g_needle_sweep': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617128034254-61a3b0befc19?w=800&q=80',
    description: 'Анимация стрелок при запуске'
  },
  'g_m_displays': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800&q=80',
    description: 'M-режимы на панели приборов'
  },
  'g_accel': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80',
    description: 'Акселерометр G-сил на приборке'
  },
  'g_sport_instruments': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    description: 'Расширенное меню спортивных индикаторов'
  },
  'g_led_covers': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1614036417651-c2c3e2fb9e2d?w=800&q=80',
    description: 'Выбор фоновых изображений приборки'
  },
  'g_m_animation': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800&q=80',
    description: 'M заставка при запуске автомобиля'
  },
  'g_greeting': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1614036417651-c2c3e2fb9e2d?w=800&q=80',
    description: 'Персональное приветствие на приборке'
  },
  
  // G-series - Освещение
  'g_angel_bright': {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    description: 'Увеличенная яркость Angel Eyes'
  },
  'g_welcome_light': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
    description: 'Welcome Light подсветка при приближении'
  },
  'g_ambient': {
    before: 'https://images.unsplash.com/photo-1514866726862-0f081731e0ce?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
    description: 'Дополнительные цвета Ambient подсветки'
  },
  'g_lights_off': {
    before: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    description: 'Полное отключение света в положении "0"'
  },
  
  // G-series - Комфорт
  'g_autostop': {
    before: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1620125501033-c285373a6e88?w=800&q=80',
    description: 'Отключение Start/Stop по умолчанию'
  },
  'g_windows_close': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    description: 'Закрытие окон с брелка удержанием'
  },
  'g_mirrors_fold': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    description: 'Автоскладывание зеркал при закрытии'
  },
  'g_comfort_trunk': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Открытие багажника движением ноги'
  },
  'g_mirror_tilt': {
    before: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    description: 'Настройка угла наклона зеркала при задней'
  },
  'g_trunk_close_fast': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Багажник закрывается без задержки'
  },
  'g_window_no_hold': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    description: 'Окна закрываются без удержания кнопки'
  },
  'g_easy_entry': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
    description: 'Автоотъезд сиденья при входе/выходе'
  },
  'g_blinker_5x': {
    before: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    description: '5 морганий поворотника при касании'
  },
  
  // G-series - Производительность
  'g_sport': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80',
    description: 'Sport режим активен по умолчанию'
  },
  'g_sport_plus': {
    before: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Активация Sport Plus режима'
  },
  'g_launch': {
    before: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Launch Control через код 2TB'
  },
  'g_exhaust': {
    before: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    description: 'Active Sound через колонки салона'
  },
  
  // F-series - Внешний вид (дополнительно)
  'f_fog_flicker': {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1562224840-3c0b8de69b60?w=800&q=80',
    description: 'Устранение мерцания противотуманок'
  },
  'f_strobe': {
    before: 'https://images.unsplash.com/photo-1562224840-3c0b8de69b60?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Автоотключение ПТФ при дальнем свете'
  },
  'f_adaptive_fog': {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80',
    description: 'ПТФ поворачиваются с рулем'
  },
  'f_rear_smooth': {
    before: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    description: 'Плавное включение стоп-сигналов'
  },
  
  // F-series - Безопасность
  'f_autolock': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    description: 'Повторное закрытие если не открывали'
  },
  'f_no_belt_gong': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
    description: 'Отключение гонга непристегнутого ремня'
  },
  
  // F-series - Мультимедиа (дополнительно)
  'f_color_change': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1614036417651-c2c3e2fb9e2d?w=800&q=80',
    description: 'Изменение цветовой схемы приборов'
  },
  'f_tpms_data': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    description: 'Детальная информация о каждом колесе'
  },
  'f_hifi': {
    before: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Улучшение аудио Stereo→Hi-Fi'
  },
  
  // G-series - Внешний вид
  'g_strobe': {
    before: 'https://images.unsplash.com/photo-1562224840-3c0b8de69b60?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Стробоскоп ПТФ при дальнем свете'
  },
  
  // G-series - Безопасность
  'g_belt_gong_off': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
    description: 'Отключить гонг непристегнутого ремня'
  },
  'g_belt_icon_off': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    description: 'Убрать значок ремня с приборки'
  },
  
  // G-series - Мультимедиа (дополнительно)
  'g_tpms_temp': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    description: 'Показ температуры в каждой шине'
  },
  'g_bowers': {
    before: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Профили звука Bowers & Wilkins'
  },
  'g_car_select': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1614036417651-c2c3e2fb9e2d?w=800&q=80',
    description: 'Выбор цвета авто в меню MGU'
  },
  'g_sounds_bmw': {
    before: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Звуковые темы: i8, Rolls Royce, Mini'
  },
  'g_ringtone': {
    before: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1598966739654-5e9e0b6c4f8b?w=800&q=80',
    description: 'Свой рингтон вместо стандартного'
  },
  'g_bluetooth_ext': {
    before: 'https://images.unsplash.com/photo-1598966739654-5e9e0b6c4f8b?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80',
    description: 'Расширенный Bluetooth с СМС'
  },
  
  // G-series - Комфорт (дополнительно)
  'g_seat_heat_zones': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
    description: 'Раздельный подогрев спина/колени'
  },
  'g_wiper_count': {
    before: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    description: 'Настройка количества взмахов дворников'
  },
  
  // G-series - Производительность (дополнительно)
  'g_eco_pro': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Настройка параметров ECO Pro'
  },
  'g_comfort_plus': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80',
    description: 'Расширенный комфортный режим'
  },
  'g_dsc': {
    before: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Полное отключение DSC'
  },
  
  // Дополнительные популярные опции (только "после")
  'f_start_no_brake': {
    before: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    description: 'Запуск двигателя без нажатия тормоза'
  },
  'f_speed_limit': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    description: 'Установка ограничения максимальной скорости'
  },
  'f_coasting': {
    before: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1620125501033-c285373a6e88?w=800&q=80',
    description: 'Движение накатом для экономии топлива'
  },
  'f_connected': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80',
    description: 'Активация ConnectedDrive сервисов'
  },
  'f_xdrive_display': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    description: 'Индикация наклона кузова и компас'
  },
  'f_trunk_delay': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Настройка задержки открытия багажника'
  },
  'f_trunk_smooth_close': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Плавное закрытие багажника без удара'
  },
  'f_trunk_smooth_open': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Плавное открытие багажника без рывка'
  },
  'f_window_delay': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    description: 'Управление окнами с брелка удержанием'
  },
  'f_mirror_heat': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    description: 'Активация обогрева зеркал и дворников'
  },
  'f_handle_light': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
    description: 'Яркая подсветка ручек при задней передаче'
  },
  'f_headlight_wash': {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
    description: 'Настройка омывателя фар'
  },
  
  // G-series дополнительные
  'g_digital_speed_large': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    description: 'Крупная цифра скорости внизу приборки'
  },
  'g_speedo_330': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    description: 'M-спидометр с разметкой до 330 км/ч'
  },
  'g_m_icon': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800&q=80',
    description: 'Значок M в Sport режиме'
  },
  'g_sport_color': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    description: 'Серый цвет вместо оранжевого в Sport'
  },
  'g_perf_control': {
    before: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Performance Control (код 2VG)'
  },
  'g_steering_paddle': {
    before: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    description: 'Настройка работы подрулевых лепестков'
  },
  'g_m_pack': {
    before: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80',
    description: 'Утяжеление руля как с M-пакетом'
  },
  'g_horn_off': {
    before: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Отключить клаксон при закрытии'
  },
  'g_horn_alarm': {
    before: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Звук постановки на охрану'
  },
  'g_mirror_dimming': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    description: 'Чувствительность затемнения зеркал'
  },
  'g_lane_assist': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=800&q=80',
    description: 'Lane Change Assist контроля слепых зон'
  },
  'g_driving_view': {
    before: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    description: 'Assisted Driving View на приборке'
  }
};

export default function OptionPreview({
  optionId,
  optionName,
  description,
  isSelected,
  onToggle,
  onClose
}: OptionPreviewProps) {
  const visual = serviceVisuals[optionId];

  if (!visual) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" 
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-6 max-w-4xl w-full animate-in slide-in-from-bottom-4 duration-300" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-2xl font-semibold mb-1">{optionName}</h3>
            <p className="text-gray-400 text-sm">{visual.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="X" className="w-6 h-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="text-red-400 text-sm font-medium flex items-center gap-2">
              <Icon name="X" className="w-4 h-4" />
              <span>До кодирования</span>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-red-500/30">
              <img 
                src={visual.before} 
                alt="До"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-green-400 text-sm font-medium flex items-center gap-2">
              <Icon name="Check" className="w-4 h-4" />
              <span>После кодирования</span>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden border-2 border-green-500/30">
              <img 
                src={visual.after} 
                alt="После"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">{description}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-sm">
            <span className="text-white font-semibold text-lg">1500 ₽</span>
            <span className="text-gray-500 text-xs ml-2">за опцию</span>
          </div>
          <button
            onClick={() => {
              onToggle();
              onClose();
            }}
            className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
              isSelected
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            }`}
          >
            {isSelected ? 'Убрать из заказа' : 'Добавить в заказ'}
          </button>
        </div>
      </div>
    </div>
  );
}