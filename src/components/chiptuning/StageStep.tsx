import React from 'react';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';
import { trackChiptuningOrder, trackGoal, goals } from '@/utils/analytics';
import type { Series } from './SeriesSelector';
import type { ChiptuningData } from './types';
import OptionCheckbox from './OptionCheckbox';
import StageCard from './StageCard';
import PriceDisplay from './PriceDisplay';

interface StageStepProps {
  selectedEngine: ChiptuningData;
  selectedSeries: Series;
  selectedCity: City;
  selectedStage: 'stage1' | 'stage2' | null;
  euro2Enabled: boolean;
  dieselOptions: { egr: boolean; dpf: boolean; flaps: boolean; adblue: boolean };
  transmissionTuningEnabled: boolean;
  onSelectStage: (stage: 'stage1' | 'stage2') => void;
  onEuro2Change: (enabled: boolean) => void;
  onDieselOptionChange: (option: 'egr' | 'dpf' | 'flaps' | 'adblue', enabled: boolean) => void;
  onTransmissionTuningChange: (enabled: boolean) => void;
  onOrder: (finalPrice: number) => void;
}

export default function StageStep({ 
  selectedEngine, 
  selectedSeries, 
  selectedCity, 
  selectedStage,
  euro2Enabled,
  dieselOptions,
  transmissionTuningEnabled,
  onSelectStage,
  onEuro2Change,
  onDieselOptionChange,
  onTransmissionTuningChange,
  onOrder 
}: StageStepProps) {
  
  const stages = [
    { id: 'stage1', name: 'STAGE 1', data: selectedEngine.stage1 },
    ...(selectedEngine.stage2 ? [{ id: 'stage2', name: 'STAGE 2', data: selectedEngine.stage2 }] : [])
  ];

  const isDiesel = selectedEngine.engine_code?.toLowerCase().includes('d') || false;

  const calculatePrice = (basePrice: number, stageId: string) => {
    let price = selectedCity.value === 'moscow' ? basePrice : Math.round(basePrice * 0.9);
    
    if (selectedStage && euro2Enabled) {
      price += 5000;
    }
    
    if (selectedStage && isDiesel) {
      if (dieselOptions.egr) price += 5000;
      if (dieselOptions.dpf) price += 5000;
      if (dieselOptions.flaps) price += 5000;
      if (dieselOptions.adblue) price += 20000;
    }
    
    if (selectedStage && transmissionTuningEnabled) {
      price += 27000;
    }
    
    return price;
  };
  
  const euro2OnlyPrice = 12000;
  
  const dieselOnlyPrice = () => {
    let price = 0;
    if (dieselOptions.egr) price += 12000;
    if (dieselOptions.dpf) price += 12000;
    if (dieselOptions.flaps) price += 12000;
    if (dieselOptions.adblue) price += 20000;
    return price;
  };
  
  const transmissionOnlyPrice = transmissionTuningEnabled ? 27000 : 0;

  return (
    <>
      <div className="space-y-2 mb-2">
        {!isDiesel && (
          <OptionCheckbox
            checked={euro2Enabled}
            onChange={onEuro2Change}
            label="EURO 2"
          />
        )}
        
        <OptionCheckbox
          checked={transmissionTuningEnabled}
          onChange={onTransmissionTuningChange}
          label="ЧИП-ТЮНИНГ АКПП"
        />
      </div>

      {isDiesel && (
        <div className="space-y-2 mb-2">
          {[
            { key: 'egr' as const, label: 'EGR', price: 12000, withStage: 5000 },
            { key: 'dpf' as const, label: 'DPF', price: 12000, withStage: 5000 },
            { key: 'flaps' as const, label: 'FLAPS', price: 12000, withStage: 5000 },
            { key: 'adblue' as const, label: 'ADBLUE', price: 20000, withStage: 20000 }
          ].map(option => (
            <OptionCheckbox
              key={option.key}
              checked={dieselOptions[option.key]}
              onChange={(checked) => onDieselOptionChange(option.key, checked)}
              label={option.label}
            />
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="space-y-1">
          {stages.map((stage) => {
            const price = calculatePrice(stage.data.price, stage.id);
            const isSelected = selectedStage === stage.id;

            return (
              <StageCard
                key={stage.id}
                stageId={stage.id}
                stageName={stage.name}
                isSelected={isSelected}
                price={price}
                power={stage.data.power}
                torque={stage.data.torque}
                onClick={() => {
                  if (isSelected) {
                    onSelectStage(null as any);
                  } else {
                    onSelectStage(stage.id as 'stage1' | 'stage2');
                    trackGoal(goals.chiptuningStageSelected, {
                      series: selectedSeries,
                      engine: selectedEngine.engine_code,
                      stage: stage.id,
                      city: selectedCity
                    });
                  }
                }}
              />
            );
          })}
        </div>

        <PriceDisplay
          finalPrice={
            selectedStage 
              ? calculatePrice(
                  stages.find(s => s.id === selectedStage)?.data.price || 0,
                  selectedStage
                )
              : (euro2Enabled ? euro2OnlyPrice : 0) + dieselOnlyPrice() + transmissionOnlyPrice
          }
          selectedStage={selectedStage}
          euro2Enabled={euro2Enabled}
          dieselOptions={dieselOptions}
          transmissionTuningEnabled={transmissionTuningEnabled}
          isDiesel={isDiesel}
          onOrder={() => {
            const finalPrice = selectedStage 
              ? calculatePrice(
                  stages.find(s => s.id === selectedStage)?.data.price || 0,
                  selectedStage
                )
              : (euro2Enabled ? euro2OnlyPrice : 0) + dieselOnlyPrice() + transmissionOnlyPrice;

            trackChiptuningOrder({
              series: selectedSeries,
              engine: selectedEngine.engine_code,
              stage: selectedStage || 'none',
              euro2: euro2Enabled,
              dieselOptions: isDiesel ? dieselOptions : undefined,
              transmissionTuning: transmissionTuningEnabled,
              city: selectedCity,
              finalPrice
            });

            onOrder(finalPrice);
            const telegramLink = getTelegramLink(selectedCity.value);
            window.open(telegramLink, '_blank');
          }}
        />
      </div>
    </>
  );
}