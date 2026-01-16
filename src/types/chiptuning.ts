export interface ChipTuningAPIResponse {
  id: number;
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
  stage_type: string;
  is_restyling: boolean;
  stock: {
    power: number;
    torque: number;
  };
  stage1: {
    power: number;
    torque: number;
    price: number;
    power_gain: number;
    torque_gain: number;
  };
  stage2: {
    power: number;
    torque: number;
    price: number;
    power_gain: number;
    torque_gain: number;
  } | null;
}

export interface EngineModification {
  name: string;
  stage: string;
  engineCode: string;
  engineType: 'petrol' | 'diesel';
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  price: number;
  isRestyling: boolean;
}

export interface ModelData {
  name: string;
  series: string;
  generation: 'F' | 'G';
  modifications: EngineModification[];
}

export function convertAPIDataToModelData(apiData: ChipTuningAPIResponse[]): ModelData[] {
  const modelsMap = new Map<string, ModelData>();

  apiData.forEach(item => {
    const seriesKey = `${item.series}_${item.body_type}`;
    
    if (!modelsMap.has(seriesKey)) {
      const generation = item.body_type.startsWith('G') ? 'G' : 'F';
      modelsMap.set(seriesKey, {
        name: item.series.replace('-series', ' Series'),
        series: item.body_type,
        generation,
        modifications: []
      });
    }

    const model = modelsMap.get(seriesKey)!;
    const engineType = item.engine_code.toLowerCase().includes('d') ? 'diesel' : 'petrol';

    // Добавляем модификацию напрямую без группировки по моторам
    model.modifications.push({
      name: `${item.engine_code} ${item.stage_type}`,
      stage: item.stage_type,
      engineCode: item.engine_code,
      engineType,
      powerBefore: item.stock.power,
      powerAfter: item.stage1.power,
      torqueBefore: item.stock.torque,
      torqueAfter: item.stage1.torque,
      price: item.stage1.price,
      isRestyling: item.is_restyling
    });

    if (item.stage2) {
      model.modifications.push({
        name: `${item.engine_code} Stage 2`,
        stage: 'Stage 2',
        engineCode: item.engine_code,
        engineType,
        powerBefore: item.stock.power,
        powerAfter: item.stage2.power,
        torqueBefore: item.stock.torque,
        torqueAfter: item.stage2.torque,
        price: item.stage2.price,
        isRestyling: item.is_restyling
      });
    }
  });

  return Array.from(modelsMap.values());
}

export function getTypeColor(type: string) {
  return type === 'petrol' ? '#FF6B35' : '#00D4FF';
}