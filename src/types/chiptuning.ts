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

export interface StageOption {
  stage: 'Stage 1' | 'Stage 2';
  powerAfter: number;
  torqueAfter: number;
  price: number;
}

export interface EngineModification {
  name: string;
  engineCode: string;
  engineType: 'petrol' | 'diesel';
  powerBefore: number;
  torqueBefore: number;
  isRestyling: boolean;
  stages: StageOption[];
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
    const engineKey = item.engine_code;

    let existingMod = model.modifications.find(m => m.engineCode === engineKey);
    
    if (!existingMod) {
      const formattedName = engineType === 'diesel'
        ? item.engine_code.replace(/(\d+)d/gi, '$1 D')
        : item.engine_code.toUpperCase();
      
      existingMod = {
        name: formattedName,
        engineCode: item.engine_code,
        engineType,
        powerBefore: item.stock.power,
        torqueBefore: item.stock.torque,
        isRestyling: item.is_restyling,
        stages: []
      };
      model.modifications.push(existingMod);
    }

    if (item.stage_type.includes('St.1') || item.stage_type.includes('Stage 1')) {
      existingMod.stages.push({
        stage: 'Stage 1',
        powerAfter: item.stage1.power,
        torqueAfter: item.stage1.torque,
        price: item.stage1.price
      });
    }

    if (item.stage2) {
      existingMod.stages.push({
        stage: 'Stage 2',
        powerAfter: item.stage2.power,
        torqueAfter: item.stage2.torque,
        price: item.stage2.price
      });
    }
  });

  return Array.from(modelsMap.values());
}

export function getTypeColor(type: string) {
  return '#FF0040';
}