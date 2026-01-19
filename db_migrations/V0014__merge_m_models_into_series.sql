-- Объединяем M-модели с основными сериями
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = '2-series' WHERE series = 'M2';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = '3-series' WHERE series = 'M3';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = '4-series' WHERE series = 'M4';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = '5-series' WHERE series = 'M5';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = '8-series' WHERE series = 'M8';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = 'X3' WHERE series = 'X3M';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = 'X4' WHERE series = 'X4M';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = 'X5' WHERE series = 'X5M';
UPDATE t_p937713_bmw_coding_site.bmw_chiptuning SET series = 'X6' WHERE series = 'X6M';