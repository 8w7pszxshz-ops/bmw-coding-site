-- Таблица моделей BMW
CREATE TABLE IF NOT EXISTS bmw_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    series VARCHAR(50) NOT NULL,
    generation VARCHAR(10) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(series)
);

-- Таблица двигателей
CREATE TABLE IF NOT EXISTS bmw_engines (
    id SERIAL PRIMARY KEY,
    model_id INTEGER NOT NULL,
    code VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('petrol', 'diesel')),
    displacement DECIMAL(3,1) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (model_id) REFERENCES bmw_models(id),
    UNIQUE(model_id, code)
);

-- Таблица модификаций (Stage)
CREATE TABLE IF NOT EXISTS bmw_modifications (
    id SERIAL PRIMARY KEY,
    engine_id INTEGER NOT NULL,
    name VARCHAR(200) NOT NULL,
    stage VARCHAR(50) NOT NULL,
    power_before INTEGER NOT NULL,
    power_after INTEGER NOT NULL,
    torque_before INTEGER NOT NULL,
    torque_after INTEGER NOT NULL,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (engine_id) REFERENCES bmw_engines(id)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_engines_model_id ON bmw_engines(model_id);
CREATE INDEX idx_modifications_engine_id ON bmw_modifications(engine_id);
CREATE INDEX idx_models_generation ON bmw_models(generation);
CREATE INDEX idx_engines_type ON bmw_engines(type);