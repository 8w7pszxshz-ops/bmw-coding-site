import React from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';
import type { Series } from './SeriesSelector';
import { API_URL, convertSeriesForAPI, ChiptuningData } from './types';
import BodyTypeStep from './BodyTypeStep';
import EngineStep from './EngineStep';
import StageStep from './StageStep';

interface StageSelectorProps {
  selectedSeries: Series;
  selectedCity: City;
  onReset: () => void;
}

export default function StageSelector({ selectedSeries, selectedCity, onReset }: StageSelectorProps) {
  const [step, setStep] = React.useState<'body' | 'engine' | 'stage'>('body');
  const [bodyTypes, setBodyTypes] = React.useState<string[]>([]);
  const [selectedBody, setSelectedBody] = React.useState<string | null>(null);
  const [engines, setEngines] = React.useState<ChiptuningData[]>([]);
  const [selectedEngine, setSelectedEngine] = React.useState<ChiptuningData | null>(null);
  const [selectedStage, setSelectedStage] = React.useState<'stage1' | 'stage2' | null>(null);
  const [euro2Enabled, setEuro2Enabled] = React.useState(false);
  const [dieselOptions, setDieselOptions] = React.useState({ egr: false, dpf: false, flaps: false, adblue: false });
  const [loading, setLoading] = React.useState(true);

  const apiSeries = convertSeriesForAPI(selectedSeries);

  // Шаг 1: Загружаем типы кузовов
  React.useEffect(() => {
    const loadBodyTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?action=bodies&series=${encodeURIComponent(apiSeries)}`);
        const data = await response.json();
        setBodyTypes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load body types:', error);
        setBodyTypes([]);
      } finally {
        setLoading(false);
      }
    };

    loadBodyTypes();
  }, [apiSeries]);

  // Шаг 2: Загружаем двигатели при выборе кузова
  const handleBodySelect = async (body: string) => {
    setSelectedBody(body);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?action=engines&series=${encodeURIComponent(apiSeries)}&body_type=${encodeURIComponent(body)}`);
      const data = await response.json();
      setEngines(Array.isArray(data) ? data : []);
      setStep('engine');
    } catch (error) {
      console.error('Failed to load engines:', error);
      setEngines([]);
    } finally {
      setLoading(false);
    }
  };

  // Шаг 3: Выбор двигателя
  const handleEngineSelect = (engine: ChiptuningData) => {
    setSelectedEngine(engine);
    setStep('stage');
  };

  // Заказ
  const handleOrder = (finalPrice: number) => {
    if (!selectedEngine) return;

    const messageLines = [`ЧИП-ТЮНИНГ BMW ${selectedSeries}`, '', `${selectedEngine.engine_code} (${selectedEngine.body_type})`];

    if (selectedStage) {
      const stageData = selectedStage === 'stage1' ? selectedEngine.stage1 : selectedEngine.stage2;
      if (stageData) {
        const gains = `${selectedEngine.stock.power} → ${stageData.power} л.с. | ${selectedEngine.stock.torque} → ${stageData.torque} Нм`;
        messageLines.push(selectedStage.toUpperCase());
        messageLines.push(gains);
      }
    }

    if (euro2Enabled) messageLines.push('EURO 2: Да');
    if (dieselOptions.egr) messageLines.push('EGR: Да');
    if (dieselOptions.dpf) messageLines.push('DPF: Да');
    if (dieselOptions.flaps) messageLines.push('FLAPS: Да');
    if (dieselOptions.adblue) messageLines.push('ADBLUE: Да');

    messageLines.push('');
    messageLines.push(`СТОИМОСТЬ: ${finalPrice.toLocaleString('ru-RU')} ₽`);
    
    const message = messageLines.join('\n');
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-2">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-1.5 transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(255, 0, 51, 0.4))',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          boxShadow: '0 0 15px rgba(255, 0, 0, 0.4)'
        }}
      >
        <Icon name="ChevronLeft" className="w-5 h-5 text-red-400" />
        <span 
          className="tracking-wider text-red-400 uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// НАЗАД
        </span>
      </button>

      <div 
        className="p-2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 8, 8, 0.9) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 51, 0.7) 50%, rgba(0, 212, 255, 0.7) 50%, rgba(56, 189, 248, 0.7) 100%) 1',
          boxShadow: '0 0 30px rgba(127, 106, 127, 0.5), inset 0 0 40px rgba(0, 0, 0, 0.5)',
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), rgba(0, 212, 255, 0.3))', clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        <p 
          className="text-white text-[10px] mb-0.5 tracking-widest uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// ВЫБРАНА СЕРИЯ
        </p>
        <p 
          className="text-white text-lg tracking-widest font-bold uppercase"
          style={{ 
            fontFamily: '"Reborn Technologies", sans-serif',
            textShadow: '2px 2px 0 rgba(127, 106, 127, 0.4), 0 0 20px rgba(127, 106, 127, 0.5)'
          }}
        >
          {selectedSeries}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-white/60 text-sm tracking-wider" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
            /// ЗАГРУЗКА ДАННЫХ...
          </p>
        </div>
      ) : (
        <>
          {step === 'body' && (
            <BodyTypeStep 
              bodyTypes={bodyTypes}
              onSelectBody={handleBodySelect}
            />
          )}

          {step === 'engine' && (
            <EngineStep
              engines={engines}
              selectedBody={selectedBody}
              onSelectEngine={handleEngineSelect}
              onBack={() => {
                setStep('body');
                setSelectedBody(null);
              }}
            />
          )}

          {step === 'stage' && selectedEngine && (
            <StageStep
              selectedEngine={selectedEngine}
              selectedSeries={selectedSeries}
              selectedCity={selectedCity}
              selectedStage={selectedStage}
              euro2Enabled={euro2Enabled}
              dieselOptions={dieselOptions}
              onSelectStage={setSelectedStage}
              onEuro2Change={setEuro2Enabled}
              onDieselOptionChange={(option, enabled) => {
                setDieselOptions(prev => ({ ...prev, [option]: enabled }));
              }}
              onBack={() => {
                setStep('engine');
                setSelectedEngine(null);
                setSelectedStage(null);
                setEuro2Enabled(false);
                setDieselOptions({ egr: false, dpf: false, flaps: false, adblue: false });
              }}
              onOrder={handleOrder}
            />
          )}
        </>
      )}
    </div>
  );
}