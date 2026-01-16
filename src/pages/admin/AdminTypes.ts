export interface ChiptuningRecord {
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
  stage_type: string;
  is_restyling: boolean;
  status: number;
}

export interface EditFormData {
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
  stock_power: string;
  stock_torque: string;
  stage1_power: string;
  stage1_torque: string;
  stage1_price: string;
  stage2_power: string;
  stage2_torque: string;
  stage_type: string;
  is_restyling: boolean;
  status: string;
}

export const API_URL = 'https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229';
