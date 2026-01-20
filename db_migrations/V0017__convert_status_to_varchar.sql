ALTER TABLE t_p937713_bmw_coding_site.bmw_chiptuning 
ALTER COLUMN status TYPE VARCHAR(20) USING 
  CASE 
    WHEN status = 1 THEN 'active'
    WHEN status = 0 THEN 'draft'
    ELSE 'draft'
  END;