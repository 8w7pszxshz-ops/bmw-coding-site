-- Делаем d и i заглавными в engine_code (например, 320d → 320D, 320di → 320DI)
-- Добавляем пробел перед D/d если его нет

UPDATE t_p937713_bmw_coding_site.bmw_chiptuning
SET engine_code = REGEXP_REPLACE(
    REGEXP_REPLACE(engine_code, '([0-9])d', '\1 D', 'g'),
    'di', 'DI', 'gi'
)
WHERE engine_code ~ '[0-9]d' OR engine_code ~* 'di';
