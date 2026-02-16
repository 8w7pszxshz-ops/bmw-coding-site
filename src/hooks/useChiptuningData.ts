import { useState, useEffect } from 'react';

interface ChiptuningVariant {
  model: string;
  stock_power: number;
  stock_torque: number;
  stage1_power: number;
  stage1_torque: number;
  stage1_price: number;
  stage2_power?: number;
  stage2_torque?: number;
  show_stage2: boolean;
}

interface ApiChiptuningItem extends ChiptuningVariant {
  engine_name?: string;
  [key: string]: unknown;
}

interface ChiptuningData {
  variants: ChiptuningVariant[];
  isLoading: boolean;
  error: string | null;
}

const CHIPTUNING_API = 'https://functions.poehali.dev/1465efc7-1ef5-4210-8079-7bbd027f47a0';

export function useChiptuningData(engineName: string): ChiptuningData {
  const [variants, setVariants] = useState<ChiptuningVariant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${CHIPTUNING_API}?action=admin`);
        if (!response.ok) throw new Error('Failed to fetch chiptuning data');
        
        const data = await response.json();
        
        const filtered = data.filter((item: ApiChiptuningItem) => 
          item.engine_name && item.engine_name.toLowerCase().includes(engineName.toLowerCase())
        );
        
        setVariants(filtered.map((item: ApiChiptuningItem) => ({
          model: item.model,
          stock_power: item.stock_power,
          stock_torque: item.stock_torque,
          stage1_power: item.stage1_power,
          stage1_torque: item.stage1_torque,
          stage1_price: item.stage1_price,
          stage2_power: item.stage2_power,
          stage2_torque: item.stage2_torque,
          show_stage2: item.show_stage2
        })));
        
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setVariants([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (engineName) {
      fetchData();
    }
  }, [engineName]);

  return { variants, isLoading, error };
}