-- Добавляем поле для различения St.1 и St.2
ALTER TABLE bmw_chiptuning ADD COLUMN IF NOT EXISTS stage_type VARCHAR(10) DEFAULT 'St.1';

-- Удаляем старый UNIQUE constraint
ALTER TABLE bmw_chiptuning DROP CONSTRAINT IF EXISTS bmw_chiptuning_series_body_type_engine_code_key;

-- Добавляем новый UNIQUE constraint с stage_type
ALTER TABLE bmw_chiptuning ADD CONSTRAINT bmw_chiptuning_unique_model_stage 
    UNIQUE(series, body_type, engine_code, stage_type);