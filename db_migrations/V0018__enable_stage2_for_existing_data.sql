-- Включить показ Stage2 для всех записей где есть данные Stage2
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning 
SET show_stage2 = true 
WHERE stage2_power IS NOT NULL 
  AND stage2_torque IS NOT NULL 
  AND stage2_power > 0 
  AND stage2_torque > 0;