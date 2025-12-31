-- Добавление полного списка HWEL блоков BMW для всех серий и поколений

-- ====== CIC (2008-2013) - Старое поколение ======
INSERT INTO hwel_blocks (hwel_code, block_name, description, vehicle_series, year_from, year_to, features, upgrade_options) VALUES
('2639', 'CIC Entry', 'Базовая мультимедиа без навигации', '1-Series', 2008, 2013, 
 '{"bluetooth": true, "usb": true, "aux": true}', 
 '{"retrofit_navigation": "Возможна активация навигации кодированием"}'),

('26B3', 'NBT Entry', 'Базовая NBT без навигации', '1-Series', 2012, 2017,
 '{"bluetooth": true, "usb": true, "idrive": true}',
 '{"navigation": "Активация навигации через FSC код"}'),

('26B4', 'NBT Standard', 'NBT с навигацией', '2-Series', 2012, 2017,
 '{"navigation": true, "bluetooth": true, "usb": true, "real_time_traffic": true}',
 '{"nbt_evo": "Апгрейд до NBT Evo для видео в движении"}'),

('26B5', 'NBT High', 'NBT Professional с расширенным функционалом', '4-Series', 2012, 2017,
 '{"navigation": true, "split_screen": true, "bluetooth": true, "usb": true}',
 '{"nbt_evo": "Апгрейд до NBT Evo ID6 для CarPlay"}'),

('26C0', 'iDrive 7.0', 'Новая операционная система iDrive 7', 'G20', 2018, 2022,
 '{"carplay_wireless": true, "android_auto": true, "live_cockpit": true, "personal_assistant": true, "ota_updates": true}',
 '{"idrive8": "Обновление до iDrive 8 (G-серия новая)"}'),

('26C1', 'iDrive 7.0 High', 'iDrive 7 с большим экраном и HUD', 'G30', 2019, 2023,
 '{"carplay_wireless": true, "hud": true, "gesture_control": true, "live_cockpit_professional": true, "ota_updates": true}',
 '{}'),

('26C2', 'iDrive 8.0', 'Последнее поколение OS (изогнутый экран)', 'G42', 2022, 2025,
 '{"carplay_wireless": true, "android_auto_wireless": true, "curved_display": true, "augmented_reality": true, "5g": true}',
 '{}'),

('26D0', 'NBT Evo X-Series', 'NBT Evo адаптированная для X3/X4', 'X3', 2015, 2021,
 '{"video_motion": true, "offroad_display": true, "tow_camera": true, "sport_displays": true}',
 '{"carplay": "Апгрейд до ID6"}'),

('26D1', 'NBT Evo X-High', 'NBT Evo для X5/X6/X7 с большим экраном', 'X5', 2016, 2021,
 '{"video_motion": true, "rear_entertainment": true, "panoramic_view": true, "carplay": true}',
 '{}'),

('26E0', 'iDrive 7 X-Series', 'iDrive 7 для новых X-моделей', 'X3', 2018, 2023,
 '{"carplay_wireless": true, "offroad_mode": true, "live_cockpit": true, "tow_assist": true}',
 '{}'),

('26M0', 'NBT Evo M', 'NBT Evo с M-специфичными функциями', 'M3', 2016, 2021,
 '{"m_laptimer": true, "m_drift_analyzer": true, "video_motion": true, "carplay": true, "sport_displays": true}',
 '{}'),

('26M1', 'iDrive 7 M', 'iDrive 7 для M-моделей с трек-режимом', 'M4', 2019, 2025,
 '{"m_mode": true, "m_laptimer": true, "m_drift_analyzer": true, "track_mode": true, "carplay_wireless": true}',
 '{}'),

('26I0', 'iDrive i3/i8', 'Специальная система для i3 и i8', 'i3', 2013, 2020,
 '{"eco_displays": true, "charging_status": true, "range_map": true, "carplay": true}',
 '{"retrofit": "Ограниченные возможности апгрейда"}'),

('26I1', 'iDrive iX/i4', 'iDrive для новых электромобилей', 'iX', 2021, 2025,
 '{"curved_display": true, "augmented_reality": true, "carplay_wireless": true, "charging_planner": true, "ota_updates": true}',
 '{}'),

('27A0', 'Top View Camera', 'Система кругового обзора', '5-Series', 2010, 2025,
 '{"360_camera": true, "park_assist": true, "side_view": true}',
 '{"3d_view": "Апгрейд до 3D вида (новые модели)"}'),

('27A1', 'Surround View Pro', 'Улучшенная система 3D обзора', '7-Series', 2016, 2025,
 '{"3d_view": true, "remote_view": true, "park_assist_plus": true}',
 '{}')
ON CONFLICT (hwel_code, vehicle_series) DO NOTHING;
