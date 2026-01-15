-- Добавление полей для статуса и перепрошивок (например "20i в 28i")
ALTER TABLE bmw_chiptuning 
ADD COLUMN status INTEGER DEFAULT 1 NOT NULL,
ADD COLUMN conversion_type VARCHAR(100),
ADD COLUMN conversion_target_power INTEGER,
ADD COLUMN conversion_price INTEGER;

COMMENT ON COLUMN bmw_chiptuning.status IS '0 = скрыто с сайта, 1 = показывать на сайте';
COMMENT ON COLUMN bmw_chiptuning.conversion_type IS 'Тип перепрошивки, например "Заводская прошивка 228i"';
COMMENT ON COLUMN bmw_chiptuning.conversion_target_power IS 'Мощность после конверсии (финальная мощность Stage 3)';
COMMENT ON COLUMN bmw_chiptuning.conversion_price IS 'Цена перепрошивки (если отличается от st1)';

CREATE INDEX idx_chiptuning_status ON bmw_chiptuning(status);
