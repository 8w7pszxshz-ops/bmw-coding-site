export interface ChipTuningAPIResponse {
  id: number;
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  article_code: string;
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
  powerBefore: number;
  powerAfter: number;
  torqueBefore: number;
  torqueAfter: number;
  price: number;
}

export interface ModelData {
  name: string;
  series: string;
  generation: 'F' | 'G';
  engines: {
    code: string;
    type: 'petrol' | 'diesel';
    displacement: string;
    modifications: EngineModification[];
  }[];
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
        engines: []
      });
    }

    const model = modelsMap.get(seriesKey)!;
    let engine = model.engines.find(e => e.code === item.engine_code);

    if (!engine) {
      const engineType = item.engine_code.toLowerCase().includes('d') ? 'diesel' : 'petrol';
      engine = {
        code: item.engine_code,
        type: engineType,
        displacement: '2.0',
        modifications: []
      };
      model.engines.push(engine);
    }

    engine.modifications.push({
      name: `${item.engine_code} Stage 1`,
      stage: 'Stage 1',
      powerBefore: item.stock.power,
      powerAfter: item.stage1.power,
      torqueBefore: item.stock.torque,
      torqueAfter: item.stage1.torque,
      price: item.stage1.price
    });

    if (item.stage2) {
      engine.modifications.push({
        name: `${item.engine_code} Stage 2`,
        stage: 'Stage 2',
        powerBefore: item.stock.power,
        powerAfter: item.stage2.power,
        torqueBefore: item.stock.torque,
        torqueAfter: item.stage2.torque,
        price: item.stage2.price
      });
    }
  });

  return Array.from(modelsMap.values());
}

export function getTypeColor(type: string) {
  return type === 'petrol' ? '#FF6B35' : '#00D4FF';
}
