-- Создаем таблицу для услуг кодирования с ценами
CREATE TABLE IF NOT EXISTS coding_services (
    id SERIAL PRIMARY KEY,
    service_code VARCHAR(20) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    service_name VARCHAR(200) NOT NULL,
    description TEXT,
    required_hwel_codes TEXT[],
    price INTEGER NOT NULL,
    duration_minutes INTEGER,
    complexity VARCHAR(20),
    is_popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Заполняем услуги кодирования с ценами
INSERT INTO coding_services (service_code, category, service_name, description, required_hwel_codes, price, duration_minutes, complexity, is_popular) VALUES
-- Мультимедиа и навигация
('MM01', 'multimedia', 'Активация Apple CarPlay', 'Беспроводной Apple CarPlay и Android Auto', ARRAY['26BB', '26BC', '26C0', '26C1', '26C2'], 8000, 30, 'easy', true),
('MM02', 'multimedia', 'Видео в движении', 'Просмотр видео на экране во время движения (только для пассажира)', ARRAY['26B9', '26BA', '26BB', '26BC'], 3000, 15, 'easy', true),
('MM03', 'multimedia', 'Камера на весь экран', 'Увеличенное изображение с парковочных камер', ARRAY['26B9', '26BA', '26BB'], 2000, 10, 'easy', false),
('MM04', 'multimedia', 'Спортивные дисплеи', 'G-meter, давление турбины, температура масла', ARRAY['26B9', '26BA', '26BB', '14B0', '14C0'], 4000, 20, 'medium', true),

-- Освещение
('LIGHT01', 'lighting', 'Welcome Light Carpet', 'Подсветка ковриков при открытии дверей', ARRAY['61A0', '61B0'], 2500, 15, 'easy', true),
('LIGHT02', 'lighting', 'Скандинавский свет (DRL)', 'Дневные ходовые огни скандинавским способом', ARRAY['61A0', '61B0'], 2000, 10, 'easy', false),
('LIGHT03', 'lighting', 'Динамические поворотники', 'Бегущие поворотники (если установлены)', ARRAY['61A0', '61B0'], 3000, 20, 'medium', true),
('LIGHT04', 'lighting', 'Angel Eyes яркость +', 'Увеличение яркости ангельских глазок', ARRAY['61A0', '61B0'], 1500, 10, 'easy', false),
('LIGHT05', 'lighting', 'Противотуманки как дневные', 'ПТФ работают как DRL', ARRAY['61A0', '61B0'], 2000, 10, 'easy', false),

-- Комфорт и удобство
('COMF01', 'comfort', 'Comfort Access +', 'Открытие багажника ногой, закрытие зеркал', ARRAY['61A0', '61B0', '51C0'], 3500, 20, 'medium', true),
('COMF02', 'comfort', 'Автозакрытие окон с ключа', 'Закрытие всех окон удержанием кнопки на ключе', ARRAY['51C0', '61B0'], 2000, 15, 'easy', true),
('COMF03', 'comfort', 'Отключение Start/Stop по умолчанию', 'Система старт-стоп всегда выключена при запуске', ARRAY['12D0', '12E0'], 1500, 10, 'easy', false),
('COMF04', 'comfort', 'Складывание зеркал в движении', 'Возможность сложить зеркала на скорости', ARRAY['61A0', '61B0'], 1500, 10, 'easy', false),
('COMF05', 'comfort', 'Климат-контроль остаточное тепло', 'Обогрев салона после выключения двигателя', ARRAY['64B0', '64C0'], 2000, 15, 'easy', false),

-- Приборная панель
('DASH01', 'dashboard', 'Цифровая скорость на дисплее', 'Отображение цифровой скорости постоянно', ARRAY['14B0', '14C0'], 2000, 10, 'easy', true),
('DASH02', 'dashboard', 'Needle Sweep', 'Анимация стрелок при запуске двигателя', ARRAY['14A0', '14B0'], 1500, 10, 'easy', false),
('DASH03', 'dashboard', 'Показ температуры масла', 'Вывод температуры масла на дисплей', ARRAY['14B0', '14C0'], 2000, 10, 'easy', false),
('DASH04', 'dashboard', 'M-режимы на панели', 'Активация М-дисплеев (M Sport пакет)', ARRAY['14B0', '14C0'], 3000, 15, 'medium', true),

-- Безопасность и стабилизация
('SAFE01', 'safety', 'MDM режим по умолчанию', 'Спортивный режим стабилизации при старте', ARRAY['34B0', '34C0'], 2000, 10, 'easy', false),
('SAFE02', 'safety', 'Отключение звука непристегнутого ремня', 'Убрать звуковой сигнал ремня безопасности', ARRAY['61A0', '61B0'], 1000, 5, 'easy', false),
('SAFE03', 'safety', 'Отключение подушек безопасности пассажира', 'Для установки детского кресла', ARRAY['61A0'], 1500, 10, 'easy', false),

-- Двигатель (Чип-тюнинг)
('ENG01', 'engine', 'Stage 1 (B48 320i)', 'Чип-тюнинг +40 л.с. / +80 Нм (184→224 л.с.)', ARRAY['12D0'], 35000, 120, 'hard', true),
('ENG02', 'engine', 'Stage 1 (B58 340i)', 'Чип-тюнинг +60 л.с. / +100 Нм (326→386 л.с.)', ARRAY['12D0'], 40000, 120, 'hard', true),
('ENG03', 'engine', 'Stage 2 (B58 340i)', 'Чип-тюнинг +100 л.с. / +150 Нм с даунпайпом', ARRAY['12D0'], 65000, 180, 'hard', true),
('ENG04', 'engine', 'Burbles & Pops (выхлопные хлопки)', 'Активация хлопков и пулеметной очереди', ARRAY['12D0', '12E0'], 15000, 60, 'medium', true),
('ENG05', 'engine', 'Launch Control активация', 'Включение системы старта с места', ARRAY['12D0', '12E0'], 8000, 30, 'medium', true),
('ENG06', 'engine', 'Снятие ограничителя Vmax', 'Снятие ограничения 250 км/ч', ARRAY['12D0', '12E0', '12B0'], 10000, 30, 'medium', false),

-- Коробка передач
('TRANS01', 'transmission', 'XHP Stage 1 (ZF8HP)', 'Спортивная прошивка АКПП +30% скорость переключений', ARRAY['13B0', '13C0'], 25000, 90, 'hard', true),
('TRANS02', 'transmission', 'XHP Stage 2 (ZF8HP)', 'Агрессивная прошивка +50% скорость, жесткие удары', ARRAY['13B0', '13C0'], 35000, 120, 'hard', true),
('TRANS03', 'transmission', 'XHP Stage 3 (ZF8HP)', 'Максимум: +70% скорость, Launch Control 5000 rpm', ARRAY['13B0', '13C0'], 45000, 150, 'hard', true),
('TRANS04', 'transmission', 'Kickdown с 50% педали газа', 'Более чувствительный кикдаун', ARRAY['13B0', '13C0'], 3000, 15, 'easy', false);

-- Создаем таблицу для калькуляции заказов клиентов
CREATE TABLE IF NOT EXISTS client_orders (
    id SERIAL PRIMARY KEY,
    vin VARCHAR(17) NOT NULL,
    vehicle_info JSONB,
    selected_services TEXT[],
    total_price INTEGER NOT NULL,
    total_duration INTEGER,
    client_name VARCHAR(100),
    client_phone VARCHAR(20),
    client_email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_vin ON client_orders(vin);
CREATE INDEX IF NOT EXISTS idx_orders_status ON client_orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON client_orders(created_at DESC);
