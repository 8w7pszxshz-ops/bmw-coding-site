export const API_URL = 'https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229';
export const ADMIN_PASSWORD = 'bmw2025';

export interface ChipTuningRecord {
  id: number;
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
  stock_power: number;
  stock_torque: number;
  stage1_power: number;
  stage1_torque: number;
  stage1_price: number;
  stage2_power: number | null;
  stage2_torque: number | null;
  status: number;
  conversion_type: string | null;
  conversion_price: number | null;
  stage_type: string;
}