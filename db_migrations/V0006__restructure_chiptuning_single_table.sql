-- Новая таблица для чип-тюнинга BMW (одна строка = все Stage)
CREATE TABLE IF NOT EXISTS bmw_chiptuning (
    id SERIAL PRIMARY KEY,
    
    -- Информация о модели
    model_name VARCHAR(200) NOT NULL,        -- "BMW 1-series E8x 11d 115 л.с. 260 Нм"
    series VARCHAR(50) NOT NULL,             -- "1-series"
    body_type VARCHAR(50) NOT NULL,          -- "E8x"
    engine_code VARCHAR(50) NOT NULL,        -- "11d"
    article_code VARCHAR(100) NOT NULL,      -- "BMW 1-series E8x 7"
    
    -- Stage 3 (стоковые характеристики)
    stock_power INTEGER NOT NULL,            -- 115 л.с.
    stock_torque INTEGER NOT NULL,           -- 260 Нм
    
    -- Stage 1 (базовый чип-тюнинг)
    stage1_power INTEGER NOT NULL,           -- 180 л.с.
    stage1_torque INTEGER NOT NULL,          -- 400 Нм
    stage1_price INTEGER NOT NULL DEFAULT 30000,
    
    -- Stage 2 (с удалением катализатора/сажевого фильтра)
    stage2_power INTEGER,                    -- 190 л.с. (может отсутствовать)
    stage2_torque INTEGER,                   -- 420 Нм (может отсутствовать)
    
    -- Метаданные
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Уникальность по модели + двигателю
    UNIQUE(series, body_type, engine_code)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_chiptuning_series ON bmw_chiptuning(series);
CREATE INDEX idx_chiptuning_body_type ON bmw_chiptuning(body_type);
CREATE INDEX idx_chiptuning_engine ON bmw_chiptuning(engine_code);