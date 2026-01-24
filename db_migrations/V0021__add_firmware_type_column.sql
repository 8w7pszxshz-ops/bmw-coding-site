-- Добавление поля firmware_type для указания типа прошивки (30I/28I)
ALTER TABLE t_p937713_bmw_coding_site.bmw_chiptuning
ADD COLUMN firmware_type VARCHAR(10) NULL DEFAULT '30I';