-- Добавляем поле для маркировки рестайлинговых моделей (LCI, Rest)
ALTER TABLE bmw_chiptuning ADD COLUMN IF NOT EXISTS is_restyling BOOLEAN DEFAULT FALSE;

-- Добавляем индекс для быстрой фильтрации
CREATE INDEX IF NOT EXISTS idx_bmw_chiptuning_is_restyling ON bmw_chiptuning(is_restyling);