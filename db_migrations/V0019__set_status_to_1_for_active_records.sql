-- Устанавливаем status = '1' для всех активных записей
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning 
SET status = '1' 
WHERE status = 'active';