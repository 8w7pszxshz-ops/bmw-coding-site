-- Включаем show_stage2 только для записи с ID 16035
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning 
SET show_stage2 = true 
WHERE id = 16035;

-- Для всех остальных выключаем
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning 
SET show_stage2 = false 
WHERE id != 16035;