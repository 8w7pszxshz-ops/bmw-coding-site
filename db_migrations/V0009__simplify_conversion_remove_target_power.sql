-- Убираем conversion_target_power, используем stock_power (Stage 3) как финальную мощность для конверсий
ALTER TABLE bmw_chiptuning 
DROP COLUMN IF EXISTS conversion_target_power;

COMMENT ON COLUMN bmw_chiptuning.conversion_type IS 'Тип перепрошивки (например "Заводская прошивка 228i"). Финальная мощность берётся из stock_power (Stage 3)';
COMMENT ON COLUMN bmw_chiptuning.conversion_price IS 'Цена перепрошивки (если отличается от stage1_price)';
