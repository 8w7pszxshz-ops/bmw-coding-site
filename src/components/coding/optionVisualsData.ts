const defaultBefore = 'https://placehold.co/800x450/1a1a1a/666666?text=До+кодирования';
const defaultAfter = 'https://placehold.co/800x450/1a4d2e/4ade80?text=После+кодирования';

const multimediaImg = 'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/dfcd4ac3-bbb1-4348-ae62-e012c2ee98b5.jpg';
const lightsImg = 'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/b8f7f6cf-3fd9-42e0-9101-ab758d52d0ba.jpg';
const comfortImg = 'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/d83c0db6-f52b-4235-b968-98db89ce1b0b.jpg';
const sportImg = 'https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/c13d25cd-1a24-465b-8ee5-9eacd3e67e32.jpg';

export const serviceVisuals: Record<string, { before: string; after: string; description: string }> = {
  'f_video': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Просмотр видео во время движения станет доступным'
  },
  'f_carplay': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Беспроводной CarPlay появится в меню iDrive'
  },
  'f_digital_speed': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Цифровая скорость всегда видна на панели'
  },
  'f_sport_indicators': {
    before: defaultBefore,
    after: sportImg,
    description: 'Спортивные индикаторы производительности'
  },
  'f_m_logo': {
    before: defaultBefore,
    after: sportImg,
    description: 'M Performance логотип на приборке'
  },
  'f_logo_change': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Свой логотип при запуске автомобиля'
  },
  'f_codecs': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Поддержка MKV, AVI и других форматов видео'
  },
  'f_usb_video': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Воспроизведение видео с USB накопителя'
  },
  'f_rings_bright': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Angel Eyes станут ярче и заметнее'
  },
  'f_welcome_light': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Подсветка под дверями при приветствии'
  },
  'f_drl_off': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Полное отключение дневных ходовых огней'
  },
  'f_rear_drl': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Задние габариты включаются вместе с ДХО'
  },
  'f_autostop': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Start/Stop всегда выключен при запуске'
  },
  'f_comfort_open': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Открытие окон и люка с брелка удержанием'
  },
  'f_mirror_auto_fold': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Зеркала складываются автоматически'
  },
  'f_auto_handbrake': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Авто снятие с ручника при движении'
  },
  'f_mirror_tilt': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Наклон зеркала при задней передаче для парковки'
  },
  'f_trunk_close': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Закрытие багажника с брелка без удержания'
  },
  'f_easy_entry': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Автоотъезд руля и сиденья при выходе'
  },
  'f_blinker_count': {
    before: defaultBefore,
    after: defaultAfter,
    description: 'Настройка количества миганий (3/5/7)'
  },
  'f_launch': {
    before: defaultBefore,
    after: sportImg,
    description: 'Launch Control для максимального старта'
  },
  'f_sport_mode': {
    before: defaultBefore,
    after: sportImg,
    description: 'Тонкая настройка Sport режима'
  },
  'g_video': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Просмотр видео во время движения'
  },
  'g_carplay': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Беспроводной CarPlay в меню'
  },
  'g_digital_speed': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Постоянная цифровая скорость сверху'
  },
  'g_sport_displays': {
    before: defaultBefore,
    after: sportImg,
    description: 'Спортивные дисплеи с данными'
  },
  'g_needle_sweep': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Анимация стрелок при запуске'
  },
  'g_m_displays': {
    before: defaultBefore,
    after: sportImg,
    description: 'M-режимы на панели приборов'
  },
  'g_accel': {
    before: defaultBefore,
    after: sportImg,
    description: 'Акселерометр G-сил на приборке'
  },
  'g_sport_instruments': {
    before: defaultBefore,
    after: sportImg,
    description: 'Расширенное меню спортивных индикаторов'
  },
  'g_led_covers': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Выбор фоновых изображений приборки'
  },
  'g_m_animation': {
    before: defaultBefore,
    after: sportImg,
    description: 'M заставка при запуске автомобиля'
  },
  'g_greeting': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Персональное приветствие на приборке'
  },
  'g_angel_bright': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Увеличенная яркость Angel Eyes'
  },
  'g_welcome_light': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Welcome Light подсветка при приближении'
  },
  'g_ambient': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Дополнительные цвета Ambient подсветки'
  },
  'g_lights_off': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Полное отключение света в положении "0"'
  },
  'g_autostop': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Отключение Start/Stop по умолчанию'
  },
  'g_windows_close': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Закрытие окон с брелка удержанием'
  },
  'g_mirrors_fold': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Автоскладывание зеркал при закрытии'
  },
  'g_comfort_trunk': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Открытие багажника движением ноги'
  },
  'g_mirror_tilt': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Настройка угла наклона зеркала при задней'
  },
  'g_trunk_close_fast': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Багажник закрывается без задержки'
  },
  'g_window_no_hold': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Окна закрываются без удержания кнопки'
  },
  'g_easy_entry': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Автоотъезд сиденья при входе/выходе'
  },
  'g_blinker_5x': {
    before: defaultBefore,
    after: defaultAfter,
    description: '5 морганий поворотника при касании'
  },
  'g_sport': {
    before: defaultBefore,
    after: sportImg,
    description: 'Sport режим активен по умолчанию'
  },
  'g_sport_plus': {
    before: defaultBefore,
    after: sportImg,
    description: 'Активация Sport Plus режима'
  },
  'g_launch': {
    before: defaultBefore,
    after: sportImg,
    description: 'Launch Control через код 2TB'
  },
  'g_exhaust': {
    before: defaultBefore,
    after: sportImg,
    description: 'Active Sound через колонки салона'
  },
  'f_fog_flicker': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Устранение мерцания противотуманок'
  },
  'f_strobe': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Автоотключение ПТФ при дальнем свете'
  },
  'f_adaptive_fog': {
    before: defaultBefore,
    after: lightsImg,
    description: 'ПТФ поворачиваются с рулем'
  },
  'f_rear_smooth': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Плавное включение стоп-сигналов'
  },
  'f_autolock': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Повторное закрытие если не открывали'
  },
  'f_no_belt_gong': {
    before: defaultBefore,
    after: defaultAfter,
    description: 'Отключение гонга непристегнутого ремня'
  },
  'f_color_change': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Изменение цветовой схемы приборов'
  },
  'f_tpms_data': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Детальная информация о каждом колесе'
  },
  'f_hifi': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Улучшение аудио Stereo→Hi-Fi'
  },
  'g_strobe': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Стробоскоп ПТФ при дальнем свете'
  },
  'g_belt_gong_off': {
    before: defaultBefore,
    after: defaultAfter,
    description: 'Отключить гонг непристегнутого ремня'
  },
  'g_belt_icon_off': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Убрать значок ремня с приборки'
  },
  'g_tpms_temp': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Показ температуры в каждой шине'
  },
  'g_bowers': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Профили звука Bowers & Wilkins'
  },
  'g_car_select': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Выбор цвета авто в меню MGU'
  },
  'g_sounds_bmw': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Звуковые темы: i8, Rolls Royce, Mini'
  },
  'g_ringtone': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Свой рингтон вместо стандартного'
  },
  'g_bluetooth_ext': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Расширенный Bluetooth с СМС'
  },
  'g_seat_heat_zones': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Раздельный подогрев спина/колени'
  },
  'g_wiper_count': {
    before: defaultBefore,
    after: defaultAfter,
    description: 'Настройка количества взмахов дворников'
  },
  'g_eco_pro': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Настройка параметров ECO Pro'
  },
  'g_comfort_plus': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Расширенный комфортный режим'
  },
  'g_dsc': {
    before: defaultBefore,
    after: sportImg,
    description: 'Полное отключение DSC'
  },
  'f_start_no_brake': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Запуск двигателя без нажатия тормоза'
  },
  'f_speed_limit': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Установка ограничения максимальной скорости'
  },
  'f_coasting': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Движение накатом для экономии топлива'
  },
  'f_connected': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Активация ConnectedDrive сервисов'
  },
  'f_xdrive_display': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Индикация наклона кузова и компас'
  },
  'f_trunk_delay': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Настройка задержки открытия багажника'
  },
  'f_trunk_smooth_close': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Плавное закрытие багажника без удара'
  },
  'f_trunk_smooth_open': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Плавное открытие багажника без рывка'
  },
  'f_window_delay': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Управление окнами с брелка удержанием'
  },
  'f_mirror_heat': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Активация обогрева зеркал и дворников'
  },
  'f_handle_light': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Яркая подсветка ручек при задней передаче'
  },
  'f_headlight_wash': {
    before: defaultBefore,
    after: lightsImg,
    description: 'Настройка омывателя фар'
  },
  'g_digital_speed_large': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Крупная цифра скорости внизу приборки'
  },
  'g_speedo_330': {
    before: defaultBefore,
    after: sportImg,
    description: 'M-спидометр с разметкой до 330 км/ч'
  },
  'g_m_icon': {
    before: defaultBefore,
    after: sportImg,
    description: 'Значок M в Sport режиме'
  },
  'g_sport_color': {
    before: defaultBefore,
    after: sportImg,
    description: 'Серый цвет вместо оранжевого в Sport'
  },
  'g_perf_control': {
    before: defaultBefore,
    after: sportImg,
    description: 'Performance Control (код 2VG)'
  },
  'g_steering_paddle': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Настройка работы подрулевых лепестков'
  },
  'g_m_pack': {
    before: defaultBefore,
    after: sportImg,
    description: 'Утяжеление руля как с M-пакетом'
  },
  'g_horn_off': {
    before: defaultBefore,
    after: defaultAfter,
    description: 'Отключить клаксон при закрытии'
  },
  'g_horn_alarm': {
    before: defaultBefore,
    after: defaultAfter,
    description: 'Звук постановки на охрану'
  },
  'g_mirror_dimming': {
    before: defaultBefore,
    after: comfortImg,
    description: 'Чувствительность затемнения зеркал'
  },
  'g_lane_assist': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Lane Change Assist контроля слепых зон'
  },
  'g_driving_view': {
    before: defaultBefore,
    after: multimediaImg,
    description: 'Assisted Driving View на приборке'
  }
};
