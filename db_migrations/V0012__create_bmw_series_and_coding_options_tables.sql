-- Create BMW series table for chiptuning
CREATE TABLE IF NOT EXISTS t_p937713_bmw_coding_site.bmw_series (
  id SERIAL PRIMARY KEY,
  series_name VARCHAR(50) NOT NULL UNIQUE,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create coding options table
CREATE TABLE IF NOT EXISTS t_p937713_bmw_coding_site.coding_options (
  id SERIAL PRIMARY KEY,
  option_id VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  series VARCHAR(10) NOT NULL CHECK (series IN ('F', 'G', 'both')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create coding categories table
CREATE TABLE IF NOT EXISTS t_p937713_bmw_coding_site.coding_categories (
  id SERIAL PRIMARY KEY,
  category_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert BMW series data
INSERT INTO t_p937713_bmw_coding_site.bmw_series (series_name, display_order) VALUES
  ('1 SERIES', 1),
  ('2 SERIES', 2),
  ('3 SERIES', 3),
  ('4 SERIES', 4),
  ('5 SERIES', 5),
  ('6 SERIES', 6),
  ('7 SERIES', 7),
  ('M2', 8),
  ('M3', 9),
  ('M4', 10),
  ('M5', 11),
  ('M6', 12),
  ('X1', 13),
  ('X3', 14),
  ('X4', 15),
  ('X5', 16),
  ('X6', 17),
  ('Z4', 18);

-- Insert coding categories
INSERT INTO t_p937713_bmw_coding_site.coding_categories (category_id, name, icon, display_order) VALUES
  ('comfort', 'Комфорт', 'Armchair', 1),
  ('multimedia', 'Мультимедиа', 'Monitor', 2),
  ('exterior', 'Внешний вид', 'Sparkles', 3),
  ('safety', 'Безопасность', 'Shield', 4),
  ('performance', 'Производительность', 'Gauge', 5);